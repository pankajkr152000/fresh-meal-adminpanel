/**
 * ============================================================================
 * Role Resolver
 * ============================================================================
 *
 * Resolves the supported application roles assigned to an authenticated user.
 *
 * Responsibilities:
 * - Normalize role identifiers.
 * - Remove duplicate roles.
 * - Ignore unsupported roles.
 * - Resolve corresponding portal configurations.
 * - Provide a consistent result for post-login navigation.
 *
 * Important:
 * - Backend role identifiers remain the source of truth.
 * - This utility does not perform authentication or authorization.
 * - Actual access control must be enforced by the backend and RoleRoute.
 *
 * ============================================================================
 */

import { getPortalConfig } from "../../../global/constants/PortalConfig";

/**
 * Normalizes a role identifier.
 *
 * Examples:
 * - "ADMIN"      -> "ADMIN"
 * - "ROLE_ADMIN" -> "ADMIN"
 * - " admin "    -> "ADMIN"
 *
 * @param {string} role
 * @returns {string|null}
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
 * Resolves the supported portals for the supplied roles.
 *
 * @param {string[]} roles
 * @returns {{
 *   roles: string[],
 *   portals: object[],
 *   hasSupportedRole: boolean,
 *   requiresSelection: boolean
 * }}
 */
export const resolveUserPortals = (roles = []) => {
  if (!Array.isArray(roles)) {
    return {
      roles: [],
      portals: [],
      hasSupportedRole: false,
      requiresSelection: false,
    };
  }

  const normalizedRoles = [
    ...new Set(roles.map(normalizeRole).filter(Boolean)),
  ];

  const portals = normalizedRoles
    .map((role) => getPortalConfig(role))
    .filter(Boolean);

  const supportedRoles = portals.map((portal) => portal.role);

  return {
    roles: supportedRoles,
    portals,
    hasSupportedRole: supportedRoles.length > 0,
    requiresSelection: supportedRoles.length > 1,
  };
};
