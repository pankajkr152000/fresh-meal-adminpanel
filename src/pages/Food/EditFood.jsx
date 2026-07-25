import FoodForm from "../../components/Food/form/FoodForm";
import useEditFood from "../../pages/EditFood/hooks/useEditFood";

/**
 * =============================================================================
 * Page : EditFood
 * =============================================================================
 *
 * Purpose
 * -------
 * Page responsible for editing an existing food item.
 *
 * Responsibilities
 * ----------------
 * • Load selected food.
 * • Load metadata.
 * • Display loading state.
 * • Render reusable FoodForm.
 *
 * Notes
 * -----
 * • Contains no business logic.
 * • Delegates all business operations to useEditFood.
 *
 * @author Pankaj Kumar
 * @since 2.0
 * =============================================================================
 */

const EditFood = () => {
  const {
    formData,

    metadata,

    loading,

    saving,

    errors,

    previewImage,

    hasChanges,

    handleChange,

    handleSubmit,

    removeImage,

    resetForm,
  } = useEditFood();

  /**
   * --------------------------------------------------------------------------
   * Initial Loading
   * --------------------------------------------------------------------------
   */
  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

          <p className="mt-3 text-muted">Loading food details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* ================================================================ */}
      {/* Page Header */}
      {/* ================================================================ */}

      <div className="mb-4">
        <h2 className="fw-bold mb-1">Edit Food</h2>

        <p className="text-muted mb-0">
          Update food information and availability.
        </p>
      </div>

      {/* ================================================================ */}
      {/* Food Form */}
      {/* ================================================================ */}

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <FoodForm
            mode="edit"
            food={formData}
            metadata={metadata}
            preview={previewImage}
            errors={errors}
            loading={saving}
            hasChanges={hasChanges}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={resetForm}
            onRemoveImage={removeImage}
          />
        </div>
      </div>
    </div>
  );
};

export default EditFood;
