export const toDate = (value) => {
  if (!value) return null;

  return value instanceof Date ? value : new Date(value);
};

export const toIsoString = (date) => {
  if (!date) return null;

  return date.toISOString();
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
export const formatDateTime = (value) => {
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

/**
 * Formats date-time as:
 *
 * Sun, 19 Jul 2026, 03:04 AM
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

  const parts = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const get = (type) => parts.find((part) => part.type === type)?.value ?? "";

  return `${get("weekday")}, ${get("day")} ${get("month")} ${get("year")}, ${get("hour")}:${get("minute")} ${get("dayPeriod")}`;
};

export default {
  formatDateTime,
  formatDayDateTime,
};
