/**
 * ============================================================================
 * Utility: formatDateTime
 * ============================================================================
 */

export const formatDateTime = (value, locale = "en-IN") => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

/**
 * ============================================================================
 * Date Time Utilities
 * ============================================================================
 */

/**
 * Formats ISO date-time into:
 *
 * Example:
 * Sat, 19 Jul 2026, 03:12 AM
 *
 * @param {string} value
 * @returns {string}
 */
export const formatDayDateTime = (value) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export default {
  formatDateTime,
};
