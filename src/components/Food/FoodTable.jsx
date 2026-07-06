/**
 * -----------------------------------------------------------------------------
 * Component: FoodTable
 * -----------------------------------------------------------------------------
 * Purpose:
 * Displays the list of food items in a responsive Bootstrap table.
 *
 * Responsibilities:
 * - Render food image with fallback placeholder.
 * - Display essential food information.
 * - Show availability status using Bootstrap badges.
 *
 * Design Decision:
 * The table intentionally displays only the most important columns for
 * administrators. Additional fields like cuisineCategory and dietCategory are
 * intentionally hidden to keep the table compact and readable.
 *
 * NOTE:
 * Hidden fields are still available in the underlying food data and are used by
 * the filter components (FoodFilters). A field does NOT need to be displayed in
 * the table to participate in searching, filtering, sorting, or future exports.
 *
 * Example:
 * Backend Response
 * ----------------
 * {
 *   foodName: "Paneer Butter Masala",
 *   foodCategory: "MAIN_COURSE",
 *   cuisineCategory: "INDIAN",
 *   dietCategory: "VEG"
 * }
 *
 * UI Table
 * --------
 * ✔ Food Name
 * ✔ Price
 * ✔ Category
 * ✘ Cuisine (Hidden)
 * ✘ Diet (Hidden)
 *
 * Filter Panel
 * ------------
 * ✔ Cuisine Filter uses cuisineCategory
 * ✔ Diet Filter uses dietCategory
 *
 * This separation improves readability while preserving filtering capability.
 * -----------------------------------------------------------------------------
 */

import { getFoodImage, handleImageError } from "../../utils/ImageUtils";
import FoodStatusBadge from "./FoodStatusBadge";
import FoodStatusDropdown from "./FoodStatusDropDown";

const FoodTable = ({ foods, onStatusChange = () => {} }) => {
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
            <th>Availability</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>
                <img
                  src={getFoodImage(food.imageUrl)}
                  onError={handleImageError}
                  width="70"
                  height="70"
                  className="rounded object-fit-cover"
                  alt={food.foodName}
                />
              </td>

              <td>{food.foodName}</td>

              <td>{food.description}</td>

              <td>{food.foodCategory}</td>

              <td>{food.cuisineCategory}</td>

              <td>₹ {food.price}</td>

              <td>
                <FoodStatusBadge status={food.status} />

                <div className="mt-2">
                  <FoodStatusDropdown
                    currentStatus={food.status}
                    onStatusChange={(newStatus) => {
                      onStatusChange(food, newStatus);
                    }}
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
