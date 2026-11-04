import apiClient from "../../../api/apiClient";
import { API } from "../../../config/apiEndpoints";
import AuthenticationSessionStorage from "./AuthenticationSessionStorage";

/**
 * ============================================================================
 * FreshMeal
 * ============================================================================
 *
 * Service: AuthenticationService
 *
 * Purpose:
 * Provides the application-level service for communication with FreshMeal's
 * authentication APIs.
 *
 * Responsibilities:
 * - Communicate with authentication endpoints.
 * - Submit authentication requests using the centralized API client.
 * - Return backend authentication responses to the calling authentication
 *   layer.
 *
 * Architecture:
 *
 * Authentication Page
 *        |
 *        v
 * Authentication Hook
 *        |
 *        v
 * AuthenticationService
 *        |
 *        v
 * apiClient
 *        |
 *        v
 * Spring Boot Authentication API
 *
 * Notes:
 * - This service contains no React/UI logic.
 * - This service does not manage JWT/token persistence.
 * - This service does not determine user roles.
 * - This service does not perform navigation.
 * - All HTTP communication uses the centralized apiClient.
 *
 * ============================================================================
 */

const AuthenticationService = {
  // ==========================================================================
  // Login
  // ==========================================================================

  /**
   * Authenticates a FreshMeal user using their username/email and password.
   *
   * @param {Object} credentials Login credentials.
   * @param {string} credentials.identifier Username or email.
   * @param {string} credentials.password User password.
   * @returns {Promise<Object>} Backend login response.
   */
  login: async ({ identifier, password }) => {
    const response = await apiClient.post(API.AUTHENTICATION.LOGIN, {
      identifier,
      password,
    });

    return response.data;
  },

  // ==========================================================================
  // Logout
  // ==========================================================================

  /**
   * Terminates the currently authenticated FreshMeal login session.
   *
   * The access token is automatically attached by the centralized apiClient.
   *
   * @returns {Promise<Object>} Backend logout response.
   */
  logout: async () => {
    const authenticationSession = AuthenticationSessionStorage.get();

    const response = await apiClient.post(API.AUTHENTICATION.LOGOUT, {
      loginSessionId: authenticationSession.loginSessionId,
    });

    return response.data;
  },

  // ==========================================================================
  // Register
  // ==========================================================================

  /**
   * Registers a new FreshMeal user account and initiates email verification.
   *
   * @param {Object} registrationRequest Backend registration request.
   * @returns {Promise<Object>} Backend registration response.
   */
  register: async (registrationRequest) => {
    const response = await apiClient.post(
      API.AUTHENTICATION.REGISTER,
      registrationRequest,
    );

    return response.data;
  },

  // ==========================================================================
  // Verify Email OTP
  // ==========================================================================

  /**
   * Verifies a newly registered user's email address using the OTP received
   * through email.
   *
   * The backend consumes the OTP and activates the user account after
   * successful verification.
   *
   * This operation does not authenticate the user or issue JWT tokens.
   *
   * @param {Object} verificationRequest Email verification request.
   * @param {Object} verificationRequest.email EmailAddress value object.
   * @param {string} verificationRequest.email.value Email address.
   * @param {string} verificationRequest.otp Six-digit verification OTP.
   * @returns {Promise<Object>} Backend email verification response.
   */
  verifyEmailOtp: async ({ email, otp }) => {
    const response = await apiClient.post(API.AUTHENTICATION.VERIFY_EMAIL_OTP, {
      email,
      otp,
    });

    return response.data;
  },

  // ==========================================================================
  // Resend Email OTP
  // ==========================================================================

  /**
   * Requests a new email verification OTP for an account awaiting email
   * verification.
   *
   * OTP resend frequency and maximum resend limits are enforced by the
   * backend authentication business rules.
   *
   * @param {Object} resendRequest Email OTP resend request.
   * @param {Object} resendRequest.email EmailAddress value object.
   * @param {string} resendRequest.email.value Email address.
   * @returns {Promise<Object>} Backend resend response.
   */
  resendEmailOtp: async ({ email }) => {
    const response = await apiClient.post(API.AUTHENTICATION.RESEND_EMAIL_OTP, {
      email,
    });

    return response.data;
  },

  // ==========================================================================
  // Forgot Password
  // ==========================================================================

  /**
   * Initiates the password recovery process for a FreshMeal account.
   *
   * The backend is responsible for:
   * - Validating the recovery request.
   * - Generating a secure password-reset token.
   * - Persisting the token and its expiry information.
   * - Sending the password-reset link through email.
   *
   * This operation does not authenticate the user or issue JWT tokens.
   *
   * The request DTO is passed directly to the backend without modification.
   *
   * @param {Object} forgotPasswordRequest Backend forgot-password request.
   * @returns {Promise<Object>} Backend forgot-password response.
   */
  forgotPassword: async (forgotPasswordRequest) => {
    const response = await apiClient.post(
      API.AUTHENTICATION.FORGOT_PASSWORD,
      forgotPasswordRequest,
    );

    return response.data;
  },

  // ==========================================================================
  // Reset Password
  // ==========================================================================

  /**
   * Resets a user's password using the password-reset token received through
   * the registered email address.
   *
   * The backend is responsible for:
   * - Validating the password-reset token.
   * - Checking token expiration and usage status.
   * - Enforcing password policy.
   * - Updating the user's password.
   * - Invalidating the consumed password-reset token.
   *
   * This operation does not authenticate the user or issue JWT tokens.
   *
   * The request DTO is passed directly to the backend without modification.
   *
   * @param {Object} resetPasswordRequest Backend reset-password request.
   * @returns {Promise<Object>} Backend reset-password response.
   */
  resetPassword: async (resetPasswordRequest) => {
    const response = await apiClient.post(
      API.AUTHENTICATION.RESET_PASSWORD,
      resetPasswordRequest,
    );

    return response.data;
  },
};

export default AuthenticationService;
