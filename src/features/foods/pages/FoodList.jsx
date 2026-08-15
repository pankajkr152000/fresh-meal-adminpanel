import { useNavigate } from "react-router-dom";

import FoodStatistics from "../components/statistics/FoodStatistics";
import StatusConfirmationModal from "../components/status/StatusConfirmationModal";
import FoodTable from "../components/table/FoodTable";
import FoodToolbar from "../components/toolbar/FoodToolbar";

import { TablePagination } from "../../../global/components/data-display/tables";

import { useState } from "react";
import { toast } from "react-toastify";
import { ConfirmationModal } from "../../../global/components/overlay";
import { useFoodListContext } from "../context";
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

    // food selection
    selectedFoodIds,
    handleFoodSelectionChange,
    handleSelectAllFoods,
    selectionInfo,

    // Food Actions
    archiveFood,
    bulkArchiveFoods,

    actionLoading,
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

  const {
    selectedCount,
    hasSelection,

    showArchiveConfirmation,
    openArchiveConfirmation,
    closeArchiveConfirmation,
  } = useFoodListContext();
  // actions
  const [confirmation, setConfirmation] = useState({
    show: false,
    action: null,
    food: null,
  });

  console.log("FoodList archive modal:", {
    selectedCount,
    showArchiveConfirmation,
  });

  // ===========================================================================
  // Navigation
  // ===========================================================================

  const handleViewFood = (foodId) => {
    console.log("Received in handleViewFood in FoodList :", foodId);
    navigate(`/foods/view/${foodId}`);
  };

  // ===========================================================================
  // Actions
  // ===========================================================================
  const openSingleActionConfirmation = (action, food) => {
    setConfirmation({
      show: true,
      action,
      food,
    });
  };

  const closeConfirmation = () => {
    setConfirmation({
      show: false,
      action: null,
      food: null,
    });
  };

  const handleArchiveConfirmation = async () => {
    const { action, food } = confirmation;

    if (action !== "ARCHIVE" || !food) {
      return;
    }

    const success = await archiveFood(food.id);

    if (success) {
      toast.success("Food archived successfully");
      closeConfirmation();
    }
  };

  const handleBulkArchiveConfirmation = async () => {
    //const foodIds = [...selectedFoodIds];

    if (selectedFoodIds.size === 0) {
      return;
    }

    const success = await bulkArchiveFoods();

    if (success) {
      toast.success("Foods archived successfully.");
      closeArchiveConfirmation();
    }
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
        onArchive={(food) => openSingleActionConfirmation("ARCHIVE", food)}
        // onDelete={(food) => openSingleActionConfirmation("DELETE", food)}
        retryAction={error ? retryLoadingFoods : retryLoadingMetadata}
        selectedFoodIds={selectedFoodIds}
        onFoodSelectionChange={handleFoodSelectionChange}
        handleSelectAllFoods={handleSelectAllFoods}
        selectionInfo={selectionInfo}
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

      {/* confirmation modal to archive food in bulk*/}

      <ConfirmationModal
        show={showArchiveConfirmation}
        title="Archive Food"
        message={
          selectedCount === 1
            ? "Are you sure you want to archive the selected food?"
            : `Are you sure you want to archive ${selectedCount} selected foods?`
        }
        confirmText="Archive"
        cancelText="Cancel"
        confirmButtonClass="btn-warning"
        loading={actionLoading}
        onConfirm={handleBulkArchiveConfirmation}
        onCancel={closeArchiveConfirmation}
      />
      {/* single archive confirmation modal */}
      <ConfirmationModal
        show={confirmation.show}
        title="Archive Food"
        message={
          confirmation.food
            ? `Are you sure you want to archive "${confirmation.food.foodName}"?`
            : ""
        }
        confirmText="Archive"
        cancelText="Cancel"
        confirmButtonClass="btn-warning"
        loading={actionLoading}
        onConfirm={handleArchiveConfirmation}
        onCancel={closeConfirmation}
      />
    </>
  );
};

export default FoodList;
