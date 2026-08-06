/**
 * ============================================================================
 * useEditFood
 * ============================================================================
 *
 * Custom React Hook responsible for managing all business logic
 * for the Edit Food page.
 *
 * Responsibilities
 * ----------------------------------------------------------------------------
 * ✔ Load Food Details
 * ✔ Load Metadata
 * ✔ Maintain Form State
 * ✔ Handle Image Preview
 * ✔ Validate Form
 * ✔ Save Changes
 * ✔ Dirty State Detection
 * ✔ Error Handling
 *
 * NOTE
 * ----------------------------------------------------------------------------
 * This hook intentionally contains NO JSX.
 * UI rendering belongs to EditFood.jsx.
 *
 * ============================================================================
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { FoodMetadataService, FoodService } from "../services";

/**
 * ============================================================================
 * Initial Form State
 * ============================================================================
 *
 * Mirrors the structure expected by FoodForm.jsx.
 *
 * Notes
 * -----
 * • Dropdowns store complete DisplayOption objects.
 * • Multi-select stores an array of DisplayOption objects.
 * • Image stores the selected File object.
 * * Image URL stores the existing image received from the backend.
 * ============================================================================
 */
const INITIAL_FORM_DATA = {
  id: "",

  foodName: "",

  description: "",

  price: "",

  foodCategories: [],

  dietCategory: null,

  cuisineType: null,

  foodStatus: null,

  allowedStatuses: null,

  isAvailable: true,

  image: null,

  imageUrl: "",

  createdAt: "",

  createdBy: "",

  updatedAt: "",

  updatedBy: "",
};

/**
 * ============================================================================
 * Initial Metadata
 * ============================================================================
 *
 * Dropdown options consumed directly by FoodForm.
 * ============================================================================
 */
const INITIAL_METADATA = {
  foodCategories: [],

  cuisineCategories: [],

  dietCategories: [],

  groupCategories: [],

  foodStatuses: [],
};

export default function useEditFood() {
  /**
   * ------------------------------------------------------------------------
   * Navigation
   * ------------------------------------------------------------------------
   */

  const navigate = useNavigate();

  const { foodId } = useParams();

  /**
   * ------------------------------------------------------------------------
   * Form State
   * ------------------------------------------------------------------------
   */

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  /**
   * Original food loaded from backend.
   *
   * Used to:
   * • Detect unsaved changes
   * • Restore values on Reset
   */
  const [originalData, setOriginalData] = useState(null);

  /**
   * ------------------------------------------------------------------------
   * Metadata
   * ------------------------------------------------------------------------
   */

  const [metadata, setMetadata] = useState(INITIAL_METADATA);

  /**
   * ------------------------------------------------------------------------
   * UI State
   * ------------------------------------------------------------------------
   */

  /**
   * Page loading.
   */
  const [loading, setLoading] = useState(true);

  /**
   * Save operation loading.
   */
  const [saving, setSaving] = useState(false);

  /**
   * Validation errors.
   */
  const [errors, setErrors] = useState({});

  /**
   * Current image preview.
   *
   * Either:
   * • Existing image URL
   * • Blob URL for newly selected image
   */
  const [previewImage, setPreviewImage] = useState("");

  /**
   * ------------------------------------------------------------------------
   * Generic Change Handler
   * ------------------------------------------------------------------------
   *
   * Supports every reusable form component.
   *
   * Components
   * ----------
   * ✔ CommonInput
   * ✔ CommonTextarea
   * ✔ CommonSelect
   * ✔ CommonSwitch
   * ✔ CommonFileUpload
   */
  const handleChange = useCallback(
    (name, value) => {
      setFormData((previous) => ({
        ...previous,

        [name]: value,
      }));

      /**
       * Clear validation error immediately
       * after user changes the field.
       */
      setErrors((previous) => ({
        ...previous,

        [name]: "",
      }));

      /**
       * Handle image preview.
       */
      if (name === "image") {
        if (previewImage?.startsWith("blob:")) {
          URL.revokeObjectURL(previewImage);
        }

        if (value instanceof File) {
          setPreviewImage(URL.createObjectURL(value));
        }
      }
    },
    [previewImage],
  );

  /**
   * ------------------------------------------------------------------------
   * Load Food Details
   * ------------------------------------------------------------------------
   *
   * Loads the selected food from the backend and converts it into the
   * structure expected by FoodForm.
   * ------------------------------------------------------------------------
   */
  const loadFood = useCallback(async () => {
    try {
      const response = await FoodService.getFoodById(foodId);

      const food = response?.data?.data;

      if (!food) {
        return;
      }

      const mappedFood = {
        id: food.id ?? "",

        foodName: food.foodName ?? "",

        description: food.description ?? "",

        price: food.price ?? "",

        foodCategories: food.foodCategories ?? [],

        dietCategory: food.dietCategory ?? null,

        cuisineType: food.cuisineType ?? null,

        foodStatus: food.foodStatus ?? null,

        allowedStatuses: food.allowedStatuses ?? [],

        isAvailable: food.isAvailable ?? true,

        image: null,

        imageUrl: food.imageUrl ?? "",

        createdAt: food.createdAt ?? "",

        createdBy: food.createdBy ?? "",

        updatedAt: food.updatedAt ?? "",

        updatedBy: food.updatedBy ?? "",
      };

      setFormData(mappedFood);

      setOriginalData(mappedFood);

      setPreviewImage(mappedFood.imageUrl);
    } catch (error) {
      console.error("Failed to load food.", error);
    }
  }, [foodId]);

  /**
   * ------------------------------------------------------------------------
   * Load Metadata
   * ------------------------------------------------------------------------
   *
   * Loads dropdown options required by FoodForm.
   * ------------------------------------------------------------------------
   */
  const loadMetadata = useCallback(async () => {
    try {
      const response = await FoodMetadataService.getMetadata();
      const data = response?.data;
      setMetadata({
        foodCategories: data?.foodCategories ?? [],

        cuisineCategories: data?.cuisineCategories ?? [],

        dietCategories: data?.dietCategories ?? [],

        groupCategories: data?.groupCategories ?? [],

        foodStatuses: data?.foodStatuses ?? [],
      });
    } catch (error) {
      console.error("Failed to load metadata.", error);
    }
  }, []);

  /**
   * ------------------------------------------------------------------------
   * Remove Selected Image
   * ------------------------------------------------------------------------
   *
   * Removes the newly selected image and restores the original image
   * received from the backend.
   * ------------------------------------------------------------------------
   */
  const removeImage = useCallback(() => {
    if (previewImage?.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    setFormData((previous) => ({
      ...previous,

      image: null,
    }));

    setPreviewImage(originalData?.imageUrl ?? "");
  }, [originalData, previewImage]);

  /**
   * ------------------------------------------------------------------------
   * Reset Form
   * ------------------------------------------------------------------------
   *
   * Restores the form back to its original backend values.
   * ------------------------------------------------------------------------
   */
  const resetForm = useCallback(() => {
    if (!originalData) {
      return;
    }

    if (previewImage?.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    setFormData(originalData);

    setPreviewImage(originalData.imageUrl ?? "");

    setErrors({});
  }, [originalData, previewImage]);

  /**
   * ------------------------------------------------------------------------
   * Dirty State Detection
   * ------------------------------------------------------------------------
   *
   * Determines whether the user has modified the form.
   *
   * The image File object is ignored because it cannot be compared
   * using JSON.stringify().
   * ------------------------------------------------------------------------
   */
  const hasChanges = useMemo(() => {
    if (!originalData) {
      return false;
    }

    const current = {
      ...formData,
      image: null,
    };

    const original = {
      ...originalData,
      image: null,
    };

    const hasFormChanges = JSON.stringify(current) !== JSON.stringify(original);

    const hasImageChanged = formData.image != null;

    return hasFormChanges || hasImageChanged;
  }, [formData, originalData]);

  /**
   * ------------------------------------------------------------------------
   * Validate Form
   * ------------------------------------------------------------------------
   *
   * Validates all editable fields before submitting the update request.
   * ------------------------------------------------------------------------
   */
  const validateForm = useCallback(() => {
    const validationErrors = {};

    if (!formData.foodName?.trim()) {
      validationErrors.foodName = "Food name is required.";
    }

    // description is not mandatory
    {
      /*if (!formData.description?.trim()) {
      validationErrors.description = "Description is required.";
    } */
    }

    if (!formData.price || Number(formData.price) <= 0) {
      validationErrors.price = "Price must be greater than zero.";
    }

    if (!formData.foodCategories?.length) {
      validationErrors.foodCategories =
        "At least one food category is required.";
    }

    if (!formData.dietCategory) {
      validationErrors.dietCategory = "Diet category is required.";
    }

    if (!formData.cuisineType) {
      validationErrors.cuisineType = "Cuisine type is required.";
    }

    if (!formData.foodStatus) {
      validationErrors.foodStatus = "Food status is required.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }, [formData]);

  /**
   * ------------------------------------------------------------------------
   * Build Multipart Form Data
   * ------------------------------------------------------------------------
   *
   * Converts the current form state into the request payload expected by the
   * backend.
   * ------------------------------------------------------------------------
   */
  /*const buildFormData = useCallback(() => {
    const request = new FormData();

    request.append("id", formData.id);

    request.append("foodName", formData.foodName);

    request.append("description", formData.description);

    request.append("price", formData.price);

    request.append("foodCategories", JSON.stringify(formData.foodCategories));

    request.append("dietCategory", JSON.stringify(formData.dietCategory));

    request.append("cuisineType", JSON.stringify(formData.cuisineType));

    request.append("foodStatus", JSON.stringify(formData.foodStatus));

    request.append("isAvailable", String(formData.isAvailable));*/

  /**
   * Image is optional during edit.
   */
  /*if (formData.image instanceof File) {
      request.append("image", formData.image);
    }

    return request;
  }, [formData]);*/

  const buildFormData = useCallback(() => {
    const request = new FormData();

    const food = {
      id: formData.id,
      foodName: formData.foodName,
      description: formData.description,
      price: formData.price,
      // foodCategories: formData.foodCategories.value,
      foodCategories: formData.foodCategories.map((category) => category.value),
      dietCategory: formData.dietCategory.value,
      cuisineType: formData.cuisineType.value,
      foodStatus: formData.foodStatus.value,
      // isAvailable: formData.isAvailable,
    };

    request.append("food", JSON.stringify(food));

    if (formData.image instanceof File) {
      request.append("image", formData.image);
    }

    return request;
  }, [formData]);

  /**
   * ------------------------------------------------------------------------
   * Save Food
   * ------------------------------------------------------------------------
   *
   * Validates the form and submits the update or edited food request.
   * ------------------------------------------------------------------------
   */
  const handleSubmit = useCallback(
    async (event) => {
      /**
       * Prevent default form submission.
       */
      event.preventDefault();

      /**
       * Validate before saving.
       */
      if (!validateForm()) {
        return;
      }

      try {
        setSaving(true);

        const request = buildFormData();
        console.log(request);
        const response = await FoodService.editFood(request);

        console.log(response);

        // sussess message
        toast.success("Food updated successfully");
        navigate(`/foods/view/${foodId}`);
      } catch (error) {
        console.error("Failed to update food.", error);

        // error message
        toast.error("Failed to update food");
      } finally {
        setSaving(false);
      }
    },
    [buildFormData, foodId, navigate, validateForm],
  );

  /**
   * ------------------------------------------------------------------------
   * Initial Page Load
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    const initializePage = async () => {
      try {
        setLoading(true);

        await Promise.all([loadFood(), loadMetadata()]);
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, [loadFood, loadMetadata]);

  /**
   * ------------------------------------------------------------------------
   * Cleanup Blob URL
   * ------------------------------------------------------------------------
   */
  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  /**
   * ------------------------------------------------------------------------
   * Hook Exports
   * ------------------------------------------------------------------------
   */
  return {
    /**
     * Form
     */
    formData,

    metadata,

    /**
     * UI
     */
    loading,

    saving,

    errors,

    previewImage,

    /**
     * State
     */
    hasChanges,

    /**
     * Form Actions
     */
    handleChange,

    removeImage,

    resetForm,

    /**
     * API
     */
    handleSubmit,
  };
}
