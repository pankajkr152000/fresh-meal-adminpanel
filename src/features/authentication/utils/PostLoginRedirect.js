/**
 * ============================================================================
 * Post Login Redirect
 * ============================================================================
 *
 * Determines the appropriate navigation decision after successful login.
 *
 * Responsibilities:
 * - Resolve the user's available portals.
 * - Redirect single-role users directly to their portal.
 * - Require portal selection for multiple-role users.
 * - Deny access when no supported portal is available.
 *
 * Important:
 * - This utility does not perform navigation.
 * - The caller is responsible for executing the returned navigation decision.
 * - Authentication and authorization remain separate concerns.
 *
 * ============================================================================
 */

import { resolveUserPortals } from "./RoleResolver";

/**
 * Post-login navigation decision types.
 */
export const POST_LOGIN_ACTION = Object.freeze({
  REDIRECT: "REDIRECT",
  SELECT_PORTAL: "SELECT_PORTAL",
  DENY: "DENY",
});

/**
 * Resolves the post-login navigation decision.
 *
 * @param {string[]} roles
 * @returns {{
 *   action: string,
 *   redirectTo: string|null,
 *   portals: object[],
 *   roles: string[],
 *   reason: string|null
 * }}
 */
export const resolvePostLoginRedirect = (roles = []) => {
  const resolution = resolveUserPortals(roles);

  // No supported portal is available.
  if (!resolution.hasSupportedRole) {
    return {
      action: POST_LOGIN_ACTION.DENY,
      redirectTo: null,
      portals: [],
      roles: [],
      reason: "NO_SUPPORTED_PORTAL",
    };
  }

  // Multiple roles always require explicit portal selection.
  if (resolution.requiresSelection) {
    return {
      action: POST_LOGIN_ACTION.SELECT_PORTAL,
      redirectTo: null,
      portals: resolution.portals,
      roles: resolution.roles,
      reason: null,
    };
  }

  // A single supported role can be redirected directly.
  const [portal] = resolution.portals;

  return {
    action: POST_LOGIN_ACTION.REDIRECT,
    redirectTo: portal.path,
    portals: resolution.portals,
    roles: resolution.roles,
    reason: null,
  };
};
