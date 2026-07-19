import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: ImagePlaceholder
 * ============================================================================
 *
 * Purpose:
 * Displays a reusable placeholder when an image is unavailable.
 *
 * Features:
 * - Bootstrap based
 * - Responsive
 * - No fixed dimensions
 * - Reusable across all modules
 *
 * Usage:
 *
 * <ImagePlaceholder />
 *
 * <ImagePlaceholder
 *      icon="🍔"
 *      text="Food image not available"
 * />
 *
 * ============================================================================
 */

const ImagePlaceholder = ({
  icon = "🖼️",
  text = "No Image Available",
  className = "",
}) => {
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center border rounded bg-light text-secondary h-100 w-100 ${className}`}>
      <div
        className="mb-2"
        style={{
          fontSize: "3rem",
          lineHeight: 1,
        }}>
        {icon}
      </div>

      <small className="text-center px-3">{text}</small>
    </div>
  );
};

ImagePlaceholder.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  className: PropTypes.string,
};

export default ImagePlaceholder;
