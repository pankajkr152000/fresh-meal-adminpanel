import axios from "axios";
import { API } from "../constants/ApiConstants";
import apiClient from "./ApiClient";

/**
 * Food Service.
 * File location : src/services/FoodService.js
 * Responsibilities:
 * - Create food items.
 * - Update food items.
 * - Delete food items.
 * - Retrieve food information.
 *
 * Future Enhancements:
 * - Pagination support.
 * - Search support.
 * - Bulk upload support.
 */
const FoodService = {
  /**
   * Creates a new food item.
   *
   * @param {FormData} formData
   * @returns {Promise<Object>}
   */
  addFood: async (formData) => {
    const response = await axios.post(API.FOOD.ADD_FOOD, formData);

    return response.data;
  },
  getAllFoods: async (signal) => {
    const response = await apiClient.get(API.FOOD.GET_ALL_FOODS, {
      signal,
    });
    return response.data;
  },
  /**
   * Updates only the lifecycle status of a food item.
   *
   * PATCH /api/admin/foods/{foodId}/status
   */
  updateFoodStatus: async (id, status) => {
    const response = await apiClient.patch(API.FOOD.UPDATE_FOOD_STATUS(id), {
      status,
    });
    return response.data;
  },

  /**
   *
   * @param {*} foodId
   * @returns
   */
  getFoodById: async (foodId) => {
    const response = await apiClient.get(API.FOOD.GET_FOOD_BY_ID(foodId));

    return response.data;
  },
};

export default FoodService;
