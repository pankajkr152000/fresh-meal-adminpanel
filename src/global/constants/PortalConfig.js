/**
 * ============================================================================
 * Constants : PortalConfig
 * ============================================================================
 *
 * <p>
 * Centralized configuration for role-specific portals in the FreshMeal
 * application.
 * </p>
 *
 * <p>
 * This configuration maps canonical backend role identifiers to their
 * corresponding frontend portal metadata.
 * </p>
 *
 * <p>
 * Backend role identifiers are the source of truth for authorization.
 * Display labels and descriptions are intended exclusively for presentation.
 * </p>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

/**
 * Canonical backend role identifiers.
 *
 * <p>
 * These values must remain consistent with the backend RoleType enum.
 * Never use display labels for authorization comparisons.
 * </p>
 */
export const PORTAL_ROLES = Object.freeze({
  ADMIN: "ADMIN",
  CUSTOMER: "USER",
  RESTAURANT: "RESTAURANT_OWNER",
  DELIVERY_PARTNER: "DELIVERY_PARTNER",
});

/**
 * Portal configuration keyed by canonical backend role.
 *
 * <p>
 * Each entry defines the presentation metadata and proposed base route
 * for its corresponding portal.
 * </p>
 */
export const PORTAL_CONFIG = Object.freeze({
  [PORTAL_ROLES.ADMIN]: Object.freeze({
    role: PORTAL_ROLES.ADMIN,
    name: "Admin",
    title: "Admin Portal",
    description:
      "Manage the FreshMeal platform, operations, food listings, and orders.",
    basePath: "/admin",
  }),

  [PORTAL_ROLES.CUSTOMER]: Object.freeze({
    role: PORTAL_ROLES.CUSTOMER,
    name: "Customer",
    title: "Customer Portal",
    description:
      "Discover meals, manage your cart, place orders, and track deliveries.",
    basePath: "/customer",
  }),

  [PORTAL_ROLES.RESTAURANT]: Object.freeze({
    role: PORTAL_ROLES.RESTAURANT,
    name: "Restaurant",
    title: "Restaurant Portal",
    description:
      "Manage restaurant operations, menus, availability, and incoming orders.",
    basePath: "/restaurant",
  }),

  [PORTAL_ROLES.DELIVERY_PARTNER]: Object.freeze({
    role: PORTAL_ROLES.DELIVERY_PARTNER,
    name: "Delivery Partner",
    title: "Delivery Partner Portal",
    description:
      "Manage assigned deliveries and keep customers informed about order progress.",
    basePath: "/delivery",
  }),
});

/**
 * Returns the portal configuration for a supported role.
 *
 * @param {string} role canonical backend role identifier
 * @returns {object|null} portal configuration, or null for unsupported roles
 */
export const getPortalConfig = (role) => {
  if (typeof role !== "string") {
    return null;
  }

  return PORTAL_CONFIG[role.trim().toUpperCase()] ?? null;
};

export default PORTAL_CONFIG;
