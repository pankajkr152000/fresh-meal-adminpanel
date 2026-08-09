import PropTypes from "prop-types";

import {
  getFoodImage,
  handleImageError,
} from "../../../../global/utils/ImageUtils";

import CommonCheckbox from "../../../../global/components/forms/checkbox/CommonCheckbox";
import { getDisplayLabels } from "../../../../global/utils/DisplayOptionUtils";
import FoodStatusBadge from "../status/FoodStatusBadge";
import FoodStatusDropdown from "../status/FoodStatusDropdown";

console.log("Inside FoodTableRow Component");
/**
 * -----------------------------------------------------------------------------
 * Component : FoodTableRow
 * -----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Renders a single food record.
 *
 * Responsibilities
 * ----------------
 * • Display food details.
 * • Display status badge.
 * • Display status dropdown.
 * • Raise action callbacks.
 *
 * Notes
 * -----
 * No API calls.
 * No business logic.
 * -----------------------------------------------------------------------------
 */
const FoodTableRow = ({
  food,
  onStatusChange,
  onView,
  // selection
  selected = false,
  onSelectionChange,
}) => {
  console.log("Inside FoodTableRow Component");
  console.log("Food Table Row food id " + food.id);
  return (
    <tr>
      {/* Selection */}
      <td className="text-center">
        <CommonCheckbox
          name={`food-${food.id}`}
          checked={selected}
          onChange={(_, checked) => onSelectionChange(food.id, checked)}
        />
      </td>
      <td className="text-center">
        <img
          src={getFoodImage(food.imageUrl)}
          alt={food.foodName}
          width={70}
          height={70}
          className="rounded object-fit-cover"
          onError={handleImageError}
        />
      </td>

      <td>{food.foodName}</td>

      <td>{food.description}</td>

      <td>{getDisplayLabels(food.foodCategories)}</td>

      <td>{food.cuisineType?.label}</td>

      <td className="text-end">₹ {food.price}</td>

      {/* Status Column */}
      <td className="text-center">
        <FoodStatusBadge status={food.foodStatus} />
      </td>

      {/* Actions Column */}
      <td className="text-center">
        <div className="d-flex flex-column align-items-center gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary w-100"
            onClick={() => {
              console.log("Clicked Food ID:", food.id);
              onView(food.id);
            }}>
            View
          </button>

          <div className="w-100">
            <FoodStatusDropdown
              allowedStatuses={food.allowedStatuses}
              onStatusChange={(status) => onStatusChange(food, status)}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

FoodTableRow.propTypes = {
  food: PropTypes.object.isRequired,

  onStatusChange: PropTypes.func.isRequired,

  onView: PropTypes.string,

  selected: PropTypes.bool,

  onSelectionChange: PropTypes.func,
};

export default FoodTableRow;
