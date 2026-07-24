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

import ROUTES from "../../../constants/RouteConstants";
import FoodService from "../../../services/FoodService";

const INITIAL_FORM_DATA = {
  id: "",

  foodName: "",

  description: "",

  price: "",

  foodCategory: "",

  cuisineType: "",

  dietCategory: "",

  foodStatus: "",

  isAvailable: true,

  image: null,

  imageUrl: "",

  createdAt: "",

  createdBy: "",

  updatedAt: "",

  updatedBy: "",
};

const INITIAL_METADATA = {
  categories: [],
  cuisines: [],
  diets: [],
  statuses: [],
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
   * Original data from backend.
   * Used for dirty state comparison.
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

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [errors, setErrors] = useState({});

  const [previewImage, setPreviewImage] = useState(null);

  /**
   * ------------------------------------------------------------------------
   * Load Food Details
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

        foodCategory: food.foodCategory?.value ?? "",

        cuisineType: food.cuisineType?.value ?? "",

        dietCategory: food.dietCategory?.value ?? "",

        foodStatus: food.foodStatus?.value ?? "",

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

      setPreviewImage(food.imageUrl ?? "");
    } catch (error) {
      console.error("Failed to load food.", error);
    }
  }, [foodId]);

  /**
   * ------------------------------------------------------------------------
   * Load Dropdown Metadata
   * ------------------------------------------------------------------------
   */

  const loadMetadata = useCallback(async () => {
    try {
      const response = await FoodService.getMetadata();

      const data = response?.data?.data;

      setMetadata({
        categories: data?.categories ?? [],

        cuisines: data?.cuisines ?? [],

        diets: data?.diets ?? [],

        statuses: data?.statuses ?? [],
      });
    } catch (error) {
      console.error("Failed to load metadata.", error);
    }
  }, []);

  /**
   * ------------------------------------------------------------------------
   * Generic Input Change Handler
   * ------------------------------------------------------------------------
   *
   * Handles all text, number and textarea inputs.
   *
   * Example:
   * - Food Name
   * - Description
   * - Price
   *
   */

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]: type === "checkbox" ? checked : value,
    }));

    /**
     * Remove validation error as soon as
     * user starts correcting the field.
     */

    setErrors((previous) => ({
      ...previous,

      [name]: "",
    }));
  }, []);

  /**
   * ------------------------------------------------------------------------
   * Dropdown Change Handler
   * ------------------------------------------------------------------------
   *
   * Used by custom Select components.
   *
   * Example:
   *
   * handleSelect("foodCategory", "FAST_FOOD")
   *
   */

  const handleSelect = useCallback((fieldName, value) => {
    setFormData((previous) => ({
      ...previous,

      [fieldName]: value,
    }));

    setErrors((previous) => ({
      ...previous,

      [fieldName]: "",
    }));
  }, []);

  /**
   * ------------------------------------------------------------------------
   * Image Selection
   * ------------------------------------------------------------------------
   *
   * Stores selected image.
   * Creates browser preview.
   *
   */

  const handleImageChange = useCallback((event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFormData((previous) => ({
      ...previous,

      image: file,
    }));

    /**
     * Display selected image immediately.
     */

    setPreviewImage(URL.createObjectURL(file));
  }, []);

  /**
   * ------------------------------------------------------------------------
   * Remove Selected Image
   * ------------------------------------------------------------------------
   *
   * Restore original image.
   *
   */

  const removeImage = useCallback(() => {
    setFormData((previous) => ({
      ...previous,

      image: null,
    }));

    setPreviewImage(originalData?.imageUrl ?? "");
  }, [originalData]);

  /**
   * ------------------------------------------------------------------------
   * Reset Form
   * ------------------------------------------------------------------------
   *
   * Restore original values.
   *
   */

  const resetForm = useCallback(() => {
    if (!originalData) {
      return;
    }

    setFormData(originalData);

    setPreviewImage(originalData.imageUrl);

    setErrors({});
  }, [originalData]);

  /**
   * ------------------------------------------------------------------------
   * Dirty State Detection
   * ------------------------------------------------------------------------
   *
   * Determines whether the user has modified
   * any value in the form.
   *
   */

  const hasChanges = useMemo(() => {
    if (!originalData) {
      return false;
    }

    /**
     * Ignore image object while comparing.
     */

    const current = {
      ...formData,

      image: null,
    };

    const original = {
      ...originalData,

      image: null,
    };

    return JSON.stringify(current) !== JSON.stringify(original);
  }, [formData, originalData]);

  /**
   * ------------------------------------------------------------------------
   * Validate Form
   * ------------------------------------------------------------------------
   *
   * Validates all editable fields before saving.
   *
   */

  const validateForm = useCallback(() => {
    const validationErrors = {};

    if (!formData.foodName?.trim()) {
      validationErrors.foodName = "Food name is required.";
    }

    if (!formData.description?.trim()) {
      validationErrors.description = "Description is required.";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      validationErrors.price = "Price must be greater than zero.";
    }

    if (!formData.foodCategory) {
      validationErrors.foodCategory = "Food category is required.";
    }

    if (!formData.cuisineType) {
      validationErrors.cuisineType = "Cuisine type is required.";
    }

    if (!formData.dietCategory) {
      validationErrors.dietCategory = "Diet category is required.";
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
   */

  const buildFormData = useCallback(() => {
    const request = new FormData();

    request.append("id", formData.id);

    request.append("foodName", formData.foodName);

    request.append("description", formData.description);

    request.append("price", formData.price);

    request.append("foodCategory", formData.foodCategory);

    request.append("cuisineType", formData.cuisineType);

    request.append("dietCategory", formData.dietCategory);

    request.append("foodStatus", formData.foodStatus);

    request.append("isAvailable", formData.isAvailable);

    /**
     * Image is optional.
     */

    if (formData.image) {
      request.append("image", formData.image);
    }

    return request;
  }, [formData]);

  /**
   * ------------------------------------------------------------------------
   * Save Food
   * ------------------------------------------------------------------------
   */

  const saveFood = useCallback(async () => {
    /**
     * Prevent invalid submission.
     */

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const request = buildFormData();

      const response = await FoodService.updateFood(request);

      /**
       * TODO
       *
       * Replace with your Toast utility.
       *
       */

      console.log(response);

      /**
       * Food updated successfully.
       */

      navigate(ROUTES.FOODS);
    } catch (error) {
      console.error("Failed to update food.", error);

      /**
       * TODO
       *
       * Show error toast.
       *
       */
    } finally {
      setSaving(false);
    }
  }, [buildFormData, navigate, validateForm]);

  /**
   * ------------------------------------------------------------------------
   * Initial Data Loading
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
   * Cleanup Object URL
   * ------------------------------------------------------------------------
   *
   * Prevents memory leaks caused by repeatedly
   * creating image preview URLs.
   *
   */

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
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

    handleSelect,

    handleImageChange,

    removeImage,

    resetForm,

    /**
     * API
     */

    saveFood,
  };
}
