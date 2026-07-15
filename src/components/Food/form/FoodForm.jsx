import PropTypes from "prop-types";
import Select from "react-select/base";

/**
 * =============================================================================
 * Component : FoodForm
 * =============================================================================
 *
 * Purpose
 * -------
 * Reusable form used by both Add Food and Edit Food pages.
 *
 * Responsibilities
 * ----------------
 * • Render all food input fields.
 * • Render metadata dropdowns.
 * • Render image upload and preview.
 * • Render form action buttons.
 *
 * Notes
 * -----
 * • This component contains no business logic.
 * • API calls, validation, state management and submission are delegated to
 *   the parent page.
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
  loading,

  onChange,
  onFoodCategoriesChange,
  onImageChange,
  onSubmit,
  onReset,

  submitButtonText = "Save Food",
  resetButtonText = "Reset",
}) => {
  return (
    <form onSubmit={onSubmit}>
      {/* ================================================================ */}
      {/* Food Name */}
      {/* ================================================================ */}

      <div className="mb-3">
        <label className="form-label">Food Name</label>

        <input
          type="text"
          name="foodName"
          className="form-control"
          value={food.foodName}
          onChange={onChange}
          placeholder="Enter food name"
          required
        />
      </div>

      {/* ================================================================ */}
      {/* Description */}
      {/* ================================================================ */}

      <div className="mb-3">
        <label className="form-label">Description</label>

        <textarea
          rows="4"
          name="description"
          className="form-control"
          value={food.description}
          onChange={onChange}
          placeholder="Enter food description"
        />
      </div>

      {/* ================================================================ */}
      {/* Price + Categories */}
      {/* ================================================================ */}

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Price (₹)</label>

          <input
            type="number"
            min="0"
            step="0.01"
            name="price"
            className="form-control"
            value={food.price}
            onChange={onChange}
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Food Categories</label>

          <Select
            isMulti
            name="foodCategories"
            options={metadata.foodCategories}
            value={food.foodCategories}
            onChange={onFoodCategoriesChange}
            placeholder="Select Food Categories"
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Diet Category</label>

          <select
            name="dietCategory"
            className="form-select"
            value={food.dietCategory}
            onChange={onChange}
            required>
            <option value="">Select Diet Category</option>

            {metadata.dietCategories.map((category) => (
              <option
                key={category.value}
                value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Cuisine */}
      {/* ================================================================ */}

      <div className="mb-3">
        <label className="form-label">Cuisine Type</label>

        <select
          name="cuisineType"
          className="form-select"
          value={food.cuisineType}
          onChange={onChange}
          required>
          <option value="">Select Cuisine Type</option>

          {metadata.cuisineCategories.map((cuisine) => (
            <option
              key={cuisine.value}
              value={cuisine.value}>
              {cuisine.label}
            </option>
          ))}
        </select>
      </div>

      {/* ================================================================ */}
      {/* Image */}
      {/* ================================================================ */}

      <div className="mb-3">
        <label className="form-label">Food Image</label>

        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={onImageChange}
        />
      </div>

      {preview && (
        <div className="mb-3">
          <img
            src={preview}
            alt="Food Preview"
            className="img-thumbnail"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* ================================================================ */}
      {/* Buttons */}
      {/* ================================================================ */}

      <div className="d-flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary">
          <i className="bi bi-check-circle me-2"></i>

          {loading ? "Saving..." : submitButtonText}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="btn btn-secondary">
          <i className="bi bi-arrow-clockwise me-2"></i>

          {resetButtonText}
        </button>
      </div>
    </form>
  );
};

FoodForm.propTypes = {
  food: PropTypes.object.isRequired,

  metadata: PropTypes.shape({
    foodCategories: PropTypes.array.isRequired,
    dietCategories: PropTypes.array.isRequired,
    cuisineCategories: PropTypes.array.isRequired,
  }).isRequired,

  preview: PropTypes.string,

  loading: PropTypes.bool,

  onChange: PropTypes.func.isRequired,

  onImageChange: PropTypes.func.isRequired,

  onSubmit: PropTypes.func.isRequired,

  onReset: PropTypes.func.isRequired,

  submitButtonText: PropTypes.string,

  resetButtonText: PropTypes.string,
};

export default FoodForm;
