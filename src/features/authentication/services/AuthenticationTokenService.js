/**
 * ============================================================================
 * Service : AuthenticationTokenService
 * ============================================================================
 *
 * <p>
 * Provides authentication-token API operations for the FreshMeal frontend.
 * </p>
 *
 * <p>
 * This service is intentionally separate from
 * {@link AuthenticationService}. AuthenticationService owns the user-facing
 * authentication workflows such as login, while this service owns token
 * lifecycle operations such as access-token renewal.
 * </p>
 *
 * <h3>Refresh Flow</h3>
 *
 * <pre>
 * apiClient
 *     |
 *     | access token rejected
 *     v
 * Token Refresh Lifecycle
 *     |
 *     v
 * AuthenticationTokenService.refresh()
 *     |
 *     v
 * POST /api/auth/refresh-token
 *     |
 *     v
 * TokenResponse
 * </pre>
 *
 * <h3>Important HTTP Boundary</h3>
 *
 * <p>
 * This service deliberately uses a dedicated Axios instance instead of the
 * application's authenticated {@code apiClient}.
 * </p>
 *
 * <p>
 * The normal {@code apiClient} will eventually contain a response interceptor
 * capable of handling {@code 401 Unauthorized} responses. Using that same
 * client to call the refresh endpoint would allow the refresh request itself
 * to enter the refresh interceptor and potentially create an infinite
 * refresh loop.
 * </p>
 *
 * <h3>Responsibilities</h3>
 * <ul>
 * <li>Call the backend refresh-token endpoint.</li>
 * <li>Send the current refresh token.</li>
 * <li>Return the backend's token response.</li>
 * <li>Keep refresh API communication separate from normal authenticated
 * requests.</li>
 * </ul>
 *
 * <h3>Non-Responsibilities</h3>
 * <ul>
 * <li>Persisting tokens.</li>
 * <li>Updating AuthenticationContext.</li>
 * <li>Reading browser storage.</li>
 * <li>Detecting expired access tokens.</li>
 * <li>Retrying failed API requests.</li>
 * <li>Handling concurrent refresh requests.</li>
 * <li>Navigation.</li>
 * <li>Role or permission resolution.</li>
 * </ul>
 *
 * <h3>Backend Contract</h3>
 *
 * <p>
 * The backend refresh operation accepts a refresh-token request and returns a
 * new {@code TokenResponse}. The backend performs refresh-token rotation and
 * keeps the authentication {@code loginSessionId} associated with the login
 * session.
 * </p>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

import axios from "axios";

import { API } from "../../../global/constants/ApiConstants";

/**
 * Dedicated Axios instance for authentication-token lifecycle operations.
 *
 * <p>
 * This instance intentionally does not use the application's authenticated
 * request interceptors.
 * </p>
 */
const authenticationTokenClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Authentication token lifecycle service.
 */
const AuthenticationTokenService = Object.freeze({
  /**
   * Refreshes the current authentication token pair.
   *
   * <p>
   * The supplied refresh token is sent directly to the backend refresh
   * endpoint. The backend is responsible for validating the refresh token,
   * checking session revocation and performing refresh-token rotation.
   * </p>
   *
   * <p>
   * No browser storage is accessed by this method. Persistence of the newly
   * issued token pair belongs to the authentication-session boundary.
   * </p>
   *
   * @param {string} refreshToken current refresh token
   * @returns {Promise<Object>} backend TokenResponse
   * @throws {Error} when the refresh operation fails
   */
  refresh: async (refreshToken) => {
    if (!refreshToken || typeof refreshToken !== "string") {
      throw new TypeError("Refresh token must be a non-empty string.");
    }

    const response = await authenticationTokenClient.post(
      API.AUTHENTICATION.REFRESH_TOKEN,
      {
        refreshToken,
      },
    );

    return response.data;
  },
});

export default AuthenticationTokenService;
