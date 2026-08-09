import PropTypes from "prop-types";

import DataTable from "../../../../global/components/data-display/tables/DataTable";

import { ARCHIVED_FOOD_COLUMNS } from "../../constants/archivedFoodColumns";

import ArchivedFoodTableRow from "./ArchivedFoodTableRow";

/**
 * ============================================================================
 * Component : ArchivedFoodTable
 * ============================================================================
 *
 * Purpose
 * -------
 * Archived-food-specific wrapper around the reusable DataTable component.
 *
 * Responsibilities
 * ----------------
 * • Supply archived-food column configuration.
 * • Supply archived-food row renderer.
 * • Forward selection state.
 * • Forward Select All / Deselect All.
 * • Forward loading and error states.
 * • Forward retry callback.
 *
 * Notes
 * -----
 * No API calls.
 * No business logic.
 *
 * ============================================================================
 */

const ArchivedFoodTable = ({
  foods,

  loading = false,
  error = "",

  selectedFoodIds = new Set(),

  selectionInfo,

  onFoodSelectionChange,

  onSelectAllFoods,

  retryAction,
}) => {
  return (
    <DataTable
      columns={ARCHIVED_FOOD_COLUMNS}
      data={foods}
      rowKey="id"
      loading={loading}
      error={error}
      retryAction={retryAction}
      // ======================================================================
      // Selection
      // ======================================================================

      selectable
      selectedRowKeys={selectedFoodIds}
      allRowsSelected={selectionInfo?.allFoodsSelected ?? false}
      someRowsSelected={selectionInfo?.someFoodsSelected ?? false}
      onSelectAll={onSelectAllFoods}
      // ======================================================================
      // Row Renderer
      // ======================================================================

      renderRow={(food) => (
        <ArchivedFoodTableRow
          key={food.id}
          food={food}
          selected={selectedFoodIds.has(food.id)}
          onSelectionChange={onFoodSelectionChange}
        />
      )}
    />
  );
};

ArchivedFoodTable.propTypes = {
  foods: PropTypes.array.isRequired,

  loading: PropTypes.bool,

  error: PropTypes.string,

  selectedFoodIds: PropTypes.instanceOf(Set),

  selectionInfo: PropTypes.shape({
    selectedCount: PropTypes.number,
    selectedVisibleCount: PropTypes.number,
    allFoodsSelected: PropTypes.bool,
    someFoodsSelected: PropTypes.bool,
  }),

  onFoodSelectionChange: PropTypes.func,

  onSelectAllFoods: PropTypes.func,

  retryAction: PropTypes.func,
};

export default ArchivedFoodTable;
