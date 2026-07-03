import axios from "axios";
import { API } from "../constants/ApiConstants";
import apiClient from "./ApiClient";

/**
 * Food Service.
 *
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
};

export default FoodService;
