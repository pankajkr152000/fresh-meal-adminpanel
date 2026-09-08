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
 * <p>
 * Provides a reusable routing boundary that allows authenticated users to
 * access protected application areas while redirecting unauthenticated users
 * to the Login page.
 * </p>
 *
 * <h3>Responsibilities</h3>
 * <ul>
 *     <li>Read authentication state from {@link useAuthentication}.</li>
 *     <li>Allow authenticated users to continue to the requested route.</li>
 *     <li>Redirect unauthenticated users to the Login route.</li>
 *     <li>Preserve the originally requested location for future navigation
 *         handling.</li>
 * </ul>
 *
 * <h3>Explicit Non-Responsibilities</h3>
 * <ul>
 *     <li>Does not perform API calls.</li>
 *     <li>Does not manage access or refresh tokens.</li>
 *     <li>Does not decode JWT tokens.</li>
 *     <li>Does not determine user roles.</li>
 *     <li>Does not perform permission checks.</li>
 *     <li>Does not render application layouts.</li>
 * </ul>
 *
 * <h3>Architecture Boundary</h3>
 * <pre>
 * AppRoutes
 *     |
 *     +-- ProtectedRoute
 *            |
 *            +-- AuthenticationContext
 *            |
 *            +-- Protected Application
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
 * @returns {JSX.Element} Nested protected content or Login redirect.
 * =============================================================================
 */
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthentication();

  const location = useLocation();

  /**
   * ---------------------------------------------------------------------------
   * Authentication Check
   * ---------------------------------------------------------------------------
   *
   * <p>
   * Unauthenticated users are redirected to Login. The current location is
   * preserved so that future authentication/session handling can optionally
   * return the user to the originally requested resource.
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
