import PropTypes from "prop-types";

import EmptyValue from "./EmptyValue";

import { DETAIL_FIELD_TYPES } from "../../../../constants/detailFieldTypes";

const DetailValue = ({ value, type, formatter, className = "" }) => {
  if (value === null || value === undefined || value === "") {
    return (
      <div className={className}>
        <EmptyValue />
      </div>
    );
  }

  let displayValue = value;

  // Apply formatter first
  if (formatter) {
    displayValue = formatter(displayValue);
  }

  // Render object {label,value}
  if (
    displayValue &&
    typeof displayValue === "object" &&
    !Array.isArray(displayValue)
  ) {
    displayValue = displayValue.label ?? JSON.stringify(displayValue);
  }

  // Render arrays
  if (Array.isArray(displayValue)) {
    displayValue = displayValue
      .map((item) =>
        typeof item === "object" ? (item.label ?? item.value) : item,
      )
      .join(", ");
  }

  // Boolean
  if (type === DETAIL_FIELD_TYPES.BOOLEAN) {
    displayValue = value ? "Yes" : "No";
  }

  return <div className={className}>{displayValue}</div>;
};

DetailValue.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string,
  formatter: PropTypes.func,
  className: PropTypes.string,
};

export default DetailValue;
