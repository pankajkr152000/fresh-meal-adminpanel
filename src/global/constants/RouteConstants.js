/**
 * ============================================================================
 * FreshMeal
 * ============================================================================
 *
 * Application Route Constants
 *
 * Centralized route definitions for the FreshMeal Admin Panel.
 *
 * Notes:
 * -------
 * • These are frontend React Router routes.
 * • API endpoints belong in ApiConstants.js.
 * • Dynamic routes use :foodId.
 *
 * RouteConstants.js
 *       ↓
 * React pages/navigation only
 *
 * ApiConstants.js
 *       ↓
 *Backend API endpoints only
 *
 * ============================================================================
 */

export const ROUTES = {
  // ==========================================================================
  // Dashboard
  // ==========================================================================

  HOME: "/",

  // ==========================================================================
  // Food Routes
  // ==========================================================================

  ADD_FOOD: "/api/foods/add",

  FETCH_ALL_FOODS: "/api/foods/readAllFoods",

  VIEW_FOOD: "/foods/view/:foodId",

  EDIT_FOOD: "/foods/edit/:foodId",

  // ==========================================================================
  // Archived Food Routes
  // ==========================================================================

  GET_ARCHIVED_FOODS: "/api/foods/archived",

  // ==========================================================================
  // Food Archive Actions
  // ==========================================================================
  //
  // These routes are useful if these operations are ever handled through
  // React Router navigation.
  //
  // Actual API endpoints are maintained separately in ApiConstants.js.
  // ==========================================================================

  ARCHIVE_FOOD: "/api/foods/archive",

  BULK_ARCHIVE_FOOD: "/api/foods/bulkArchive",

  RESTORE_FOOD: "/api/foods/restore",

  BULK_RESTORE_FOOD: "/api/foods/bulkRestore",

  PERMANENT_DELETE_FOOD: "/api/foods/permanentDelete",

  BULK_PERMANENT_DELETE_FOOD: "/api/foods/bulkPermanentDelete",

  // ==========================================================================
  // Order Routes
  // ==========================================================================

  FETCH_ALL_ORDERS: "/orders",

  // ==========================================================================
  // Future / Other Admin Routes
  // ==========================================================================

  PROFILE: "/profile",

  STATUS: "/status",
};

export default ROUTES;
