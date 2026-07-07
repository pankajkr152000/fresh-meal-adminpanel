import PropTypes from "prop-types";
import { memo } from "react";

/**
 * =============================================================================
 * Component : SearchBox
 * =============================================================================
 *
 * Purpose
 * -------
 * Generic reusable search input component.
 *
 * Responsibilities
 * ----------------
 * • Render a Bootstrap search input.
 * • Display an optional placeholder.
 * • Forward search text changes.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * Search behavior such as debouncing and filtering should be implemented
 * by the consuming feature hook.
 * =============================================================================
 */

const SearchBox = ({
  id,
  name,
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
  className = "",
}) => {
  /**
   * Handles search input changes.
   */
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={className}>
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-search" />
        </span>

        <input
          id={id}
          name={name}
          type="search"
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          autoComplete="off"
          aria-label={placeholder}
        />
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  /**
   * Input id.
   */
  id: PropTypes.string.isRequired,

  /**
   * Input name.
   */
  name: PropTypes.string.isRequired,

  /**
   * Current search value.
   */
  value: PropTypes.string.isRequired,

  /**
   * Change handler.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Placeholder text.
   */
  placeholder: PropTypes.string,

  /**
   * Disabled state.
   */
  disabled: PropTypes.bool,

  /**
   * Additional wrapper classes.
   */
  className: PropTypes.string,
};

export default memo(SearchBox);
