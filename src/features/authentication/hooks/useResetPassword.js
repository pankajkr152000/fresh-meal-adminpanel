/* ============================================================================
 * FreshMeal - Authentication
 * ============================================================================
 *
 * Hook: useResetPassword
 *
 * Purpose:
 * Manages the password-reset request lifecycle.
 *
 * Responsibilities:
 * - Delegate password reset to AuthenticationService.
 * - Manage API response, error, and loading states.
 * - Prevent duplicate concurrent submissions.
 * - Expose a reset function to clear hook state.
 *
 * Architecture:
 *
 * ResetPassword.jsx
 *        |
 *        v
 * useResetPassword()
 *        |
 *        v
 * AuthenticationService
 *        |
 *        v
 * apiClient
 *
 * ============================================================================
 */

import { useCallback, useRef, useState } from "react";

import AuthenticationService from "../services/AuthenticationService";
import { getAuthenticationErrorMessage } from "../utils/AuthenticationErrorUtils";

const useResetPassword = () => {
  // ==========================================================================
  // State
  // ==========================================================================

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Prevents duplicate concurrent password-reset requests.
  const isRequestInProgress = useRef(false);

  // ==========================================================================
  // Password Reset
  // ==========================================================================

  /**
   * Submits a password-reset request.
   *
   * The request object is passed unchanged to AuthenticationService.
   * Its structure must match the backend ResetPasswordInputDTO contract.
   *
   * @param {Object} resetPasswordRequest Password-reset request.
   * @returns {Promise<Object|null>} API response, or null if a request
   *                                 is already in progress.
   */
  const resetPassword = useCallback(async (resetPasswordRequest) => {
    if (isRequestInProgress.current) {
      return null;
    }

    isRequestInProgress.current = true;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const resetPasswordResponse =
        await AuthenticationService.resetPassword(resetPasswordRequest);

      setResponse(resetPasswordResponse);

      return resetPasswordResponse;
    } catch (resetPasswordError) {
      setError(getAuthenticationErrorMessage(resetPasswordError));

      throw resetPasswordError;
    } finally {
      isRequestInProgress.current = false;
      setIsLoading(false);
    }
  }, []);

  // ==========================================================================
  // State Reset
  // ==========================================================================

  /**
   * Clears the hook's response and error state.
   */
  const reset = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);

  // ==========================================================================
  // Return
  // ==========================================================================

  return {
    resetPassword,
    response,
    error,
    isLoading,
    reset,
  };
};

export default useResetPassword;
