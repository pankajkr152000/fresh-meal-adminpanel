import apiClient from "../../../api/apiClient";
import { API } from "../../../global/constants/ApiConstants";

/**
 * =============================================================================
 * FreshMeal
 * =============================================================================
 *
 * Service : AuthenticationService
 * =============================================================================
 *
 * Purpose
 * -------
 * Provides the application-level service for communication with FreshMeal's
 * authentication APIs.
 *
 * Responsibilities
 * ----------------
 * • Communicate with authentication endpoints.
 * • Submit authentication requests using the centralized API client.
 * • Return backend authentication responses to the calling authentication
 *   layer.
 *
 * Architecture
 * ------------
 * Login Page
 *     ↓
 * Authentication Hook
 *     ↓
 * AuthenticationService
 *     ↓
 * apiClient
 *     ↓
 * Spring Boot Authentication API
 *
 * Notes
 * -----
 * • This service contains no React/UI logic.
 * • This service does not manage JWT/token persistence.
 * • This service does not determine user roles.
 * • This service does not perform navigation.
 * • All HTTP communication uses the centralized apiClient.
 *
 * Backend Login Contract
 * ----------------------
 * Request:
 *
 * {
 *   identifier: String,
 *   password: String
 * }
 *
 * Response:
 *
 * {
 *   token: {
 *     accessToken: String,
 *     refreshToken: String,
 *     tokenType: String,
 *     expiresIn: Number,
 *     loginSessionId: String
 *   }
 * }
 *
 * =============================================================================
 */

/**
 * =============================================================================
 * AuthenticationService
 * =============================================================================
 */

const AuthenticationService = {
  /**
   * ---------------------------------------------------------------------------
   * Login
   * ---------------------------------------------------------------------------
   *
   * Authenticates a FreshMeal user using their username/email and password.
   *
   * @param {Object} credentials
   *        Login credentials.
   *
   * @param {string} credentials.identifier
   *        Username or email used to authenticate the user.
   *
   * @param {string} credentials.password
   *        User password.
   *
   * @returns {Promise<Object>}
   *          Backend login response.
   *
   * @throws
   *         Propagates the Axios error to the authentication layer so that
   *         authentication-specific error handling can be performed there.
   */
  login: async ({ identifier, password }) => {
    const response = await apiClient.post(API.AUTHENTICATION.LOGIN, {
      identifier,
      password,
    });

    return response.data;
  },
};

export default AuthenticationService;
