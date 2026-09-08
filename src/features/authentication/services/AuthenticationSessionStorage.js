/**
 * ============================================================================
 * Service : AuthenticationSessionStorage
 * ============================================================================
 *
 * <p>
 * Provides the browser-side persistence boundary for the FreshMeal
 * authentication session.
 * </p>
 *
 * <p>
 * This service isolates all browser-storage concerns from the remaining
 * Authentication feature. Components, hooks, contexts and API clients must
 * not directly access {@code localStorage} or {@code sessionStorage} for
 * authentication state.
 * </p>
 *
 * <h3>Authentication Session</h3>
 *
 * <p>
 * The persisted session represents the token contract returned by the
 * FreshMeal backend:
 * </p>
 *
 * <pre>
 * AuthenticationSession
 *      |
 *      +-- accessToken
 *      +-- refreshToken
 *      +-- tokenType
 *      +-- expiresIn
 *      +-- loginSessionId
 * </pre>
 *
 * <h3>Remember Me</h3>
 *
 * <p>
 * When <b>Remember Me</b> is disabled, the session is stored in
 * {@code sessionStorage}. When it is enabled, the session is stored in
 * {@code localStorage}.
 * </p>
 *
 * <p>
 * The storage implementation is intentionally hidden behind this service.
 * Consumers therefore do not need to know whether the authentication session
 * is persisted through browser storage, cookies or another mechanism.
 * </p>
 *
 * <h3>Future Security Migration</h3>
 *
 * <p>
 * The current backend login contract returns the access token and refresh token
 * in the response body. Therefore, browser-side persistence is currently
 * required for session restoration.
 * </p>
 *
 * <p>
 * This service is deliberately designed as an abstraction boundary so that a
 * future backend implementation can move refresh-token persistence to an
 * {@code HttpOnly}, {@code Secure}, {@code SameSite}-appropriate cookie without
 * requiring changes to authentication UI or application components.
 * </p>
 *
 * <h3>Responsibilities</h3>
 * <ul>
 * <li>Persist an authentication session.</li>
 * <li>Retrieve the persisted authentication session.</li>
 * <li>Determine whether a persisted session exists.</li>
 * <li>Determine the persistence mechanism of the current session.</li>
 * <li>Remove the persisted authentication session.</li>
 * <li>Hide browser-storage implementation details.</li>
 * </ul>
 *
 * <h3>Non-Responsibilities</h3>
 * <ul>
 * <li>JWT validation.</li>
 * <li>JWT decoding.</li>
 * <li>Token refresh.</li>
 * <li>API communication.</li>
 * <li>Navigation.</li>
 * <li>Role resolution.</li>
 * <li>Permission resolution.</li>
 * <li>Authentication UI state.</li>
 * </ul>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

/**
 * Internal storage key.
 *
 * <p>
 * This value is intentionally private to this service. No consumer should
 * depend on the physical browser-storage key.
 * </p>
 */
const AUTHENTICATION_SESSION_KEY = "freshmeal.authentication.session";

/**
 * Indicates that the authentication session belongs to the current browser
 * tab/session.
 */
const SESSION_STORAGE = "session";

/**
 * Indicates that the authentication session should survive browser restart.
 */
const LOCAL_STORAGE = "local";

/**
 * Returns the browser storage implementation for the supplied persistence
 * type.
 *
 * @param {"session"|"local"} storageType persistence type
 * @returns {Storage} browser storage implementation
 */
const getStorage = (storageType) => {
  return storageType === LOCAL_STORAGE
    ? window.localStorage
    : window.sessionStorage;
};

/**
 * Removes the authentication session from every supported browser-storage
 * location.
 *
 * <p>
 * Clearing both locations prevents an older session from surviving when the
 * user changes the Remember Me preference or when authentication is explicitly
 * terminated.
 * </p>
 *
 * @private
 * @returns {void}
 */
const removeFromAllStorage = () => {
  window.localStorage.removeItem(AUTHENTICATION_SESSION_KEY);
  window.sessionStorage.removeItem(AUTHENTICATION_SESSION_KEY);
};

const AuthenticationSessionStorage = Object.freeze({
  /**
   * Persists an authentication session.
   *
   * <p>
   * The complete authentication session is stored as one atomic object.
   * Individual token fields are therefore not persisted independently.
   * </p>
   *
   * @param {Object} session authentication session
   * @param {string} session.accessToken access token
   * @param {string} session.refreshToken refresh token
   * @param {string} session.tokenType token type, normally Bearer
   * @param {number} session.expiresIn access-token lifetime in seconds
   * @param {string} session.loginSessionId backend authentication-session ID
   * @param {boolean} rememberMe whether the session should survive browser restart
   * @returns {void}
   * @throws {TypeError} when the supplied session is invalid
   */
  save: (session, rememberMe = false) => {
    if (!session || typeof session !== "object") {
      throw new TypeError("Authentication session must be a valid object.");
    }

    if (!session.accessToken || !session.refreshToken) {
      throw new TypeError(
        "Authentication session must contain access and refresh tokens.",
      );
    }

    if (!session.loginSessionId) {
      throw new TypeError(
        "Authentication session must contain a login session ID.",
      );
    }

    const persistedSession = {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      tokenType: session.tokenType || "Bearer",
      expiresIn: session.expiresIn,
      loginSessionId: session.loginSessionId,
    };

    /*
     * Authentication must have exactly one persisted browser session.
     */
    removeFromAllStorage();

    getStorage(rememberMe ? LOCAL_STORAGE : SESSION_STORAGE).setItem(
      AUTHENTICATION_SESSION_KEY,
      JSON.stringify(persistedSession),
    );
  },

  /**
   * Retrieves the currently persisted authentication session.
   *
   * <p>
   * Session storage is preferred because it represents the current browser-tab
   * session. Local storage is used as the fallback for Remember Me sessions.
   * </p>
   *
   * <p>
   * Corrupted persisted data is treated as an invalid authentication session
   * rather than allowing malformed state to propagate into the application.
   * </p>
   *
   * @returns {Object|null} persisted authentication session
   */
  get: () => {
    const sessionValue =
      window.sessionStorage.getItem(AUTHENTICATION_SESSION_KEY) ||
      window.localStorage.getItem(AUTHENTICATION_SESSION_KEY);

    if (!sessionValue) {
      return null;
    }

    try {
      const session = JSON.parse(sessionValue);

      if (
        !session ||
        typeof session !== "object" ||
        !session.accessToken ||
        !session.refreshToken ||
        !session.loginSessionId
      ) {
        removeFromAllStorage();

        return null;
      }

      return session;
    } catch (error) {
      /*
       * Invalid JSON must never prevent application startup.
       */
      removeFromAllStorage();

      return null;
    }
  },

  /**
   * Determines whether a persisted authentication session exists.
   *
   * @returns {boolean} true when a persisted session exists
   */
  exists: () => {
    return (
      window.sessionStorage.getItem(AUTHENTICATION_SESSION_KEY) !== null ||
      window.localStorage.getItem(AUTHENTICATION_SESSION_KEY) !== null
    );
  },

  /**
   * Determines how the current authentication session is persisted.
   *
   * <p>
   * This keeps persistence-location knowledge inside the storage abstraction.
   * Consumers such as AuthenticationContext therefore never need to inspect
   * browser storage directly.
   * </p>
   *
   * @returns {"session"|"local"|null} current persistence type
   */
  getPersistenceType: () => {
    if (window.sessionStorage.getItem(AUTHENTICATION_SESSION_KEY) !== null) {
      return SESSION_STORAGE;
    }

    if (window.localStorage.getItem(AUTHENTICATION_SESSION_KEY) !== null) {
      return LOCAL_STORAGE;
    }

    return null;
  },

  /**
   * Determines whether the current session is configured as a Remember Me
   * session.
   *
   * @returns {boolean} true when the session is persisted in local storage
   */
  isRemembered: () => {
    return AuthenticationSessionStorage.getPersistenceType() === LOCAL_STORAGE;
  },

  /**
   * Removes the persisted authentication session.
   *
   * <p>
   * Both supported storage locations are cleared to guarantee that no stale
   * authentication session remains in the browser.
   * </p>
   *
   * @returns {void}
   */
  clear: () => {
    removeFromAllStorage();
  },
});

export default AuthenticationSessionStorage;
