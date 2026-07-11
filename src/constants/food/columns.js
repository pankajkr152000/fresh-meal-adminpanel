/**
 * ============================================================================
 * FreshMeal
 * ============================================================================
 *
 * Food Table Column Configuration.
 *
 * This file defines the presentation metadata for the Food table.
 *
 * The reusable DataTable component consumes this configuration to render
 * table headers consistently without containing any food-specific logic.
 *
 * Notes
 * -----
 * - This file contains configuration only.
 * - No UI logic.
 * - No business logic.
 * - No API calls.
 * ============================================================================
 */

export const FOOD_COLUMNS = Object.freeze([
  {
    id: "image",

    header: "Image",

    accessor: "imageUrl",

    sortable: false,

    filterable: false,

    exportable: false,

    visible: true,

    width: "90px",

    minWidth: "90px",

    align: "center",
  },

  {
    id: "foodName",

    header: "Food Name",

    accessor: "foodName",

    sortable: true,

    filterable: true,

    exportable: true,

    visible: true,

    width: "240px",

    minWidth: "220px",

    align: "start",
  },

  {
    id: "description",

    header: "Description",

    accessor: "description",

    sortable: false,

    filterable: false,

    exportable: true,

    visible: true,

    width: "320px",

    minWidth: "250px",

    align: "start",
  },

  {
    id: "category",

    header: "Category",

    accessor: "foodCategory",

    sortable: true,

    filterable: true,

    exportable: true,

    visible: true,

    width: "170px",

    minWidth: "150px",

    align: "start",
  },

  {
    id: "price",

    header: "Price",

    accessor: "price",

    sortable: true,

    filterable: false,

    exportable: true,

    visible: true,

    width: "120px",

    minWidth: "120px",

    align: "end",
  },

  {
    id: "status",

    header: "Status",

    accessor: "foodStatus",

    sortable: true,

    filterable: true,

    exportable: true,

    visible: true,

    width: "170px",

    minWidth: "170px",

    align: "center",
  },

  {
    id: "actions",

    header: "Actions",

    accessor: null,

    sortable: false,

    filterable: false,

    exportable: false,

    visible: true,

    width: "180px",

    minWidth: "180px",

    align: "center",
  },
]);
