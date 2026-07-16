import PropTypes from "prop-types";
import { memo } from "react";
import Select from "react-select";
import "./CommonSelect.css";

/**
 * =============================================================================
 * Component : CommonSelect
 * =============================================================================
 *
 * Purpose
 * -------
 * Enterprise reusable select component built on top of react-select.
 *
 * Responsibilities
 * ----------------
 * • Render single or multi-select dropdowns.
 * • Display label and required indicator.
 * • Support searching, clearing and loading.
 * • Display validation errors.
 * • Delegate all business logic to the parent.
 *
 * Notes
 * -----
 * • Contains no business logic.
 * • Uses DisplayOptionResponse format:
 *
 *   {
 *      label: "...",
 *      value: "..."
 *   }
 *
 * • Supports both single and multi-select.
 *
 * Example
 * -------
 *
 * <CommonSelect
 *      label="Cuisine"
 *      name="cuisineType"
 *      value={food.cuisineType}
 *      options={metadata.cuisineCategories}
 *      onChange={handleSelectChange}
 * />
 *
 * <CommonSelect
 *      label="Food Categories"
 *      name="foodCategories"
 *      isMulti
 *      value={food.foodCategories}
 *      options={metadata.foodCategories}
 *      onChange={handleSelectChange}
 * />
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const CommonSelect = ({
  label,
  name,

  value,
  options,

  onChange,

  placeholder = "Select",

  required = false,

  error = "",

  className = "",

  // ---------------------------------------------------------------------------
  // React Select Options
  // ---------------------------------------------------------------------------

  isMulti = false,

  isSearchable = true,

  isClearable = false,

  isDisabled = false,

  isLoading = false,

  closeMenuOnSelect = !isMulti,

  menuPlacement = "auto",

  noOptionsMessage = () => "No options found",
}) => {
  /**
   * Delegates the selected option(s) back to the parent.
   */
  const handleChange = (selectedOption) => {
    onChange(name, selectedOption);
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

      <Select
        inputId={name}
        name={name}
        value={value}
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        classNamePrefix="react-select"
        hideSelectedOptions={false}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        closeMenuOnSelect={closeMenuOnSelect}
        menuPlacement={menuPlacement}
        noOptionsMessage={noOptionsMessage}
      />

      {error && <div className="text-danger small mt-1">{error}</div>}
    </div>
  );
};

CommonSelect.propTypes = {
  /**
   * Field label.
   */
  label: PropTypes.string,

  /**
   * HTML field name.
   */
  name: PropTypes.string.isRequired,

  /**
   * Selected value.
   *
   * Single Select -> Object | null
   * Multi Select  -> Array
   */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * Dropdown options.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,

  /**
   * Callback.
   *
   * Signature:
   *
   * onChange(name, value)
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
   * Validation error.
   */
  error: PropTypes.string,

  /**
   * Wrapper CSS classes.
   */
  className: PropTypes.string,

  // ---------------------------------------------------------------------------
  // React Select Props
  // ---------------------------------------------------------------------------

  isMulti: PropTypes.bool,

  isSearchable: PropTypes.bool,

  isClearable: PropTypes.bool,

  isDisabled: PropTypes.bool,

  isLoading: PropTypes.bool,

  closeMenuOnSelect: PropTypes.bool,

  menuPlacement: PropTypes.oneOf(["auto", "top", "bottom"]),

  noOptionsMessage: PropTypes.func,
};

export default memo(CommonSelect);
