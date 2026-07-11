// src/constants/MessageConstants.js

export const MESSAGES = {
  COMMON: {
    LOADING: "Loading...",
    NO_DATA_FOUND: "No data found.",
    SOMETHING_WENT_WRONG: "Something went wrong.",
    OPERATION_SUCCESSFUL: "Operation completed successfully.",
  },

  FOOD: {
    CREATED_SUCCESSFULLY: "Food added successfully.",
    UPDATED_SUCCESSFULLY: "Food updated successfully.",
    DELETED_SUCCESSFULLY: "Food deleted successfully.",
    FETCH_FAILED: "Failed to fetch food list.",
  },

  ORDER: {
    STATUS_UPDATED: "Order status updated successfully.",
    FETCH_FAILED: "Failed to fetch orders.",
  },

  IMAGE: {
    UPLOAD_SUCCESSFUL: "Image uploaded successfully.",
    UPLOAD_FAILED: "Image upload failed.",
  },

  VALIDATION: {
    REQUIRED_FIELD: "This field is required.",
    INVALID_PRICE: "Please enter a valid price.",
    INVALID_IMAGE: "Please select a valid image.",
  },
};

export default MESSAGES;