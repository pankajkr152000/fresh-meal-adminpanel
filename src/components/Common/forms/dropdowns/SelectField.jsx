import PropTypes from "prop-types";
import { memo } from "react";

/**
 * =============================================================================
 * Component : SelectField
 * =============================================================================
 *
 * Purpose
 * -------
 * Generic reusable Bootstrap select component.
 *
 * Responsibilities
 * ----------------
 * • Render a labeled select field.
 * • Render selectable options.
 * • Display validation feedback.
 * • Forward change events.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * It can be reused across every feature module in the application.
 * =============================================================================
 */

const SelectField = ({
  id,
  name,
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  required = false,
  error = "",
  className = "",
  getOptionLabel = (option) => option,
  getOptionValue = (option) => option,
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

      <select
        id={id}
        name={name}
        className={`form-select ${error ? "is-invalid" : ""}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}>
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={String(getOptionValue(option))}
            value={getOptionValue(option)}>
            {getOptionLabel(option)}
          </option>
        ))}
      </select>

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

SelectField.propTypes = {
  /**
   * Select id.
   */
  id: PropTypes.string.isRequired,

  /**
   * Select name.
   */
  name: PropTypes.string.isRequired,

  /**
   * Label text.
   */
  label: PropTypes.string,

  /**
   * Selected value.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /**
   * Available options.
   */
  options: PropTypes.array.isRequired,

  /**
   * Change handler.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Placeholder option.
   */
  placeholder: PropTypes.string,

  /**
   * Disabled state.
   */
  disabled: PropTypes.bool,

  /**
   * Required state.
   */
  required: PropTypes.bool,

  /**
   * Validation message.
   */
  error: PropTypes.string,

  /**
   * Additional wrapper CSS classes.
   */
  className: PropTypes.string,

  /**
   * Maps an option object to display text.
   */
  getOptionLabel: PropTypes.func,

  /**
   * Maps an option object to option value.
   */
  getOptionValue: PropTypes.func,
};

export default memo(SelectField);
