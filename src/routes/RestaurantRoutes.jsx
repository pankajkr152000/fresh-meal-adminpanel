/**
 * ============================================================================
 * Component: RestaurantRoutes
 * Description: Defines and composes routes owned by the Restaurant portal.
 *
 * Responsibilities:
 * - Enforce the Restaurant Owner role boundary.
 * - Apply the Restaurant application layout.
 * - Map Restaurant URLs to Restaurant feature pages.
 *
 * Authentication is handled by the parent ProtectedRoute.
 * Backend authorization remains authoritative.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * ============================================================================
 */

import { Route, Routes } from "react-router-dom";

import RestaurantLayout from "../layouts/RestaurantLayout";
import RestaurantHome from "../portals/restaurant/pages/RestaurantHome";
import RoleRoute from "./RoleRoute";

const RestaurantRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleRoute allowedRoles={["RESTAURANT_OWNER"]} />}>
        <Route element={<RestaurantLayout />}>
          <Route
            index
            element={<RestaurantHome />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default RestaurantRoutes;
