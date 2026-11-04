import { useCallback, useRef, useState } from "react";

import AuthenticationService from "../services/AuthenticationService";
import { getAuthenticationErrorMessage } from "../utils/AuthenticationErrorUtils";

/**
 * ============================================================================
 * Hook: useForgotPassword
 * ============================================================================
 *
 * Provides the React hook responsible for orchestrating the FreshMeal
 * password-recovery initiation workflow.
 *
 * Responsibilities:
 * - Submit forgot-password requests.
 * - Manage API response, error and loading states.
 * - Prevent concurrent forgot-password requests.
 * - Expose a method to reset the hook's response and error state.
 *
 * Security:
 * - Does not manage authentication tokens.
 * - Does not establish an authenticated session.
 * - Does not generate or persist password-reset tokens.
 * - Password-reset token generation and delivery are handled by the backend.
 *
 * ============================================================================
 */

const useForgotPassword = () => {
  // ==========================================================================
  // State
  // ==========================================================================

  const [response, setResponse] = useState(null);

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  /**
   * Tracks whether a forgot-password request is currently in progress.
   *
   * A ref is used because changing this value should not trigger a render.
   * It also provides immediate protection against duplicate submissions.
   */
  const isRequestInProgress = useRef(false);

  // ==========================================================================
  // Forgot Password
  // ==========================================================================

  /**
   * Initiates the password-recovery process for a FreshMeal account.
   *
   * @param {Object} forgotPasswordRequest Backend forgot-password request.
   * @returns {Promise<Object|null>} Backend response, or null when another
   * request is already in progress.
   * @throws Propagates the original API error to the calling component.
   */
  const forgotPassword = useCallback(async (forgotPasswordRequest) => {
    // Prevent duplicate concurrent requests.
    if (isRequestInProgress.current) {
      return null;
    }

    isRequestInProgress.current = true;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const forgotPasswordResponse = await AuthenticationService.forgotPassword(
        forgotPasswordRequest,
      );

      setResponse(forgotPasswordResponse);

      return forgotPasswordResponse;
    } catch (forgotPasswordError) {
      setError(getAuthenticationErrorMessage(forgotPasswordError));

      throw forgotPasswordError;
    } finally {
      isRequestInProgress.current = false;

      setIsLoading(false);
    }
  }, []);

  // ==========================================================================
  // Reset
  // ==========================================================================

  /**
   * Clears the previous API response and error.
   *
   * Does not modify the loading state or interrupt an active request.
   */
  const reset = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);

  // ==========================================================================
  // Public API
  // ==========================================================================

  return {
    forgotPassword,
    response,
    error,
    isLoading,
    reset,
  };
};

export default useForgotPassword;
