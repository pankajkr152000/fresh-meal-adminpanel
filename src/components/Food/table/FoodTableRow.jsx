import PropTypes from "prop-types";

import { getFoodImage, handleImageError } from "../../../utils/ImageUtils";

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

const FoodTableRow = ({ food, onStatusChange }) => {
  console.log("Inside FoodTableRow Component");
  return (
    <tr>
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

      <td>{food.foodCategory?.label}</td>

      <td>{food.cuisineType?.label}</td>

      <td className="text-end">₹ {food.price}</td>

      {/* Status Column */}
      <td className="text-center">
        <FoodStatusBadge status={food.foodStatus} />
      </td>

      {/* Actions Column */}
      <td className="text-center">
        <FoodStatusDropdown
          allowedStatuses={food.allowedStatuses}
          onStatusChange={(status) => onStatusChange(food, status)}
        />
      </td>
    </tr>
  );
};

FoodTableRow.propTypes = {
  food: PropTypes.object.isRequired,

  onStatusChange: PropTypes.func.isRequired,
};

export default FoodTableRow;
