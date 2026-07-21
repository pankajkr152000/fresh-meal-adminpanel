// ============================================================================
// File: renderFoodField.js
// Description:
// Renders a food detail field based on its configured type.
// ============================================================================

import FoodStatusBadge from "../components/FoodStatusBadge";

import DetailBadge from "../../../components/common/details/display/DetailBadge";
import EmptyValue from "../../../components/common/details/display/EmptyValue";

import { DETAIL_FIELD_TYPES } from "../../../constants/detailFieldTypes";
import { getNestedValue } from "../../../utils/getNestedValue";

/**
 * Renders a field value based on its configuration.
 *
 * @param {Object} field - Field configuration.
 * @param {Object} food - Food object.
 * @returns {React.ReactNode}
 */
export default function renderFoodField(field, food) {
  const value = getNestedValue(food, field.key);

  // ---------------------------------------------------------------------------
  // Empty Value
  // ---------------------------------------------------------------------------

  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return <EmptyValue />;
  }

  // ---------------------------------------------------------------------------
  // Formatter
  // ---------------------------------------------------------------------------

  const formattedValue = field.formatter ? field.formatter(value) : value;

  // ---------------------------------------------------------------------------
  // Field Types
  // ---------------------------------------------------------------------------

  switch (field.type) {
    case DETAIL_FIELD_TYPES.TEXT:
    case DETAIL_FIELD_TYPES.NUMBER:
    case DETAIL_FIELD_TYPES.CURRENCY:
    case DETAIL_FIELD_TYPES.DATE:
    case DETAIL_FIELD_TYPES.DATE_TIME:
    case DETAIL_FIELD_TYPES.DAY_DATE_TIME:
      return formattedValue;

    case DETAIL_FIELD_TYPES.BOOLEAN:
      return formattedValue ? "Yes" : "No";

    case DETAIL_FIELD_TYPES.BADGE:
      if (field.key === "foodStatus.label") {
        return <FoodStatusBadge status={formattedValue} />;
      }

      return <DetailBadge>{formattedValue}</DetailBadge>;

    case DETAIL_FIELD_TYPES.BADGE_LIST:
      return (
        <div className="d-flex flex-wrap gap-2">
          {formattedValue.map((item) => (
            <DetailBadge key={item}>{item}</DetailBadge>
          ))}
        </div>
      );

    case DETAIL_FIELD_TYPES.CUSTOM:
      console.log("Field:", field.label);
      console.log("Formatter:", field.formatter);
      console.log("Original:", value);
      console.log("Formatted:", formattedValue);
      return field.render ? field.render(food) : <EmptyValue />;

    default:
      return formattedValue;
  }
}
