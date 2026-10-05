/**
 * ============================================================================
 * Barrel : Authentication Feature
 * ============================================================================
 *
 * <p>
 * Centralized public exports for the FreshMeal authentication feature.
 * </p>
 *
 * <p>
 * Other application features should import authentication functionality
 * through this barrel rather than depending on internal implementation paths.
 * </p>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export { default as PortalSelection } from "./pages/PortalSelection";

// ---------------------------------------------------------------------------
// Route Guards
// ---------------------------------------------------------------------------

export { default as RoleRoute } from "./routes/RoleRoute";

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

export {
  POST_LOGIN_ACTION,
  resolvePostLoginRedirect,
} from "./utils/PostLoginRedirect";

export { resolveUserPortals } from "./utils/RoleResolver";
