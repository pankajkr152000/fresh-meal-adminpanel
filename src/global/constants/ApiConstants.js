/**
 * ============================================================================
 * Constants : ApiConstants
 * ============================================================================
 *
 * <p>
 * Centralized definitions for backend API endpoints used by the FreshMeal
 * frontend.
 * </p>
 *
 * <p>
 * API endpoints are defined as relative paths. The environment-specific backend
 * URL is configured separately through Vite environment variables.
 * </p>
 *
 * <p>
 * Frontend navigation paths must be defined in RouteConstants instead.
 * </p>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

/**
 * Base URL of the Spring Boot backend.
 *
 * <p>
 * Retained for compatibility with existing imports. API endpoint definitions
 * should use relative paths and rely on the configured Axios base URL.
 * </p>
 */
// export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
/**
 * Backend Base URL.
 *
 * <p>
 * Centralized configuration for the Spring Boot backend.
 * </p>
 */
// export const BASE_URL = "http://localhost:8030";

/**
 * Centralized backend API endpoint definitions.
 *
 * <p>
 * All endpoint values are relative paths so they can be resolved against the
 * environment-specific base URL configured in the Axios client.
 * </p>
 */
export const API = Object.freeze({
  // --------------------------------------------------------------------------
  // Authentication
  // --------------------------------------------------------------------------

  AUTHENTICATION: Object.freeze({
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REFRESH_TOKEN: "/api/auth/refresh-token",
  }),

  // --------------------------------------------------------------------------
  // Food Management
  // --------------------------------------------------------------------------

  FOOD: Object.freeze({
    FOOD_METADATA: "/api/foods/foodCategoryMetadata",

    ADD_FOOD: "/api/foods/add",
    CREATE: "/api/foods/add",

    GET_ALL_FOODS: "/api/foods/readAllFoods",
    GET_FOOD_BY_ID: "/api/foods/view",
    EDIT_FOOD: "/api/foods/edit",

    UPDATE: (id) => `/api/v1/foods/${id}`,
    UPDATE_FOOD_STATUS: (id) => `/api/foods/${id}/status`,

    DELETE: (id) => `/api/v1/foods/${id}`,

    GET_ARCHIVED_FOODS: "/api/foods/archived",
    ARCHIVE_FOOD: "/api/foods/archive",
    BULK_ARCHIVE_FOOD: "/api/foods/bulkArchive",

    RESTORE_FOOD: "/api/foods/restore",
    BULK_RESTORE_FOOD: "/api/foods/bulkRestore",

    PERMANENT_DELETE_FOOD: "/api/foods/permanentDelete",
    BULK_PERMANENT_DELETE_FOOD: "/api/foods/bulkPermanentDelete",
  }),

  // --------------------------------------------------------------------------
  // Order Management
  // --------------------------------------------------------------------------

  ORDER: Object.freeze({
    GET_ALL: "/api/v1/orders",
    GET_BY_ID: (id) => `/api/v1/orders/${id}`,
    UPDATE_STATUS: (id) => `/api/v1/orders/${id}/status`,
  }),

  // --------------------------------------------------------------------------
  // Image Management
  // --------------------------------------------------------------------------

  IMAGE: Object.freeze({
    UPLOAD: "/api/v1/images/upload",
    DELETE: (imageId) => `/api/v1/images/${imageId}`,
  }),
});

export default API;
