/**
 * ============================================================================
 * Food Status Constants
 * ============================================================================
 *
 * Centralizes all valid food status values used throughout the UI.
 *
 * Keeping status values here avoids magic strings and makes it easy
 * to update or add new statuses in the future.
 * ============================================================================
 */

// export const FOOD_STATUS = {
//   AVAILABLE: "Available",

//   OUT_OF_STOCK: "Out of Stock",

//   DISABLED: "Disabled",

//   COMING_SOON: "Coming Soon",

//   SEASONAL: "Seasonal",

//   DISCONTINUED: "Discontinued",
// };

export const FOOD_STATUS = {
  AVAILABLE: {
    label: "Available",
    value: "AVAILABLE",
  },

  OUT_OF_STOCK: {
    label: "Out of Stock",
    value: "OUT_OF_STOCK",
  },

  DISABLED: {
    label: "Disabled",
    value: "DISABLED",
  },

  COMING_SOON: {
    label: "Coming Soon",
    value: "COMING_SOON",
  },

  SEASONAL: {
    label: "Seasonal",
    value: "SEASONAL",
  },

  DISCONTINUED: {
    label: "Discontinued",
    value: "DISCONTINUED",
  },
};

export const FOOD_STATUS_OPTIONS = Object.values(FOOD_STATUS);
