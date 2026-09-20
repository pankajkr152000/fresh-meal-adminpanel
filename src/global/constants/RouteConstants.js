/**
 * =============================================================================
 * FreshMeal - Route Constants
 * =============================================================================
 *
 * <p>
 * Centralized route definitions used by the FreshMeal frontend application.
 * Keeping route paths in one place prevents hard-coded URLs from being
 * scattered throughout pages, components, hooks, and navigation logic.
 * </p>
 *
 * <h3>Architecture Responsibility</h3>
 * <ul>
 *     <li>Defines frontend application routes.</li>
 *     <li>Provides a single source of truth for navigation paths.</li>
 *     <li>Supports public authentication routes and protected application routes.</li>
 *     <li>Prevents route strings from being duplicated across the application.</li>
 * </ul>
 *
 * <h3>Important</h3>
 * <p>
 * This file contains frontend route definitions. Existing API-related values
 * are intentionally preserved because they are already used by the current
 * FreshMeal application.
 * </p>
 * =============================================================================
 */

export const ROUTES = {
  // ===========================================================================
  // Application
  // ===========================================================================

  HOME: "/",

  // ===========================================================================
  // Authentication - Public Routes
  // ===========================================================================

  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL_OTP: "/verify-email-otp",
  VERIFY_OTP: "/verify-otp",
  RESET_PASSWORD: "/reset-password",

  // ===========================================================================
  // Food
  // ===========================================================================

  ADD_FOOD: "/api/foods/add",
  FETCH_ALL_FOODS: "/api/foods/readAllFoods",
  VIEW_FOOD: "/foods/view/:foodId",
  EDIT_FOOD: "/foods/edit/:foodId",
  GET_ARCHIVED_FOODS: "/api/foods/archived",
  ARCHIVE_FOOD: "/api/foods/archive",
  BULK_ARCHIVE_FOOD: "/api/foods/bulkArchive",
  RESTORE_FOOD: "/api/foods/restore",
  BULK_RESTORE_FOOD: "/api/foods/bulkRestore",
  PERMANENT_DELETE_FOOD: "/api/foods/permanentDelete",
  BULK_PERMANENT_DELETE_FOOD: "/api/foods/bulkPermanentDelete",

  // ===========================================================================
  // Order
  // ===========================================================================

  FETCH_ALL_ORDERS: "/orders",

  // ===========================================================================
  // Common
  // ===========================================================================

  PROFILE: "/profile",
  STATUS: "/status",
};

export default ROUTES;
