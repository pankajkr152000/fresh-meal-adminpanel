import PropTypes from "prop-types";
import { memo } from "react";

/**
 * =============================================================================
 * Component : CommonTextarea
 * =============================================================================
 *
 * Purpose
 * -------
 * Enterprise reusable textarea component used throughout the application.
 *
 * Responsibilities
 * ----------------
 * • Render a Bootstrap styled textarea.
 * • Display label and required indicator.
 * • Display validation errors.
 * • Support controlled component usage.
 * • Delegate all business logic to the parent.
 *
 * Notes
 * -----
 * • Contains no business logic.
 * • Suitable for descriptions, notes, comments and long text fields.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const CommonTextarea = ({
  label,
  name,

  value,

  onChange,

  rows = 4,

  placeholder = "",

  required = false,

  disabled = false,

  readOnly = false,

  maxLength,

  error = "",

  className = "",
}) => {
  const handleChange = (event) => {
    onChange(name, event.target.value);
  };
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="form-label fw-semibold">
          {label}

          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        className={`form-control ${error ? "is-invalid" : ""}`}
      />

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CommonTextarea.propTypes = {
  /**
   * Field label.
   */
  label: PropTypes.string,

  /**
   * Field name.
   */
  name: PropTypes.string.isRequired,

  /**
   * Controlled value.
   */
  value: PropTypes.string,

  /**
   * Change handler.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Number of visible rows.
   */
  rows: PropTypes.number,

  /**
   * Placeholder text.
   */
  placeholder: PropTypes.string,

  /**
   * Required indicator.
   */
  required: PropTypes.bool,

  /**
   * Disabled state.
   */
  disabled: PropTypes.bool,

  /**
   * Read-only state.
   */
  readOnly: PropTypes.bool,

  /**
   * Maximum allowed characters.
   */
  maxLength: PropTypes.number,

  /**
   * Validation error.
   */
  error: PropTypes.string,

  /**
   * Wrapper css classes.
   */
  className: PropTypes.string,
};

export default memo(CommonTextarea);
