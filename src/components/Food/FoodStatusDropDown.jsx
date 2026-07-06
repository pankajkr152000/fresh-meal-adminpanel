import { FOOD_STATUS_OPTIONS } from "../../constants/FoodStatus";

/**
 * ============================================================================
 * Component : FoodStatusDropdown
 * ============================================================================
 *
 * Allows an administrator to select a new food status.
 *
 * NOTE:
 * This component does not call the backend directly.
 * It simply notifies the parent component of the selected status.
 * ============================================================================
 */

const FoodStatusDropdown = ({ currentStatus, onStatusChange }) => {
  return (
    <select
      className="form-select form-select-sm"
      value={currentStatus}
      onChange={(event) => onStatusChange(event.target.value)}>
      {FOOD_STATUS_OPTIONS.map((status) => (
        <option
          key={status}
          value={status}>
          {status.replaceAll("_", " ")}
        </option>
      ))}
    </select>
  );
};

export default FoodStatusDropdown;
