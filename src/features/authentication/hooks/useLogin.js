/**
 * ============================================================================
 * Hook : useLogin
 * ============================================================================
 *
 * <p>
 * Provides the React hook responsible for orchestrating the FreshMeal login
 * workflow.
 * </p>
 *
 * <p>
 * The hook coordinates the authentication service with the application
 * authentication context. It does not perform HTTP communication directly,
 * persist tokens directly, navigate between routes, or resolve user roles.
 * </p>
 *
 * <h3>Login Flow</h3>
 *
 * <pre>
 * Login.jsx
 *     |
 *     v
 * useLogin.login()
 *     |
 *     v
 * AuthenticationService.login()
 *     |
 *     v
 * Backend /api/auth/login
 *     |
 *     v
 * LoginResponse
 *     |
 *     v
 * response.token
 *     |
 *     v
 * AuthenticationContext.authenticate()
 *     |
 *     v
 * AuthenticationSessionStorage
 * </pre>
 *
 * <h3>Responsibilities</h3>
 * <ul>
 * <li>Call the AuthenticationService login operation.</li>
 * <li>Pass login credentials to the authentication service.</li>
 * <li>Store the successful login response in hook state.</li>
 * <li>Establish the authenticated frontend session after successful login.</li>
 * <li>Pass the Remember Me decision to the authentication boundary.</li>
 * <li>Translate known authentication errors into safe UI messages.</li>
 * <li>Expose loading, response and error state to the login page.</li>
 * </ul>
 *
 * <h3>Non-Responsibilities</h3>
 * <ul>
 * <li>Direct Axios/API communication.</li>
 * <li>Browser storage access.</li>
 * <li>JWT decoding.</li>
 * <li>JWT validation.</li>
 * <li>Token refresh.</li>
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

import { useCallback, useState } from "react";

import { useAuthentication } from "../context/AuthenticationContext";
import AuthenticationService from "../services/AuthenticationService";
import { getAuthenticationErrorMessage } from "../utils/AuthenticationErrorUtils";

/**
 * React hook for the FreshMeal login workflow.
 *
 * @returns {Object} login workflow state and operations
 */
const useLogin = () => {
  /**
   * Indicates whether the login operation is currently executing.
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Stores the successful backend login response.
   */
  const [response, setResponse] = useState(null);

  /**
   * Stores the safe authentication error message intended for the UI.
   */
  const [error, setError] = useState(null);

  /**
   * Authentication context operation used to establish the application
   * authentication session.
   */
  const { authenticate } = useAuthentication();

  /**
   * Executes the FreshMeal login workflow.
   *
   * <p>
   * The authentication service remains responsible for communicating with the
   * backend. Once authentication succeeds, the token response is handed to the
   * authentication context, which owns runtime authentication state and
   * delegates persistence to the session-storage abstraction.
   * </p>
   *
   * <p>
   * The {@code rememberMe} flag originates from the Login page because it is a
   * user-interface preference. The hook passes that preference to the
   * authentication boundary without implementing storage behavior itself.
   * </p>
   *
   * @param {Object} credentials login credentials
   * @param {string} credentials.identifier username or email
   * @param {string} credentials.password password
   * @param {boolean} credentials.rememberMe whether the session should survive
   *        browser restart
   * @returns {Promise<Object>} backend login response
   * @throws {Error} original authentication error from the service
   */
  const login = useCallback(
    async ({ identifier, password, rememberMe = false }) => {
      setIsLoading(true);
      setError(null);

      try {
        const loginResponse = await AuthenticationService.login({
          identifier,
          password,
        });

        /*
         * The backend response contract contains the authentication session
         * under the "token" property:
         *
         * {
         *   "token": {
         *     "accessToken": "...",
         *     "refreshToken": "...",
         *     "tokenType": "Bearer",
         *     "expiresIn": 3600,
         *     "loginSessionId": "..."
         *   }
         * }
         *
         * The hook deliberately does not reconstruct or modify this session.
         */
        const authenticationSession = loginResponse?.token;

        /*
         * A successful HTTP response without a usable token payload must not
         * establish an authenticated frontend state.
         */
        if (!authenticationSession) {
          throw new Error(
            "Authentication response did not contain a valid token session.",
          );
        }

        /*
         * Establish runtime authentication state and persist the session
         * according to the user's Remember Me preference.
         */
        authenticate(authenticationSession, rememberMe);

        setResponse(loginResponse);

        return loginResponse;
      } catch (loginError) {
        /*
         * Convert the backend authentication error into a safe message for
         * presentation while preserving the original error for callers.
         *
         * AuthenticationErrorUtils is the frontend mapping boundary for the
         * backend AuthenticationErrorConstants contract.
         */
        const authenticationErrorMessage =
          getAuthenticationErrorMessage(loginError);

        setError(authenticationErrorMessage);

        /*
         * Login.jsx may use the original error for logging or future workflow
         * handling. The hook therefore does not replace the original error.
         */
        throw loginError;
      } finally {
        setIsLoading(false);
      }
    },
    [authenticate],
  );

  /**
   * Resets the hook's transient login state.
   *
   * <p>
   * This does not terminate an already authenticated session. Session
   * termination belongs to {@code unauthenticate()} in the authentication
   * context and the future logout workflow.
   * </p>
   *
   * @returns {void}
   */
  const reset = useCallback(() => {
    setIsLoading(false);
    setResponse(null);
    setError(null);
  }, []);

  return {
    isLoading,
    response,
    error,
    login,
    reset,
  };
};

export default useLogin;
