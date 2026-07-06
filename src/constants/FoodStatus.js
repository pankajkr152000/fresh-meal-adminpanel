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

export const FOOD_STATUS = {
  AVAILABLE: "AVAILABLE",

  OUT_OF_STOCK: "OUT_OF_STOCK",

  DISABLED: "DISABLED",

  COMING_SOON: "COMING_SOON",

  SEASONAL: "SEASONAL",

  DISCONTINUED: "DISCONTINUED",
};

export const FOOD_STATUS_OPTIONS = Object.values(FOOD_STATUS);
