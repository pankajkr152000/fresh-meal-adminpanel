/**
 * ============================================================================
 * Service: RestaurantContextStorage
 * Description: Manages session-scoped restaurant selection.
 *
 * Responsibilities:
 * - Persist the selected restaurant identifier for the current tab.
 * - Retrieve the selected restaurant identifier.
 * - Clear the selected restaurant identifier.
 *
 * This service does not authenticate users or authorize restaurant access.
 * The backend remains authoritative for restaurant ownership and permissions.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * ============================================================================
 */

const SELECTED_RESTAURANT_KEY = "freshmeal.restaurant.selected";

const RestaurantContextStorage = Object.freeze({
  /**
   * Persists the selected restaurant identifier for the current tab.
   *
   * @param {string} restaurantId selected restaurant identifier
   * @throws {TypeError} when the identifier is missing or invalid
   */
  save(restaurantId) {
    if (typeof restaurantId !== "string" || restaurantId.trim().length === 0) {
      throw new TypeError("A valid restaurant ID is required.");
    }

    window.sessionStorage.setItem(SELECTED_RESTAURANT_KEY, restaurantId.trim());
  },

  /**
   * Retrieves the selected restaurant identifier.
   *
   * @returns {string|null} selected restaurant identifier, if present
   */
  get() {
    const restaurantId = window.sessionStorage.getItem(SELECTED_RESTAURANT_KEY);

    return restaurantId && restaurantId.trim().length > 0 ? restaurantId : null;
  },

  /**
   * Clears the selected restaurant identifier.
   */
  clear() {
    window.sessionStorage.removeItem(SELECTED_RESTAURANT_KEY);
  },
});

export default RestaurantContextStorage;
