import PropTypes from "prop-types";

import { getFoodImage, handleImageError } from "../../../utils/ImageUtils";

import FoodStatusBadge from "../status/FoodStatusBadge";
import FoodStatusDropdown from "../status/FoodStatusDropdown";

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

      <td>{food.foodCategory}</td>

      <td>{food.cuisineCategory}</td>

      <td className="text-end">₹ {food.price}</td>

      <td className="text-center">
        <FoodStatusBadge status={food.foodStatus} />

        <div className="mt-2">
          <FoodStatusDropdown
            currentStatus={food.foodStatus}
            allowedStatuses={food.allowedStatuses}
            onStatusChange={(status) => onStatusChange(food, status)}
          />
        </div>
      </td>
    </tr>
  );
};

FoodTableRow.propTypes = {
  food: PropTypes.object.isRequired,

  onStatusChange: PropTypes.func.isRequired,
};

export default FoodTableRow;
