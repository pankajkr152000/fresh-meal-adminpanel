import { useCallback, useEffect, useState } from "react";

import FoodMetadataService from "../services/FoodMetadataService";

/**
 * =============================================================================
 * Hook : useFoodForm
 * =============================================================================
 *
 * Purpose
 * -------
 * Manages reusable state shared by Add Food and Edit Food pages.
 *
 * Responsibilities
 * ----------------
 * • Food form state.
 * • Metadata loading.
 * • Image upload.
 * • Image preview.
 * • Reset form.
 * • Populate form for editing.
 *
 * Notes
 * -----
 * • Contains no API submission logic.
 * • Contains no toast notifications.
 * • Can be reused by both AddFood and EditFood.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const INITIAL_FOOD = Object.freeze({
  foodName: "",
  description: "",
  price: "",

  foodCategories: [],

  dietCategory: null,

  cuisineType: null,
});

const INITIAL_METADATA = Object.freeze({
  foodCategories: [],
  dietCategories: [],
  cuisineCategories: [],
});

const useFoodForm = () => {
  // ===========================================================================
  // State
  // ===========================================================================

  const [food, setFood] = useState(INITIAL_FOOD);

  const [metadata, setMetadata] = useState(INITIAL_METADATA);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(null);

  const [loadingMetadata, setLoadingMetadata] = useState(false);

  const [metadataError, setMetadataError] = useState("");

  // ===========================================================================
  // Metadata
  // ===========================================================================

  const loadMetadata = useCallback(async () => {
    try {
      setLoadingMetadata(true);

      setMetadataError("");

      const response = await FoodMetadataService.getMetadata();

      setMetadata(response.data ?? INITIAL_METADATA);
    } catch (error) {
      console.error("Failed to load food metadata.", error);

      setMetadataError("Unable to load food metadata.");
    } finally {
      setLoadingMetadata(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchMetadata = async () => {
      try {
        setLoadingMetadata(true);
        setMetadataError("");

        const response = await FoodMetadataService.getMetadata();

        if (isMounted) {
          setMetadata(response.data ?? INITIAL_METADATA);
        }
      } catch (error) {
        console.error("Failed to load food metadata.", error);

        if (isMounted) {
          setMetadataError("Unable to load food metadata.");
        }
      } finally {
        if (isMounted) {
          setLoadingMetadata(false);
        }
      }
    };

    fetchMetadata();

    return () => {
      isMounted = false;
    };
  }, []);

  // ===========================================================================
  // Generic Field Change
  // ===========================================================================

  const handleFieldChange = useCallback((name, value) => {
    if (name === "image") {
      setImage(value);

      setPreview(value ? URL.createObjectURL(value) : null);

      return;
    }

    setFood((previous) => ({
      ...previous,

      [name]: value,
    }));
  }, []);

  // ===========================================================================
  // Image
  // ===========================================================================

  const removeImage = useCallback(() => {
    setImage(null);

    setPreview(null);
  }, []);

  // ===========================================================================
  // Reset
  // ===========================================================================

  const resetForm = useCallback(() => {
    setFood(INITIAL_FOOD);

    removeImage();
  }, [removeImage]);

  // ===========================================================================
  // Populate Existing Food (Edit Food)
  // ===========================================================================

  const populateForm = useCallback((foodResponse) => {
    if (!foodResponse) {
      return;
    }

    setFood({
      foodName: foodResponse.foodName ?? "",
      description: foodResponse.description ?? "",
      price: foodResponse.price ?? "",

      foodCategories: foodResponse.foodCategories ?? [],

      dietCategory: foodResponse.dietCategory ?? null,

      cuisineType: foodResponse.cuisineType ?? null,
    });

    setPreview(foodResponse.imageUrl ?? null);

    setImage(null);
  }, []);

  // ===========================================================================
  // Exports
  // ===========================================================================

  return {
    // -------------------------------------------------------------------------
    // State
    // -------------------------------------------------------------------------

    food,

    metadata,

    image,

    preview,

    // -------------------------------------------------------------------------
    // Loading
    // -------------------------------------------------------------------------

    loadingMetadata,

    metadataError,

    // -------------------------------------------------------------------------
    // Actions
    // -------------------------------------------------------------------------

    handleFieldChange,

    removeImage,

    resetForm,

    populateForm,

    loadMetadata,

    // -------------------------------------------------------------------------
    // Utilities
    // -------------------------------------------------------------------------

    setFood,
  };
};

export default useFoodForm;
