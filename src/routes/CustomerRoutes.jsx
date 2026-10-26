/**
 * ============================================================================
 * Component: CustomerRoutes
 * Description: Defines and composes routes owned by the Customer portal.
 *
 * Responsibilities:
 * - Enforce the Customer role boundary.
 * - Apply the Customer application layout.
 * - Map Customer URLs to Customer feature pages.
 *
 * Authentication is handled by the parent ProtectedRoute.
 * Backend authorization remains authoritative.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * ============================================================================
 */

import { Route, Routes } from "react-router-dom";

import CustomerHome from "../features/customer/pages/CustomerHome";
import CustomerLayout from "../layouts/CustomerLayout";
import RoleRoute from "./RoleRoute";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleRoute allowedRoles={["USER"]} />}>
        <Route element={<CustomerLayout />}>
          <Route
            index
            element={<CustomerHome />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default CustomerRoutes;
