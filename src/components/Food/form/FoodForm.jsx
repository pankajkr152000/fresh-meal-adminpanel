import PropTypes from "prop-types";

import {
  CommonFileUpload,
  CommonInput,
  CommonSelect,
  CommonTextarea,
} from "../../common/forms";

/**
 * =============================================================================
 * Component : FoodForm
 * =============================================================================
 *
 * Purpose
 * -------
 * Reusable form shared by Add Food and Edit Food pages.
 *
 * Responsibilities
 * ----------------
 * • Render food fields.
 * • Render metadata dropdowns.
 * • Render image upload.
 * • Render action buttons.
 *
 * Notes
 * -----
 * • Contains no business logic.
 * • Uses reusable common form components.
 * • All state management belongs to the parent page / hook.
 *
 * Used By
 * -------
 * • AddFood
 * • EditFood
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const FoodForm = ({
  food,
  metadata,

  preview,

  loading = false,

  onChange,
  onSubmit,
  onReset,
  onRemoveImage,

  submitButtonText = "Save Food",
  resetButtonText = "Reset",
}) => {
  // ===========================================================================
  // Food
  // ===========================================================================

  const {
    foodName,
    description,
    price,

    foodCategories,

    dietCategory,

    cuisineType,
  } = food;

  // ===========================================================================
  // Metadata
  // ===========================================================================

  const {
    foodCategories: categoryOptions,
    dietCategories,
    cuisineCategories,
  } = metadata;

  return (
    <form onSubmit={onSubmit}>
      {/* ==================================================================== */}
      {/* Basic Information */}
      {/* ==================================================================== */}

      <div className="row">
        <div className="col-md-8 mb-3">
          <CommonInput
            label="Food Name"
            name="foodName"
            value={foodName}
            placeholder="Enter food name"
            required
            onChange={onChange}
          />
        </div>

        <div className="col-md-4 mb-3">
          <CommonInput
            label="Price (₹)"
            name="price"
            type="number"
            value={price}
            min={0}
            step="0.01"
            required
            onChange={onChange}
          />
        </div>
      </div>

      {/* ==================================================================== */}
      {/* Categories */}
      {/* ==================================================================== */}

      <div className="row">
        <div className="col-md-6 mb-3">
          <CommonSelect
            label="Food Categories"
            name="foodCategories"
            value={foodCategories}
            options={categoryOptions}
            placeholder="Select Food Categories"
            isMulti
            isClearable
            closeMenuOnSelect={false}
            onChange={onChange}
          />
        </div>

        <div className="col-md-3 mb-3">
          <CommonSelect
            label="Diet Category"
            name="dietCategory"
            value={dietCategory}
            options={dietCategories}
            placeholder="Select Diet Category"
            required
            onChange={onChange}
          />
        </div>

        <div className="col-md-3 mb-3">
          <CommonSelect
            label="Cuisine Type"
            name="cuisineType"
            value={cuisineType}
            options={cuisineCategories}
            placeholder="Select Cuisine Type"
            required
            onChange={onChange}
          />
        </div>
      </div>

      {/* ==================================================================== */}
      {/* Description */}
      {/* ==================================================================== */}

      <CommonTextarea
        label="Description"
        name="description"
        value={description}
        rows={4}
        placeholder="Enter food description"
        onChange={onChange}
      />

      {/* ==================================================================== */}
      {/* Image */}
      {/* ==================================================================== */}

      <CommonFileUpload
        label="Food Image"
        name="image"
        preview={preview}
        onChange={onChange}
        onRemove={onRemoveImage}
      />

      {/* ==================================================================== */}
      {/* Actions */}
      {/* ==================================================================== */}

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          disabled={loading}
          onClick={onReset}>
          <i className="bi bi-arrow-clockwise me-2"></i>

          {resetButtonText}
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}>
          <i className="bi bi-check-circle me-2"></i>

          {loading ? "Saving..." : submitButtonText}
        </button>
      </div>
    </form>
  );
};

FoodForm.propTypes = {
  food: PropTypes.shape({
    foodName: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    foodCategories: PropTypes.array,

    dietCategory: PropTypes.object,

    cuisineType: PropTypes.object,
  }).isRequired,

  metadata: PropTypes.shape({
    foodCategories: PropTypes.array.isRequired,
    dietCategories: PropTypes.array.isRequired,
    cuisineCategories: PropTypes.array.isRequired,
  }).isRequired,

  preview: PropTypes.string,

  loading: PropTypes.bool,

  onChange: PropTypes.func.isRequired,

  onSubmit: PropTypes.func.isRequired,

  onReset: PropTypes.func.isRequired,

  onRemoveImage: PropTypes.func,

  submitButtonText: PropTypes.string,

  resetButtonText: PropTypes.string,
};

export default FoodForm;
