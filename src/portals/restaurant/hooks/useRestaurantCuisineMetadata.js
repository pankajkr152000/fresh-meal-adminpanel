import { useCallback, useEffect, useState } from "react";

import FoodMetadataService from "../../../features/foods/services/FoodMetadataService";

const useRestaurantCuisineMetadata = () => {
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCuisineMetadata = useCallback(async (signal) => {
    setIsLoading(true);
    setError("");

    try {
      const metadata = await FoodMetadataService.getCuisineMetadata(signal);

      if (!Array.isArray(metadata?.data)) {
        throw new Error("Invalid cuisine metadata response.");
      }

      setCuisineOptions(metadata.data);
    } catch (requestError) {
      if (signal?.aborted || requestError?.code === "ERR_CANCELED") {
        return;
      }

      console.error("Failed to load cuisine metadata.", requestError);

      setError("Unable to load cuisine options. Please try again.");
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    loadCuisineMetadata(controller.signal);

    return () => controller.abort();
  }, [loadCuisineMetadata]);

  const retry = useCallback(() => {
    loadCuisineMetadata();
  }, [loadCuisineMetadata]);

  return {
    cuisineOptions,
    isLoading,
    error,
    retry,
  };
};

export default useRestaurantCuisineMetadata;
