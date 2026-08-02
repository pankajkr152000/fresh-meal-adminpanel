import PropTypes from "prop-types";
import { memo } from "react";

/**
 * =============================================================================
 * Component : CommonFileUpload
 * =============================================================================
 *
 * Purpose
 * -------
 * Enterprise reusable file upload component.
 *
 * Responsibilities
 * ----------------
 * • Render file upload control.
 * • Display image preview.
 * • Allow image removal.
 * • Support disabled state.
 * • Display validation errors.
 *
 * Notes
 * -----
 * • Contains no business logic.
 * • File validation belongs to parent.
 * • File upload belongs to parent.
 *
 * Used By
 * -------
 * • Add Food
 * • Edit Food
 * • Restaurant
 * • User Profile
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const CommonFileUpload = ({
  label,
  id,
  name,

  preview,
  previewAlt = "Preview Image",
  multiple = false,
  showPreview = true,

  previewWidth = 220,
  previewHeight = 220,

  accept = "image/*",

  required = false,

  disabled = false,

  error = "",

  removeButtonText = "Remove",

  onChange,

  onRemove,

  className = "",
}) => {
  const handleChange = (event) => {
    const files = event.target.files ?? [];

    const value = multiple ? Array.from(files) : (files[0] ?? null);

    onChange(name, value);
  };
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id ?? name}
          className="form-label fw-semibold">
          {label}

          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      <input
        id={id ?? name}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className={`form-control ${error ? "is-invalid" : ""}`}
        onChange={handleChange}
      />

      {error && <div className="text-danger small mt-1">{error}</div>}

      {showPreview && preview && (
        <div className="mt-3">
          <img
            src={preview}
            alt={previewAlt}
            className="img-thumbnail"
            style={{
              width: previewWidth,
              height: previewHeight,
              objectFit: "cover",
            }}
          />

          {onRemove && (
            <div className="mt-2">
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={onRemove}
                disabled={disabled}>
                <i className="bi bi-trash me-2"></i>

                {removeButtonText}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

CommonFileUpload.propTypes = {
  label: PropTypes.string,

  id: PropTypes.string,

  name: PropTypes.string.isRequired,

  preview: PropTypes.string,

  previewWidth: PropTypes.number,

  previewHeight: PropTypes.number,

  accept: PropTypes.string,

  required: PropTypes.bool,

  disabled: PropTypes.bool,

  error: PropTypes.string,

  previewAlt: PropTypes.string,

  showPreview: PropTypes.bool,

  multiple: PropTypes.bool,

  removeButtonText: PropTypes.string,

  onChange: PropTypes.func.isRequired,

  onRemove: PropTypes.func,

  className: PropTypes.string,
};

export default memo(CommonFileUpload);
