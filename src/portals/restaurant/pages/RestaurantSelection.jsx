import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RESTAURANT_ROUTES } from "../../../routes/RestaurantRouteConstants";
import RestaurantContextStorage from "../services/RestaurantContextStorage";
import RestaurantOnboardingService from "../services/RestaurantOnboardingService";

/** Extracts restaurant entries from the API response. */
const extractRestaurants = (response) => {
  const payload = response?.data?.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  // Temporary compatibility for a response whose data is the list itself.
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  throw new Error("The restaurant status response has an unexpected format.");
};

/**
 * Restaurant selection page for authenticated restaurant owners.
 *
 * Responsibilities:
 * - Load restaurants belonging to the authenticated owner.
 * - Display loading, error, empty, and populated states.
 * - Allow selection of a restaurant whose onboarding is complete.
 * - Direct owners with incomplete onboarding to the onboarding flow.
 *
 * Backend authorization remains authoritative.
 */
const RestaurantSelection = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchRestaurantStatuses = useCallback(async () => {
    const response = await RestaurantOnboardingService.getOnboardingStatuses();

    return extractRestaurants(response);
  }, []);

  const loadRestaurants = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      setRestaurants(await fetchRestaurantStatuses());
    } catch (error) {
      console.error("Failed to load restaurant onboarding statuses.", error);

      setErrorMessage(
        error?.response?.data?.message ??
          "Unable to load your restaurants. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [fetchRestaurantStatuses]);

  useEffect(() => {
    let isActive = true;

    const fetchRestaurants = async () => {
      try {
        const restaurantList = await fetchRestaurantStatuses();

        if (isActive) {
          setRestaurants(restaurantList);
        }
      } catch (error) {
        console.error("Failed to load restaurant onboarding statuses.", error);

        if (isActive) {
          setErrorMessage(
            error?.response?.data?.message ??
              "Unable to load your restaurants. Please try again.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchRestaurants();

    return () => {
      isActive = false;
    };
  }, [fetchRestaurantStatuses]);

  /**
   * Opens a restaurant only when its onboarding status is complete.
   *
   * Restaurant-specific context will be introduced when we implement
   * restaurant selection persistence and the dashboard integration.
   */
  /**
   * Selects a restaurant and continues to the appropriate workflow.
   *
   * The persisted identifier is a navigation preference only.
   * Backend APIs must still validate restaurant ownership and permissions.
   */
  const handleRestaurantSelection = (restaurant) => {
    if (!restaurant?.restaurantId) {
      setErrorMessage("Unable to select this restaurant. Please try again.");
      return;
    }

    if (restaurant.onboardingStatus !== "COMPLETED") {
      RestaurantContextStorage.clear();
      navigate(RESTAURANT_ROUTES.ONBOARDING);
      return;
    }

    try {
      RestaurantContextStorage.save(restaurant.restaurantId);
      navigate(RESTAURANT_ROUTES.DASHBOARD);
    } catch (error) {
      console.error("Failed to save the selected restaurant context.");
      console.error("Error Message : " + error);
      setErrorMessage("Unable to select this restaurant. Please try again.");
    }
  };

  const handleStartOnboarding = () => {
    navigate(RESTAURANT_ROUTES.ONBOARDING);
  };

  if (isLoading) {
    return (
      <section
        className="container py-4"
        aria-live="polite">
        <p className="text-secondary mb-0">Loading your restaurants...</p>
      </section>
    );
  }

  return (
    <section className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="h4 mb-1">Select a Restaurant</h1>
          <p className="text-secondary mb-0">
            Choose a restaurant to continue to your portal.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleStartOnboarding}>
          Add Restaurant
        </button>
      </div>

      {errorMessage && (
        <div
          className="alert alert-danger"
          role="alert">
          <p className="mb-2">{errorMessage}</p>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={loadRestaurants}>
            Try Again
          </button>
        </div>
      )}

      {!errorMessage && restaurants.length === 0 && (
        <div className="border rounded-3 p-4 text-center">
          <h2 className="h5">No restaurants found</h2>
          <p className="text-secondary mb-3">
            Register your first restaurant to get started.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleStartOnboarding}>
            Register Restaurant
          </button>
        </div>
      )}

      {!errorMessage && restaurants.length > 0 && (
        <div className="row g-3">
          {restaurants.map((restaurant) => {
            const isComplete = restaurant.onboardingStatus === "COMPLETED";

            return (
              <div
                className="col-12 col-md-6 col-xl-4"
                key={restaurant.restaurantId}>
                <article className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h2 className="h6 mb-2">{restaurant.restaurantName}</h2>

                    <p className="text-secondary small mb-3">
                      Restaurant No.: {restaurant.restaurantNumber}
                    </p>

                    <div className="mb-3">
                      <span
                        className={`badge ${
                          isComplete ? "text-bg-success" : "text-bg-warning"
                        }`}>
                        {isComplete ? "Completed" : "Incomplete"}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`btn mt-auto ${
                        isComplete ? "btn-outline-primary" : "btn-primary"
                      }`}
                      onClick={() => handleRestaurantSelection(restaurant)}>
                      {isComplete ? "Select Restaurant" : "Complete Onboarding"}
                    </button>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RestaurantSelection;
