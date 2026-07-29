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
 * Enterprise reusable food form shared by Add Food and Edit Food pages.
 *
 * Responsibilities
 * ----------------
 * • Render all food related fields.
 * • Render metadata dropdowns.
 * • Render image upload section.
 * • Render form action buttons.
 * • Support Add and Edit modes.
 * • Display validation errors.
 *
 * Notes
 * -----
 * • Pure presentation component.
 * • Contains no business logic.
 * • Parent hook/page owns all state.
 * • Fully reusable across food management features.
 *
 * Supported Modes
 * ---------------
 * • add
 * • edit
 *
 * Used By
 * -------
 * • AddFood
 * • EditFood
 *
 * @author Pankaj Kumar
 * @since 2.0
 * =============================================================================
 */

const FoodForm = ({
  mode = "add",

  food,
  metadata,

  preview,

  errors = {},

  loading = false,

  hasChanges = true,

  onChange,
  onSubmit,
  onReset,
  onRemoveImage,
}) => {
  // ===========================================================================
  // Button Labels
  // ===========================================================================

  const submitButtonText = mode === "edit" ? "Update Food" : "Save Food";

  const resetButtonText = mode === "edit" ? "Discard Changes" : "Reset";

  // ===========================================================================
  // Food
  // ===========================================================================

  const {
    id,

    foodName,
    description,
    price,

    foodCategories: selectedFoodCategories,

    dietCategory: selectedDietCategory,

    cuisineType: selectedCuisineType,

    foodStatus,

    allowedStatuses,

    // isAvailable,
  } = food;

  // ===========================================================================
  // Metadata
  // ===========================================================================

  const {
    foodCategories: categoryOptions,

    dietCategories: dietOptions,

    cuisineCategories: cuisineOptions,

    //statuses: statusOptions = [],
  } = metadata;

  return (
    <form onSubmit={onSubmit}>
      {/* ==================================================================== */}
      {/* General Information */}
      {/* ==================================================================== */}

      <div className="mb-4">
        <h5 className="border-bottom pb-2 mb-3">
          <i className="bi bi-info-circle me-2"></i>
          General Information
        </h5>

        <div className="row">
          {/* ---------------------------------------------------------------- */}
          {/* Food ID (Edit Mode Only) */}
          {/* ---------------------------------------------------------------- */}

          {mode === "edit" && (
            <div className="col-md-4 mb-3">
              <CommonInput
                label="Food ID"
                name="id"
                value={id ?? ""}
                readOnly
                disabled
              />
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* Food Name */}
          {/* ---------------------------------------------------------------- */}

          <div className={mode === "edit" ? "col-md-5 mb-3" : "col-md-8 mb-3"}>
            <CommonInput
              label="Food Name"
              name="foodName"
              value={foodName}
              placeholder="Enter food name"
              required
              error={errors.foodName}
              onChange={onChange}
            />
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Price */}
          {/* ---------------------------------------------------------------- */}

          <div className={mode === "edit" ? "col-md-3 mb-3" : "col-md-4 mb-3"}>
            <CommonInput
              label="Price (₹)"
              name="price"
              type="number"
              value={price}
              min={0}
              step="0.01"
              placeholder="0.00"
              required
              error={errors.price}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* Classification */}
      {/* ==================================================================== */}

      <div className="mb-4">
        <h5 className="border-bottom pb-2 mb-3">
          <i className="bi bi-tags me-2"></i>
          Classification
        </h5>

        <div className="row">
          {/* ---------------------------------------------------------------- */}
          {/* Food Categories */}
          {/* ---------------------------------------------------------------- */}

          <div className="col-lg-6 mb-3">
            <CommonSelect
              label="Food Categories"
              name="foodCategories"
              value={selectedFoodCategories}
              options={categoryOptions}
              placeholder="Select Food Categories"
              required
              isMulti
              isClearable
              closeMenuOnSelect={false}
              error={errors.foodCategories}
              onChange={onChange}
            />
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Diet Category */}
          {/* ---------------------------------------------------------------- */}

          <div className="col-lg-3 col-md-6 mb-3">
            <CommonSelect
              label="Diet Category"
              name="dietCategory"
              value={selectedDietCategory}
              options={dietOptions}
              placeholder="Select Diet Category"
              required
              error={errors.dietCategory}
              onChange={onChange}
            />
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Cuisine Type */}
          {/* ---------------------------------------------------------------- */}

          <div className="col-lg-3 col-md-6 mb-3">
            <CommonSelect
              label="Cuisine Type"
              name="cuisineType"
              value={selectedCuisineType}
              options={cuisineOptions}
              placeholder="Select Cuisine Type"
              required
              error={errors.cuisineType}
              onChange={onChange}
            />
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Edit Mode Fields */}
        {/* ------------------------------------------------------------------ */}

        {mode === "edit" && (
          <div className="row mt-2">
            {/* -------------------------------------------------------------- */}
            {/* Food Status and Allowed Food Options */}
            {/* -------------------------------------------------------------- */}
            <div className="col-lg-6 mb-3">
              <CommonSelect
                label="Food Status"
                name="foodStatus"
                value={foodStatus}
                options={allowedStatuses}
                placeholder="Select Food Status"
                required
                error={errors.foodStatus}
                onChange={onChange}
              />
            </div>
            {/* -------------------------------------------------------------- */}
            {/* Availability */}
            {/* -------------------------------------------------------------- */}
            {/* commenting this as food Availability is based upon food status */}
            {/* <div className="col-lg-6 mb-3 d-flex align-items-center">
              <CommonSwitch
                label="Available for Ordering"
                name="isAvailable"
                checked={Boolean(isAvailable)}
                error={errors.isAvailable}
                onChange={onChange}
              />
            </div> */}
          </div>
        )}
      </div>
      {/* ==================================================================== */}
      {/* Description */}
      {/* ==================================================================== */}

      <div className="mb-4">
        <h5 className="border-bottom pb-2 mb-3">
          <i className="bi bi-card-text me-2"></i>
          Description
        </h5>

        <CommonTextarea
          label="Description"
          name="description"
          value={description}
          rows={4}
          placeholder="Enter detailed food description..."
          error={errors.description}
          onChange={onChange}
        />
      </div>

      {/* ==================================================================== */}
      {/* Food Image */}
      {/* ==================================================================== */}

      <div className="mb-4">
        <h5 className="border-bottom pb-2 mb-3">
          <i className="bi bi-image me-2"></i>
          Food Image
        </h5>

        <CommonFileUpload
          label="Food Image"
          name="image"
          preview={preview}
          required={mode === "add"}
          error={errors.image}
          removeButtonText="Remove Image"
          onChange={onChange}
          onRemove={onRemoveImage}
        />
      </div>
      {/* ==================================================================== */}
      {/* Form Actions */}
      {/* ==================================================================== */}

      <div className="border-top pt-4 mt-4">
        <div className="d-flex justify-content-end gap-2 flex-wrap">
          {/* ---------------------------------------------------------------- */}
          {/* Reset / Discard */}
          {/* ---------------------------------------------------------------- */}

          <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={loading}
            onClick={onReset}>
            <i className="bi bi-arrow-counterclockwise me-2"></i>

            {resetButtonText}
          </button>

          {/* ---------------------------------------------------------------- */}
          {/* Submit */}
          {/* ---------------------------------------------------------------- */}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !hasChanges}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"></span>

                {mode === "edit" ? "Updating..." : "Saving..."}
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>

                {submitButtonText}
              </>
            )}
          </button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* No Changes Information */}
        {/* ---------------------------------------------------------------- */}

        {!loading && !hasChanges && mode === "edit" && (
          <div className="text-end mt-2">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              No changes detected.
            </small>
          </div>
        )}
      </div>
    </form>
  );
};

FoodForm.propTypes = {
  mode: PropTypes.oneOf(["add", "edit"]),

  food: PropTypes.shape({
    id: PropTypes.string,

    foodName: PropTypes.string,

    description: PropTypes.string,

    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    foodCategories: PropTypes.array,

    dietCategory: PropTypes.object,

    cuisineType: PropTypes.object,

    foodStatus: PropTypes.object,

    allowedStatuses: PropTypes.array,

    // isAvailable: PropTypes.bool,
  }).isRequired,

  metadata: PropTypes.shape({
    foodCategories: PropTypes.array.isRequired,

    dietCategories: PropTypes.array.isRequired,

    cuisineCategories: PropTypes.array.isRequired,

    statuses: PropTypes.array,

    allowedStatuses: PropTypes.array,
  }).isRequired,

  preview: PropTypes.string,

  // errors: PropTypes.object,
  errors: PropTypes.shape({
    foodName: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    foodCategories: PropTypes.string,
    dietCategory: PropTypes.string,
    cuisineType: PropTypes.string,
    foodStatus: PropTypes.string,
    allowedStatuses: PropTypes.string,
    // isAvailable: PropTypes.string,
    image: PropTypes.string,
  }),

  loading: PropTypes.bool,

  hasChanges: PropTypes.bool,

  onChange: PropTypes.func.isRequired,

  onSubmit: PropTypes.func.isRequired,

  onReset: PropTypes.func.isRequired,

  onRemoveImage: PropTypes.func,
};
export default FoodForm;
