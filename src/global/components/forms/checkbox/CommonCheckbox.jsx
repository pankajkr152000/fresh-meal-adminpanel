import PropTypes from "prop-types";
import { memo, useEffect, useRef } from "react";
import "./commonCheckboxStyle.css";
/**
 * ============================================================================
 * Component : CommonCheckbox
 * ============================================================================
 *
 * Enterprise reusable controlled checkbox component.
 *
 * Responsibilities
 * ----------------
 * • Render Bootstrap checkbox.
 * • Display label.
 * • Display validation error.
 * • Support controlled checked state.
 * • Support indeterminate state.
 *
 * Contains no business logic.
 * ============================================================================
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
  indeterminate = false,
}) => {
  const checkboxRef = useRef(null);

  /**
   * Synchronize native checkbox indeterminate state.
   *
   * The indeterminate property is not a normal HTML attribute,
   * therefore it must be assigned directly to the DOM element.
   */
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event) => {
    onChange(name, event.target.checked);
  };

  return (
    <div className={`form-check ${className}`}>
      <input
        ref={checkboxRef}
        id={name}
        name={name}
        type="checkbox"
        className={`form-check-input freshmeal-checkbox ${error ? "is-invalid" : ""}`}
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

  indeterminate: PropTypes.bool,
};

export default memo(CommonCheckbox);
