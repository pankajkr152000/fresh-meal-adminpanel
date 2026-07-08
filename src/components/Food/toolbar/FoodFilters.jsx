import PropTypes from "prop-types";

import { FOOD_FILTERS } from "../../../constants/food";

import { FilterPanel } from "../../common/forms/filters";

console.log("Imported FilterPanel:", FilterPanel);
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

  options,

  onChange,

  onClear,
}) => {
  console.log("Inside FoodFilters Component");
  console.log("FoodFilters Component loaded with filters:", filters);
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
  filters: PropTypes.object.isRequired,

  options: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    cuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
    diets: PropTypes.arrayOf(PropTypes.string).isRequired,
    statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,

  onChange: PropTypes.func.isRequired,

  onClear: PropTypes.func.isRequired,
};

export default FoodFilters;
