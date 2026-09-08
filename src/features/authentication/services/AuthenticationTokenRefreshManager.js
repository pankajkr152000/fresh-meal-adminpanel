/**
 * ============================================================================
 * Service : AuthenticationTokenRefreshManager
 * ============================================================================
 *
 * <p>
 * Coordinates authentication-token refresh operations for the FreshMeal
 * frontend.
 * </p>
 *
 * <p>
 * The refresh manager provides a <b>single-flight refresh mechanism</b> so
 * multiple API requests that receive an HTTP {@code 401 Unauthorized}
 * response do not independently attempt to refresh the same authentication
 * session.
 * </p>
 *
 * <h3>Single-Flight Refresh Flow</h3>
 *
 * <pre>
 * Request A ──┐
 *             |
 * Request B ──┼──> HTTP 401
 *             |
 * Request C ──┘
 *                 |
 *                 v
 *       AuthenticationTokenRefreshManager
 *                 |
 *                 v
 *          Existing refresh?
 *            /          \
 *          yes           no
 *           |             |
 *           v             v
 *    Reuse Promise    Start refresh
 *                         |
 *                         v
 *                AuthenticationTokenService
 *                         |
 *                         v
 *                Save new session
 * </pre>
 *
 * <h3>Session Termination Flow</h3>
 *
 * <pre>
 * Refresh failure
 *       |
 *       v
 * AuthenticationSessionStorage.clear()
 *       |
 *       v
 * AuthenticationSessionEvents.publishTermination()
 *       |
 *       +----------------------------+
 *       |                            |
 *       v                            v
 * AuthenticationContext          API request
 *       |                         receives failure
 *       v
 * setSession(null)
 *       |
 *       v
 * ProtectedRoute
 *       |
 *       v
 * Login
 * </pre>
 *
 * <p>
 * The manager deliberately remains independent of React. It does not access
 * React context, perform navigation, or manipulate route state.
 * </p>
 *
 * <h3>Responsibilities</h3>
 * <ul>
 * <li>Coordinate authentication-token refresh operations.</li>
 * <li>Prevent concurrent refresh requests for the same authentication session.</li>
 * <li>Read the latest persisted authentication session before refreshing.</li>
 * <li>Persist the newly issued authentication session.</li>
 * <li>Preserve the user's existing Remember Me preference.</li>
 * <li>Terminate the persisted session when refresh cannot be completed.</li>
 * <li>Publish a session-termination event after clearing the session.</li>
 * </ul>
 *
 * <h3>Non-Responsibilities</h3>
 * <ul>
 * <li>Making normal application API requests.</li>
 * <li>Attaching access tokens to API requests.</li>
 * <li>Managing React state.</li>
 * <li>Performing navigation.</li>
 * <li>Determining user roles.</li>
 * <li>Determining user permissions.</li>
 * </ul>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

import AuthenticationSessionEvents from "./AuthenticationSessionEvents";
import AuthenticationSessionStorage from "./AuthenticationSessionStorage";
import AuthenticationTokenService from "./AuthenticationTokenService";

/**
 * Stores the currently running refresh operation.
 *
 * <p>
 * A module-level promise is intentionally used so all callers within the
 * application share the same refresh operation.
 * </p>
 *
 * @type {Promise<Object>|null}
 */
let refreshPromise = null;

/**
 * Performs the actual authentication-token refresh operation.
 *
 * <p>
 * The latest authentication session is read from
 * {@link AuthenticationSessionStorage} immediately before refreshing. This is
 * important because another operation may have already rotated the refresh
 * token while the current caller was waiting.
 * </p>
 *
 * <p>
 * When the refresh operation succeeds, the newly issued authentication session
 * replaces the previous session while preserving the existing persistence
 * preference.
 * </p>
 *
 * <p>
 * When the refresh operation fails, the persisted authentication session is
 * cleared and a session-termination event is published. The event allows
 * {@code AuthenticationContext} to synchronize its in-memory React state
 * without introducing a dependency from infrastructure services into React.
 * </p>
 *
 * @returns {Promise<Object>} refreshed authentication session
 * @throws {Error} when no refresh token exists or the refresh operation fails
 */
const executeRefresh = async () => {
  const currentSession = AuthenticationSessionStorage.get();

  if (!currentSession?.refreshToken) {
    AuthenticationSessionStorage.clear();
    AuthenticationSessionEvents.publishTermination();

    throw new Error("No refresh token is available.");
  }

  try {
    const refreshResponse = await AuthenticationTokenService.refresh(
      currentSession.refreshToken,
    );

    const authenticationSession = refreshResponse?.token ?? refreshResponse;

    if (
      !authenticationSession?.accessToken ||
      !authenticationSession?.refreshToken ||
      !authenticationSession?.loginSessionId
    ) {
      throw new Error(
        "Authentication refresh response does not contain a valid session.",
      );
    }

    const rememberMe = AuthenticationSessionStorage.isRemembered();

    AuthenticationSessionStorage.save(authenticationSession, rememberMe);

    return authenticationSession;
  } catch (error) {
    AuthenticationSessionStorage.clear();
    AuthenticationSessionEvents.publishTermination();

    throw error;
  }
};

/**
 * Authentication token refresh manager.
 *
 * <p>
 * All callers use the same refresh promise while a refresh operation is in
 * progress. This prevents refresh-token rotation races where multiple
 * requests attempt to use the same refresh token simultaneously.
 * </p>
 */
const AuthenticationTokenRefreshManager = Object.freeze({
  /**
   * Refreshes the current authentication session.
   *
   * <p>
   * If another refresh operation is already running, the existing promise is
   * returned instead of starting another refresh request.
   * </p>
   *
   * <p>
   * Once the refresh operation completes, the shared promise is released so
   * that a future authentication failure can initiate another refresh cycle.
   * </p>
   *
   * @returns {Promise<Object>} refreshed authentication session
   */
  refresh: () => {
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = executeRefresh().finally(() => {
      refreshPromise = null;
    });

    return refreshPromise;
  },

  /**
   * Indicates whether a token refresh operation is currently in progress.
   *
   * @returns {boolean} {@code true} when a refresh operation is running
   */
  isRefreshing: () => Boolean(refreshPromise),
});

export default AuthenticationTokenRefreshManager;
