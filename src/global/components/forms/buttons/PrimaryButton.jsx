import PropTypes from "prop-types";
import { memo } from "react";

/**
 * =============================================================================
 * Component : PrimaryButton
 * =============================================================================
 *
 * Purpose
 * -------
 * Generic reusable primary action button.
 *
 * Responsibilities
 * ----------------
 * • Render a Bootstrap primary button.
 * • Display a loading state.
 * • Prevent interaction while loading.
 * • Forward click events.
 *
 * Notes
 * -----
 * This component contains no business logic and can be reused across the
 * application.
 * =============================================================================
 */

const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`btn btn-primary ${className}`}
      onClick={onClick}
      disabled={disabled || loading}>
      {loading && (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        />
      )}

      {children}
    </button>
  );
};

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
   * Additional CSS classes.
   */
  className: PropTypes.string,
};

export default memo(PrimaryButton);
