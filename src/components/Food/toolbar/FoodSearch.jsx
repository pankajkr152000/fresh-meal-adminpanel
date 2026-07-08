import PropTypes from "prop-types";
import { memo } from "react";

console.log("Inside FoodSearch Component");
/**
 * =============================================================================
 * Component : FoodSearch
 * =============================================================================
 *
 * Purpose
 * -------
 * Renders the search input for the Food Management page.
 *
 * Responsibilities
 * ----------------
 * • Display a controlled search input.
 * • Notify parent when the search text changes.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * Search filtering and debouncing are handled by useFoodList.
 * =============================================================================
 */

const FoodSearch = ({
  value,
  onChange,
  placeholder = "Search food by name...",
}) => {
  console.log("Inside FoodSearch Component");
  /**
   * Handles search input changes.
   */
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="mb-3">
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-search" />
        </span>

        <input
          id="food-search"
          type="search"
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          autoComplete="off"
          aria-label="Search foods"
        />
      </div>
    </div>
  );
};

FoodSearch.propTypes = {
  value: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired,

  placeholder: PropTypes.string,
};

export default memo(FoodSearch);
