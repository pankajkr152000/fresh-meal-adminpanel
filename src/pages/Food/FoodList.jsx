import FoodStatistics from "../../components/food/statistics/FoodStatistics";
import StatusConfirmationModal from "../../components/food/status/StatusConfirmationModal";
import FoodTable from "../../components/food/table/FoodTable";
import FoodToolbar from "../../components/food/toolbar/FoodToolbar";

import { TablePagination } from "../../components/common/data-display/tables";

import useFoodList from "../../hooks/useFoodList";

console.log("******** ENTERPRISE FOODLIST ********");

/**
 * =============================================================================
 * Page : FoodList
 * =============================================================================
 *
 * Purpose
 * -------
 * Serves as the composition root for the Food Management module.
 *
 * Responsibilities
 * ----------------
 * • Compose all food-related UI components.
 * • Connect the presentation layer with the useFoodList hook.
 * • Pass data and callbacks to child components.
 * • Render page-level dialogs and layouts.
 *
 * Notes
 * -----
 * • This component intentionally contains no business logic.
 * • All state management and API interactions are delegated to useFoodList.
 * • Status transitions are performed using DisplayOptionResponse objects.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const FoodList = () => {
  const {
    // -------------------------------------------------------------------------
    // Food Data
    // -------------------------------------------------------------------------
    pagedFoods,

    // -------------------------------------------------------------------------
    // Request State
    // -------------------------------------------------------------------------
    loading,
    error,

    // -------------------------------------------------------------------------
    // Search
    // -------------------------------------------------------------------------
    search,
    changeSearch,

    // -------------------------------------------------------------------------
    // Filters
    // -------------------------------------------------------------------------
    filters,
    changeFilter,
    clearFilters,

    // -------------------------------------------------------------------------
    // Sorting
    // -------------------------------------------------------------------------
    sort,
    changeSort,

    // -------------------------------------------------------------------------
    // Pagination
    // -------------------------------------------------------------------------
    paginationInfo,
    changePage,
    changePageSize,

    // -------------------------------------------------------------------------
    // Statistics
    // -------------------------------------------------------------------------
    statistics,

    // -------------------------------------------------------------------------
    // Metadata
    // -------------------------------------------------------------------------
    categories,
    cuisines,
    diets,
    statuses,

    // -------------------------------------------------------------------------
    // Status Update
    // -------------------------------------------------------------------------
    showStatusModal,
    selectedFood,
    selectedStatus,
    statusUpdating,

    selectStatus,
    cancelStatusChange,
    confirmStatusChange,

    // -------------------------------------------------------------------------
    // Retry
    // -------------------------------------------------------------------------
    retryLoadingFoods,
  } = useFoodList();

  /**
   * Toolbar displayed above the food table.
   */
  const toolbar = (
    <FoodToolbar
      search={search}
      filters={filters}
      options={{
        categories,
        cuisines,
        diets,
        statuses,
      }}
      onSearchChange={changeSearch}
      onFilterChange={changeFilter}
      onClearFilters={clearFilters}
    />
  );

  /**
   * Table pagination component.
   */
  const pagination = (
    <TablePagination
      pagination={paginationInfo}
      onPageChange={changePage}
      onPageSizeChange={changePageSize}
    />
  );

  return (
    <>
      <FoodStatistics statistics={statistics} />

      <FoodTable
        foods={pagedFoods}
        loading={loading}
        error={error}
        toolbar={toolbar}
        pagination={pagination}
        sortField={sort.field}
        sortDirection={sort.direction}
        onSort={changeSort}
        onStatusChange={selectStatus}
        retryAction={retryLoadingFoods}
      />

      <StatusConfirmationModal
        show={showStatusModal}
        food={selectedFood}
        previousStatus={selectedFood?.foodStatus}
        /*
         * selectedStatus is now a DisplayOptionResponse.
         * The modal only needs the display label.
         */
        nextStatus={selectedStatus?.label}
        loading={statusUpdating}
        onCancel={cancelStatusChange}
        onConfirm={confirmStatusChange}
      />
    </>
  );
};

export default FoodList;
