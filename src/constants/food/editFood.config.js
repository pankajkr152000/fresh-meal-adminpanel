/**
 * ============================================================================
 * Edit Food Page Configuration
 * ============================================================================
 *
 * This configuration acts as the blueprint for the Edit Food page.
 *
 * Responsibilities:
 * - Define page metadata.
 * - Configure editable image settings.
 * - Define form sections and fields.
 * - Configure action buttons.
 *
 * Any new editable field should be added here instead of hardcoding
 * it inside React components.
 *
 * Author : FreshMeal
 * ============================================================================
 */

const EDIT_FOOD_CONFIG = {
  /**
   * Page Information
   */
  page: {
    title: "Edit Food",
    subtitle: "Update food details.",
  },

  /**
   * Food Image Configuration
   */
  image: {
    editable: true,
    allowRemove: false,
    acceptedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    maxSize: 5 * 1024 * 1024, // 5 MB
  },

  /**
   * Form Sections
   */
  sections: [
    {
      id: "general-information",
      title: "General Information",

      fields: [
        {
          name: "id",
          label: "Food ID",
          type: "text",
          readOnly: true,
        },
        {
          name: "foodName",
          label: "Food Name",
          type: "text",
          required: true,
        },
        {
          name: "price",
          label: "Price",
          type: "number",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          rows: 5,
          required: true,
        },
      ],
    },

    {
      id: "classification",
      title: "Classification",

      fields: [
        {
          name: "foodCategory",
          label: "Food Category",
          type: "select",
          metadata: "categories",
          required: true,
        },
        {
          name: "cuisineType",
          label: "Cuisine Type",
          type: "select",
          metadata: "cuisines",
          required: true,
        },
        {
          name: "dietCategory",
          label: "Diet Category",
          type: "select",
          metadata: "diets",
          required: true,
        },
        {
          name: "foodStatus",
          label: "Food Status",
          type: "select",
          metadata: "statuses",
          required: true,
        },
        {
          name: "isAvailable",
          label: "Available",
          type: "switch",
        },
      ],
    },

    {
      id: "audit-information",
      title: "Audit Information",
      readOnly: true,

      fields: [
        {
          name: "createdAt",
          label: "Created At",
          type: "text",
          readOnly: true,
        },
        {
          name: "createdBy",
          label: "Created By",
          type: "text",
          readOnly: true,
        },
        {
          name: "updatedAt",
          label: "Last Updated",
          type: "text",
          readOnly: true,
        },
        {
          name: "updatedBy",
          label: "Updated By",
          type: "text",
          readOnly: true,
        },
      ],
    },
  ],

  /**
   * Footer Actions
   */
  actions: {
    save: {
      label: "Save Changes",
      variant: "primary",
    },

    cancel: {
      label: "Cancel",
      variant: "secondary",
    },
  },
};

export default EDIT_FOOD_CONFIG;
