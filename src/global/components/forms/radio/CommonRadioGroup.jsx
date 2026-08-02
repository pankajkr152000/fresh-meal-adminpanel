import PropTypes from "prop-types";
import { memo } from "react";

/**
 * =============================================================================
 * Component : CommonRadioGroup
 * =============================================================================
 *
 * Enterprise reusable radio button group.
 *
 * Supports DisplayOption style options:
 *
 * [
 *   { label:"Veg", value:"VEG" }
 * ]
 * =============================================================================
 */

const CommonRadioGroup = ({
  label,
  name,

  value,

  options,

  onChange,

  required = false,

  disabled = false,

  error = "",

  className = "",
}) => {
  const handleChange = (event) => {
    onChange(name, event.target.value);
  };
  return (
    <div className={className}>
      {label && (
        <label className="form-label fw-semibold">
          {label}

          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      <div>
        {options.map((option) => (
          <div
            className="form-check form-check-inline"
            key={option.value}>
            <input
              id={`${name}-${option.value}`}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={disabled}
              onChange={handleChange}
              className={`form-check-input ${error ? "is-invalid" : ""}`}
            />

            <label
              htmlFor={`${name}-${option.value}`}
              className="form-check-label">
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {error && <div className="text-danger small">{error}</div>}
    </div>
  );
};

CommonRadioGroup.propTypes = {
  label: PropTypes.string,

  name: PropTypes.string.isRequired,

  value: PropTypes.string,

  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,

  onChange: PropTypes.func.isRequired,

  required: PropTypes.bool,

  disabled: PropTypes.bool,

  error: PropTypes.string,

  className: PropTypes.string,
};

export default memo(CommonRadioGroup);
