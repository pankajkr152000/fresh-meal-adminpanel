import PropTypes from "prop-types";

import CommonCheckbox from "../../../../global/components/forms/checkbox/CommonCheckbox";

import {
  getFoodImage,
  handleImageError,
} from "../../../../global/utils/ImageUtils";

import { getDisplayLabels } from "../../../../global/utils/DisplayOptionUtils";
import FoodStatusBadge from "../status/FoodStatusBadge";

/**
 * ============================================================================
 * Component : ArchivedFoodTableRow
 * ============================================================================
 *
 * Purpose
 * -------
 * Renders a single archived food record.
 *
 * Responsibilities
 * ----------------
 * • Display archived food information.
 * • Render selection checkbox.
 * • Display food status.
 * • Provide action area for future restore/delete operations.
 *
 * Notes
 * -----
 * • No API calls.
 * • No business logic.
 * • Restore/delete functionality will be added separately.
 *
 * ============================================================================
 */

const ArchivedFoodTableRow = ({
  food,
  selected = false,
  onSelectionChange,
  // actions
  onRestore,
  onDeletePermanently,
}) => {
  return (
    <tr>
      {/* =====================================================================
          Selection
      ===================================================================== */}

      <td className="text-center">
        <CommonCheckbox
          name={`archived-food-${food.id}`}
          checked={selected}
          onChange={(_, checked) => onSelectionChange?.(food.id, checked)}
        />
      </td>

      {/* =====================================================================
          Image
      ===================================================================== */}

      <td className="text-center">
        <img
          src={getFoodImage(food.imageUrl)}
          alt={food.foodName || "Food"}
          className="rounded"
          style={{
            width: "55px",
            height: "55px",
            objectFit: "cover",
          }}
          onError={handleImageError}
        />
      </td>

      {/* =====================================================================
          Food Number
      ===================================================================== */}

      <td>{food.foodNumber || "-"}</td>

      {/* =====================================================================
          Food Name
      ===================================================================== */}

      <td>
        <span className="fw-semibold">{food.foodName || "-"}</span>
      </td>

      {/* =====================================================================
          Category
      ===================================================================== */}

      <td>{getDisplayLabels(food.foodCategories) || "-"}</td>

      {/* =====================================================================
          Cuisine
      ===================================================================== */}

      <td>{food.cuisineType?.label || "-"}</td>

      {/* =====================================================================
          Price
      ===================================================================== */}

      <td className="text-end">₹ {food.price}</td>

      {/* =====================================================================
          Status
      ===================================================================== */}

      <td className="text-center">
        <FoodStatusBadge status={food.foodStatus} />
      </td>

      {/* =====================================================================
          Actions
      ===================================================================== */}

      <td className="text-center">
        <button
          type="button"
          className="btn btn-sm btn-outline-warning w-75 mb-2"
          onClick={() => onRestore(food)}>
          Restore
        </button>

        <button
          type="button"
          className="btn btn-sm btn-outline-danger w-75 mt-2"
          onClick={() => onDeletePermanently(food)}>
          Delete Permanently
        </button>
      </td>
    </tr>
  );
};

ArchivedFoodTableRow.propTypes = {
  food: PropTypes.object.isRequired,

  selected: PropTypes.bool,

  onSelectionChange: PropTypes.func,

  obRestore: PropTypes.func.isRequired,

  onDeletePermanently: PropTypes.func.isRequired,
};

export default ArchivedFoodTableRow;
