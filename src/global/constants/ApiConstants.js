/**
 * ============================================================================
 * API Constants
 * ============================================================================
 *
 * <p>
 * Centralized API endpoint definitions for the FreshMeal frontend.
 * </p>
 *
 * <p>
 * Authentication endpoints are maintained here so that authentication services
 * never need to hard-code backend URLs.
 * </p>
 *
 * ============================================================================
 */

export const BASE_URL = "http://localhost:8030";

export const API = {
  // ===========================================================================
  // Authentication
  // ===========================================================================

  /**
   * Authentication API endpoints.
   *
   * <p>
   * These paths correspond to the FreshMeal Authentication controller
   * endpoints.
   * </p>
   */
  AUTHENTICATION: {
    /**
     * Authenticates a FreshMeal user.
     */
    LOGIN: `${BASE_URL}/api/auth/login`,

    /**
     * Refreshes the authentication token pair using a valid refresh token.
     */
    REFRESH_TOKEN: `${BASE_URL}/api/auth/refresh-token`,
  },

  // ===========================================================================
  // Food
  // ===========================================================================

  FOOD: {
    FOOD_METADATA: `${BASE_URL}/api/foods/foodCategoryMetadata`,
    ADD_FOOD: `${BASE_URL}/api/foods/add`,
    CREATE: `${BASE_URL}/api/foods/add`,
    GET_ALL_FOODS: `${BASE_URL}/api/foods/readAllFoods`,
    GET_FOOD_BY_ID: `${BASE_URL}/api/foods/view`,
    EDIT_FOOD: `${BASE_URL}/api/foods/edit`,
    UPDATE: (id) => `/api/v1/foods/${id}`,
    UPDATE_FOOD_STATUS: (id) => `${BASE_URL}/api/foods/${id}/status`,
    DELETE: (id) => `/api/v1/foods/${id}`,
    GET_ARCHIVED_FOODS: `${BASE_URL}/api/foods/archived`,
    ARCHIVE_FOOD: `${BASE_URL}/api/foods/archive`,
    BULK_ARCHIVE_FOOD: `${BASE_URL}/api/foods/bulkArchive`,
    RESTORE_FOOD: `${BASE_URL}/api/foods/restore`,
    BULK_RESTORE_FOOD: `${BASE_URL}/api/foods/bulkRestore`,
    PERMANENT_DELETE_FOOD: `${BASE_URL}/api/foods/permanentDelete`,
    BULK_PERMANENT_DELETE_FOOD: `${BASE_URL}/api/foods/bulkPermanentDelete`,
  },

  // ===========================================================================
  // Order
  // ===========================================================================

  ORDER: {
    GET_ALL: "/api/v1/orders",
    GET_BY_ID: (id) => `/api/v1/orders/${id}`,
    UPDATE_STATUS: (id) => `/api/v1/orders/${id}/status`,
  },

  // ===========================================================================
  // Image
  // ===========================================================================

  IMAGE: {
    UPLOAD: "/api/v1/images/upload",
    DELETE: (imageId) => `/api/v1/images/${imageId}`,
  },
};

export default API;
