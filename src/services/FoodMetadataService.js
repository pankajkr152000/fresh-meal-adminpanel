import apiClient from "../api/apiClient";
import API from "../constants/ApiConstants";

/**
 * =============================================================================
 * Service : FoodMetadataService
 * =============================================================================
 *
 * Purpose
 * -------
 * Provides access to food-related metadata required by the frontend.
 *
 * Responsibilities
 * ----------------
 * • Retrieve food metadata from the backend.
 * • Expose metadata for UI components.
 *
 * Notes
 * -----
 * This service performs no business logic.
 * It only communicates with backend APIs.
 *
 * Metadata includes:
 * • Food Categories
 * • Diet Categories
 * • Cuisine Categories
 * • Group Categories
 * • Food Statuses
 * =============================================================================
 */

const FoodMetadataService = {
  /**
   * Retrieves food metadata.
   *
   * @returns {Promise<Object>} Food metadata response.
   */
  async getMetadata(signal) {
    const response = await apiClient.get(API.FOOD.FOOD_METADATA, {
      signal,
    });

    return response.data;
  },
};

export default FoodMetadataService;
