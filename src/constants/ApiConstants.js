// src/constants/ApiConstants.js

/**
 * Backend Base URL.   localhost:8030/api/foods/foodCategoryMetadata
 */
export const BASE_URL = "http://localhost:8030";

export const API = {
  FOOD: {
    FOOD_METADATA: `${BASE_URL}/api/foods/foodCategoryMetadata`,
    ADD_FOOD: `${BASE_URL}/api/foods/add`,
    CREATE: `${BASE_URL}/api/foods/add`,
    GET_ALL_FOODS: `${BASE_URL}/api/foods/readAllFoods`,
    // GET_FOOD_BY_ID: (foodId) => `${BASE_URL}/api/foods/view/${foodId}`,
    GET_FOOD_BY_ID: `${BASE_URL}/api/foods/view`,
    UPDATE: (id) => `/api/v1/foods/${id}`,
    UPDATE_FOOD_STATUS: (id) => `${BASE_URL}/api/foods/${id}/status`,
    DELETE: (id) => `/api/v1/foods/${id}`,
  },

  ORDER: {
    GET_ALL: "/api/v1/orders",
    GET_BY_ID: (id) => `/api/v1/orders/${id}`,
    UPDATE_STATUS: (id) => `/api/v1/orders/${id}/status`,
  },

  IMAGE: {
    UPLOAD: "/api/v1/images/upload",
    DELETE: (imageId) => `/api/v1/images/${imageId}`,
  },
};

export default API;
