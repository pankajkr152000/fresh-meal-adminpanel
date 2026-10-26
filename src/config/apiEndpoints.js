/**
 * ============================================================================
 * Constants: API Endpoints
 * ============================================================================
 *
 * Centralized backend API endpoint definitions for FreshMeal.
 *
 * Endpoint paths are relative to API_BASE_URL, which is configured separately
 * in ApiConfig.js and used by the shared Axios client.
 *
 * Frontend navigation paths belong in RouteConstants.js.
 *
 * IMPORTANT:
 * Endpoint paths must match the actual Spring Boot controller mappings.
 * Existing paths are retained during this refactor.
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

const encodePathParameter = (value, parameterName) => {
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new TypeError(
      `${parameterName} is required to build the API endpoint.`,
    );
  }

  return encodeURIComponent(String(value));
};

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

    // Create
    ADD_FOOD: "/api/foods/add",

    // Compatibility alias; remove only after migrating existing consumers.
    CREATE: "/api/foods/add",

    // Read
    GET_ALL_FOODS: "/api/foods/readAllFoods",
    GET_FOOD_BY_ID: "/api/foods/view",

    // Update
    EDIT_FOOD: "/api/foods/edit",

    UPDATE: (id) => `/api/v1/foods/${encodePathParameter(id, "Food ID")}`,

    UPDATE_FOOD_STATUS: (id) =>
      `/api/foods/${encodePathParameter(id, "Food ID")}/status`,

    // Delete
    DELETE: (id) => `/api/v1/foods/${encodePathParameter(id, "Food ID")}`,

    // Archived food management
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

    GET_BY_ID: (id) => `/api/v1/orders/${encodePathParameter(id, "Order ID")}`,

    UPDATE_STATUS: (id) =>
      `/api/v1/orders/${encodePathParameter(id, "Order ID")}/status`,
  }),

  // --------------------------------------------------------------------------
  // Image Management
  // --------------------------------------------------------------------------

  IMAGE: Object.freeze({
    UPLOAD: "/api/v1/images/upload",

    DELETE: (imageId) =>
      `/api/v1/images/${encodePathParameter(imageId, "Image ID")}`,
  }),
});

export default API;
