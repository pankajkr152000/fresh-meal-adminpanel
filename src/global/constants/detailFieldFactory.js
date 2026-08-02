// ============================================================================
// File: detailFieldFactory.js
// Description:
// Factory helpers for creating detail field configurations.
//
// This file reduces repetitive boilerplate across all detail configuration
// files (Food, Restaurant, User, Category, Offer, Order, etc.).
// ============================================================================

import { DETAIL_FIELD_TYPES } from "./detailFieldTypes";

// ============================================================================
// Default Field Options
// ============================================================================

const DEFAULT_OPTIONS = Object.freeze({
  visible: true,
  copyable: false,
  emptyValue: "-",
});

// ============================================================================
// Base Factory
// ============================================================================

const createField = (label, field, type, options = {}) => ({
  label,
  field,
  type,
  ...DEFAULT_OPTIONS,
  ...options,
});

// ============================================================================
// Exported Factory Methods
// ============================================================================

export const textField = (label, field, options) =>
  createField(label, field, DETAIL_FIELD_TYPES.TEXT, options);

export const multilineTextField = (label, field, options) =>
  createField(label, field, DETAIL_FIELD_TYPES.MULTILINE_TEXT, options);

export const currencyField = (label, field, options) =>
  createField(label, field, DETAIL_FIELD_TYPES.CURRENCY, options);

export const booleanField = (label, field, options) =>
  createField(label, field, DETAIL_FIELD_TYPES.BOOLEAN, options);

export const badgeField = (label, field, options) =>
  createField(label, field, DETAIL_FIELD_TYPES.BADGE, options);

export const statusField = (label, field, options) =>
  createField(label, field, DETAIL_FIELD_TYPES.STATUS, options);

export const badgeListField = (label, field, options) =>
  createField(label, field, DETAIL_FIELD_TYPES.BADGE_LIST, options);

export const dateField = (label, field, options) =>
  createField(label, field, DETAIL_FIELD_TYPES.DATE, options);

export const dateTimeField = (label, field, options) =>
  createField(label, field, DETAIL_FIELD_TYPES.DATETIME, options);

export const imageField = (label, field, options) =>
  createField(label, field, DETAIL_FIELD_TYPES.IMAGE, options);
