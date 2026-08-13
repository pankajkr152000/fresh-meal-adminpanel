import { useState } from "react";
import { toast } from "react-toastify";

import { ConfirmationModal } from "../../../global/components/overlay";

import ArchivedFoodTable from "../components/table/ArchivedFoodTable";

import { useArchivedFoodContext } from "../context";
import { useArchivedFoodList } from "../hooks";

/**
 * ============================================================================
 * Page : ArchivedFoods
 * ============================================================================
 *
 * Purpose
 * -------
 * Displays and manages archived foods.
 *
 * Responsibilities
 * ----------------
 * • Display archived foods.
 * • Handle selection.
 * • Handle current-page Select All.
 * • Handle single Restore.
 * • Handle single Permanent Delete.
 * • Handle bulk Restore.
 * • Handle bulk Permanent Delete.
 *
 * API/business operations are delegated to useArchivedFoodList.
 *
 * ============================================================================
 */

const ArchivedFoods = () => {
  // =========================================================================
  // Archived Food Management
  // =========================================================================

  const {
    pagedFoods,

    loading,
    error,

    selectedFoodIds,

    selectionInfo,

    handleFoodSelectionChange,
    handleSelectAllFoods,

    retryAction,

    // =======================================================================
    // Archived Food Actions
    // =======================================================================

    restoreFood,
    bulkRestoreFoods,

    deleteFood,
    bulkDeleteFoods,

    actionLoading,
  } = useArchivedFoodList();

  // =========================================================================
  // Archived Food Context
  // =========================================================================

  const {
    selectedCount,

    // Bulk Restore
    showRestoreConfirmation,
    closeRestoreConfirmation,

    // Bulk Permanent Delete
    showPermanentDeleteConfirmation,
    closePermanentDeleteConfirmation,
  } = useArchivedFoodContext();

  // =========================================================================
  // Single Action Confirmation
  // =========================================================================

  const [confirmation, setConfirmation] = useState({
    show: false,
    action: null,
    food: null,
  });

  // =========================================================================
  // Single Action Confirmation Handlers
  // =========================================================================

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

  // =========================================================================
  // Single Restore
  // =========================================================================

  const handleRestoreConfirmation = async () => {
    const { action, food } = confirmation;

    if (action !== "RESTORE" || !food) {
      return;
    }

    const success = await restoreFood(food.id);

    if (success) {
      toast.success("Food restored successfully.");

      closeConfirmation();
    }
  };

  // =========================================================================
  // Single Permanent Delete
  // =========================================================================

  const handleDeleteConfirmation = async () => {
    const { action, food } = confirmation;

    if (action !== "DELETE" || !food) {
      return;
    }

    const success = await deleteFood(food.id);

    if (success) {
      toast.success("Food permanently deleted successfully.");

      closeConfirmation();
    }
  };

  // =========================================================================
  // Bulk Restore
  // =========================================================================

  const handleBulkRestoreConfirmation = async () => {
    if (selectedFoodIds.size === 0) {
      return;
    }

    const success = await bulkRestoreFoods();

    if (success) {
      toast.success("Foods restored successfully.");

      closeRestoreConfirmation();
    }
  };

  // =========================================================================
  // Bulk Permanent Delete
  // =========================================================================

  const handleBulkDeleteConfirmation = async () => {
    if (selectedFoodIds.size === 0) {
      return;
    }

    const success = await bulkDeleteFoods();

    if (success) {
      toast.success("Foods permanently deleted.");

      closePermanentDeleteConfirmation();
    }
  };

  // =========================================================================
  // Render
  // =========================================================================

  return (
    <div className="container-fluid py-3">
      {/* ====================================================================
          Page Header
      ==================================================================== */}

      <div className="mb-4">
        <h2 className="mb-1">Archived Foods</h2>

        <p className="text-muted mb-0">
          View and manage foods that are currently archived.
        </p>
      </div>

      {/* ====================================================================
          Archived Food Table
      ==================================================================== */}

      <ArchivedFoodTable
        foods={pagedFoods}
        loading={loading}
        error={error}
        selectedFoodIds={selectedFoodIds}
        selectionInfo={selectionInfo}
        onFoodSelectionChange={handleFoodSelectionChange}
        onSelectAllFoods={handleSelectAllFoods}
        retryAction={retryAction}
        // ---------------------------------------------------------------
        // Single Restore
        // ---------------------------------------------------------------

        onRestore={(food) => openSingleActionConfirmation("RESTORE", food)}
        // ---------------------------------------------------------------
        // Single Permanent Delete
        // ---------------------------------------------------------------

        onDeletePermanently={(food) =>
          openSingleActionConfirmation("DELETE", food)
        }
      />

      {/* ====================================================================
          SINGLE ACTION CONFIRMATION
          ==================================================================== */}

      <ConfirmationModal
        show={confirmation.show}
        title={
          confirmation.action === "RESTORE"
            ? "Restore Food"
            : "Permanently Delete Food"
        }
        confirmText={
          confirmation.action === "RESTORE" ? "Restore" : "Delete Permanently"
        }
        cancelText="Cancel"
        confirmButtonClass={
          confirmation.action === "RESTORE" ? "btn-primary" : "btn-danger"
        }
        loading={actionLoading}
        onConfirm={
          confirmation.action === "RESTORE"
            ? handleRestoreConfirmation
            : handleDeleteConfirmation
        }
        onCancel={closeConfirmation}>
        {confirmation.action === "RESTORE" ? (
          <p className="mb-0">
            Are you sure you want to restore{" "}
            <strong>"{confirmation.food?.foodName}"</strong>?
          </p>
        ) : (
          <>
            <p className="mb-2">This action cannot be undone.</p>

            <p className="mb-0">
              Are you sure you want to permanently delete{" "}
              <strong>"{confirmation.food?.foodName}"</strong>?
            </p>
          </>
        )}
      </ConfirmationModal>

      {/* ====================================================================
          BULK RESTORE CONFIRMATION
          ==================================================================== */}

      <ConfirmationModal
        show={showRestoreConfirmation}
        title="Restore Selected Foods?"
        confirmText="Restore"
        cancelText="Cancel"
        confirmButtonClass="btn-primary"
        loading={actionLoading}
        onConfirm={handleBulkRestoreConfirmation}
        onCancel={closeRestoreConfirmation}>
        <p className="mb-0">
          Are you sure you want to restore <strong>{selectedCount}</strong>{" "}
          {selectedCount === 1 ? "selected food" : "selected foods"}?
        </p>
      </ConfirmationModal>

      {/* ====================================================================
          BULK PERMANENT DELETE CONFIRMATION
          ==================================================================== */}

      <ConfirmationModal
        show={showPermanentDeleteConfirmation}
        title="Permanently Delete Selected Foods?"
        confirmText="Delete Permanently"
        cancelText="Cancel"
        confirmButtonClass="btn-danger"
        loading={actionLoading}
        onConfirm={handleBulkDeleteConfirmation}
        onCancel={closePermanentDeleteConfirmation}>
        <p className="mb-2">This action cannot be undone.</p>

        <p className="mb-0">
          Are you sure you want to permanently delete{" "}
          <strong>{selectedCount}</strong>{" "}
          {selectedCount === 1 ? "selected food" : "selected foods"}?
        </p>
      </ConfirmationModal>
    </div>
  );
};

export default ArchivedFoods;
