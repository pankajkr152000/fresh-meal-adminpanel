/**
 * ============================================================================
 * FreshMeal
 * ============================================================================
 *
 * Archived Food Table Column Configuration.
 *
 * Defines presentation metadata for the Archived Foods table.
 *
 * Responsibilities
 * ----------------
 * • Define archived-food table headers.
 * • Define data accessors.
 * • Define sorting capabilities.
 * • Define column visibility.
 * • Define presentation alignment and dimensions.
 *
 * Notes
 * -----
 * • Configuration only.
 * • No UI logic.
 * • No business logic.
 * • No API calls.
 *
 * Selection is handled by the reusable DataTable architecture.
 *
 * ============================================================================
 */

export const ARCHIVED_FOOD_COLUMNS = Object.freeze([
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
    id: "foodNumber",

    header: "Food Number",

    accessor: "foodNumber",

    sortable: true,

    filterable: true,

    exportable: true,

    visible: true,

    width: "160px",

    minWidth: "150px",

    align: "start",
  },

  {
    id: "foodName",

    header: "Food Name",

    accessor: "foodName",

    sortable: true,

    filterable: true,

    exportable: true,

    visible: true,

    width: "220px",

    minWidth: "200px",

    align: "start",
  },

  {
    id: "category",

    header: "Category",

    accessor: "foodCategories",

    sortable: true,

    filterable: true,

    exportable: true,

    visible: true,

    width: "170px",

    minWidth: "150px",

    align: "start",
  },

  {
    id: "cuisine",

    header: "Cuisine",

    accessor: "cuisineType",

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

    width: "220px",

    minWidth: "220px",

    align: "center",
  },
]);
