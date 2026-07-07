import { useCallback, useEffect, useMemo, useState } from "react";
import FoodService from "../services/FoodService";
import useDebounce from "./useDebounce";

/**
 * =============================================================================
 * Hook : useFoodList
 * =============================================================================
 *
 * Purpose
 * -------
 * Centralizes all business logic for the Food Management page.
 *
 * Responsibilities (Current PR)
 * -----------------------------
 * • Load foods from the backend.
 * • Manage loading and error states.
 * • Expose refresh and retry operations.
 * • Derive dropdown metadata.
 *
 *Responsibilities
----------------
• Load food data.
• Manage loading and error states.
• Handle searching, filtering, sorting and pagination.
• Calculate food statistics.
• Manage food status updates.
• Provide optimistic UI with rollback support.

Notes
-----
This hook serves as the business layer for the Food Management module.
Rendering is delegated to presentation components.
 * =============================================================================
 */

/**
 * Default filter values.
 */
const DEFAULT_FILTERS = Object.freeze({
  foodCategory: "",
  cuisineCategory: "",
  dietCategory: "",
  status: "",
});

/**
 * Default sort configuration.
 */
const DEFAULT_SORT = Object.freeze({
  field: "foodName",
  direction: "asc",
});

/**
 * Default pagination configuration.
 */
const DEFAULT_PAGINATION = Object.freeze({
  page: 1,
  size: 10,
});

const useFoodList = () => {
  // ===========================================================================
  // Food Data
  // ===========================================================================

  const [foods, setFoods] = useState([]);

  // ===========================================================================
  // Request State
  // ===========================================================================

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ===========================================================================
  // Search
  // ===========================================================================

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  // ===========================================================================
  // Filters
  // ===========================================================================

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // ===========================================================================
  // Sorting
  // ===========================================================================

  const [sort, setSort] = useState(DEFAULT_SORT);

  // ===========================================================================
  // Pagination
  // ===========================================================================

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  // ===========================================================================
  // Status Dialog
  // ===========================================================================

  const [showStatusModal, setShowStatusModal] = useState(false);

  const [selectedFood, setSelectedFood] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState(null);

  const [statusUpdating, setStatusUpdating] = useState(false);

  // ===========================================================================
  // API
  // ===========================================================================

  /**
   * Loads all foods.
   */
  const loadFoods = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      const response = await FoodService.getAllFoods(signal);

      if (!response.success) {
        throw new Error(response.message);
      }

      setFoods(response.data ?? []);
    } catch (err) {
      if (err.name !== "CanceledError") {
        setError(err.message || "Unable to load food items.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Refreshes the current food list.
   */
  const refreshFoods = useCallback(() => {
    const controller = new AbortController();

    loadFoods(controller.signal);
  }, [loadFoods]);

  /**
   * Retries loading after an error.
   */
  const retryLoadingFoods = useCallback(() => {
    const controller = new AbortController();

    loadFoods(controller.signal);
  }, [loadFoods]);

  // ===========================================================================
  // Derived Metadata
  // ===========================================================================

  const categories = useMemo(() => {
    return [
      ...new Set(foods.map((food) => food.foodCategory).filter(Boolean)),
    ].sort();
  }, [foods]);

  const cuisines = useMemo(() => {
    return [
      ...new Set(foods.map((food) => food.cuisineCategory).filter(Boolean)),
    ].sort();
  }, [foods]);

  const diets = useMemo(() => {
    return [
      ...new Set(foods.map((food) => food.dietCategory).filter(Boolean)),
    ].sort();
  }, [foods]);

  const statuses = useMemo(() => {
    return [
      ...new Set(foods.map((food) => food.foodStatus).filter(Boolean)),
    ].sort();
  }, [foods]);

  // ===========================================================================
  // Lifecycle
  // ===========================================================================

  useEffect(() => {
    const controller = new AbortController();

    loadFoods(controller.signal);

    return () => controller.abort();
  }, [loadFoods]);

  // ===========================================================================
  // Filter Actions
  // ===========================================================================

  /**
   * Updates a single filter value.
   */
  const changeFilter = useCallback((event) => {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  }, []);

  // ===========================================================================
  // Search Actions
  // ===========================================================================

  /**
   * Updates the search text.
   */
  const changeSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  /**
   * Clears all search and filter values.
   */
  const clearFilters = useCallback(() => {
    setSearch("");

    setFilters(DEFAULT_FILTERS);
  }, []);

  // ===========================================================================
  // Filtered Foods
  // ===========================================================================

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch =
        !debouncedSearch ||
        food.foodName?.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesCategory =
        !filters.foodCategory || food.foodCategory === filters.foodCategory;

      const matchesCuisine =
        !filters.cuisineCategory ||
        food.cuisineCategory === filters.cuisineCategory;

      const matchesDiet =
        !filters.dietCategory || food.dietCategory === filters.dietCategory;

      const matchesStatus =
        !filters.status || food.foodStatus === filters.status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCuisine &&
        matchesDiet &&
        matchesStatus
      );
    });
  }, [foods, debouncedSearch, filters]);

  // ===========================================================================
  // Sort Actions
  // ===========================================================================

  /**
   * Updates the current sorting configuration.
   *
   * Clicking the same column toggles:
   * ASC → DESC
   *
   * Clicking another column starts with ASC.
   */
  const changeSort = useCallback((field) => {
    setSort((previous) => ({
      field,
      direction:
        previous.field === field && previous.direction === "asc"
          ? "desc"
          : "asc",
    }));
  }, []);

  // ===========================================================================
  // Sorted Foods
  // ===========================================================================

  const sortedFoods = useMemo(() => {
    const sorted = [...filteredFoods];

    sorted.sort((left, right) => {
      if (!(sort.field in left)) {
        return 0;
      }
      const leftValue = left[sort.field];
      const rightValue = right[sort.field];

      if (leftValue == null && rightValue == null) {
        return 0;
      }

      if (leftValue == null) {
        return 1;
      }

      if (rightValue == null) {
        return -1;
      }

      if (typeof leftValue === "number" && typeof rightValue === "number") {
        return sort.direction === "asc"
          ? leftValue - rightValue
          : rightValue - leftValue;
      }

      const comparison = String(leftValue).localeCompare(
        String(rightValue),
        undefined,
        {
          sensitivity: "base",
          numeric: true,
        },
      );

      return sort.direction === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [filteredFoods, sort]);

  // ===========================================================================
  // Pagination Actions
  // ===========================================================================

  /**
   * Changes the current page.
   */
  const changePage = useCallback((page) => {
    page = Math.max(1, page);
    setPagination((previous) => ({
      ...previous,
      page,
    }));
  }, []);

  /**
   * Changes the page size.
   *
   * Whenever page size changes, reset to page 1.
   */
  const changePageSize = useCallback((size) => {
    // const page = Math.max(1, pagination.page);
    setPagination({
      page: 1,
      size,
    });
  }, []);

  // ===========================================================================
  // Reset Pagination
  // ===========================================================================

  useEffect(() => {
    setPagination((previous) => ({
      ...previous,
      page: 1,
    }));
  }, [debouncedSearch, filters]);

  // ===========================================================================
  // Pagination
  // ===========================================================================

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(sortedFoods.length / pagination.size));
  }, [sortedFoods, pagination.size]);

  const paginationInfo = useMemo(() => {
    const totalItems = sortedFoods.length;

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
  }, [pagination, totalPages, sortedFoods]);

  // ===========================================================================
  // Statistics
  // ===========================================================================

  const statistics = useMemo(() => {
    return foods.reduce(
      (summary, food) => {
        summary.total += 1;

        switch (food.foodStatus) {
          case "AVAILABLE":
            summary.available += 1;
            break;

          case "OUT_OF_STOCK":
            summary.outOfStock += 1;
            break;

          case "DISABLED":
            summary.disabled += 1;
            break;

          case "COMING_SOON":
            summary.comingSoon += 1;
            break;

          case "SEASONAL":
            summary.seasonal += 1;
            break;

          case "DISCONTINUED":
            summary.discontinued += 1;
            break;

          default:
            break;
        }

        return summary;
      },
      {
        total: 0,
        available: 0,
        outOfStock: 0,
        disabled: 0,
        comingSoon: 0,
        seasonal: 0,
        discontinued: 0,
      },
    );
  }, [foods]);

  // ===========================================================================
  // Current Page Records
  // ===========================================================================
  const pagedFoods = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.size;

    const endIndex = startIndex + pagination.size;

    return sortedFoods.slice(startIndex, endIndex);
  }, [sortedFoods, pagination]);

  useEffect(() => {
    if (pagination.page > totalPages) {
      setPagination((previous) => ({
        ...previous,
        page: totalPages,
      }));
    }
  }, [pagination.page, totalPages]);

  // ===========================================================================
  // Status Actions
  // ===========================================================================

  /**
   * Opens the confirmation dialog for a status change.
   */
  const selectStatus = useCallback((food, newStatus) => {
    if (food.foodStatus === newStatus) {
      return;
    }

    setSelectedFood(food);
    setSelectedStatus(newStatus);
    setShowStatusModal(true);
  }, []);

  /**
   * Closes the confirmation dialog and clears temporary state.
   */
  const cancelStatusChange = useCallback(() => {
    setShowStatusModal(false);
    setSelectedFood(null);
    setSelectedStatus(null);
  }, []);

  /**
   * Confirms and performs the status update.
   */
  const confirmStatusChange = useCallback(async () => {
    if (!selectedFood || !selectedStatus) {
      return;
    }

    setStatusUpdating(true);

    const previousFood = foods.find((food) => food.id === selectedFood.id);

    // -------------------------------------------------------------------------
    // Optimistic UI
    // -------------------------------------------------------------------------

    setFoods((previous) =>
      previous.map((food) =>
        food.id === selectedFood.id
          ? {
              ...food,
              foodStatus: selectedStatus,
            }
          : food,
      ),
    );

    try {
      const response = await FoodService.updateFoodStatus(
        selectedFood.id,
        selectedStatus,
      );

      if (!response.success) {
        throw new Error(response.message);
      }

      const updatedFood = response.data;

      // -----------------------------------------------------------------------
      // Synchronize with backend response
      // -----------------------------------------------------------------------

      setFoods((previous) =>
        previous.map((food) =>
          food.id === updatedFood.id
            ? {
                ...food,
                ...updatedFood,
              }
            : food,
        ),
      );

      cancelStatusChange();
    } catch (error) {
      // -----------------------------------------------------------------------
      // Rollback
      // -----------------------------------------------------------------------

      setFoods((previous) =>
        previous.map((food) =>
          food.id === previousFood.id ? previousFood : food,
        ),
      );

      setError(error.message || "Unable to update food status.");
    } finally {
      setStatusUpdating(false);
    }
  }, [selectedFood, selectedStatus, cancelStatusChange, foods]);

  // ===========================================================================
  // Public API
  // ===========================================================================

  return {
    // Data
    foods,

    // Request State
    loading,
    error,

    // Search
    search,
    changeSearch,

    // Filters
    filters,
    setFilters,
    changeFilter,
    clearFilters,

    // Derived Data
    filteredFoods,
    sortedFoods,
    pagedFoods,

    // Sorting
    sort,
    changeSort,

    // Pagination
    //pagination,

    paginationInfo,

    changePage,

    changePageSize,

    totalPages,

    //statistics
    statistics,

    // Status Dialog
    showStatusModal,

    selectedFood,

    selectedStatus,

    statusUpdating,

    selectStatus,

    cancelStatusChange,

    confirmStatusChange,

    // Metadata
    categories,
    cuisines,
    diets,
    statuses,

    // API
    refreshFoods,
    retryLoadingFoods,
  };
};

export default useFoodList;
