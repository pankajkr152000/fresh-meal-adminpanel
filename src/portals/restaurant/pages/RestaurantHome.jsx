import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RESTAURANT_ROUTES } from "../../../routes/RestaurantRouteConstants";
import RestaurantContextStorage from "../services/RestaurantContextStorage";
import RestaurantOnboardingService from "../services/RestaurantOnboardingService";

const extractRestaurants = (response) => {
  const data = response?.data?.data ?? response?.data;

  return Array.isArray(data) ? data : null;
};

const RestaurantHome = () => {
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadSelectedRestaurant = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const selectedRestaurantId = RestaurantContextStorage.get();

      if (!selectedRestaurantId) {
        navigate(RESTAURANT_ROUTES.SELECT_RESTAURANT, {
          replace: true,
        });
        return;
      }

      const response =
        await RestaurantOnboardingService.getOnboardingStatuses();

      const restaurants = extractRestaurants(response);

      if (!restaurants) {
        throw new Error("Unexpected restaurant response format.");
      }

      const selectedRestaurant = restaurants.find(
        (item) => item.restaurantId === selectedRestaurantId,
      );

      if (!selectedRestaurant) {
        RestaurantContextStorage.clear();

        navigate(RESTAURANT_ROUTES.SELECT_RESTAURANT, {
          replace: true,
        });
        return;
      }

      if (selectedRestaurant.onboardingStatus !== "COMPLETED") {
        RestaurantContextStorage.clear();

        navigate(RESTAURANT_ROUTES.ONBOARDING, {
          replace: true,
        });
        return;
      }

      setRestaurant(selectedRestaurant);
    } catch (error) {
      console.error("Failed to validate the selected restaurant.", error);

      setErrorMessage(
        "Unable to load your restaurant dashboard. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // useEffect(() => {
  //   loadSelectedRestaurant();
  // }, [loadSelectedRestaurant]);

  useEffect(() => {
    Promise.resolve().then(() => {
      loadSelectedRestaurant();
    });
  }, [loadSelectedRestaurant]);

  if (isLoading) {
    return (
      <section
        aria-live="polite"
        className="py-4">
        <p className="text-body-secondary mb-0">
          Loading restaurant dashboard...
        </p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section aria-labelledby="restaurant-dashboard-error">
        <h1
          id="restaurant-dashboard-error"
          className="h5 mb-2">
          Unable to load dashboard
        </h1>

        <p className="text-danger mb-3">{errorMessage}</p>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={loadSelectedRestaurant}>
          Retry
        </button>
      </section>
    );
  }

  if (!restaurant) {
    return null;
  }

  return (
    <section aria-labelledby="restaurant-home-title">
      <div className="mb-4">
        <h1
          id="restaurant-home-title"
          className="h4 mb-2">
          Restaurant Dashboard
        </h1>

        <p className="text-body-secondary mb-1">
          Manage your restaurant operations from one place.
        </p>

        <h2 className="h6 mb-0">{restaurant.restaurantName}</h2>
      </div>
    </section>
  );
};

export default RestaurantHome;
