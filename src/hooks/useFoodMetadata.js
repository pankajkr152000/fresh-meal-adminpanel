import { useCallback, useEffect, useMemo, useState } from "react";

import FoodMetadataService from "../services/FoodMetadataService";

/**
 * =============================================================================
 * Hook : useFoodMetadata
 * =============================================================================
 *
 * Purpose
 * -------
 * Centralizes loading and management of food-related metadata.
 *
 * Responsibilities
 * ----------------
 * • Load metadata from backend.
 * • Manage loading and error states.
 * • Provide retry and refresh operations.
 * • Expose derived request state.
 *
 * Notes
 * -----
 * This hook is the single source of truth for food metadata.
 *
 * Metadata includes:
 * • Food Categories
 * • Diet Categories
 * • Cuisine Categories
 * • Group Categories
 * • Food Statuses
 *
 * No presentation logic belongs here.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * =============================================================================
 */

/**
 * Immutable default metadata.
 */
const DEFAULT_METADATA = Object.freeze({
  foodCategories: [],
  dietCategories: [],
  cuisineCategories: [],
  groupCategories: [],
  foodStatuses: [],
});

const useFoodMetadata = () => {
  // ===========================================================================
  // Metadata
  // ===========================================================================

  const [foodMetadata, setFoodMetadata] = useState(() => DEFAULT_METADATA);

  // ===========================================================================
  // Request State
  // ===========================================================================

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [isMetadataLoaded, setMetadataLoaded] = useState(false);

  // ===========================================================================
  // API
  // ===========================================================================

  /**
   * Loads food metadata from the backend.
   *
   * @param {AbortSignal} [signal] Optional abort signal.
   */
  const loadMetadata = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      const response = await FoodMetadataService.getMetadata(signal);

      if (!response.success) {
        throw new Error(response.message);
      }

      setFoodMetadata(response.data ?? DEFAULT_METADATA);

      setMetadataLoaded(true);

      if (import.meta.env.DEV) {
        console.debug(
          "[useFoodMetadata] Food metadata loaded successfully.",
          response.data,
        );
      }
    } catch (err) {
      if (err.name !== "CanceledError") {
        setError(err?.message || "Unable to load food metadata.");
        setMetadataLoaded(false);

        if (import.meta.env.DEV) {
          console.error("[useFoodMetadata] Failed to load food metadata.", err);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Reloads metadata.
   */
  const refreshMetadata = useCallback(() => {
    const controller = new AbortController();

    loadMetadata(controller.signal);
  }, [loadMetadata]);

  /**
   * Retries loading metadata after a failure.
   */
  const retryLoadingMetadata = useCallback(() => {
    const controller = new AbortController();

    loadMetadata(controller.signal);
  }, [loadMetadata]);

  /**
   * Clears the current metadata error.
   */
  const clearMetadataError = useCallback(() => {
    setError("");
  }, []);

  // ===========================================================================
  // Lifecycle
  // ===========================================================================

  useEffect(() => {
    const controller = new AbortController();

    loadMetadata(controller.signal);

    return () => controller.abort();
  }, [loadMetadata]);

  // ===========================================================================
  // Derived State
  // ===========================================================================

  /**
   * Indicates whether metadata is available for consumption.
   */
  const hasMetadata = useMemo(() => {
    return isMetadataLoaded && !loading && !error;
  }, [isMetadataLoaded, loading, error]);

  /**
   * Indicates whether metadata loading has failed.
   */
  const hasMetadataError = useMemo(() => {
    return Boolean(error);
  }, [error]);

  // ===========================================================================
  // Public API
  // ===========================================================================

  return {
    // -------------------------------------------------------------------------
    // Metadata
    // -------------------------------------------------------------------------
    foodMetadata,

    // -------------------------------------------------------------------------
    // Request State
    // -------------------------------------------------------------------------
    loading,
    error,

    // -------------------------------------------------------------------------
    // Derived State
    // -------------------------------------------------------------------------
    isMetadataLoaded,
    hasMetadata,
    hasMetadataError,

    // -------------------------------------------------------------------------
    // Actions
    // -------------------------------------------------------------------------
    refreshMetadata,
    retryLoadingMetadata,
    clearMetadataError,
  };
};

export default useFoodMetadata;
