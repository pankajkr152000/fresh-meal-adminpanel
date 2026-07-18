// ===========================================================================
// File: useFoodDetails.js
// Description:
// Custom hook responsible for loading and managing a single food entity.
//
// Responsibilities:
// - Load food details
// - Manage loading state
// - Manage error state
// - Expose refresh capability
//
// NOTE:
// This hook contains NO UI logic.
// Rendering decisions belong to ViewFood and reusable Detail components.
// ===========================================================================

import { useCallback, useEffect, useState } from "react";
import { FoodService } from "../services";

// ===========================================================================
// Hook
// ===========================================================================

const useFoodDetails = (foodId) => {
  // =======================================================================
  // State
  // =======================================================================

  const [food, setFood] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // =======================================================================
  // Load Food
  // =======================================================================

  const loadFood = useCallback(async () => {
    if (!foodId) {
      setFood(null);
      setError("Food id is required.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await FoodService.getFoodById(foodId);

      setFood(response?.data ?? null);
    } catch (exception) {
      console.error("Failed to load food details:", exception);

      setFood(null);

      setError(
        exception?.response?.data?.message ||
          exception?.message ||
          "Unable to load food details.",
      );
    } finally {
      setLoading(false);
    }
  }, [foodId]);

  // =======================================================================
  // Refresh
  // =======================================================================

  const refreshFood = useCallback(async () => {
    await loadFood();
  }, [loadFood]);

  // =======================================================================
  // Effects
  // =======================================================================

  useEffect(() => {
    loadFood();
  }, [loadFood]);

  // =======================================================================
  // Return
  // =======================================================================

  return {
    // Data
    food,

    // State
    loading,
    error,
    hasFood: Boolean(food),

    // Actions
    refreshFood,
  };
};

export default useFoodDetails;
