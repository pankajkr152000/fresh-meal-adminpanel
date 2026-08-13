import PropTypes from "prop-types";

import DataTable from "../../../../global/components/data-display/tables/DataTable";
import { FOOD_COLUMNS } from "../../constants/columns";

import FoodTableRow from "./FoodTableRow";

/**
 * ============================================================================
 * Component : FoodTable
 * ============================================================================
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
 * • Forward food selection configuration.
 *
 * Notes
 * -----
 * This component contains no selection business logic.
 * Selection state is owned by the food feature hook.
 *
 * ============================================================================
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

  retryAction,
  onView,

  // Selection
  selectedFoodIds = new Set(),
  allFoodsSelected = false,
  onSelectAllFoods,
  someFoodsSelected,
  onFoodSelectionChange,
  selectionInfo,
  handleSelectAllFoods,

  // action
  onArchive,
  // onDelete,
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
      retryAction={retryAction}
      onView={onView}
      // Selection
      selectable
      selectedRowKeys={selectedFoodIds}
      allRowsSelected={selectionInfo?.allFoodsSelected ?? false}
      someRowsSelected={selectionInfo?.someFoodsSelected ?? false}
      onSelectAll={handleSelectAllFoods}
      renderRow={(food) => (
        <FoodTableRow
          key={food.id}
          food={food}
          onStatusChange={onStatusChange}
          onView={onView}
          selected={selectedFoodIds.has(food.id)}
          onSelectionChange={onFoodSelectionChange}
          onArchive={onArchive}
          // onDelete={onDelete}
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

  retryAction: PropTypes.func,

  onView: PropTypes.func,

  // Selection
  selectedFoodIds: PropTypes.instanceOf(Set),

  allFoodsSelected: PropTypes.bool,

  onSelectAllFoods: PropTypes.func,

  onFoodSelectionChange: PropTypes.func,

  onArchive: PropTypes.func.isRequired,

  // onDelete: PropTypes.func.isRequired,

  selectionInfo: PropTypes.shape({
    selectedCount: PropTypes.number,
    selectedVisibleCount: PropTypes.number,
    allFoodsSelected: PropTypes.bool,
    someFoodsSelected: PropTypes.bool,
  }),

  handleSelectAllFoods: PropTypes.func,
};

export default FoodTable;
