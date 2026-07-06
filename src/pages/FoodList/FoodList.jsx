import { useCallback, useEffect, useMemo, useState } from "react";

import FoodService from "../../services/FoodService";

import EmptyState from "../../components/Common/EmptyState";
import ErrorAlert from "../../components/Common/ErrorAlert";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

import FoodFilters from "../../components/Food/FoodFilters";
import FoodSearch from "../../components/Food/FoodSearch";
import FoodTable from "../../components/Food/FoodTable";

import StatusConfirmationModal from "../../components/Food/StatusConfirmationModal";
import useDebounce from "../../hooks/useDebounce";

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useDebounce(searchText, 400);

  const [showStatusModal, setShowStatusModal] = useState(false);

  const [selectedFood, setSelectedFood] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState(null);

  const [statusUpdating, setStatusUpdating] = useState(false);

  const [filters, setFilters] = useState({
    foodCategory: "",
    cuisineCategory: "",
    dietCategory: "",
    availability: "",
  });

  const handleStatusSelection = useCallback(
    (food, newStatus) => {
      if (food.status === newStatus) {
        return;
      }

      setSelectedFood(food);

      setSelectedStatus(newStatus);

      setShowStatusModal(true);
    },

    [],
  );

  /**
   * Load all foods
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
    } catch (error) {
      if (error.name !== "CanceledError") {
        setError(error.message || "Unable to load foods.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Retry API
   */
  const retryLoadFoods = useCallback(() => {
    const controller = new AbortController();

    loadFoods(controller.signal);
  }, [loadFoods]);

  /**
   * Load data on page load
   */
  useEffect(() => {
    const controller = new AbortController();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFoods(controller.signal);

    return () => controller.abort();
  }, [loadFoods]);

  /**
   * Handle filter changes
   */
  const handleFilterChange = useCallback((event) => {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  }, []);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setSearchText("");

    setFilters({
      foodCategory: "",
      cuisineCategory: "",
      dietCategory: "",
      availability: "",
    });
  }, []);

  /**
   * Dropdown values
   */
  const categories = useMemo(() => {
    return [...new Set(foods.map((food) => food.foodCategory).filter(Boolean))];
  }, [foods]);

  /**
   * Generates unique cuisine values from the loaded food list.
   *
   * Important:
   * cuisineCategory is intentionally NOT displayed inside the table.
   * It is only used for filtering purposes.
   *
   * filter(Boolean) removes null, undefined and empty values.
   *
   * Example Output:
   * [
   *   "INDIAN",
   *   "CHINESE",
   *   "ITALIAN"
   * ]
   */
  const cuisines = useMemo(() => {
    return [
      ...new Set(foods.map((food) => food.cuisineCategory).filter(Boolean)),
    ];
  }, [foods]);

  const diets = useMemo(() => {
    return [...new Set(foods.map((food) => food.dietCategory).filter(Boolean))];
  }, [foods]);

  const confirmStatusUpdate = async () => {
    if (!selectedFood) return;

    setStatusUpdating(true);

    const previousStatus = selectedFood.status;

    /*
        Optimistic UI
    */

    setFoods((previous) =>
      previous.map((food) =>
        food.id === selectedFood.id
          ? {
              ...food,

              status: selectedStatus,
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

      setShowStatusModal(false);
    } catch (error) {
      /*
            Rollback
        */

      setFoods((previous) =>
        previous.map((food) =>
          food.id === selectedFood.id
            ? {
                ...food,

                status: previousStatus,
              }
            : food,
        ),
      );

      alert(error.message);
    } finally {
      setStatusUpdating(false);
    }
  };

  /**
   * Computes the filtered list of foods.
   *
   * Filtering order:
   * 1. Search by food name
   * 2. Food Category
   * 3. Cuisine Category
   * 4. Diet Category
   * 5. Availability
   *
   * The original 'foods' array is never modified.
   * Instead, a derived collection is returned using useMemo,
   * preventing unnecessary recalculations on every render.
   */
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

      const matchesAvailability =
        !filters.availability || food.availability === filters.availability;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCuisine &&
        matchesDiet &&
        matchesAvailability
      );
    });
  }, [foods, debouncedSearch, filters]);

  /**
   * Loading
   */
  if (loading) {
    return <LoadingSpinner />;
  }

  /**
   * Error
   */
  if (error) {
    return (
      <ErrorAlert
        message={error}
        onRetry={retryLoadFoods}
      />
    );
  }

  return (
    <div className="container-fluid">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white">
          <h4 className="mb-0">Food List</h4>
        </div>

        <div className="card-body">
          <FoodSearch
            value={searchText}
            onChange={setSearchText}
          />

          <FoodFilters
            filters={filters}
            categories={categories}
            cuisines={cuisines}
            diets={diets}
            onChange={handleFilterChange}
            onClear={clearFilters}
          />

          <StatusConfirmationModal
            show={showStatusModal}
            food={selectedFood}
            newStatus={selectedStatus}
            loading={statusUpdating}
            onCancel={() => setShowStatusModal(false)}
            onConfirm={confirmStatusUpdate}
          />

          {foods.length === 0 ? (
            <EmptyState
              title="No Foods Available"
              message="No food items have been added yet."
            />
          ) : filteredFoods.length === 0 ? (
            <EmptyState
              title="No Matching Foods Found"
              message="Try changing your search or filter criteria."
            />
          ) : (
            <FoodTable
              foods={filteredFoods}
              onStatusChange={handleStatusSelection}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodList;
