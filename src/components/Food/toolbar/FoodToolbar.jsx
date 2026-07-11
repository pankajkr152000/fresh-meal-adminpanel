import PropTypes from "prop-types";
import { memo } from "react";

import FoodFilters from "./FoodFilters";
import FoodSearch from "./FoodSearch";

/**
 * =============================================================================
 * Component : FoodToolbar
 * =============================================================================
 *
 * Purpose
 * -------
 * Composes the search and filter controls for the Food Management page.
 *
 * Responsibilities
 * ----------------
 * • Render the search section.
 * • Render the filter section.
 * • Delegate user interactions to the parent.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * =============================================================================
 */

const FoodToolbar = ({
  search,
  filters,
  options,
  onSearchChange,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="mb-4">
      <FoodSearch
        value={search}
        onChange={onSearchChange}
      />

      <div className="mt-3">
        <FoodFilters
          filters={filters}
          options={options}
          onChange={onFilterChange}
          onClear={onClearFilters}
        />
      </div>
    </div>
  );
};

const displayOptionType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

FoodToolbar.propTypes = {
  /**
   * Current search value.
   */
  search: PropTypes.string.isRequired,

  /**
   * Current filter values.
   */
  filters: PropTypes.shape({
    foodCategory: PropTypes.string,
    cuisineType: PropTypes.string,
    dietCategory: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,

  /**
   * Metadata received from backend.
   */
  options: PropTypes.shape({
    foodCategories: PropTypes.arrayOf(displayOptionType).isRequired,

    cuisineCategories: PropTypes.arrayOf(displayOptionType).isRequired,

    dietCategories: PropTypes.arrayOf(displayOptionType).isRequired,

    groupCategories: PropTypes.arrayOf(displayOptionType).isRequired,

    foodStatuses: PropTypes.arrayOf(displayOptionType).isRequired,
  }).isRequired,

  /**
   * Search handler.
   */
  onSearchChange: PropTypes.func.isRequired,

  /**
   * Filter change handler.
   */
  onFilterChange: PropTypes.func.isRequired,

  /**
   * Clear filters handler.
   */
  onClearFilters: PropTypes.func.isRequired,
};

export default memo(FoodToolbar);
