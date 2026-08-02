import PropTypes from "prop-types";
import { memo } from "react";

/**
 * =============================================================================
 * Component : CommonInput
 * =============================================================================
 *
 * Purpose
 * -------
 * Enterprise reusable input component for text, number, email, password,
 * search and other HTML input types.
 *
 * Responsibilities
 * ----------------
 * • Render a Bootstrap styled input.
 * • Display label and required indicator.
 * • Display validation errors.
 * • Support controlled component usage.
 * • Delegate all business logic to the parent.
 *
 * Notes
 * -----
 * • Contains no business logic.
 * • Suitable for Add/Edit forms across the application.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const CommonInput = ({
  label,
  name,

  value,

  onChange,

  type = "text",

  placeholder = "",

  required = false,

  disabled = false,

  readOnly = false,

  min,

  max,

  step,

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

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        className={`form-control ${error ? "is-invalid" : ""}`}
      />

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CommonInput.propTypes = {
  label: PropTypes.string,

  name: PropTypes.string.isRequired,

  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  onChange: PropTypes.func.isRequired,

  type: PropTypes.oneOf([
    "text",
    "number",
    "email",
    "password",
    "search",
    "tel",
    "url",
    "date",
    "time",
    "datetime-local",
  ]),

  placeholder: PropTypes.string,

  required: PropTypes.bool,

  disabled: PropTypes.bool,

  readOnly: PropTypes.bool,

  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  error: PropTypes.string,

  className: PropTypes.string,
};

export default memo(CommonInput);
