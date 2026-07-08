import PropTypes from "prop-types";

import { FOOD_COLUMNS } from "../../../constants/food";
import DataTable from "../../common/data-display/tables/DataTable";

import FoodTableRow from "./FoodTableRow";

/**
 * -----------------------------------------------------------------------------
 * Component : FoodTable
 * -----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Food-specific wrapper around the reusable DataTable component.
 *
 * Responsibilities
 * ----------------
 * • Supply food column configuration.
 * • Supply food row renderer.
 * • Forward sorting, pagination and toolbar.
 * • Forward food action callbacks.
 * • Forward retry callback.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * All table rendering is delegated to DataTable.
 * -----------------------------------------------------------------------------
 */

const FoodTable = ({
  foods,

  loading = false,
  error = "",

  toolbar,
  pagination,

  sortField,
  sortDirection,
  onSort,

  onStatusChange,

  // ✅ NEW
  retryAction,
}) => {
  return (
    <DataTable
      columns={FOOD_COLUMNS}
      data={foods}
      rowKey="id"
      loading={loading}
      error={error}
      toolbar={toolbar}
      footer={pagination}
      sortField={sortField}
      sortDirection={sortDirection}
      onSort={onSort}
      // ✅ NEW
      retryAction={retryAction}
      renderRow={(food) => (
        <FoodTableRow
          key={food.id}
          food={food}
          onStatusChange={onStatusChange}
        />
      )}
    />
  );
};

FoodTable.propTypes = {
  foods: PropTypes.array.isRequired,

  loading: PropTypes.bool,

  error: PropTypes.string,

  toolbar: PropTypes.node,

  pagination: PropTypes.node,

  sortField: PropTypes.string,

  sortDirection: PropTypes.oneOf(["asc", "desc"]),

  onSort: PropTypes.func,

  onStatusChange: PropTypes.func.isRequired,

  // ✅ NEW
  retryAction: PropTypes.func,
};

export default FoodTable;
