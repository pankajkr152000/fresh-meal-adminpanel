import PropTypes from "prop-types";
import { memo } from "react";

import DatePicker from "react-datepicker";
import { toDate } from "../../../../utils/DateUtils";

/**
 * =============================================================================
 * Component : CommonDatePicker
 * =============================================================================
 *
 * Purpose
 * -------
 * Enterprise reusable date picker component built on top of react-datepicker.
 *
 * Responsibilities
 * ----------------
 * • Render a consistent date picker.
 * • Display label and required indicator.
 * • Support min/max date validation.
 * • Support disabled state.
 * • Display validation errors.
 * • Delegate all business logic to the parent.
 *
 * Notes
 * -----
 * • Contains no business logic.
 * • Supports controlled component usage.
 * • Suitable for forms throughout the application.
 *
 * Used By
 * -------
 * • Food Offers
 * • Coupons
 * • Restaurant Holidays
 * • User Date Of Birth
 * • Promotions
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const CommonDatePicker = ({
  label,

  id,
  name,

  selected,

  placeholder = "Select Date",

  onChange,

  required = false,

  disabled = false,

  readOnly = false,

  minDate,

  maxDate,

  dateFormat = "dd/MM/yyyy",

  showYearDropdown = true,

  showMonthDropdown = true,

  dropdownMode = "select",

  error = "",

  className = "",
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id ?? name}
          className="form-label fw-semibold">
          {label}

          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      <DatePicker
        id={id ?? name}
        name={name}
        selected={toDate(selected)}
        onChange={(date) => onChange(name, date)}
        placeholderText={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        minDate={toDate(minDate)}
        maxDate={toDate(maxDate)}
        dateFormat={dateFormat}
        showYearDropdown={showYearDropdown}
        showMonthDropdown={showMonthDropdown}
        dropdownMode={dropdownMode}
        autoComplete="off"
        className={`form-control ${error ? "is-invalid" : ""}`}
      />

      {error && <div className="text-danger small mt-1">{error}</div>}
    </div>
  );
};

CommonDatePicker.propTypes = {
  /**
   * Label displayed above the field.
   */
  label: PropTypes.string,

  /**
   * HTML id.
   */
  id: PropTypes.string,

  /**
   * HTML name.
   */
  name: PropTypes.string.isRequired,

  /**
   * Selected date.
   */
  selected: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),

  /**
   * Date selection callback.
   */
  onChange: PropTypes.func.isRequired,

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
   * Minimum selectable date.
   */
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),

  /**
   * Maximum selectable date.
   */
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),

  /**
   * Date display format.
   */
  dateFormat: PropTypes.string,

  /**
   * Show year selector.
   */
  showYearDropdown: PropTypes.bool,

  /**
   * Show month selector.
   */
  showMonthDropdown: PropTypes.bool,

  /**
   * Dropdown mode.
   */
  dropdownMode: PropTypes.oneOf(["scroll", "select"]),

  /**
   * Validation error.
   */
  error: PropTypes.string,

  /**
   * Wrapper CSS classes.
   */
  className: PropTypes.string,
};

export default memo(CommonDatePicker);
