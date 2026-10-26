/**
 * ============================================================================
 * Constants: RouteConstants
 * ============================================================================
 *
 * Centralized definitions for frontend navigation routes in FreshMeal.
 *
 * These constants represent client-side React Router paths. Backend API
 * endpoints belong in ApiConstants.
 *
 * Portal-specific routes use explicit prefixes to avoid collisions between
 * role-specific application experiences.
 *
 * Compatibility aliases are retained temporarily while existing consumers
 * are migrated to the canonical route names.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * ============================================================================
 */

export const ROUTES = Object.freeze({
  // Application entry
  HOME: "/",

  // Authentication
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL_OTP: "/verify-email-otp",
  VERIFY_OTP: "/verify-otp",
  RESET_PASSWORD: "/reset-password",
  LOGOUT: "/logout",

  // Portal selection
  PORTAL_SELECTION: "/select-portal",

  // Portal entry paths
  ADMIN: "/admin",
  CUSTOMER: "/customer",
  RESTAURANT: "/restaurant",
  DELIVERY_PARTNER: "/delivery",

  // Shared application pages
  PROFILE: "/profile",
});

export default ROUTES;
