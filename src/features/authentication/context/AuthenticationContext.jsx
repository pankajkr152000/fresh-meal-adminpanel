/**
 * ============================================================================
 * Context : AuthenticationContext
 * ============================================================================
 *
 * <p>
 * Provides the runtime authentication state and authentication-session
 * operations for the FreshMeal frontend.
 * </p>
 *
 * <p>
 * The context is responsible for maintaining authentication state inside the
 * React component tree. Persistent authentication-session storage is delegated
 * to {@code AuthenticationSessionStorage}, while session lifecycle events from
 * infrastructure services are received through
 * {@code AuthenticationSessionEvents}.
 * </p>
 *
 * <h3>Authentication State Flow</h3>
 *
 * <pre>
 * AuthenticationSessionStorage
 *             |
 *             v
 * AuthenticationContext
 *             |
 *             +--------------------+
 *             |                    |
 *             v                    v
 *      React components      ProtectedRoute
 *                                  |
 *                                  v
 *                               Login
 * </pre>
 *
 * <h3>Session Termination Synchronization</h3>
 *
 * <pre>
 * Infrastructure
 *      |
 *      v
 * Refresh failure
 *      |
 *      v
 * AuthenticationSessionStorage.clear()
 *      |
 *      v
 * AuthenticationSessionEvents.publishTermination()
 *      |
 *      v
 * AuthenticationContext
 *      |
 *      v
 * setSession(null)
 *      |
 *      v
 * ProtectedRoute
 *      |
 *      v
 * Login
 * </pre>
 *
 * <p>
 * This separation ensures that infrastructure services such as the centralized
 * API client do not need to import or manipulate React context directly.
 * </p>
 *
 * <h3>Responsibilities</h3>
 * <ul>
 * <li>Maintain the current authentication session in React state.</li>
 * <li>Restore the persisted session during application startup.</li>
 * <li>Persist newly authenticated sessions through the storage service.</li>
 * <li>Update the current session after token refresh.</li>
 * <li>Clear the runtime authentication state during unauthentication.</li>
 * <li>Synchronize runtime state when infrastructure terminates a session.</li>
 * <li>Expose authentication state and operations through React context.</li>
 * </ul>
 *
 * <h3>Non-Responsibilities</h3>
 * <ul>
 * <li>Making authentication API requests.</li>
 * <li>Refreshing authentication tokens.</li>
 * <li>Attaching tokens to HTTP requests.</li>
 * <li>Managing browser storage directly.</li>
 * <li>Determining user roles.</li>
 * <li>Determining user permissions.</li>
 * <li>Performing application navigation.</li>
 * </ul>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import AuthenticationSessionEvents from "../services/AuthenticationSessionEvents";
import AuthenticationSessionStorage from "../services/AuthenticationSessionStorage";

/**
 * React context containing the current FreshMeal authentication state.
 *
 * <p>
 * The context is intentionally initialized with {@code undefined} so that
 * {@link useAuthentication} can detect consumers rendered outside the
 * {@link AuthenticationProvider}.
 * </p>
 */
const AuthenticationContext = createContext(undefined);

/**
 * Provides authentication state and authentication-session operations to the
 * FreshMeal application.
 *
 * <p>
 * The provider restores any existing authentication session during application
 * startup and maintains the restored session in React memory.
 * </p>
 *
 * <p>
 * The provider also subscribes to
 * {@link AuthenticationSessionEvents}. When an infrastructure service
 * terminates the authentication session, the provider synchronizes its
 * in-memory state by setting the session to {@code null}.
 * </p>
 *
 * @param {Object} props component properties
 * @param {import("react").ReactNode} props.children child components
 * @returns {JSX.Element} authentication context provider
 */
export const AuthenticationProvider = ({ children }) => {
  /**
   * Current authentication session held in React memory.
   *
   * <p>
   * The session contains the access token, refresh token, token type,
   * expiration information, and login session identifier.
   * </p>
   */
  const [session, setSession] = useState(null);

  /**
   * Indicates whether the initial authentication-session restoration is still
   * in progress.
   */
  const [isInitializing, setIsInitializing] = useState(true);

  /**
   * Restores the persisted authentication session when the provider is mounted.
   *
   * <p>
   * Storage access remains encapsulated by
   * {@link AuthenticationSessionStorage}; the context only receives the
   * resulting session and places it into React state.
   * </p>
   */
  useEffect(() => {
    const authenticationSession = AuthenticationSessionStorage.get();

    setSession(authenticationSession);
    setIsInitializing(false);
  }, []);

  /**
   * Subscribes to authentication-session termination events.
   *
   * <p>
   * Infrastructure services can terminate a session when authentication
   * becomes invalid, for example when a refresh-token operation fails.
   * </p>
   *
   * <p>
   * The event listener only updates the runtime React state. It does not clear
   * browser storage because storage ownership belongs to the service that
   * performs the persistence operation.
   * </p>
   */
  useEffect(() => {
    const unsubscribe = AuthenticationSessionEvents.onTermination(() => {
      setSession(null);
    });

    return unsubscribe;
  }, []);

  /**
   * Stores a newly authenticated session and updates the runtime state.
   *
   * <p>
   * The callback is memoized so its reference remains stable between provider
   * renders.
   * </p>
   *
   * @param {Object} authenticationSession authenticated session returned by
   * the authentication service
   * @param {boolean} rememberMe whether the session should persist beyond the
   * current browser session
   * @returns {void}
   */
  const authenticate = useCallback(
    (authenticationSession, rememberMe = false) => {
      AuthenticationSessionStorage.save(authenticationSession, rememberMe);

      setSession(authenticationSession);
    },
    [],
  );

  /**
   * Updates the current authentication session after an authentication-session
   * change such as token refresh.
   *
   * <p>
   * The existing persistence preference is preserved so that refreshing a
   * token does not unexpectedly change a user's Remember Me selection.
   * </p>
   *
   * <p>
   * The callback is memoized so its reference remains stable between provider
   * renders.
   * </p>
   *
   * @param {Object} authenticationSession updated authentication session
   * @returns {void}
   */
  const updateSession = useCallback((authenticationSession) => {
    const rememberMe = AuthenticationSessionStorage.isRemembered();

    AuthenticationSessionStorage.save(authenticationSession, rememberMe);

    setSession(authenticationSession);
  }, []);

  /**
   * Terminates the current authentication session.
   *
   * <p>
   * Both persistent storage and runtime React state are cleared.
   * </p>
   *
   * <p>
   * The callback is memoized so its reference remains stable between provider
   * renders.
   * </p>
   *
   * @returns {void}
   */
  const unauthenticate = useCallback(() => {
    AuthenticationSessionStorage.clear();
    setSession(null);
  }, []);

  /**
   * Indicates whether a valid authentication session currently exists.
   *
   * <p>
   * Both access and refresh tokens are required because the FreshMeal
   * authentication architecture maintains a complete authentication session.
   * </p>
   */
  const isAuthenticated = Boolean(
    session?.accessToken && session?.refreshToken,
  );

  /**
   * Memoized authentication context value.
   *
   * <p>
   * Memoization prevents consumers from receiving a new context value when
   * none of the authentication state, lifecycle state, or authentication
   * actions have changed.
   * </p>
   */
  const contextValue = useMemo(
    () => ({
      session,
      isAuthenticated,
      isInitializing,
      authenticate,
      updateSession,
      unauthenticate,
    }),
    [
      session,
      isAuthenticated,
      isInitializing,
      authenticate,
      updateSession,
      unauthenticate,
    ],
  );

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

/**
 * Provides access to the FreshMeal authentication context.
 *
 * <p>
 * This hook ensures that authentication consumers are rendered within an
 * {@link AuthenticationProvider}.
 * </p>
 *
 * @returns {Object} current authentication context
 * @throws {Error} when used outside {@link AuthenticationProvider}
 */
// This hook is intentionally colocated with the context because it depends on
// the private context instance. The provider remains the only component export.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider.",
    );
  }

  return context;
};
