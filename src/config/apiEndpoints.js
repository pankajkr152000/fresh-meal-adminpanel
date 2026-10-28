/**
 * ============================================================================
 * Constants: API Endpoints
 * ============================================================================
 *
 * Centralized registry of backend API endpoint definitions for FreshMeal.
 *
 * Endpoint paths are relative to API_BASE_URL, configured in ApiConfig.js
 * and used by the shared Axios client.
 *
 * Frontend navigation paths must remain in RouteConstants.js.
 *
 * Guidelines:
 * - Preserve existing endpoint paths unless the backend contract changes.
 * - Match every endpoint to its Spring Boot controller mapping.
 * - Encode and validate dynamic path parameters.
 * - Keep endpoint definitions immutable.
 * - Keep request methods and HTTP configuration inside API services.
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

/**
 * Validates and encodes a dynamic URL path parameter.
 *
 * @param {*} value the parameter value
 * @param {string} parameterName the parameter's descriptive name
 * @returns {string} the URL-encoded parameter
 * @throws {TypeError} when the parameter is missing or blank
 */
const encodePathParameter = (value, parameterName) => {
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new TypeError(
      `${parameterName} is required to build the API endpoint.`,
    );
  }

  return encodeURIComponent(String(value));
};

/**
 * Centralized API endpoint registry.
 *
 * Add an endpoint only after confirming its corresponding backend mapping.
 */
export const API = Object.freeze({
  // --------------------------------------------------------------------------
  // Authentication
  // --------------------------------------------------------------------------

  AUTHENTICATION: Object.freeze({
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REFRESH_TOKEN: "/api/auth/refresh-token",

    // Verify the exact controller mappings before adding registration,
    // email verification, OTP, password reset, and session endpoints.
  }),

  // --------------------------------------------------------------------------
  // User Management
  // --------------------------------------------------------------------------

  USER: Object.freeze({
    // Add confirmed user profile, account, and role-related endpoints here.
  }),

  // --------------------------------------------------------------------------
  // Food Management
  // --------------------------------------------------------------------------

  FOOD: Object.freeze({
    // Metadata
    FOOD_METADATA: "/api/foods/foodCategoryMetadata",
    FOOD_CUISINE_METADATA: "/api/foods/metadata/cuisine-categories",

    // Create
    ADD_FOOD: "/api/foods/add",

    // Compatibility alias. Remove only after migrating existing consumers.
    CREATE: "/api/foods/add",

    // Read
    GET_ALL_FOODS: "/api/foods/readAllFoods",
    GET_FOOD_BY_ID: "/api/foods/view",

    // Update
    EDIT_FOOD: "/api/foods/edit",

    // Versioned API paths retained for existing consumers.
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
  // Image Management
  // --------------------------------------------------------------------------

  IMAGE: Object.freeze({
    UPLOAD: "/api/v1/images/upload",

    DELETE: (imageId) =>
      `/api/v1/images/${encodePathParameter(imageId, "Image ID")}`,

    // Restaurant cover and branch photo workflows should reuse these
    // endpoints only after confirming the backend supports their image types
    // and ownership rules.
  }),

  // --------------------------------------------------------------------------
  // Restaurant Management
  // --------------------------------------------------------------------------

  RESTAURANT: Object.freeze({
    // Onboarding
    ONBOARDING: "/api/restaurants/onboarding",
    ONBOARDING_STATUS: "/api/restaurants/onboarding/status",

    // Add confirmed restaurant read/update/status endpoints here.
  }),

  // --------------------------------------------------------------------------
  // Restaurant Branch Management
  // --------------------------------------------------------------------------

  RESTAURANT_BRANCH: Object.freeze({
    // Add confirmed branch read/update/status endpoints here.
    // Do not assume branch routes follow a particular URL convention.
  }),

  // --------------------------------------------------------------------------
  // Address and Location Services
  // --------------------------------------------------------------------------

  PINCODE: Object.freeze({
    LOOKUP: "/api/pincodes/lookup",
  }),

  // --------------------------------------------------------------------------
  // Cart Management
  // --------------------------------------------------------------------------

  CART: Object.freeze({
    // Add confirmed active-cart, item-management, refresh, and cart-status
    // endpoint mappings from the Cart controllers.
  }),

  // --------------------------------------------------------------------------
  // Checkout Management
  // --------------------------------------------------------------------------

  CHECKOUT: Object.freeze({
    // Add confirmed checkout creation, retrieval, validation, and lifecycle
    // endpoint mappings from the Checkout controllers.
  }),

  // --------------------------------------------------------------------------
  // Order Management
  // --------------------------------------------------------------------------

  ORDER: Object.freeze({
    GET_ALL: "/api/v1/orders",

    GET_BY_ID: (id) => `/api/v1/orders/${encodePathParameter(id, "Order ID")}`,

    UPDATE_STATUS: (id) =>
      `/api/v1/orders/${encodePathParameter(id, "Order ID")}/status`,

    // Add confirmed customer, restaurant, delivery, cancellation, and
    // order-history endpoints when their controller mappings are available.
  }),
});

export default API;
