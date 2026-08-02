import PropTypes from "prop-types";

/**
 * =============================================================================
 * PropType : displayOptionPropType
 * =============================================================================
 *
 * Represents a reusable display option received from the backend.
 *
 * Shape:
 * {
 *   label: string,
 *   value: string
 * }
 *
 * Used by:
 * • Food Categories
 * • Diet Categories
 * • Cuisine Categories
 * • Group Categories
 * • Food Statuses
 * • Order Statuses
 * • Payment Statuses
 * • Restaurant Statuses
 *
 * This PropType should be reused wherever backend metadata is represented
 * as a DisplayOptionResponse.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const displayOptionPropType = PropTypes.shape({
  /**
   * User-friendly display label.
   */
  label: PropTypes.string.isRequired,

  /**
   * Internal value used by the application.
   */
  value: PropTypes.string.isRequired,
});

export default displayOptionPropType;
