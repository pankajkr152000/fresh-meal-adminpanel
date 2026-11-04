import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../global/constants/RouteConstants";
import RestaurantContextStorage from "../../../portals/restaurant/services/RestaurantContextStorage";
import { useAuthentication } from "../context/AuthenticationContext";
import AuthenticationService from "../services/AuthenticationService";

/**
 * ============================================================================
 * Hook : useLogout
 * ============================================================================
 *
 * <p>
 * Provides the application-level logout workflow for an authenticated
 * FreshMeal user.
 * </p>
 *
 * <h3>Responsibilities</h3>
 * <ul>
 *   <li>Call the backend logout endpoint.</li>
 *   <li>Terminate the local authentication session.</li>
 *   <li>Redirect the user to the login page after successful logout.</li>
 *   <li>Expose logout loading and error state to the UI.</li>
 * </ul>
 *
 * <h3>Architecture</h3>
 *
 * <pre>
 * Logout UI
 *     ↓
 * useLogout
 *     ↓
 * AuthenticationService
 *     ↓
 * apiClient
 *     ↓
 * Spring Boot Logout API
 *     ↓
 * AuthenticationContext.unauthenticate()
 *     ↓
 * Login Page
 * </pre>
 *
 * <p>
 * The hook owns the logout workflow and post-logout navigation. The
 * authentication context remains responsible only for authentication state
 * management.
 * </p>
 *
 * ============================================================================
 */
const useLogout = () => {
  const navigate = useNavigate();

  const { unauthenticate } = useAuthentication();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Logs out the currently authenticated user.
   *
   * <p>
   * The backend logout request is attempted first while the access token is
   * still available. Once the backend request completes successfully, the
   * local authentication session is cleared and the user is redirected to
   * the login page.
   * </p>
   *
   * @returns {Promise<Object|null>}
   *          Backend logout response.
   */

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    setError(null);

    try {
      const response = await AuthenticationService.logout();

      // Clear restaurant-specific context after backend logout succeeds.
      RestaurantContextStorage.clear();

      // Terminate the local authentication session.
      unauthenticate();

      // Redirect the user to the login page.
      navigate(ROUTES.LOGIN, {
        replace: true,
      });

      return response;
    } catch (err) {
      setError(err);

      /**
       * Preserve the existing failure behavior:
       * if backend logout fails, do not automatically terminate the
       * authentication session or clear restaurant context.
       */
      throw err;
    } finally {
      setIsLoggingOut(false);
    }
  }, [navigate, unauthenticate]);

  return {
    logout,
    isLoggingOut,
    error,
  };
};

export default useLogout;
