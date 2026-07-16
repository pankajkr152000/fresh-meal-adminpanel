/**
 * ============================================================================
 * Utility : DisplayOptionUtils
 * ============================================================================
 *
 * Provides reusable helper methods for working with backend
 * display option objects.
 *
 * A display option has the following structure:
 * {
 *   label: string,
 *   value: string
 * }
 *
 * @author Pankaj Kumar
 * ============================================================================
 */

/**
 * Finds a display option by its value.
 *
 * @param {Array<{label: string, value: string}>} options Available options.
 * @param {string} value Internal value to search for.
 * @returns {{label: string, value: string} | undefined} Matching option.
 */
export const findOptionByValue = (options = [], value) =>
  options.find((option) => option.value === value);

/**
 * Finds an option by its display label.
 */
export const findOptionByLabel = (options = [], label) =>
  options.find((option) => option.label === label);

/**
 * Returns only values.
 */
export const extractValues = (options = []) =>
  options.map((option) => option.value);

/**
 * Returns only labels.
 */
export const extractLabels = (options = []) =>
  options.map((option) => option.label);

/**
 * Returns the display label for a given value.
 *
 * @param {Array} options
 * @param {string} value
 * @returns {string}
 */
export const getLabelByValue = (options = [], value) =>
  findOptionByValue(options, value)?.label ?? "";

/**
 * Returns the internal value for a given label.
 *
 * @param {Array} options
 * @param {string} label
 * @returns {string}
 */
export const getValueByLabel = (options = [], label) =>
  findOptionByLabel(options, label)?.value ?? "";

/**
 * Converts a collection of DisplayOptionResponse
 * into a comma-separated label string.
 */
export const getDisplayLabels = (options = []) => {
  return options.map((option) => option.label).join(", ");
};

export const getDisplayLabel = (option) => option?.label ?? "";

/**
 * Returns true if a DisplayOption collection contains the given value.
 *
 * @param {Array} options
 * @param {string} value
 * @returns {boolean}
 */
export const containsDisplayOption = (options = [], value) => {
  if (!value) {
    return true;
  }

  return options.some((option) => option.value === value);
};
