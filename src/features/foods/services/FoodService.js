import apiClient from "../../../api/apiClient";
import { API } from "../../../global/constants/ApiConstants";

/**
 * ============================================================================
 * Food Service
 * ============================================================================
 *
 * Responsibilities:
 * - Create food
 * - Retrieve foods
 * - Retrieve food details
 * - Update food
 * - Update food status
 * - Retrieve archived foods
 * - Archive food
 * - Bulk archive foods
 * - Restore food
 * - Bulk restore foods
 * - Permanently delete food
 * - Bulk permanently delete foods
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
    const response = await apiClient.post(API.FOOD.ADD_FOOD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

  /**
   * ============================================================================
   * Retrieve Archived Foods
   * ============================================================================
   *
   * Retrieves all foods currently archived.
   *
   * @param {AbortSignal} signal Abort signal.
   * @returns {Promise} API response.
   */
  getArchivedFoods: async (signal) => {
    const response = await apiClient.get(API.FOOD.GET_ARCHIVED_FOODS, {
      signal,
    });

    return response.data;
  },

  // ==========================================================================
  // Archive
  // ==========================================================================

  /**
   * Archive a single food.
   *
   * Request:
   * {
   *   foodId: "..."
   * }
   *
   * @param {string} foodId
   * @returns {Promise<Object>}
   */
  archiveFood: async (foodId) => {
    const response = await apiClient.patch(API.FOOD.ARCHIVE_FOOD, {
      foodId,
    });

    return response.data;
  },

  /**
   * Archive multiple foods.
   *
   * Request:
   * {
   *   foodIds: ["...", "..."]
   * }
   *
   * @param {string[]} foodIds
   * @returns {Promise<Object>}
   */
  bulkArchiveFoods: async (foodIds) => {
    const response = await apiClient.patch(API.FOOD.BULK_ARCHIVE_FOOD, {
      foodIds,
    });

    return response.data;
  },

  // ==========================================================================
  // Restore
  // ==========================================================================

  /**
   * Restore a single archived food.
   *
   * Request:
   * {
   *   foodId: "..."
   * }
   *
   * @param {string} foodId
   * @returns {Promise<Object>}
   */
  restoreFood: async (foodId) => {
    const response = await apiClient.patch(API.FOOD.RESTORE_FOOD, {
      foodId,
    });

    return response.data;
  },

  /**
   * Restore multiple archived foods.
   *
   * Request:
   * {
   *   foodIds: ["...", "..."]
   * }
   *
   * @param {string[]} foodIds
   * @returns {Promise<Object>}
   */
  bulkRestoreFoods: async (foodIds) => {
    const response = await apiClient.patch(API.FOOD.BULK_RESTORE_FOOD, {
      foodIds,
    });

    return response.data;
  },

  // ==========================================================================
  // Permanent Delete
  // ==========================================================================

  /**
   * Permanently delete a single food.
   *
   * Request:
   * {
   *   foodId: "..."
   * }
   *
   * @param {string} foodId
   * @returns {Promise<Object>}
   */
  deleteFood: async (foodId) => {
    const response = await apiClient.delete(API.FOOD.PERMANENT_DELETE_FOOD, {
      data: {
        foodId,
      },
    });

    return response.data;
  },

  /**
   * Permanently delete multiple foods.
   *
   * Request:
   * {
   *   foodIds: ["...", "..."]
   * }
   *
   * @param {string[]} foodIds
   * @returns {Promise<Object>}
   */
  bulkDeleteFoods: async (foodIds) => {
    const response = await apiClient.delete(
      API.FOOD.BULK_PERMANENT_DELETE_FOOD,
      {
        data: {
          foodIds,
        },
      },
    );

    return response.data;
  },
};

export default FoodService;
