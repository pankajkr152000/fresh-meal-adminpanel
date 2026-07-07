import PropTypes from "prop-types";

import { FOOD_FILTERS } from "../../../constants/food";

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
 * • Supply Food filter configuration.
 * • Supply Food filter options.
 * • Forward user interactions.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * =============================================================================
 */

const FoodFilters = ({
  filters,

  categories,

  cuisines,

  diets,

  statuses,

  onChange,

  onClear,
}) => {
  return (
    <FilterPanel
      config={FOOD_FILTERS}
      filters={filters}
      options={{
        categories,
        cuisines,
        diets,
        statuses,
      }}
      onChange={onChange}
      onClear={onClear}
    />
  );
};

FoodFilters.propTypes = {
  filters: PropTypes.object.isRequired,

  categories: PropTypes.arrayOf(PropTypes.string).isRequired,

  cuisines: PropTypes.arrayOf(PropTypes.string).isRequired,

  diets: PropTypes.arrayOf(PropTypes.string).isRequired,

  statuses: PropTypes.arrayOf(PropTypes.string).isRequired,

  onChange: PropTypes.func.isRequired,

  onClear: PropTypes.func.isRequired,
};

export default FoodFilters;
