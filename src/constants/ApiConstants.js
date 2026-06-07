// src/constants/ApiConstants.js

export const API = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",

  FOOD: {
    CREATE: "/api/v1/foods",
    GET_ALL: "/api/v1/foods",
    GET_BY_ID: (id) => `/api/v1/foods/${id}`,
    UPDATE: (id) => `/api/v1/foods/${id}`,
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