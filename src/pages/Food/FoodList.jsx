import FoodStatistics from "../../components/food/statistics/FoodStatistics";
import StatusConfirmationModal from "../../components/food/status/StatusConfirmationModal";
import FoodTable from "../../components/food/table/FoodTable";
import FoodToolbar from "../../components/food/toolbar/FoodToolbar";

import EmptyState from "../../components/common/feedback/EmptyState";
import ErrorAlert from "../../components/common/feedback/ErrorAlert";
import LoadingSpinner from "../../components/common/feedback/LoadingSpinner";

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
    filteredFoods,

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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorAlert
        message={error}
        onRetry={retryLoadingFoods}
      />
    );
  }

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
      />

      {!loading && filteredFoods.length === 0 && (
        <EmptyState
          title="No Foods Found"
          message="No food items match the current search or filters."
        />
      )}

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
