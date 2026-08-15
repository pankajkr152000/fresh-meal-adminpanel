import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

/**
 * ============================================================================
 * Context : ArchivedFoodContext
 * ============================================================================
 *
 * Purpose
 * -------
 * Provides shared archived-food action state between:
 *
 * • Menubar
 * • ArchivedFoods page
 *
 * Responsibilities
 * ----------------
 * • Store selected archived food IDs.
 * • Control Restore confirmation modal.
 * • Control Permanent Delete confirmation modal.
 *
 * Notes
 * -----
 * API calls remain outside this context.
 * The context only manages shared UI/action state.
 *
 * ============================================================================
 */

const ArchivedFoodContext = createContext(null);

export const ArchivedFoodProvider = ({ children }) => {
  // =========================================================================
  // Selection
  // =========================================================================

  const [selectedFoodIds, setSelectedFoodIds] = useState(new Set());

  // =========================================================================
  // Confirmation Modal State
  // =========================================================================

  const [showRestoreConfirmation, setShowRestoreConfirmation] = useState(false);

  const [showPermanentDeleteConfirmation, setShowPermanentDeleteConfirmation] =
    useState(false);

  // =========================================================================
  // Selection
  // =========================================================================

  const selectFood = useCallback((foodId) => {
    setSelectedFoodIds((previous) => {
      const next = new Set(previous);

      next.add(foodId);

      return next;
    });
  }, []);

  const deselectFood = useCallback((foodId) => {
    setSelectedFoodIds((previous) => {
      const next = new Set(previous);

      next.delete(foodId);

      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedFoodIds(new Set());
  }, []);

  // =========================================================================
  // Restore Confirmation
  // =========================================================================

  const openRestoreConfirmation = useCallback(() => {
    if (selectedFoodIds.size === 0) {
      return;
    }

    setShowRestoreConfirmation(true);
  }, [selectedFoodIds]);

  const closeRestoreConfirmation = useCallback(() => {
    setShowRestoreConfirmation(false);
  }, []);

  // =========================================================================
  // Permanent Delete Confirmation
  // =========================================================================

  const openPermanentDeleteConfirmation = useCallback(() => {
    if (selectedFoodIds.size === 0) {
      return;
    }

    setShowPermanentDeleteConfirmation(true);
  }, [selectedFoodIds]);

  const closePermanentDeleteConfirmation = useCallback(() => {
    setShowPermanentDeleteConfirmation(false);
  }, []);

  // =========================================================================
  // Derived State
  // =========================================================================

  const selectedCount = selectedFoodIds.size;

  const hasSelection = selectedCount > 0;

  // =========================================================================
  // Context Value
  // =========================================================================

  const value = useMemo(
    () => ({
      selectedFoodIds,

      selectedCount,

      hasSelection,

      selectFood,
      deselectFood,
      clearSelection,

      showRestoreConfirmation,
      openRestoreConfirmation,
      closeRestoreConfirmation,

      showPermanentDeleteConfirmation,
      openPermanentDeleteConfirmation,
      closePermanentDeleteConfirmation,
    }),
    [
      selectedFoodIds,
      selectedCount,
      hasSelection,

      selectFood,
      deselectFood,
      clearSelection,

      showRestoreConfirmation,
      openRestoreConfirmation,
      closeRestoreConfirmation,

      showPermanentDeleteConfirmation,
      openPermanentDeleteConfirmation,
      closePermanentDeleteConfirmation,
    ],
  );

  return (
    <ArchivedFoodContext.Provider value={value}>
      {children}
    </ArchivedFoodContext.Provider>
  );
};

ArchivedFoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * ============================================================================
 * Hook : useArchivedFoodContext
 * ============================================================================
 */

export const useArchivedFoodContext = () => {
  const context = useContext(ArchivedFoodContext);

  if (!context) {
    throw new Error(
      "useArchivedFoodContext must be used inside ArchivedFoodProvider.",
    );
  }

  return context;
};

export default ArchivedFoodContext;
