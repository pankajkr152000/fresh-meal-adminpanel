import axios from "axios";
import apiClient from "../api/apiClient";
import { API } from "../constants/ApiConstants";

/**
 * ============================================================================
 * Food Service
 * ============================================================================
 *
 * Responsibilities:
 * - Create food
 * - Retrieve foods
 * - Retrieve food details
 * - Update food status
 *
 * Future Enhancements:
 * - Pagination
 * - Search
 * - Bulk Upload
 * ============================================================================
 */

const FoodService = {
  /**
   * Create Food
   *
   * @param {FormData} formData
   * @returns {Promise<Object>}
   */
  addFood: async (formData) => {
    const response = await axios.post(API.FOOD.ADD_FOOD, formData);
    return response.data;
  },

  /**
   * Retrieve All Foods
   *
   * @param {AbortSignal} signal
   * @returns {Promise<Object>}
   */
  getAllFoods: async (signal) => {
    const response = await apiClient.get(API.FOOD.GET_ALL_FOODS, {
      signal,
    });

    return response.data;
  },

  /**
   * Update Food Status
   *
   * @param {string} id
   * @param {string} status
   * @returns {Promise<Object>}
   */
  updateFoodStatus: async (id, status) => {
    const response = await apiClient.patch(API.FOOD.UPDATE_FOOD_STATUS(id), {
      status,
    });

    return response.data;
  },

  /**
   * Retrieve Food Details
   *
   * Backend Response:
   *
   * {
   *   success,
   *   message,
   *   data : {
   *      data : FoodResponse,
   *      navigation : EntityNavigation
   *   }
   * }
   *
   * @param {string} foodId
   * @returns {Promise<Object>}
   */
  getFoodById: async (foodId) => {
    const response = await apiClient.post(API.FOOD.GET_FOOD_BY_ID, {
      foodId,
    });

    return response.data;
  },

  /**
   * Update Food
   *
   * Updates an existing food item.
   *
   * @param {FormData} formData
   * @returns {Promise<Object>}
   */
  editFood: async (formData) => {
    const response = await apiClient.put(API.FOOD.EDIT_FOOD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};

export default FoodService;
