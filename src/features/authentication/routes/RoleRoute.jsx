/**
 * ============================================================================
 * Route Guard : RoleRoute
 * ============================================================================
 *
 * <p>
 * Protects frontend routes based on the authenticated user's supported
 * backend roles.
 * </p>
 *
 * <p>
 * RoleRoute is responsible only for role-based navigation protection.
 * Authentication checks remain the responsibility of ProtectedRoute.
 * </p>
 *
 * <p>
 * The backend remains the authoritative source for API authorization.
 * This component provides a frontend navigation boundary and must not
 * be treated as a security mechanism.
 * </p>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthentication } from "../context/AuthenticationContext";

import { resolveUserPortals } from "../utils/RoleResolver";

import { ROUTES } from "../../../global/constants";

/**
 * Normalizes a role identifier for comparison.
 *
 * Supports both canonical values and Spring Security-style ROLE_ prefixes.
 */
const normalizeRole = (role) => {
  if (typeof role !== "string" || !role.trim()) {
    return null;
  }

  const normalizedRole = role.trim().toUpperCase();

  return normalizedRole.startsWith("ROLE_")
    ? normalizedRole.substring(5)
    : normalizedRole;
};

/**
 * Role-based route guard.
 *
 * @param {Object} props component properties
 * @param {string[]} props.allowedRoles roles permitted to access the route
 * @returns {JSX.Element} protected route outlet or redirect
 */
const RoleRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();

  const { session, isInitializing } = useAuthentication();

  /**
   * Resolve supported roles from the authenticated session.
   */
  const { roles: userRoles, hasSupportedRole } = resolveUserPortals(
    session?.roles ?? [],
  );

  /**
   * Normalize configured route roles.
   */
  const normalizedAllowedRoles = allowedRoles
    .map(normalizeRole)
    .filter(Boolean);

  /**
   * Determine whether the user has at least one required role.
   */
  const hasRequiredRole = normalizedAllowedRoles.some((role) =>
    userRoles.includes(role),
  );

  /**
   * Wait until the authentication session has been restored.
   */
  if (isInitializing) {
    return (
      <div
        className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary"
        aria-live="polite">
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
            aria-label="Loading"
          />

          <p className="text-secondary mb-0">Verifying your access...</p>
        </div>
      </div>
    );
  }

  /**
   * Authentication is checked independently from role authorization.
   *
   * ProtectedRoute normally handles this case, but retaining the check
   * makes RoleRoute safe when reused independently.
   */
  if (!session) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{ from: location }}
      />
    );
  }

  /**
   * A route without configured roles is a configuration error.
   * Deny access by default rather than accidentally exposing the route.
   */
  if (normalizedAllowedRoles.length === 0) {
    return (
      <Navigate
        to={ROUTES.PORTAL_SELECTION}
        replace
      />
    );
  }

  /**
   * Users without supported roles are redirected to portal selection,
   * which owns the safe handling of unsupported or missing portal access.
   */
  if (!hasSupportedRole) {
    return (
      <Navigate
        to={ROUTES.PORTAL_SELECTION}
        replace
      />
    );
  }

  /**
   * Authenticated users without the required role are redirected to
   * portal selection so they can choose a workspace they are authorized
   * to access.
   */
  if (!hasRequiredRole) {
    return (
      <Navigate
        to={ROUTES.PORTAL_SELECTION}
        replace
        state={{
          accessDenied: true,
          attemptedPath: location.pathname,
        }}
      />
    );
  }

  /**
   * The user is authenticated and has the required role.
   */
  return <Outlet />;
};

export default RoleRoute;
