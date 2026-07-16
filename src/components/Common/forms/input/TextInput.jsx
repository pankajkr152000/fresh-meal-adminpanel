import PropTypes from "prop-types";
import { memo } from "react";

/**
 * =============================================================================
 * Component : TextInput
 * =============================================================================
 *
 * Purpose
 * -------
 * Generic reusable Bootstrap text input component.
 *
 * Responsibilities
 * ----------------
 * • Render a labeled input field.
 * • Display validation feedback.
 * • Forward change events.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic and can be reused
 * throughout the application.
 * =============================================================================
 */

const TextInput = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  disabled = false,
  required = false,
  readOnly = false,
  error = "",
  autoComplete = "off",
  className = "",
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="form-label fw-semibold">
          {label}

          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />

      {error && (
        <div
          id={`${id}-error`}
          className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

TextInput.propTypes = {
  /**
   * Input id.
   */
  id: PropTypes.string.isRequired,

  /**
   * Input name.
   */
  name: PropTypes.string.isRequired,

  /**
   * Label text.
   */
  label: PropTypes.string,

  /**
   * Input value.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /**
   * Change handler.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Placeholder text.
   */
  placeholder: PropTypes.string,

  /**
   * HTML input type.
   */
  type: PropTypes.oneOf([
    "text",
    "number",
    "email",
    "password",
    "search",
    "url",
    "tel",
    "date",
  ]),

  /**
   * Disabled state.
   */
  disabled: PropTypes.bool,

  /**
   * Required state.
   */
  required: PropTypes.bool,

  /**
   * Read-only state.
   */
  readOnly: PropTypes.bool,

  /**
   * Validation message.
   */
  error: PropTypes.string,

  /**
   * Browser autocomplete.
   */
  autoComplete: PropTypes.string,

  /**
   * Additional wrapper CSS classes.
   */
  className: PropTypes.string,
};

export default memo(TextInput);
