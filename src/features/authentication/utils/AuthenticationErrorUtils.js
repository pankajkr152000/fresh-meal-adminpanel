/**
 * =============================================================================
 * FreshMeal - Authentication Error Utilities
 * =============================================================================
 *
 * <p>
 * Utility functions for interpreting authentication errors returned by the
 * FreshMeal backend and converting them into safe user-facing messages.
 * </p>
 *
 * <h3>Purpose</h3>
 * <p>
 * Authentication error codes originate from the backend
 * {@code AuthenticationErrorConstants}. This utility provides the frontend
 * with a stable interpretation layer without duplicating the complete
 * backend authentication error catalogue.
 * </p>
 *
 * <h3>Responsibilities</h3>
 * <ul>
 *     <li>Extract the authentication error code from an API error.</li>
 *     <li>Identify known authentication error conditions.</li>
 *     <li>Return safe user-facing authentication messages.</li>
 *     <li>Provide a generic fallback for unknown authentication errors.</li>
 * </ul>
 *
 * <h3>Security Considerations</h3>
 * <p>
 * Raw backend exceptions, stack traces, Axios errors, and unexpected response
 * payloads must never be displayed directly to the user.
 * </p>
 *
 * <p>
 * The backend authentication error code remains the source of truth. This
 * utility only translates known authentication conditions into presentation-
 * safe messages.
 * </p>
 *
 * <h3>Architecture</h3>
 * <pre>
 * Backend AuthenticationErrorConstants
 *              ↓
 *        API Error Response
 *              ↓
 * AuthenticationErrorUtils
 *              ↓
 *        useLogin / Page
 *              ↓
 *       User-facing message
 * </pre>
 *
 * =============================================================================
 */

import { MESSAGES } from "../../../global/constants/MessageConstants";

/**
 * =============================================================================
 * Authentication Error Codes
 * =============================================================================
 *
 * <p>
 * These values correspond directly to the backend
 * {@code AuthenticationErrorConstants}.
 * </p>
 *
 * <p>
 * They are intentionally scoped to errors relevant to the Login operation.
 * OTP, password recovery, session, and token-specific codes can be introduced
 * by their respective authentication flows when those screens are developed.
 * </p>
 * =============================================================================
 */
const AUTHENTICATION_ERROR_CODES = Object.freeze({
  AUTHENTICATION_FAILED: "FM-AUTH-002",

  CREDENTIALS_REQUIRED: "FM-AUTH-010",

  INVALID_CREDENTIALS: "FM-AUTH-011",

  PASSWORD_REQUIRED: "FM-AUTH-012",

  INVALID_PASSWORD: "FM-AUTH-013",

  ACCOUNT_DISABLED: "FM-AUTH-020",

  ACCOUNT_LOCKED: "FM-AUTH-021",

  ACCOUNT_EXPIRED: "FM-AUTH-022",

  CREDENTIALS_EXPIRED: "FM-AUTH-023",

  ACCOUNT_NOT_ACTIVE: "FM-AUTH-024",

  LOGIN_FAILED: "FM-AUTH-061",

  LOGIN_NOT_ALLOWED: "FM-AUTH-063",

  ACCOUNT_VERIFICATION_REQUIRED: "FM-AUTH-110",
});

/**
 * =============================================================================
 * Authentication Error Messages
 * =============================================================================
 *
 * <p>
 * Maps known authentication conditions to safe messages appropriate for the
 * Login UI.
 * </p>
 *
 * <p>
 * The messages mirror the business meaning defined by the backend while
 * preventing raw technical errors from reaching the presentation layer.
 * </p>
 * =============================================================================
 */
const AUTHENTICATION_ERROR_MESSAGES = Object.freeze({
  [AUTHENTICATION_ERROR_CODES.AUTHENTICATION_FAILED]: "Authentication failed.",

  [AUTHENTICATION_ERROR_CODES.CREDENTIALS_REQUIRED]:
    "Authentication credentials are required.",

  [AUTHENTICATION_ERROR_CODES.INVALID_CREDENTIALS]:
    "Invalid username or password.",

  [AUTHENTICATION_ERROR_CODES.PASSWORD_REQUIRED]: "Password is required.",

  [AUTHENTICATION_ERROR_CODES.INVALID_PASSWORD]: "Invalid password.",

  [AUTHENTICATION_ERROR_CODES.ACCOUNT_DISABLED]: "Your account is disabled.",

  [AUTHENTICATION_ERROR_CODES.ACCOUNT_LOCKED]: "Your account is locked.",

  [AUTHENTICATION_ERROR_CODES.ACCOUNT_EXPIRED]: "Your account has expired.",

  [AUTHENTICATION_ERROR_CODES.CREDENTIALS_EXPIRED]:
    "Your credentials have expired.",

  [AUTHENTICATION_ERROR_CODES.ACCOUNT_NOT_ACTIVE]:
    "Your account is not active.",

  [AUTHENTICATION_ERROR_CODES.LOGIN_FAILED]: "Login failed.",

  [AUTHENTICATION_ERROR_CODES.LOGIN_NOT_ALLOWED]: "Login is not allowed.",

  [AUTHENTICATION_ERROR_CODES.ACCOUNT_VERIFICATION_REQUIRED]:
    "Please verify your account before signing in.",
});

/**
 * =============================================================================
 * extractAuthenticationErrorCode
 * =============================================================================
 *
 * <p>
 * Extracts the backend authentication error code from an Axios/API error.
 * </p>
 *
 * <p>
 * The exact backend error-envelope structure may be refined later if the
 * application's common API error response contract changes. Keeping extraction
 * here prevents Login.jsx and authentication hooks from depending directly on
 * the transport-level error structure.
 * </p>
 *
 * @param {Object} error
 *        Error returned by the API client.
 *
 * @returns {string|null}
 *          Authentication error code when available.
 * =============================================================================
 */
export const extractAuthenticationErrorCode = (error) => {
  return (
    error?.response?.data?.errorCode ??
    error?.response?.data?.code ??
    error?.response?.data?.error?.errorCode ??
    null
  );
};

/**
 * =============================================================================
 * getAuthenticationErrorMessage
 * =============================================================================
 *
 * <p>
 * Converts an authentication API error into a safe message suitable for
 * presentation to the user.
 * </p>
 *
 * @param {Object} error
 *        Error returned by the authentication operation.
 *
 * @returns {string}
 *          Safe user-facing authentication error message.
 * =============================================================================
 */
export const getAuthenticationErrorMessage = (error) => {
  const errorCode = extractAuthenticationErrorCode(error);

  return (
    AUTHENTICATION_ERROR_MESSAGES[errorCode] ??
    MESSAGES.COMMON.SOMETHING_WENT_WRONG
  );
};

/**
 * =============================================================================
 * isAuthenticationError
 * =============================================================================
 *
 * <p>
 * Determines whether an API error contains a known FreshMeal authentication
 * business error code.
 * </p>
 *
 * @param {Object} error
 *        Error returned by the API client.
 *
 * @returns {boolean}
 *          true when the error contains a known authentication code.
 * =============================================================================
 */
export const isAuthenticationError = (error) => {
  const errorCode = extractAuthenticationErrorCode(error);

  return Boolean(
    errorCode && Object.values(AUTHENTICATION_ERROR_CODES).includes(errorCode),
  );
};

export default {
  extractAuthenticationErrorCode,
  getAuthenticationErrorMessage,
  isAuthenticationError,
};
