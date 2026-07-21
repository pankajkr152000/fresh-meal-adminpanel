import { DETAIL_FIELD_TYPES } from "../../constants/detailFieldTypes";

import { formatCurrency } from "../../utils/formatCurrency";
import { formatDayDateTime } from "../../utils/formatDateTime";

/**
 * ============================================================================
 * Food Detail Configuration
 * ============================================================================
 *
 * Purpose:
 * Defines the sections and fields displayed on the View Food page.
 *
 * ============================================================================
 */

export const FOOD_DETAIL_SECTIONS = [
  {
    id: "basic-information",

    title: "Basic Information",

    fields: [
      {
        label: "Food Name",
        key: "foodName",
        type: DETAIL_FIELD_TYPES.TEXT,
      },

      {
        label: "Description",
        key: "description",
        type: DETAIL_FIELD_TYPES.TEXT,
      },

      {
        label: "Price",
        key: "price",
        type: DETAIL_FIELD_TYPES.CURRENCY,
        formatter: formatCurrency,
      },

      {
        label: "Availability",
        key: "available",
        type: DETAIL_FIELD_TYPES.BOOLEAN,
      },
    ],
  },

  {
    id: "categories",

    title: "Categories",

    fields: [
      {
        label: "Food Category",
        key: "foodCategory.label",
        type: DETAIL_FIELD_TYPES.BADGE_LIST,
      },

      {
        label: "Diet Category",
        key: "dietCategory.label",
        type: DETAIL_FIELD_TYPES.BADGE,
      },

      {
        label: "Cuisine Type",
        key: "cuisineType.label",
        type: DETAIL_FIELD_TYPES.BADGE,
      },

      {
        label: "Category Group",
        key: "categoryGroup.label",
        type: DETAIL_FIELD_TYPES.BADGE_LIST,
      },
    ],
  },

  {
    id: "status-information",

    title: "Status Information",

    fields: [
      {
        label: "Current Status",
        key: "foodStatus.label",
        type: DETAIL_FIELD_TYPES.BADGE,
      },

      {
        label: "Previous Status",
        key: "previousStatus",
        type: DETAIL_FIELD_TYPES.BADGE,
      },

      {
        label: "Allowed Next Statuses",
        key: "allowedStatuses",
        type: DETAIL_FIELD_TYPES.BADGE_LIST,
      },

      {
        label: "Last Updated",
        key: "updatedAt",
        type: DETAIL_FIELD_TYPES.DAY_DATE_TIME,
        formatter: formatDayDateTime,
      },
    ],
  },

  {
    id: "additional-information",

    title: "Additional Information",

    fields: [
      {
        label: "Food ID",
        key: "id",
        type: DETAIL_FIELD_TYPES.TEXT,
      },

      {
        label: "Image Name",
        key: "imageName",
        type: DETAIL_FIELD_TYPES.TEXT,
      },

      {
        label: "Image URL",
        key: "imageUrl",
        type: DETAIL_FIELD_TYPES.LINK,
        linkText: "View Food Image",
      },
    ],
  },
];
