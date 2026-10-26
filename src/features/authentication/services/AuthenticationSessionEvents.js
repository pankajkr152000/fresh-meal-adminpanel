/**
 * ============================================================================
 * Service : AuthenticationSessionEvents
 * ============================================================================
 *
 * <p>
 * Provides a lightweight event boundary for authentication-session lifecycle
 * changes within the FreshMeal frontend.
 * </p>
 *
 * <p>
 * This service decouples infrastructure code such as the centralized API
 * client from React-specific authentication state. Infrastructure can publish
 * a session-termination event without importing
 * {@code AuthenticationContext}, while the authentication context can
 * subscribe and synchronize its in-memory state.
 * </p>
 *
 * <h3>Session Termination Flow</h3>
 *
 * <pre>
 * apiClient
 *     |
 *     v
 * Refresh fails
 *     |
 *     v
 * AuthenticationSessionStorage.clear()
 *     |
 *     v
 * AuthenticationSessionEvents
 *     |
 *     v
 * AuthenticationContext
 *     |
 *     v
 * session = null
 *     |
 *     v
 * ProtectedRoute
 *     |
 *     v
 * Login
 * </pre>
 *
 * <h3>Why an Event Boundary?</h3>
 *
 * <p>
 * {@code apiClient} is infrastructure code and must not depend on React
 * context. Importing a React authentication context into the HTTP client would
 * create an undesirable dependency direction and could introduce circular
 * dependencies.
 * </p>
 *
 * <p>
 * This event boundary allows both layers to communicate without either layer
 * owning the other.
 * </p>
 *
 * <h3>Responsibilities</h3>
 * <ul>
 * <li>Publish authentication-session lifecycle events.</li>
 * <li>Allow consumers to subscribe to session termination.</li>
 * <li>Allow consumers to unsubscribe safely.</li>
 * <li>Keep the communication mechanism independent of React.</li>
 * </ul>
 *
 * <h3>Non-Responsibilities</h3>
 * <ul>
 * <li>Persisting authentication tokens.</li>
 * <li>Clearing authentication storage.</li>
 * <li>Refreshing tokens.</li>
 * <li>Making HTTP requests.</li>
 * <li>Updating React state directly.</li>
 * <li>Navigation.</li>
 * <li>Role resolution.</li>
 * <li>Permission resolution.</li>
 * </ul>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

/**
 * Event name representing termination of the current authentication session.
 *
 * <p>
 * The event does not carry tokens or sensitive authentication information.
 * Consumers only need to know that the current authentication state is no
 * longer valid.
 * </p>
 */
const AUTHENTICATION_SESSION_TERMINATED = "authentication-session-terminated";

/**
 * Framework-independent event target used for authentication lifecycle
 * communication.
 *
 * <p>
 * {@link EventTarget} is used instead of React state so infrastructure services
 * can publish lifecycle events without depending on the component tree.
 * </p>
 */
const authenticationSessionEventTarget = new EventTarget();

/**
 * Authentication session event boundary.
 */
const AuthenticationSessionEvents = Object.freeze({
  /**
   * Publishes an authentication-session termination event.
   *
   * <p>
   * This method does not clear browser storage. The caller remains responsible
   * for completing the operation that caused termination.
   * </p>
   *
   * @returns {void}
   */
  publishTermination: () => {
    authenticationSessionEventTarget.dispatchEvent(
      new Event(AUTHENTICATION_SESSION_TERMINATED),
    );
  },

  /**
   * Subscribes to authentication-session termination events.
   *
   * <p>
   * The returned cleanup function should be invoked when the consumer no
   * longer needs the subscription.
   * </p>
   *
   * @param {Function} listener callback invoked when the session terminates
   * @returns {Function} unsubscribe function
   */
  onTermination: (listener) => {
    if (typeof listener !== "function") {
      throw new TypeError(
        "Authentication session termination listener must be a function.",
      );
    }

    authenticationSessionEventTarget.addEventListener(
      AUTHENTICATION_SESSION_TERMINATED,
      listener,
    );

    return () => {
      authenticationSessionEventTarget.removeEventListener(
        AUTHENTICATION_SESSION_TERMINATED,
        listener,
      );
    };
  },
});

export default AuthenticationSessionEvents;
