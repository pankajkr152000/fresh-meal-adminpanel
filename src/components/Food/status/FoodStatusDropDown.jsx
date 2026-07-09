/**
 * =============================================================================
 * Component : FoodStatusDropdown
 * =============================================================================
 *
 * Purpose
 * -------
 * Renders the list of valid food status transitions.
 *
 * Responsibilities
 * ----------------
 * • Display only backend-allowed status transitions.
 * • Convert the selected value into its corresponding display option.
 * • Notify the parent component with the selected display option.
 *
 * Notes
 * -----
 * • This component contains no business logic.
 * • Status transition validation is performed by the backend.
 * * • The parent component is responsible for persisting the selected status.
 * =============================================================================
 */

import { findOptionByValue } from "../../utils/DisplayOptionUtils";

console.log("Inside FoodStatusDropdown Component");

const FoodStatusDropdown = ({
  allowedStatuses = [],
  onStatusChange,
  disabled = false,
}) => {
  /**
   * Handles status selection.
   *
   * Converts the selected value back into the corresponding
   * DisplayOptionResponse before notifying the parent.
   */
  const handleChange = (event) => {
    const value = event.target.value;

    if (!value) {
      return;
    }

    const selectedStatus = findOptionByValue(allowedStatuses, value);

    if (!selectedStatus) {
      return;
    }

    onStatusChange(selectedStatus);

    // Reset dropdown after selection.
    event.target.value = "";
  };

  return (
    <select
      className="form-select form-select-sm"
      value=""
      disabled={disabled || allowedStatuses.length === 0}
      onChange={handleChange}>
      <option value="">Change Status</option>

      {allowedStatuses.map((status) => (
        <option
          key={status.value}
          value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
};

export default FoodStatusDropdown;
