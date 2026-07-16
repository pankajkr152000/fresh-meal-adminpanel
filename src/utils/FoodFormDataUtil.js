/**
 * =============================================================================
 * Utility : FoodFormDataUtil
 * =============================================================================
 *
 * Purpose
 * -------
 * Builds the multipart FormData payload required by the Food APIs.
 *
 * Responsibilities
 * ----------------
 * • Convert the food form model into the backend request payload.
 * • Append the food image when available.
 *
 * Notes
 * -----
 * • Shared by Add Food and Edit Food.
 * • Contains no API calls.
 * • Contains no business logic.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

/**
 * Builds multipart FormData for Food APIs.
 *
 * Backend expects:
 *
 * RequestPart("food")  -> JSON
 * RequestPart("image") -> MultipartFile
 *
 * @param {Object} food
 * @param {File|null} image
 *
 * @returns {FormData}
 */

export const buildFoodFormData = (food, image) => {
  const formData = new FormData();

  const payload = {
    ...food,

    foodCategories:
      food.foodCategories?.map((category) => category.value) ?? [],

    dietCategory: food.dietCategory?.value,

    cuisineType: food.cuisineType?.value,
  };

  formData.append(
    "food",
    new Blob([JSON.stringify(payload)], {
      type: "application/json",
    }),
  );

  if (image) {
    formData.append("image", image);
  }

  return formData;
};

const getValue = (option) => {
  if (!option) {
    return null;
  }

  return typeof option === "object" ? option.value : option;
};
