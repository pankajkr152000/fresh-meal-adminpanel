import axios from "axios";
import API from "../constants/ApiConstants";

/**
 * Food Metadata Service.
 *
 * Responsibilities:
 * - Load food-related metadata.
 * - Populate dropdowns dynamically.
 *
 * Metadata includes:
 * - Food Categories
 * - Diet Categories
 * - Cuisine Types
 */
const FoodMetadataService = {
  /**
   * Fetches metadata required by food forms.
   * {FOOD_METADATA: `${BASE_URL}/api/foods/foodCategoryMetadata`}
   * @returns {Promise<Object>}
   */
  getMetadata: async () => {
    console.log("Calling URL:", API.FOOD.FOOD_METADATA);

    const response = await axios.get(API.FOOD.FOOD_METADATA);

    console.log("Metadata Response:", response.data);

    return response.data;
  },
};

export default FoodMetadataService;
