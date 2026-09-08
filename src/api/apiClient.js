/**
 * ============================================================================
 * Client : apiClient
 * ============================================================================
 *
 * <p>
 * Provides the centralized Axios client used by the FreshMeal frontend for
 * communicating with the Spring Boot backend.
 * </p>
 *
 * <p>
 * The client is responsible for attaching the current access token to
 * authenticated requests and coordinating automatic access-token recovery when
 * the backend responds with HTTP {@code 401 Unauthorized}.
 * </p>
 *
 * <h3>Authenticated Request Flow</h3>
 *
 * <pre>
 * Component / Service
 *        |
 *        v
 *    apiClient
 *        |
 *        v
 * Read latest authentication session
 *        |
 *        v
 * Attach Bearer access token
 *        |
 *        v
 *      Backend
 * </pre>
 *
 * <h3>Automatic Token Refresh Flow</h3>
 *
 * <pre>
 * API Request
 *      |
 *      v
 *   HTTP 401
 *      |
 *      v
 * AuthenticationTokenRefreshManager
 *      |
 *      v
 * Refresh authentication session
 *      |
 *      +----------------------+
 *      |                      |
 *      v                      v
 *   Success                 Failure
 *      |                      |
 *      v                      v
 * Save new session       Clear session
 *      |                      |
 *      v                      v
 * Retry original       Publish termination
 * request                    event
 * </pre>
 *
 * <p>
 * The API client deliberately delegates refresh coordination and authentication
 * session termination to {@code AuthenticationTokenRefreshManager}. This keeps
 * HTTP transport concerns separate from authentication-session lifecycle
 * management.
 * </p>
 *
 * <h3>Responsibilities</h3>
 * <ul>
 * <li>Create the centralized Axios client.</li>
 * <li>Attach the latest access token to authenticated requests.</li>
 * <li>Detect HTTP {@code 401 Unauthorized} responses.</li>
 * <li>Delegate token refresh to the refresh manager.</li>
 * <li>Retry a failed request only once after successful token refresh.</li>
 * <li>Prevent refresh and login endpoints from entering the refresh flow.</li>
 * </ul>
 *
 * <h3>Non-Responsibilities</h3>
 * <ul>
 * <li>Persisting authentication sessions.</li>
 * <li>Clearing authentication sessions after refresh failure.</li>
 * <li>Publishing authentication-session lifecycle events.</li>
 * <li>Managing React authentication state.</li>
 * <li>Performing application navigation.</li>
 * <li>Determining user roles or permissions.</li>
 * </ul>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

import axios from "axios";

import AuthenticationSessionStorage from "../features/authentication/services/AuthenticationSessionStorage";
import AuthenticationTokenRefreshManager from "../features/authentication/services/AuthenticationTokenRefreshManager";
import { API } from "../global/constants/ApiConstants";

/**
 * Internal Axios request configuration property used to prevent an individual
 * request from entering an infinite authentication-refresh retry loop.
 *
 * @constant
 * @type {string}
 */
const RETRY_PROPERTY = "_freshMealAuthRetry";

/**
 * Centralized Axios client for FreshMeal API communication.
 *
 * <p>
 * The base URL is supplied through the Vite environment configuration so the
 * frontend does not hard-code an environment-specific backend URL.
 * </p>
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Request interceptor.
 *
 * <p>
 * Reads the latest authentication session immediately before each request and
 * attaches the current access token when one is available.
 * </p>
 *
 * <p>
 * Reading from {@code AuthenticationSessionStorage} rather than relying only
 * on React context is intentional. Token refresh can occur outside React and
 * may update the persisted session while the application is running.
 * </p>
 */
apiClient.interceptors.request.use(
  (config) => {
    const authenticationSession = AuthenticationSessionStorage.get();

    if (authenticationSession?.accessToken) {
      const tokenType = authenticationSession.tokenType || "Bearer";

      config.headers.Authorization = `${tokenType} ${authenticationSession.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response interceptor.
 *
 * <p>
 * Handles HTTP {@code 401 Unauthorized} responses by delegating authentication
 * recovery to {@link AuthenticationTokenRefreshManager}.
 * </p>
 *
 * <p>
 * Only the original failed request is retried, and it can be retried at most
 * once. This prevents an invalid authentication session from creating an
 * infinite request-refresh-request cycle.
 * </p>
 *
 * <p>
 * The login and refresh-token endpoints are excluded from this flow because
 * neither should trigger another authentication refresh operation.
 * </p>
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest[RETRY_PROPERTY]) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest.url || "";

    if (
      requestUrl === API.AUTHENTICATION.LOGIN ||
      requestUrl === API.AUTHENTICATION.REFRESH_TOKEN
    ) {
      return Promise.reject(error);
    }

    const authenticationSession = AuthenticationSessionStorage.get();

    if (!authenticationSession?.refreshToken) {
      return Promise.reject(error);
    }

    originalRequest[RETRY_PROPERTY] = true;

    try {
      await AuthenticationTokenRefreshManager.refresh();

      /*
       * The request interceptor runs again when the original request is
       * replayed, allowing it to attach the newly refreshed access token.
       */
      return apiClient(originalRequest);
    } catch (refreshError) {
      /*
       * AuthenticationTokenRefreshManager owns refresh-failure termination.
       * It clears the persisted authentication session and publishes the
       * session-termination event consumed by AuthenticationContext.
       *
       * The API client therefore only propagates the failure.
       */
      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
