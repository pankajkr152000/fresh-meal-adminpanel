/**
 * ============================================================================
 * Component: RestaurantRoutes
 * Description: Defines and composes routes owned by the Restaurant portal.
 *
 * Responsibilities:
 * - Enforce the Restaurant Owner role boundary.
 * - Apply the shared Restaurant portal layout.
 * - Map Restaurant URLs to their corresponding feature pages.
 *
 * Authentication is handled by the parent ProtectedRoute.
 * Backend authorization remains authoritative.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * ============================================================================
 */

import { Navigate, Route, Routes } from "react-router-dom";

import RestaurantLayout from "../layouts/RestaurantLayout";
import RestaurantHome from "../portals/restaurant/pages/RestaurantHome";
import RestaurantOnboarding from "../portals/restaurant/pages/RestaurantOnboarding";
import RestaurantSelection from "../portals/restaurant/pages/RestaurantSelection";
import {
  RESTAURANT_ROUTE_PATHS,
  RESTAURANT_ROUTES,
} from "./RestaurantRouteConstants";
import RoleRoute from "./RoleRoute";

const RestaurantRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleRoute allowedRoles={["RESTAURANT_OWNER"]} />}>
        <Route element={<RestaurantLayout />}>
          {/* The portal entry point opens restaurant selection. */}
          <Route
            index
            element={
              <Navigate
                to={RESTAURANT_ROUTES.SELECT_RESTAURANT}
                replace
              />
            }
          />

          {/* Restaurant selection */}
          <Route
            path={RESTAURANT_ROUTE_PATHS.SELECT_RESTAURANT}
            element={<RestaurantSelection />}
          />

          {/* Restaurant dashboard */}
          <Route
            path={RESTAURANT_ROUTE_PATHS.DASHBOARD}
            element={<RestaurantHome />}
          />

          {/* Restaurant Onboarding */}
          <Route
            path={RESTAURANT_ROUTE_PATHS.ONBOARDING}
            element={<RestaurantOnboarding />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default RestaurantRoutes;
