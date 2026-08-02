/**
 * ============================================================================
 * Utility: formatCurrency
 * ============================================================================
 *
 * Formats a numeric value as Indian Rupees.
 *
 * Example:
 * formatCurrency(250)
 * → ₹250.00
 *
 * formatCurrency(1250.5)
 * → ₹1,250.50
 *
 * ============================================================================
 */

export const formatCurrency = (amount, locale = "en-IN", currency = "INR") => {
  if (amount === null || amount === undefined || amount === "") {
    return "-";
  }

  const value = Number(amount);

  if (Number.isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
