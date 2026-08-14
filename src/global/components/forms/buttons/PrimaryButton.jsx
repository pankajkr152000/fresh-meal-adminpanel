import PropTypes from "prop-types";
import { memo } from "react";

import "./primaryButton.css";

/**
 * =============================================================================
 * Component : PrimaryButton
 * =============================================================================
 *
 * Purpose
 * -------
 * Generic reusable button component for the application.
 *
 * Responsibilities
 * ----------------
 * • Render Bootstrap button variants.
 * • Support loading state.
 * • Prevent interaction while loading.
 * • Support disabled state.
 * • Support custom CSS classes.
 * • Provide consistent button press animation.
 *
 * Supported Variants
 * ------------------
 * • primary
 * • secondary
 * • success
 * • danger
 * • warning
 * • info
 * • light
 * • dark
 * • link
 * • outline-primary
 * • outline-secondary
 * • outline-success
 * • outline-danger
 * • outline-warning
 * • outline-info
 * • outline-light
 * • outline-dark
 *
 * Notes
 * -----
 * This component contains no business logic.
 * It can be reused throughout the application.
 *
 * =============================================================================
 */

const PrimaryButton = ({
  children,

  onClick,

  type = "button",

  disabled = false,

  loading = false,

  variant = "primary",

  className = "",

  loadingText,

  title,
}) => {
  /**
   * ---------------------------------------------------------------------------
   * Button Classes
   * ---------------------------------------------------------------------------
   */

  const buttonClassName = ["btn", `btn-${variant}`, "primary-button", className]
    .filter(Boolean)
    .join(" ");

  /**
   * ---------------------------------------------------------------------------
   * Render
   * ---------------------------------------------------------------------------
   */

  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled || loading}
      title={title}>
      {loading && (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        />
      )}

      {loading && loadingText ? loadingText : children}
    </button>
  );
};

/**
 * =============================================================================
 * PropTypes
 * =============================================================================
 */

PrimaryButton.propTypes = {
  /**
   * Button content.
   */
  children: PropTypes.node.isRequired,

  /**
   * Click handler.
   */
  onClick: PropTypes.func,

  /**
   * HTML button type.
   */
  type: PropTypes.oneOf(["button", "submit", "reset"]),

  /**
   * Disabled state.
   */
  disabled: PropTypes.bool,

  /**
   * Loading state.
   */
  loading: PropTypes.bool,

  /**
   * Bootstrap button variant.
   */
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
    "link",

    "outline-primary",
    "outline-secondary",
    "outline-success",
    "outline-danger",
    "outline-warning",
    "outline-info",
    "outline-light",
    "outline-dark",
  ]),

  /**
   * Additional CSS classes.
   */
  className: PropTypes.string,

  /**
   * Optional text displayed while loading.
   */
  loadingText: PropTypes.string,

  /**
   * Optional tooltip/title.
   */
  title: PropTypes.string,
};

export default memo(PrimaryButton);
