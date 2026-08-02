import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: ImageViewerModal
 * ============================================================================
 *
 * Purpose:
 * Displays an image inside a Bootstrap modal.
 *
 * Features:
 * - Responsive
 * - Centered dialog
 * - Reusable across all modules
 * - Gracefully handles missing images
 *
 * ============================================================================
 */

const ImageViewerModal = ({
  id,
  imageUrl,
  title = "Image Preview",
  alt = "Preview Image",
}) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title"
              id={`${id}Label`}>
              {title}
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div className="modal-body text-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={alt}
                className="img-fluid rounded"
                style={{
                  maxHeight: "75vh",
                  objectFit: "contain",
                }}
              />
            ) : (
              <p className="text-muted mb-0">No image available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ImageViewerModal.propTypes = {
  id: PropTypes.string.isRequired,

  imageUrl: PropTypes.string,

  title: PropTypes.string,

  alt: PropTypes.string,
};

export default ImageViewerModal;
