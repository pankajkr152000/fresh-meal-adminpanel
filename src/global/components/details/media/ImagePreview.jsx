import PropTypes from "prop-types";
import { useState } from "react";

import ImagePlaceholder from "./ImagePlaceholder";

/**
 * ============================================================================
 * Component: ImagePreview
 * ============================================================================
 *
 * Purpose:
 * Displays an image with built-in loading and error handling.
 *
 * Features:
 * - Loading indicator
 * - Error fallback
 * - Reusable placeholder
 * - Optional overlay action
 * - Bootstrap responsive
 *
 * ============================================================================
 */

const ImagePreview = ({
  src,
  alt,
  className = "",
  imageClassName = "",
  placeholderIcon,
  placeholderText,
  loadingComponent = null,
  overlay = null,
}) => {
  const [isLoading, setIsLoading] = useState(Boolean(src));
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <ImagePlaceholder
        icon={placeholderIcon}
        text={placeholderText}
        className={className}
      />
    );
  }

  return (
    <div className={`position-relative ${className}`}>
      {isLoading && (
        <div className="position-absolute top-50 start-50 translate-middle">
          {loadingComponent ?? (
            <div
              className="spinner-border text-secondary"
              role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`img-fluid rounded w-100 ${imageClassName}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />

      {overlay}
    </div>
  );
};

ImagePreview.propTypes = {
  src: PropTypes.string,

  alt: PropTypes.string,

  className: PropTypes.string,

  imageClassName: PropTypes.string,

  placeholderIcon: PropTypes.node,

  placeholderText: PropTypes.string,

  loadingComponent: PropTypes.node,

  overlay: PropTypes.node,
};

ImagePreview.defaultProps = {
  alt: "Preview Image",
};

export default ImagePreview;
