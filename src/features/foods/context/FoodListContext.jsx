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
 * Context : FoodListContext
 * ============================================================================
 *
 * Purpose
 * -------
 * Provides shared food-selection state between:
 *
 * • Menubar
 * • FoodList page
 *
 * Responsibilities
 * ----------------
 * • Store selected food IDs.
 * • Provide selection actions.
 * • Provide derived selection information.
 *
 * Notes
 * -----
 * API calls remain outside this context.
 * The context only manages shared UI/action state.
 *
 * ============================================================================
 */

const FoodListContext = createContext(null);

export const FoodListProvider = ({ children }) => {
  // =========================================================================
  // Selection
  // =========================================================================

  const [selectedFoodIds, setSelectedFoodIds] = useState(new Set());

  const [showArchiveConfirmation, setShowArchiveConfirmation] = useState(false);
  // =========================================================================
  // Selection Actions
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

  const openArchiveConfirmation = useCallback(() => {
    console.log("OPEN ARCHIVE CONFIRMATION", selectedFoodIds);

    if (selectedFoodIds.size === 0) {
      return;
    }

    setShowArchiveConfirmation(true);
  }, [selectedFoodIds]);

  const closeArchiveConfirmation = useCallback(() => {
    setShowArchiveConfirmation(false);
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
      // ========================================================================
      // Selection
      // ========================================================================

      selectedFoodIds,

      selectedCount,

      hasSelection,

      selectFood,
      deselectFood,
      clearSelection,

      // ========================================================================
      // Archive Confirmation
      // ========================================================================

      showArchiveConfirmation,

      openArchiveConfirmation,

      closeArchiveConfirmation,
    }),
    [
      // Selection
      selectedFoodIds,
      selectedCount,
      hasSelection,

      selectFood,
      deselectFood,
      clearSelection,

      // Archive Confirmation
      showArchiveConfirmation,
      openArchiveConfirmation,
      closeArchiveConfirmation,
    ],
  );

  return (
    <FoodListContext.Provider value={value}>
      {children}
    </FoodListContext.Provider>
  );
};

FoodListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * ============================================================================
 * Hook : useFoodListContext
 * ============================================================================
 */

export const useFoodListContext = () => {
  const context = useContext(FoodListContext);

  if (!context) {
    throw new Error("useFoodListContext must be used inside FoodListProvider.");
  }

  return context;
};

export default FoodListContext;
