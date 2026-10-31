import { useCallback, useState } from "react";
import AuthenticationService from "../services/AuthenticationService";
import { getAuthenticationErrorMessage } from "../utils/AuthenticationErrorUtils";

/**
 * ============================================================================
 * Hook : useRegister
 * ============================================================================
 *
 * Provides the React hook responsible for orchestrating the FreshMeal
 * registration workflow.
 *
 * Registration initiates email verification but does not establish an
 * authenticated session.
 *
 * ============================================================================
 */

const useRegister = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Registers a new FreshMeal user.
   *
   * @param {Object} registrationRequest registration request payload.
   * @returns {Promise<Object>} registration response.
   */
  const register = useCallback(async (registrationRequest) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const registrationResponse =
        await AuthenticationService.register(registrationRequest);

      setResponse(registrationResponse);

      return registrationResponse;
    } catch (registrationError) {
      setError(getAuthenticationErrorMessage(registrationError));

      throw registrationError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Resets registration hook state.
   */
  const reset = useCallback(() => {
    setResponse(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    register,
    response,
    error,
    isLoading,
    reset,
  };
};

export default useRegister;
