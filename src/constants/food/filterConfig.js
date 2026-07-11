/**
 * =============================================================================
 * Food Filter Configuration
 * =============================================================================
 *
 * Defines the filter controls displayed on the Food Management page.
 *
 * This configuration is consumed by the generic FilterPanel component.
 *
 * Notes
 * -----
 * The `optionsKey` values must match the metadata response returned by the
 * backend (FoodMetadataResponse).
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

export const FOOD_FILTERS = Object.freeze([
  {
    id: "food-category",
    name: "foodCategory",
    label: "Food Category",
    placeholder: "All Categories",
    optionsKey: "foodCategories",
    colSize: 3,
  },

  {
    id: "cuisine-category",
    name: "cuisineType",
    label: "Cuisine",
    placeholder: "All Cuisines",
    optionsKey: "cuisineCategories",
    colSize: 3,
  },

  {
    id: "diet-category",
    name: "dietCategory",
    label: "Diet",
    placeholder: "All Diets",
    optionsKey: "dietCategories",
    colSize: 3,
  },

  {
    id: "food-status",
    name: "status",
    label: "Status",
    placeholder: "All Statuses",
    optionsKey: "foodStatuses",
    colSize: 3,
  },
]);
