import { useCallback, useRef, useState } from "react";

import AuthenticationService from "../services/AuthenticationService";
import { getAuthenticationErrorMessage } from "../utils/AuthenticationErrorUtils";

/**
 * Manages email OTP resend requests.
 *
 * Responsibilities:
 * - Submit an OTP resend request for an email address.
 * - Maintain the resend response, error, and loading state.
 * - Prevent concurrent resend requests.
 * - Delegate API communication to AuthenticationService.
 * - Delegate error-message resolution to AuthenticationErrorUtils.
 *
 * This hook does not:
 * - Generate or manage OTP expiration.
 * - Manage the resend cooldown timer.
 * - Verify an OTP.
 * - Authenticate the user or store authentication tokens.
 * - Perform navigation.
 *
 * @returns {{
 *   resendEmailOtp: Function,
 *   response: Object|null,
 *   error: string|null,
 *   isLoading: boolean,
 *   reset: Function
 * }}
 */
const useResendEmailOtp = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Prevents duplicate requests before React state updates.
  const isRequestInProgress = useRef(false);

  /**
   * Requests a new verification OTP for the supplied email address.
   *
   * @param {{ email: Object }} resendRequest
   * @returns {Promise<Object>}
   */
  const resendEmailOtp = useCallback(async (resendRequest) => {
    if (isRequestInProgress.current) {
      return null;
    }

    isRequestInProgress.current = true;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const resendResponse =
        await AuthenticationService.resendEmailOtp(resendRequest);

      setResponse(resendResponse);

      return resendResponse;
    } catch (resendError) {
      setError(getAuthenticationErrorMessage(resendError));

      throw resendError;
    } finally {
      isRequestInProgress.current = false;
      setIsLoading(false);
    }
  }, []);

  /**
   * Resets the resend response and error state.
   */
  const reset = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);

  return {
    resendEmailOtp,
    response,
    error,
    isLoading,
    reset,
  };
};

export default useResendEmailOtp;
