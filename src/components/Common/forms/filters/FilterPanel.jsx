import PropTypes from "prop-types";
import { memo } from "react";

import FilterSelect from "./FilterSelect";

console.log("Imported FilterSelect:", FilterSelect);
/**
 * =============================================================================
 * Component : FilterPanel
 * =============================================================================
 *
 * Purpose
 * -------
 * Generic filter panel capable of rendering any collection of filters based on
 * configuration.
 *
 * Responsibilities
 * ----------------
 * • Render configured filter controls.
 * • Render Clear Filters button.
 * • Delegate filter changes to parent.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
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
  console.log("Inside FilterPanel Component");
  console.log("FilterPanel Component Loaded with config", config);
  console.log("Options Object:", options);

  config.forEach((filter) => {
    console.log(filter.label, filter.optionsKey, options[filter.optionsKey]);
  });
  return (
    <div className="row g-3 align-items-end">
      {config.map((filter) => (
        <FilterSelect
          key={filter.name}
          label={filter.label}
          name={filter.name}
          value={filters[filter.name] ?? ""}
          options={options[filter.optionsKey] ?? []}
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
  config: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,

      label: PropTypes.string.isRequired,

      placeholder: PropTypes.string.isRequired,

      optionsKey: PropTypes.string.isRequired,
    }),
  ).isRequired,

  filters: PropTypes.object.isRequired,

  options: PropTypes.object.isRequired,

  onChange: PropTypes.func.isRequired,

  onClear: PropTypes.func.isRequired,

  clearButtonText: PropTypes.string,
};

export default memo(FilterPanel);
