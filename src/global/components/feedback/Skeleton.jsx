import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: Skeleton
 * ============================================================================
 *
 * Purpose:
 * Displays a reusable loading placeholder while content is loading.
 *
 * Features:
 * - Bootstrap placeholder utility
 * - Configurable dimensions
 * - Rounded corners
 * - Animation support
 *
 * ============================================================================
 */

const Skeleton = ({
  width = "100%",
  height = "1rem",
  rounded = true,
  animated = true,
  className = "",
}) => {
  return (
    <div
      className={`
        placeholder
        ${animated ? "placeholder-glow" : ""}
        ${rounded ? "rounded" : ""}
        ${className}
      `}
      style={{
        width,
        height,
        display: "block",
      }}
    />
  );
};

Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  rounded: PropTypes.bool,

  animated: PropTypes.bool,

  className: PropTypes.string,
};

export default Skeleton;
