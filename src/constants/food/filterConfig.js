/**
 * =============================================================================
 * Food Filter Configuration
 * =============================================================================
 *
 * Defines the filter controls displayed on the Food Management page.
 *
 * This configuration is consumed by the generic FilterPanel component.
 *
 * =============================================================================
 */

export const FOOD_FILTERS = Object.freeze([
  {
    id: "food-category",
    name: "foodCategory",
    label: "Food Category",
    placeholder: "All Categories",
    optionsKey: "categories",
    colSize: 3,
  },

  {
    id: "cuisine-category",
    name: "cuisineCategory",
    label: "Cuisine",
    placeholder: "All Cuisines",
    optionsKey: "cuisines",
    colSize: 3,
  },

  {
    id: "diet-category",
    name: "dietCategory",
    label: "Diet",
    placeholder: "All Diets",
    optionsKey: "diets",
    colSize: 3,
  },

  {
    id: "food-status",
    name: "status",
    label: "Status",
    placeholder: "All Status",
    optionsKey: "statuses",
    colSize: 3,
  },
]);
