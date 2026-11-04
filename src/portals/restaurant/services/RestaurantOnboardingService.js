import apiClient from "../../../api/apiClient";
import { API } from "../../../config/apiEndpoints";

/**
 * Provides API operations for restaurant-owner onboarding.
 *
 * HTTP communication is centralized here so that React components
 * do not need to know endpoint details.
 */
const RestaurantOnboardingService = Object.freeze({
  /**
   * Retrieves onboarding statuses for all restaurants owned by
   * the authenticated restaurant owner.
   *
   * @returns {Promise} Axios response for the onboarding status request.
   */
  getOnboardingStatuses() {
    return apiClient.get(API.RESTAURANT.ONBOARDING_STATUS);
  },

  /**
   * Creates a restaurant and its initial branch for the authenticated owner.
   *
   * @param {Object} payload - Restaurant onboarding request.
   * @returns {Promise<Object>} Backend API response.
   */
  onboardRestaurant(payload) {
    return apiClient.post(API.RESTAURANT.ONBOARDING, payload);
  },
});

export default RestaurantOnboardingService;
