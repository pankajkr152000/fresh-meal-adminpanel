// ============================================================================
// File: useFoodDetails.js
// Description:
// Custom hook for fetching and managing a single food's details.
// ============================================================================

import { useCallback, useEffect, useState } from "react";

import FoodService from "../../../services/FoodService";

export default function useFoodDetails(foodId) {
  const [food, setFood] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadFood = useCallback(async () => {
    if (!foodId) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await FoodService.getFoodById(foodId);

      setFood(response.data);
    } catch (err) {
      console.error("Failed to load food details:", err);

      setError(err);
    } finally {
      setLoading(false);
    }
  }, [foodId]);

  useEffect(() => {
    loadFood();
  }, [loadFood]);

  return {
    food,
    loading,
    error,
    refresh: loadFood,
  };
}
