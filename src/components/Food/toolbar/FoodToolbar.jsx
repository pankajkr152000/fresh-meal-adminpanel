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
 * • Arrange toolbar components.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * Searching, filtering and state management are delegated to the parent.
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
    cuisineCategory: PropTypes.string,
    dietCategory: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,

  /**
   * Dropdown options.
   */
  options: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    cuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
    diets: PropTypes.arrayOf(PropTypes.string).isRequired,
    statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
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
