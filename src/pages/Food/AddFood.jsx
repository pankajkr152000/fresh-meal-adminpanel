import { toast } from "react-toastify";

import FoodForm from "../../components/food/form/FoodForm";

import useFoodForm from "../../hooks/useFoodForm";

import FoodService from "../../services/FoodService";

import { buildFoodFormData } from "../../utils/FoodFormDataUtil";

/**
 * =============================================================================
 * Page : AddFood
 * =============================================================================
 *
 * Purpose
 * -------
 * Creates a new food item.
 *
 * Responsibilities
 * ----------------
 * • Coordinate the Food Form.
 * • Submit food creation request.
 * • Display user feedback.
 *
 * Notes
 * -----
 * • Form state is managed by useFoodForm.
 * • UI is rendered by FoodForm.
 * • API interaction is delegated to FoodService.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const AddFood = () => {
  const {
    food,
    metadata,

    image,

    preview,

    loadingMetadata,

    handleFieldChange,

    removeImage,

    resetForm,
  } = useFoodForm();

  /**
   * --------------------------------------------------------------------------
   * Creates a new food.
   * --------------------------------------------------------------------------
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = buildFoodFormData(food, image);

      await FoodService.addFood(formData);

      toast.success("Food added successfully.");

      resetForm();
    } catch (error) {
      console.error(error);

      toast.error("Unable to add food.");
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="mb-0">
            <i className="bi bi-plus-circle me-2"></i>
            Add New Food
          </h4>
        </div>

        <div className="card-body">
          <FoodForm
            food={food}
            metadata={metadata}
            preview={preview}
            loading={loadingMetadata}
            onChange={handleFieldChange}
            onRemoveImage={removeImage}
            onSubmit={handleSubmit}
            onReset={resetForm}
            submitButtonText="Add Food"
          />
        </div>
      </div>
    </div>
  );
};

export default AddFood;
