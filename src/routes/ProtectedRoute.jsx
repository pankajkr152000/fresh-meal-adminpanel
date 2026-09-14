/**
 * =============================================================================
 * FreshMeal - Protected Route
 * =============================================================================
 *
 * <p>
 * Route guard responsible for protecting authenticated FreshMeal application
 * areas from unauthenticated access.
 * </p>
 *
 * <h3>Purpose</h3>
 *
 * <p>
 * Provides a reusable routing boundary that allows authenticated users to
 * access protected application areas while redirecting unauthenticated users
 * to the Login page.
 * </p>
 *
 * <h3>Responsibilities</h3>
 *
 * <ul>
 * <li>Read authentication state from {@link useAuthentication}.</li>
 * <li>Wait for persisted authentication-session restoration to complete.</li>
 * <li>Allow authenticated users to continue to the requested route.</li>
 * <li>Redirect unauthenticated users to the Login route.</li>
 * <li>Preserve the originally requested location for future navigation
 *     handling.</li>
 * </ul>
 *
 * <h3>Explicit Non-Responsibilities</h3>
 *
 * <ul>
 * <li>Does not perform API calls.</li>
 * <li>Does not manage access or refresh tokens.</li>
 * <li>Does not decode JWT tokens.</li>
 * <li>Does not determine user roles.</li>
 * <li>Does not perform permission checks.</li>
 * <li>Does not render application layouts.</li>
 * </ul>
 *
 * <h3>Authentication Initialization</h3>
 *
 * <p>
 * Authentication state is restored asynchronously by
 * {@code AuthenticationContext}. Therefore, this route must not redirect
 * while authentication initialization is still in progress.
 * </p>
 *
 * <pre>
 * Application Start
 *       |
 *       v
 * AuthenticationContext
 *       |
 *       +-- isInitializing = true
 *       |
 *       v
 * AuthenticationSessionStorage.get()
 *       |
 *       v
 * Session restored
 *       |
 *       +-- isInitializing = false
 *       |
 *       v
 * ProtectedRoute
 *       |
 *       +-- authenticated  --> Outlet
 *       |
 *       +-- unauthenticated --> Login
 * </pre>
 *
 * <h3>Architecture Boundary</h3>
 *
 * <pre>
 * AppRoutes
 *     |
 *     +-- ProtectedRoute
 *             |
 *             +-- AuthenticationContext
 *             |
 *             +-- Protected Application
 * </pre>
 *
 * <p>
 * Role-based authorization will be introduced separately from this
 * authentication guard. This allows the same authentication boundary to be
 * reused by Admin, Restaurant, and Customer application areas.
 * </p>
 *
 * @module routes/ProtectedRoute
 * =============================================================================
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthentication } from "../features/authentication/context/AuthenticationContext";
import { ROUTES } from "../global/constants/RouteConstants";

/**
 * =============================================================================
 * ProtectedRoute
 * =============================================================================
 *
 * <p>
 * Protects nested routes from unauthenticated access.
 * </p>
 *
 * <p>
 * The component uses React Router's {@link Outlet} pattern so it can act as a
 * routing boundary for multiple protected routes without duplicating guard
 * logic.
 * </p>
 *
 * @returns {JSX.Element} Nested protected content, initialization state, or
 * Login redirect.
 * =============================================================================
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isInitializing } = useAuthentication();

  const location = useLocation();

  /**
   * ---------------------------------------------------------------------------
   * Authentication Initialization
   * ---------------------------------------------------------------------------
   *
   * <p>
   * The authentication provider restores the persisted session inside a
   * React effect. During the initial render, {@code isAuthenticated} can
   * therefore temporarily be {@code false} even when a valid persisted
   * session exists.
   * </p>
   *
   * <p>
   * Redirecting during this period would incorrectly send a valid user to the
   * Login page on every browser refresh.
   * </p>
   */
  if (isInitializing) {
    return null;
  }

  /**
   * ---------------------------------------------------------------------------
   * Authentication Check
   * ---------------------------------------------------------------------------
   *
   * <p>
   * Once authentication initialization has completed, unauthenticated users
   * are redirected to Login.
   * </p>
   *
   * <p>
   * The current location is preserved so the application can optionally
   * return the user to the originally requested resource after
   * authentication.
   * </p>
   */
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{ from: location }}
      />
    );
  }

  /**
   * ---------------------------------------------------------------------------
   * Protected Content
   * ---------------------------------------------------------------------------
   *
   * <p>
   * Authenticated users are allowed to continue to the nested route.
   * </p>
   */
  return <Outlet />;
};

export default ProtectedRoute;
