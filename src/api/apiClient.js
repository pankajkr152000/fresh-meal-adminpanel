import axios from "axios";

/**
 * =============================================================================
 * API Client
 * =============================================================================
 *
 * Purpose
 * -------
 * Provides a centralized Axios instance for all HTTP communication.
 *
 * Responsibilities
 * ----------------
 * • Configure the application's base URL.
 * • Apply default request headers.
 * • Set request timeout.
 * • Handle global request/response interception.
 *
 * Notes
 * -----
 * All services (FoodService, RestaurantService, OrderService, etc.)
 * must use this client instead of creating their own Axios instances.
 * =============================================================================
 */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * =============================================================================
 * Request Interceptor
 * =============================================================================
 *
 * Used to:
 * • Attach authentication tokens.
 * • Add correlation IDs.
 * • Log outgoing requests.
 * */

apiClient.interceptors.request.use(
  (config) => {
    // Example:
    // const token = localStorage.getItem("accessToken");
    //
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * =============================================================================
 * Response Interceptor
 * =============================================================================
 *
 * Used to:
 * • Handle unauthorized responses.
 * • Normalize API errors.
 * • Log failed requests.
 * */

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      // Future:
      // Redirect to login page.
      // Clear authentication.
    }

    return Promise.reject(error);
  },
);

export default apiClient;
