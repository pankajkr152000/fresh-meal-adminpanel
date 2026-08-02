/**
 * ============================================================================
 * EditableImage Component
 * ============================================================================
 *
 * Reusable component for displaying and updating an image.
 *
 * Responsibilities
 * ----------------------------------------------------------------------------
 * ✔ Display current image
 * ✔ Display selected image preview
 * ✔ Select new image
 * ✔ Reusable across multiple modules
 *
 * Props
 * ----------------------------------------------------------------------------
 * previewImage        : Current image URL or preview URL
 * onImageChange       : File selection handler
 * acceptedTypes       : Accepted image MIME types
 *
 * ============================================================================
 */

import PropTypes from "prop-types";

const EditableImage = ({ previewImage, onImageChange, acceptedTypes = [] }) => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-header">
        <h5 className="mb-0">Food Image</h5>
      </div>

      <div className="card-body text-center">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Food Preview"
            className="img-fluid rounded border"
            style={{
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            className="border rounded d-flex justify-content-center align-items-center"
            style={{
              height: "300px",
            }}>
            <span className="text-muted">No Image Available</span>
          </div>
        )}

        <div className="mt-4">
          <input
            type="file"
            accept={acceptedTypes.join(",")}
            className="form-control"
            onChange={onImageChange}
          />
        </div>
      </div>
    </div>
  );
};

EditableImage.propTypes = {
  previewImage: PropTypes.string,

  onImageChange: PropTypes.func.isRequired,

  acceptedTypes: PropTypes.array,
};

export default EditableImage;
