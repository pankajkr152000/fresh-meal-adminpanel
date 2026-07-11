import PropTypes from "prop-types";
import { memo } from "react";

import FilterSelect from "./FilterSelect";

/**
 * =============================================================================
 * Component : FilterPanel
 * =============================================================================
 *
 * Purpose
 * -------
 * Renders a reusable collection of filter controls based on the supplied
 * configuration.
 *
 * Responsibilities
 * ----------------
 * • Render filter dropdowns.
 * • Render the "Clear Filters" action.
 * • Delegate user interactions to the parent component.
 *
 * Notes
 * -----
 * • This component is completely generic.
 * • It has no knowledge of Food, Orders, Restaurants, or any domain model.
 * • Filter options are provided dynamically using the configuration object.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const FilterPanel = ({
  config,
  filters,
  options,
  onChange,
  onClear,
  clearButtonText = "Clear Filters",
}) => {
  return (
    <div className="row g-3 align-items-end">
      {config.map((filter) => (
        <FilterSelect
          key={filter.name}
          label={filter.label}
          name={filter.name}
          value={filters[filter.name] ?? ""}
          options={options?.[filter.optionsKey] ?? []}
          placeholder={filter.placeholder}
          onChange={onChange}
        />
      ))}

      <div className="col-md-auto">
        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          onClick={onClear}>
          {clearButtonText}
        </button>
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  /**
   * Filter configuration.
   */
  config: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      optionsKey: PropTypes.string.isRequired,
    }),
  ).isRequired,

  /**
   * Current filter values.
   */
  filters: PropTypes.object.isRequired,

  /**
   * Available filter options keyed by configuration.
   */
  options: PropTypes.object.isRequired,

  /**
   * Invoked when a filter value changes.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Clears all active filters.
   */
  onClear: PropTypes.func.isRequired,

  /**
   * Text displayed on the clear button.
   */
  clearButtonText: PropTypes.string,
};

export default memo(FilterPanel);
