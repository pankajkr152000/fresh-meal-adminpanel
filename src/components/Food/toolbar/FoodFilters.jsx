import PropTypes from "prop-types";

import { FOOD_FILTERS } from "../../../constants/food";

import displayOptionPropType from "../../../prop-types/displayOptionPropType";

import { FilterPanel } from "../../common/forms/filters";

/**
 * =============================================================================
 * Component : FoodFilters
 * =============================================================================
 *
 * Purpose
 * -------
 * Food-specific wrapper around the reusable FilterPanel component.
 *
 * Responsibilities
 * ----------------
 * • Supply food filter configuration.
 * • Supply food metadata options.
 * • Forward user interactions.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const FoodFilters = ({ filters, options, onChange, onClear }) => {
  return (
    <FilterPanel
      config={FOOD_FILTERS}
      filters={filters}
      options={options}
      onChange={onChange}
      onClear={onClear}
    />
  );
};

FoodFilters.propTypes = {
  /**
   * Current filter values.
   */
  filters: PropTypes.object.isRequired,

  /**
   * Food metadata received from backend.
   */
  options: PropTypes.shape({
    foodCategories: PropTypes.arrayOf(displayOptionPropType).isRequired,

    cuisineCategories: PropTypes.arrayOf(displayOptionPropType).isRequired,

    dietCategories: PropTypes.arrayOf(displayOptionPropType).isRequired,

    groupCategories: PropTypes.arrayOf(displayOptionPropType).isRequired,

    foodStatuses: PropTypes.arrayOf(displayOptionPropType).isRequired,
  }).isRequired,

  /**
   * Filter change handler.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Clear filter handler.
   */
  onClear: PropTypes.func.isRequired,
};

export default FoodFilters;
