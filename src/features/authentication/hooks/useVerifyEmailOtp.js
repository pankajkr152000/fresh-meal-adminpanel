import { useCallback, useRef, useState } from "react";

import AuthenticationService from "../services/AuthenticationService";
import { getAuthenticationErrorMessage } from "../utils/AuthenticationErrorUtils";

/**
 * Manages email OTP verification.
 *
 * Responsibilities:
 * - Submit the email OTP verification request.
 * - Maintain verification response, error, and loading state.
 * - Prevent concurrent verification requests.
 * - Delegate API communication to AuthenticationService.
 * - Delegate error-message resolution to AuthenticationErrorUtils.
 *
 * This hook does not:
 * - Authenticate the user.
 * - Store authentication tokens.
 * - Update authentication context.
 * - Perform navigation.
 *
 * @returns {{
 *   verifyEmailOtp: Function,
 *   response: Object|null,
 *   error: string|null,
 *   isLoading: boolean,
 *   reset: Function
 * }}
 */
const useVerifyEmailOtp = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Protects against concurrent requests before React state updates.
  const isRequestInProgress = useRef(false);

  /**
   * Verifies the OTP submitted for an email address.
   *
   * @param {{ email: Object, otp: string }} verificationRequest
   * @returns {Promise<Object>}
   */
  const verifyEmailOtp = useCallback(async (verificationRequest) => {
    if (isRequestInProgress.current) {
      return null;
    }

    isRequestInProgress.current = true;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const verificationResponse =
        await AuthenticationService.verifyEmailOtp(verificationRequest);

      setResponse(verificationResponse);

      return verificationResponse;
    } catch (verificationError) {
      setError(getAuthenticationErrorMessage(verificationError));

      throw verificationError;
    } finally {
      isRequestInProgress.current = false;
      setIsLoading(false);
    }
  }, []);

  /**
   * Resets the verification response and error state.
   */
  const reset = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);

  return {
    verifyEmailOtp,
    response,
    error,
    isLoading,
    reset,
  };
};

export default useVerifyEmailOtp;
