import PropTypes from "prop-types";
import { memo } from "react";

import displayOptionPropType from "../../../../prop-types/displayOptionPropType";

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
 * • This component intentionally contains no business logic.
 * • Options are expected to be DisplayOptionResponse objects received from the
 *   backend.
 *
 * @author Pankaj Kumar
 * @since 1.0
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
            key={option.value}
            value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

FilterSelect.propTypes = {
  /**
   * Field label.
   */
  label: PropTypes.string.isRequired,

  /**
   * Form field name.
   */
  name: PropTypes.string.isRequired,

  /**
   * Selected value.
   */
  value: PropTypes.string.isRequired,

  /**
   * Available options.
   */
  options: PropTypes.arrayOf(displayOptionPropType).isRequired,

  /**
   * Placeholder text.
   */
  placeholder: PropTypes.string.isRequired,

  /**
   * Change handler.
   */
  onChange: PropTypes.func.isRequired,
};

export default memo(FilterSelect);
