import { ConfirmationModal } from "../../../global/components/overlay";
import ArchivedFoodTable from "../components/table/ArchivedFoodTable";
import { useArchivedFoodContext } from "../context";
import { useArchivedFoodList } from "../hooks";

/**
 * ============================================================================
 * Component : ArchivedFoods
 * ============================================================================
 *
 * Page responsible for displaying and managing archived foods.
 *
 * Current responsibilities
 * -------------------------
 * • Load archived foods.
 * • Display archived foods.
 * • Handle selection.
 * • Handle current-page Select All.
 *
 * Restore and permanent-delete operations will be added separately.
 *
 * ============================================================================
 */

const ArchivedFoods = () => {
  const {
    pagedFoods,

    loading,
    error,

    selectedFoodIds,

    selectionInfo,

    handleFoodSelectionChange,
    handleSelectAllFoods,

    retryAction,
  } = useArchivedFoodList();

  const {
    selectedCount,

    showRestoreConfirmation,
    closeRestoreConfirmation,

    showPermanentDeleteConfirmation,
    closePermanentDeleteConfirmation,
  } = useArchivedFoodContext();

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
      />

      {/* restore confirmation modal */}
      <ConfirmationModal
        show={showRestoreConfirmation}
        title="Restore Selected Foods?"
        confirmText="Restore"
        cancelText="Cancel"
        confirmButtonClass="btn-primary"
        onConfirm={() => {
          console.log("Restore selected food IDs:", [...selectedFoodIds]);
        }}
        onCancel={closeRestoreConfirmation}>
        <p className="mb-0">
          Are you sure you want to restore <strong>{selectedCount}</strong>{" "}
          {selectedCount === 1 ? "selected food" : "selected foods"}?
        </p>
      </ConfirmationModal>

      {/* Delete permanently confirmation madal */}
      <ConfirmationModal
        show={showPermanentDeleteConfirmation}
        title="Permanently Delete Selected Foods?"
        confirmText="Delete Permanently"
        cancelText="Cancel"
        confirmButtonClass="btn-danger"
        onConfirm={() => {
          console.log("Permanently delete selected food IDs:", [
            ...selectedFoodIds,
          ]);
        }}
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
