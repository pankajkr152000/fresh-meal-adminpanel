import { useCallback, useEffect, useMemo, useState } from "react";

import { useArchivedFoodContext } from "../context";
import FoodService from "../services/FoodService";

/**
 * =============================================================================
 * Hook : useArchivedFoodList
 * =============================================================================
 *
 * Purpose
 * -------
 * Centralizes business logic for archived foods.
 *
 * Responsibilities
 * ----------------
 * • Load archived foods.
 * • Manage loading/error state.
 * • Manage pagination.
 * • Manage selection.
 * • Restore a single food.
 * • Restore multiple foods.
 * • Permanently delete a single food.
 * • Permanently delete multiple foods.
 * • Update UI immediately after successful actions.
 *
 * Notes
 * -----
 * The page component only coordinates UI.
 * API/business operations remain inside this hook.
 *
 * =============================================================================
 */

const DEFAULT_PAGINATION = Object.freeze({
  page: 1,
  size: 10,
});

const useArchivedFoodList = () => {
  // ===========================================================================
  // Data State
  // ===========================================================================

  const [foods, setFoods] = useState([]);

  // ===========================================================================
  // Request State
  // ===========================================================================

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ===========================================================================
  // Action State
  // ===========================================================================

  const [actionLoading, setActionLoading] = useState(false);

  const [actionError, setActionError] = useState("");

  // ===========================================================================
  // Pagination
  // ===========================================================================

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  // ===========================================================================
  // Selection
  // ===========================================================================

  const { selectedFoodIds, selectFood, deselectFood, clearSelection } =
    useArchivedFoodContext();

  // ===========================================================================
  // Load Archived Foods
  // ===========================================================================

  const loadArchivedFoods = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      const response = await FoodService.getArchivedFoods(signal);

      if (!response.success) {
        throw new Error(response.message || "Unable to load archived foods.");
      }

      setFoods(response.data ?? []);
    } catch (exception) {
      if (
        exception?.name === "CanceledError" ||
        exception?.name === "AbortError"
      ) {
        return;
      }

      console.error("Failed to load archived foods.", exception);

      setError(
        exception?.response?.data?.message ||
          exception?.message ||
          "Unable to load archived foods.",
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // ===========================================================================
  // Initial Load
  // ===========================================================================

  useEffect(() => {
    const controller = new AbortController();

    loadArchivedFoods(controller.signal);

    return () => controller.abort();
  }, [loadArchivedFoods]);

  // ===========================================================================
  // Refresh
  // ===========================================================================

  const refreshArchivedFoods = useCallback(async () => {
    const controller = new AbortController();

    try {
      await loadArchivedFoods(controller.signal);
    } finally {
      controller.abort();
    }
  }, [loadArchivedFoods]);

  // ===========================================================================
  // Retry
  // ===========================================================================

  const retryAction = useCallback(async () => {
    await refreshArchivedFoods();
  }, [refreshArchivedFoods]);

  // ===========================================================================
  // Pagination
  // ===========================================================================

  const pagedFoods = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.size;

    const endIndex = startIndex + pagination.size;

    return foods.slice(startIndex, endIndex);
  }, [foods, pagination]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(foods.length / pagination.size));
  }, [foods.length, pagination.size]);

  const paginationInfo = useMemo(() => {
    const totalItems = foods.length;

    const startRecord =
      totalItems === 0 ? 0 : (pagination.page - 1) * pagination.size + 1;

    const endRecord = Math.min(pagination.page * pagination.size, totalItems);

    return {
      currentPage: pagination.page,
      pageSize: pagination.size,
      totalPages,
      totalItems,
      startRecord,
      endRecord,
      hasPrevious: pagination.page > 1,
      hasNext: pagination.page < totalPages,
    };
  }, [foods.length, pagination, totalPages]);

  // ===========================================================================
  // Pagination Actions
  // ===========================================================================

  const handlePageChange = useCallback((page) => {
    setPagination((previous) => ({
      ...previous,
      page: Math.max(1, page),
    }));
  }, []);

  const handlePageSizeChange = useCallback((size) => {
    setPagination({
      page: 1,
      size,
    });
  }, []);

  // ===========================================================================
  // Correct Page After Food Removal
  // ===========================================================================

  useEffect(() => {
    if (pagination.page > totalPages) {
      setPagination((previous) => ({
        ...previous,
        page: totalPages,
      }));
    }
  }, [pagination.page, totalPages]);

  // ===========================================================================
  // Selection
  // ===========================================================================

  const handleFoodSelectionChange = useCallback(
    (foodId, checked) => {
      if (!foodId) {
        return;
      }

      if (checked) {
        selectFood(foodId);
      } else {
        deselectFood(foodId);
      }
    },
    [selectFood, deselectFood],
  );

  // ===========================================================================
  // Current Page Select All
  // ===========================================================================

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

  // ===========================================================================
  // Selection Information
  // ===========================================================================

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

  // ===========================================================================
  // Restore Single Food
  // ===========================================================================

  const restoreFood = useCallback(
    async (foodId) => {
      if (!foodId) {
        return false;
      }

      try {
        setActionLoading(true);
        setActionError("");

        const response = await FoodService.restoreFood(foodId);

        if (!response.success) {
          throw new Error(response.message || "Unable to restore food.");
        }

        // Remove restored food immediately
        // from archived list.
        setFoods((previous) => previous.filter((food) => food.id !== foodId));

        // Remove it from selection.
        deselectFood(foodId);

        return true;
      } catch (error) {
        console.error("Failed to restore food.", error);

        setActionError(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to restore food.",
        );

        return false;
      } finally {
        setActionLoading(false);
      }
    },
    [deselectFood],
  );

  // ===========================================================================
  // Bulk Restore
  // ===========================================================================

  const bulkRestoreFoods = useCallback(async () => {
    const foodIds = [...selectedFoodIds];

    if (foodIds.length === 0) {
      return false;
    }

    try {
      setActionLoading(true);
      setActionError("");

      const response = await FoodService.bulkRestoreFoods(foodIds);

      if (!response.success) {
        throw new Error(
          response.message || "Unable to restore selected foods.",
        );
      }

      // Remove restored foods from archived list.
      setFoods((previous) =>
        previous.filter((food) => !foodIds.includes(food.id)),
      );

      // Clear all selected IDs.
      clearSelection();

      return true;
    } catch (error) {
      console.error("Failed to bulk restore foods.", error);

      setActionError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to restore selected foods.",
      );

      return false;
    } finally {
      setActionLoading(false);
    }
  }, [selectedFoodIds, clearSelection]);

  // ===========================================================================
  // Permanent Delete - Single Food
  // ===========================================================================

  const deleteFood = useCallback(
    async (foodId) => {
      if (!foodId) {
        return false;
      }

      try {
        setActionLoading(true);
        setActionError("");

        const response = await FoodService.deleteFood(foodId);

        if (!response.success) {
          throw new Error(
            response.message || "Unable to permanently delete food.",
          );
        }

        // Remove deleted food immediately
        // from archived list.
        setFoods((previous) => previous.filter((food) => food.id !== foodId));

        // Remove from selection.
        deselectFood(foodId);

        return true;
      } catch (error) {
        console.error("Failed to permanently delete food.", error);

        setActionError(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to permanently delete food.",
        );

        return false;
      } finally {
        setActionLoading(false);
      }
    },
    [deselectFood],
  );

  // ===========================================================================
  // Permanent Delete - Bulk
  // ===========================================================================

  const bulkDeleteFoods = useCallback(async () => {
    const foodIds = [...selectedFoodIds];

    if (foodIds.length === 0) {
      return false;
    }

    try {
      setActionLoading(true);
      setActionError("");

      const response = await FoodService.bulkDeleteFoods(foodIds);

      if (!response.success) {
        throw new Error(
          response.message || "Unable to permanently delete selected foods.",
        );
      }

      // Remove deleted foods immediately
      // from archived list.
      setFoods((previous) =>
        previous.filter((food) => !foodIds.includes(food.id)),
      );

      // Clear selection.
      clearSelection();

      return true;
    } catch (error) {
      console.error("Failed to bulk delete foods.", error);

      setActionError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to permanently delete selected foods.",
      );

      return false;
    } finally {
      setActionLoading(false);
    }
  }, [selectedFoodIds, clearSelection]);

  // ===========================================================================
  // Public API
  // ===========================================================================

  return {
    // ========================================================================
    // Data
    // ========================================================================

    foods,
    pagedFoods,

    // ========================================================================
    // Request State
    // ========================================================================

    loading,
    error,

    // ========================================================================
    // Action State
    // ========================================================================

    actionLoading,
    actionError,

    // ========================================================================
    // Pagination
    // ========================================================================

    pagination,
    paginationInfo,

    handlePageChange,
    handlePageSizeChange,

    totalPages,

    // ========================================================================
    // Selection
    // ========================================================================

    selectedFoodIds,

    handleFoodSelectionChange,
    handleSelectAllFoods,

    selectionInfo,

    // ========================================================================
    // Food Actions
    // ========================================================================

    restoreFood,
    bulkRestoreFoods,

    deleteFood,
    bulkDeleteFoods,

    // ========================================================================
    // Lifecycle
    // ========================================================================

    loadArchivedFoods,
    refreshArchivedFoods,
    retryAction,
  };
};

export default useArchivedFoodList;
