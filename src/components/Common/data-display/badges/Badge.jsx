import PropTypes from "prop-types";
import { memo } from "react";

/**
 * =============================================================================
 * Component : Badge
 * =============================================================================
 *
 * Purpose
 * -------
 * Generic reusable Bootstrap badge component.
 *
 * Responsibilities
 * ----------------
 * • Display a badge with customizable text.
 * • Apply Bootstrap badge styling.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * Feature-specific badges (FoodStatusBadge, OrderStatusBadge, etc.)
 * should compose this component.
 * =============================================================================
 */

const Badge = ({ text, className = "bg-secondary" }) => {
  return <span className={`badge ${className}`}>{text}</span>;
};

Badge.propTypes = {
  /**
   * Badge text.
   */
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /**
   * Bootstrap badge class.
   *
   * Example:
   * bg-success
   * bg-danger
   * bg-warning
   */
  className: PropTypes.string,
};

export default memo(Badge);
