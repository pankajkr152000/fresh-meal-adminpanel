import PropTypes from "prop-types";
import { memo } from "react";

/**
 * =============================================================================
 * Component : CommonCheckbox
 * =============================================================================
 *
 * Enterprise reusable checkbox component.
 *
 * Responsibilities
 * ----------------
 * • Render Bootstrap checkbox.
 * • Display label.
 * • Display validation error.
 * • Controlled component.
 *
 * Contains no business logic.
 * =============================================================================
 */

const CommonCheckbox = ({
  label,
  name,
  checked,
  onChange,

  disabled = false,
  required = false,
  error = "",
  className = "",
}) => {
  const handleChange = (event) => {
    onChange(name, event.target.value);
  };
  return (
    <div className={className}>
      <div className="form-check">
        <input
          id={name}
          name={name}
          type="checkbox"
          className={`form-check-input ${error ? "is-invalid" : ""}`}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
        />

        {label && (
          <label
            htmlFor={name}
            className="form-check-label">
            {label}
          </label>
        )}

        {error && <div className="invalid-feedback d-block">{error}</div>}
      </div>
    </div>
  );
};

CommonCheckbox.propTypes = {
  label: PropTypes.string,

  name: PropTypes.string.isRequired,

  checked: PropTypes.bool.isRequired,

  onChange: PropTypes.func.isRequired,

  disabled: PropTypes.bool,

  required: PropTypes.bool,

  error: PropTypes.string,

  className: PropTypes.string,
};

export default memo(CommonCheckbox);
