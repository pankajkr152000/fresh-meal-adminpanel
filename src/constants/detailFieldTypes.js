/**
 * ============================================================================
 * Detail Field Types
 * ============================================================================
 *
 * Purpose:
 * Defines the supported field types for detail pages.
 *
 * These constants are used by feature-specific detail configurations
 * (e.g. Food, Restaurant, Customer) to describe how a field should
 * be presented.
 *
 * ============================================================================
 */

export const DETAIL_FIELD_TYPES = Object.freeze({
  TEXT: "text",

  CURRENCY: "currency",

  BOOLEAN: "boolean",

  BADGE: "badge",

  BADGE_LIST: "badge-list",

  DATE: "date",

  DATE_TIME: "date-time",

  DAY_DATE_TIME: "day-date-time",

  NUMBER: "number",

  CUSTOM: "custom",
});
