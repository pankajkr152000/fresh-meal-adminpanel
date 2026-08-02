import { useNavigate } from "react-router-dom";

import FoodStatistics from "../components/statistics/FoodStatistics";
import StatusConfirmationModal from "../components/status/StatusConfirmationModal";
import FoodTable from "../components/table/FoodTable";
import FoodToolbar from "../components/toolbar/FoodToolbar";

import { TablePagination } from "../../../global/components/data-display/tables";

import useFoodList from "../hooks/useFoodList";
import useFoodMetadata from "../hooks/useFoodMetadata";

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
 * • Compose food-related presentation components.
 * • Connect business hooks with the UI layer.
 * • Delegate food operations to useFoodList.
 * • Delegate metadata loading to useFoodMetadata.
 *
 * Notes
 * -----
 * • Contains no business logic.
 * • Coordinates independent hooks responsible for
 *   food management and metadata management.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

const FoodList = () => {
  // food view
  const navigate = useNavigate();
  // ===========================================================================
  // Food Management
  // ===========================================================================

  const {
    // Food Data
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

    // Status Update
    showStatusModal,
    selectedFood,
    selectedStatus,
    statusUpdating,

    selectStatus,
    cancelStatusChange,
    confirmStatusChange,

    // Retry
    retryLoadingFoods,
  } = useFoodList();

  // ===========================================================================
  // Metadata
  // ===========================================================================

  // const {
  //   metadata,

  //   loading: metadataLoading,

  //   error: metadataError,

  //   retryLoadingMetadata,
  // } = useFoodMetadata();
  const {
    foodMetadata,

    loading: metadataLoading,

    error: metadataError,

    retryLoadingMetadata,
  } = useFoodMetadata();

  // ===========================================================================
  // Navigation
  // ===========================================================================

  const handleViewFood = (foodId) => {
    console.log("Received in handleViewFood in FoodList :", foodId);
    navigate(`/foods/view/${foodId}`);
  };

  // ===========================================================================
  // Toolbar
  // ===========================================================================

  const toolbar = (
    <FoodToolbar
      search={search}
      filters={filters}
      options={foodMetadata}
      onSearchChange={changeSearch}
      onFilterChange={changeFilter}
      onClearFilters={clearFilters}
    />
  );

  // ===========================================================================
  // Pagination
  // ===========================================================================

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
        loading={loading || metadataLoading}
        error={error || metadataError}
        toolbar={toolbar}
        pagination={pagination}
        sortField={sort.field}
        sortDirection={sort.direction}
        onSort={changeSort}
        onStatusChange={selectStatus}
        onView={handleViewFood}
        retryAction={error ? retryLoadingFoods : retryLoadingMetadata}
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
