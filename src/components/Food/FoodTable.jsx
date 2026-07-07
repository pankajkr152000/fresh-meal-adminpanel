/**
 * -----------------------------------------------------------------------------
 * Component : FoodTable
 * -----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Displays the list of food items.
 *
 * Responsibilities
 * ----------------
 * • Render food details.
 * • Display current food status.
 * • Render only backend-allowed status transitions.
 * • Notify parent when user selects a new status.
 *
 * Notes
 * -----
 * This component intentionally contains NO business logic.
 * It never calls APIs or updates state directly.
 * -----------------------------------------------------------------------------
 */

import { getFoodImage, handleImageError } from "../../utils/ImageUtils";
import FoodStatusBadge from "./FoodStatusBadge";
import FoodStatusDropdown from "./status/FoodStatusDropDown";

const FoodTable = ({ foods = [], onStatusChange = () => {} }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Cuisine</th>
            <th>Price</th>
            <th style={{ width: "240px" }}>Availability</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>
                <img
                  src={getFoodImage(food.imageUrl)}
                  onError={handleImageError}
                  width={70}
                  height={70}
                  className="rounded object-fit-cover"
                  alt={food.foodName}
                />
              </td>

              <td>{food.foodName}</td>

              <td>{food.description}</td>

              <td>{food.foodCategory}</td>

              <td>{food.cuisineType}</td>

              <td>₹ {food.price}</td>

              <td>
                <FoodStatusBadge status={food.foodStatus} />

                <div className="mt-2">
                  <FoodStatusDropdown
                    currentStatus={food.foodStatus}
                    allowedStatuses={food.allowedStatuses ?? []}
                    onStatusChange={(newStatus) =>
                      onStatusChange(food, newStatus)
                    }
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodTable;
