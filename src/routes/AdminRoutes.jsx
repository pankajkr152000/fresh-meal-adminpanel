/**
 * ============================================================================
 * Component: AdminRoutes
 * Description: Defines and composes routes owned by the Admin portal.
 *
 * Responsibilities:
 * - Enforce the Admin role boundary.
 * - Apply the Admin application layout.
 * - Map Admin URLs to existing feature pages.
 *
 * Authentication is handled by the parent ProtectedRoute.
 * Backend authorization remains authoritative.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * ============================================================================
 */

import { Route, Routes } from "react-router-dom";

import { RoleRoute } from "../features/authentication";
import {
  AddFood,
  ArchivedFoods,
  EditFood,
  FoodList,
  ViewFood,
} from "../features/foods";
import Orders from "../features/orders/pages/Orders";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../portals/admin/pages/AdminDashboard";
import { ADMIN_ROUTE_PATHS } from "./AdminRouteConstants";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
        <Route element={<AdminLayout />}>
          {/* Admin landing page */}
          <Route
            index
            element={<AdminDashboard />}
          />

          {/* Food management */}
          <Route
            path={ADMIN_ROUTE_PATHS.FOODS}
            element={<FoodList />}
          />
          <Route
            path={ADMIN_ROUTE_PATHS.ADD_FOOD}
            element={<AddFood />}
          />
          <Route
            path={ADMIN_ROUTE_PATHS.ARCHIVED_FOODS}
            element={<ArchivedFoods />}
          />
          <Route
            path={ADMIN_ROUTE_PATHS.VIEW_FOOD}
            element={<ViewFood />}
          />
          <Route
            path={ADMIN_ROUTE_PATHS.EDIT_FOOD}
            element={<EditFood />}
          />

          {/* Order management */}
          <Route
            path={ADMIN_ROUTE_PATHS.ORDERS}
            element={<Orders />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
