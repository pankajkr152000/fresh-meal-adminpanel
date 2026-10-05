/**
 * ============================================================================
 * Constants : RouteConstants
 * ============================================================================
 *
 * <p>
 * Centralized definitions for frontend navigation routes in the FreshMeal
 * application.
 * </p>
 *
 * <p>
 * These constants represent client-side routes handled by React Router.
 * Backend API endpoints must be defined separately in ApiConstants.
 * </p>
 *
 * <p>
 * Keeping frontend navigation paths separate from backend API endpoints
 * prevents responsibility overlap and improves maintainability.
 * </p>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

/**
 * Frontend navigation routes.
 *
 * <p>
 * These paths are consumed by React Router, navigation components, and
 * application-level redirects.
 * </p>
 */
export const ROUTES = Object.freeze({
  // --------------------------------------------------------------------------
  // Public Routes
  // --------------------------------------------------------------------------

  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL_OTP: "/verify-email-otp",
  VERIFY_OTP: "/verify-otp",
  RESET_PASSWORD: "/reset-password",

  // --------------------------------------------------------------------------
  // Authentication Routes
  // --------------------------------------------------------------------------

  LOGOUT: "/logout",

  // --------------------------------------------------------------------------
  // Food Management Routes
  // --------------------------------------------------------------------------

  VIEW_FOOD: "/foods/view/:foodId",
  EDIT_FOOD: "/foods/edit/:foodId",

  // --------------------------------------------------------------------------
  // Order Management Routes
  // --------------------------------------------------------------------------

  FETCH_ALL_ORDERS: "/orders",

  // --------------------------------------------------------------------------
  // User Routes
  // --------------------------------------------------------------------------

  PROFILE: "/profile",

  // --------------------------------------------------------------------------
  // Portal Navigation Routes
  // --------------------------------------------------------------------------

  PORTAL_SELECTION: "/select-portal",
});

export default ROUTES;
