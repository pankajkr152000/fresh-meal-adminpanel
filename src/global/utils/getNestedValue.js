/**
 * ============================================================================
 * Utility: getNestedValue
 * ============================================================================
 *
 * Purpose:
 * Safely retrieves a nested property value from an object using a dot-
 * separated property path.
 *
 * Examples:
 *
 * getNestedValue(food, "foodName")
 *
 * getNestedValue(food, "foodCategory.label")
 *
 * getNestedValue(food, "foodStatus.label")
 *
 * Returns:
 * - Nested property value
 * - undefined if the path does not exist
 *
 * ============================================================================
 */

export const getNestedValue = (object, path) => {
  if (!object || !path) {
    return undefined;
  }

  return path.split(".").reduce((current, key) => current?.[key], object);
};
