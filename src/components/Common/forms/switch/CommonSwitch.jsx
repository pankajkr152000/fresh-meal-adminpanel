import PropTypes from "prop-types";
import { memo } from "react";

/**
 * =============================================================================
 * Component : CommonSwitch
 * =============================================================================
 *
 * Enterprise reusable Bootstrap switch.
 *
 * Responsibilities
 * ----------------
 * • Controlled component.
 * • Label.
 * • Validation.
 * • No business logic.
 * =============================================================================
 */

const CommonSwitch = ({
  label,
  name,

  checked,
  onChange,
  disabled = false,

  error = "",

  className = "",
}) => {
  const handleChange = (event) => {
    onChange(name, event.target.value);
  };
  return (
    <div className={className}>
      <div className="form-check form-switch">
        <input
          id={name}
          type="checkbox"
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className={`form-check-input ${error ? "is-invalid" : ""}`}
        />

        {label && (
          <label
            htmlFor={name}
            className="form-check-label">
            {label}
          </label>
        )}
      </div>

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

CommonSwitch.propTypes = {
  label: PropTypes.string,

  name: PropTypes.string.isRequired,

  checked: PropTypes.bool.isRequired,

  onChange: PropTypes.func.isRequired,

  disabled: PropTypes.bool,

  error: PropTypes.string,

  className: PropTypes.string,
};

export default memo(CommonSwitch);
