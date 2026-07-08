import PropTypes from "prop-types";
import { memo } from "react";

/**
 * =============================================================================
 * Component : FilterSelect
 * =============================================================================
 *
 * Purpose
 * -------
 * Generic reusable select component used by filter panels throughout the
 * application.
 *
 * Responsibilities
 * ----------------
 * • Display a labeled select input.
 * • Render selectable options.
 * • Raise change events.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * =============================================================================
 */

const FilterSelect = ({
  label,
  name,
  value,
  options,
  placeholder,
  onChange,
}) => {
  console.log("Inside FilterSelect Component");
  console.log("================================");
  console.log("Filter:", label);
  console.log("Options:", options);
  console.log("Is Array:", Array.isArray(options));
  console.log("Length:", options?.length);
  console.log("================================");
  return (
    <div className="col-md-3">
      <label
        htmlFor={name}
        className="form-label fw-semibold">
        {label}
      </label>

      <select
        id={name}
        name={name}
        className="form-select"
        value={value}
        onChange={onChange}>
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={option}
            value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

FilterSelect.propTypes = {
  label: PropTypes.string.isRequired,

  name: PropTypes.string.isRequired,

  value: PropTypes.string.isRequired,

  options: PropTypes.arrayOf(PropTypes.string).isRequired,

  placeholder: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired,
};

export default memo(FilterSelect);
