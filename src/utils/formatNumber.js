/**
 * ============================================================================
 * Utility: formatNumber
 * ============================================================================
 */

export const formatNumber = (value, locale = "en-IN") => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return "-";
  }

  return new Intl.NumberFormat(locale).format(number);
};
