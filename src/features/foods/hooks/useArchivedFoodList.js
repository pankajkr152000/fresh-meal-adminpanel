import { useCallback, useEffect, useMemo, useState } from "react";

import { useArchivedFoodContext } from "../context";
import FoodService from "../services/FoodService";

/**
 * ============================================================================
 * Hook : useArchivedFoodList
 * ============================================================================
 *
 * Purpose
 * -------
 * Encapsulates archived-food list state and operations.
 *
 * Responsibilities
 * ----------------
 * • Load archived foods.
 * • Manage loading/error state.
 * • Manage pagination.
 * • Manage food selection.
 * • Support current-page Select All.
 * • Support indeterminate selection state.
 * • Support retry.
 *
 * Notes
 * -----
 * Archive, restore and permanent-delete operations will be added separately.
 *
 * ============================================================================
 */

const DEFAULT_PAGINATION = Object.freeze({
  page: 1,
  size: 10,
});

const useArchivedFoodList = () => {
  // =========================================================================
  // Data State
  // =========================================================================

  const [foods, setFoods] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =========================================================================
  // Pagination State
  // =========================================================================

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  // =========================================================================
  // Selection State
  // =========================================================================

  //const [selectedFoodIds, setSelectedFoodIds] = useState(new Set());
  const { selectedFoodIds, selectFood, deselectFood, clearSelection } =
    useArchivedFoodContext();
  // =========================================================================
  // Load Archived Foods
  // =========================================================================

  const loadArchivedFoods = useCallback(async (signal) => {
    try {
      setLoading(true);

      setError("");

      const response = await FoodService.getArchivedFoods(signal);

      setFoods(response?.data ?? []);
    } catch (exception) {
      if (
        exception?.name === "CanceledError" ||
        exception?.name === "AbortError"
      ) {
        return;
      }

      console.error("Failed to load archived foods.", exception);

      setError(
        exception?.response?.data?.message || "Unable to load archived foods.",
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // =========================================================================
  // Initial Load
  // =========================================================================

  useEffect(() => {
    const controller = new AbortController();

    loadArchivedFoods(controller.signal);

    return () => controller.abort();
  }, [loadArchivedFoods]);

  // =========================================================================
  // Pagination
  // =========================================================================

  const pagedFoods = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.size;

    const endIndex = startIndex + pagination.size;

    return foods.slice(startIndex, endIndex);
  }, [foods, pagination]);

  // =========================================================================
  // Individual Selection
  // =========================================================================

  const handleFoodSelectionChange = useCallback(
    (foodId, checked) => {
      if (checked) {
        selectFood(foodId);
      } else {
        deselectFood(foodId);
      }
    },
    [selectFood, deselectFood],
  );

  // =========================================================================
  // Current Page Select All
  // =========================================================================

  const handleSelectAllFoods = useCallback(
    (checked) => {
      pagedFoods.forEach((food) => {
        if (!food?.id) {
          return;
        }

        if (checked) {
          selectFood(food.id);
        } else {
          deselectFood(food.id);
        }
      });
    },
    [pagedFoods, selectFood, deselectFood],
  );

  // =========================================================================
  // Selection Information
  // =========================================================================

  const selectionInfo = useMemo(() => {
    const visibleFoodIds = pagedFoods.map((food) => food?.id).filter(Boolean);

    const selectedVisibleCount = visibleFoodIds.filter((id) =>
      selectedFoodIds.has(id),
    ).length;

    return {
      selectedCount: selectedFoodIds.size,

      selectedVisibleCount,

      allFoodsSelected:
        visibleFoodIds.length > 0 &&
        selectedVisibleCount === visibleFoodIds.length,

      someFoodsSelected:
        selectedVisibleCount > 0 &&
        selectedVisibleCount < visibleFoodIds.length,
    };
  }, [pagedFoods, selectedFoodIds]);

  // =========================================================================
  // Pagination Actions
  // =========================================================================

  const handlePageChange = useCallback((page) => {
    setPagination((previous) => ({
      ...previous,
      page,
    }));
  }, []);

  const handlePageSizeChange = useCallback((size) => {
    setPagination({
      page: 1,
      size,
    });
  }, []);

  // =========================================================================
  // Retry
  // =========================================================================

  const retryAction = useCallback(() => {
    const controller = new AbortController();

    loadArchivedFoods(controller.signal);

    return () => controller.abort();
  }, [loadArchivedFoods]);

  // =========================================================================
  // Return
  // =========================================================================

  return {
    // Data
    foods,
    pagedFoods,

    // State
    loading,
    error,

    // Pagination
    pagination,
    handlePageChange,
    handlePageSizeChange,

    // Selection
    selectedFoodIds,
    handleFoodSelectionChange,
    handleSelectAllFoods,
    selectionInfo,

    // Actions
    loadArchivedFoods,
    retryAction,
  };
};

export default useArchivedFoodList;
