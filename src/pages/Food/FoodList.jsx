import FoodStatistics from "../../components/food/statistics/FoodStatistics";
import StatusConfirmationModal from "../../components/food/status/StatusConfirmationModal";
import FoodTable from "../../components/food/table/FoodTable";
import FoodToolbar from "../../components/food/toolbar/FoodToolbar";

import { TablePagination } from "../../components/common/data-display/tables";

import useFoodList from "../../hooks/useFoodList";

/**
 * =============================================================================
 * Page : FoodList
 * =============================================================================
 *
 * Purpose
 * -------
 * Composition root for the Food Management module.
 *
 * Responsibilities
 * ----------------
 * • Compose Food components.
 * • Connect UI to useFoodList.
 * • Handle page-level rendering.
 *
 * Notes
 * -----
 * No business logic belongs here.
 * =============================================================================
 */

const FoodList = () => {
  const {
    // Data
    pagedFoods,

    // Request State
    loading,
    error,

    // Search
    search,
    changeSearch,

    // Filters
    filters,
    changeFilter,
    clearFilters,

    // Sorting
    sort,
    changeSort,

    // Pagination
    paginationInfo,
    changePage,
    changePageSize,

    // Statistics
    statistics,

    // Metadata
    categories,
    cuisines,
    diets,
    statuses,

    // Status Dialog
    showStatusModal,
    selectedFood,
    selectedStatus,
    statusUpdating,

    selectStatus,
    cancelStatusChange,
    confirmStatusChange,

    // API

    // retry
    retryLoadingFoods,
  } = useFoodList();

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
        // ✅ NEW
        retryAction={retryLoadingFoods}
      />

      <StatusConfirmationModal
        show={showStatusModal}
        food={selectedFood}
        previousStatus={selectedFood?.foodStatus}
        nextStatus={selectedStatus}
        loading={statusUpdating}
        onCancel={cancelStatusChange}
        onConfirm={confirmStatusChange}
      />
    </>
  );
};

export default FoodList;
