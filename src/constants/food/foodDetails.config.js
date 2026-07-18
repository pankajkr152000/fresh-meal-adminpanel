// ============================================================================
// File: foodDetails.config.js
// Description:
// Configuration for the View Food page.
//
// This file is the single source of truth for:
// - Detail sections
// - Display labels
// - Backend field mapping
// - Rendering types
// - Visibility
// - Empty value handling
//
// NOTE:
// Do NOT put rendering logic inside this file.
// Rendering decisions belong to DetailValue / DetailRow components.
// ============================================================================

import { DETAIL_FIELD_TYPES } from "../detailFieldTypes";

// ============================================================================
// Default Field Configuration
// ============================================================================

const DEFAULT_FIELD = Object.freeze({
  visible: true,
  copyable: false,
  emptyValue: "-",
});

// ============================================================================
// Basic Information
// ============================================================================

export const BASIC_INFORMATION_FIELDS = [
  {
    ...DEFAULT_FIELD,
    label: "Food Name",
    field: "foodName",
    type: DETAIL_FIELD_TYPES.TEXT,
  },
  {
    ...DEFAULT_FIELD,
    label: "Description",
    field: "description",
    type: DETAIL_FIELD_TYPES.MULTILINE_TEXT,
  },
  {
    ...DEFAULT_FIELD,
    label: "Price",
    field: "price",
    type: DETAIL_FIELD_TYPES.CURRENCY,
  },
  {
    ...DEFAULT_FIELD,
    label: "Availability",
    field: "isAvailable",
    type: DETAIL_FIELD_TYPES.BOOLEAN,
  },
];

// ============================================================================
// Category Information
// ============================================================================

export const CATEGORY_INFORMATION_FIELDS = [
  {
    ...DEFAULT_FIELD,
    label: "Food Category",
    field: "foodCategory",
    type: DETAIL_FIELD_TYPES.BADGE,
  },
  {
    ...DEFAULT_FIELD,
    label: "Diet Category",
    field: "dietCategory",
    type: DETAIL_FIELD_TYPES.BADGE,
  },
  {
    ...DEFAULT_FIELD,
    label: "Cuisine Type",
    field: "cuisineType",
    type: DETAIL_FIELD_TYPES.BADGE,
  },
  {
    ...DEFAULT_FIELD,
    label: "Category Group",
    field: "categoryGroup",
    type: DETAIL_FIELD_TYPES.BADGE,
  },
];

// ============================================================================
// Status Information
// ============================================================================

export const STATUS_INFORMATION_FIELDS = [
  {
    ...DEFAULT_FIELD,
    label: "Current Status",
    field: "foodStatus",
    type: DETAIL_FIELD_TYPES.STATUS,
  },
  {
    ...DEFAULT_FIELD,
    label: "Previous Status",
    field: "previousStatus",
    type: DETAIL_FIELD_TYPES.STATUS,
  },
  {
    ...DEFAULT_FIELD,
    label: "Allowed Next Statuses",
    field: "allowedStatuses",
    type: DETAIL_FIELD_TYPES.BADGE_LIST,
  },
  {
    ...DEFAULT_FIELD,
    label: "Last Updated",
    field: "updatedAt",
    type: DETAIL_FIELD_TYPES.DATETIME,
  },
];

// ============================================================================
// Additional Information
// ============================================================================

export const ADDITIONAL_INFORMATION_FIELDS = [
  {
    ...DEFAULT_FIELD,
    label: "Image Name",
    field: "imageName",
    type: DETAIL_FIELD_TYPES.TEXT,
  },
  {
    ...DEFAULT_FIELD,
    label: "Food Code",
    field: "foodCode",
    type: DETAIL_FIELD_TYPES.TEXT,
  },
  {
    ...DEFAULT_FIELD,
    label: "Popular",
    field: "isPopular",
    type: DETAIL_FIELD_TYPES.BOOLEAN,
  },
  {
    ...DEFAULT_FIELD,
    label: "Spice Level",
    field: "spiceLevel",
    type: DETAIL_FIELD_TYPES.TEXT,
  },
  {
    ...DEFAULT_FIELD,
    label: "Preparation Time",
    field: "preparationTime",
    type: DETAIL_FIELD_TYPES.TEXT,
  },
];

// ============================================================================
// Audit Information
// ============================================================================

export const AUDIT_INFORMATION_FIELDS = [
  {
    ...DEFAULT_FIELD,
    label: "Created By",
    field: "createdBy",
    type: DETAIL_FIELD_TYPES.TEXT,
  },
  {
    ...DEFAULT_FIELD,
    label: "Created At",
    field: "createdAt",
    type: DETAIL_FIELD_TYPES.DATETIME,
  },
  {
    ...DEFAULT_FIELD,
    label: "Updated By",
    field: "updatedBy",
    type: DETAIL_FIELD_TYPES.TEXT,
  },
  {
    ...DEFAULT_FIELD,
    label: "Updated At",
    field: "updatedAt",
    type: DETAIL_FIELD_TYPES.DATETIME,
  },
];

// ============================================================================
// View Food Sections
// ============================================================================

export const FOOD_DETAIL_SECTIONS = [
  {
    id: "basic-information",
    title: "Basic Information",
    fields: BASIC_INFORMATION_FIELDS,
  },
  {
    id: "category-information",
    title: "Categories",
    fields: CATEGORY_INFORMATION_FIELDS,
  },
  {
    id: "status-information",
    title: "Status Information",
    fields: STATUS_INFORMATION_FIELDS,
  },
  {
    id: "additional-information",
    title: "Additional Information",
    fields: ADDITIONAL_INFORMATION_FIELDS,
  },
  {
    id: "audit-information",
    title: "Audit Information",
    fields: AUDIT_INFORMATION_FIELDS,
  },
];
