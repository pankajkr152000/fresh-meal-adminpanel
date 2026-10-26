/**
 * ============================================================================
 * Component: AppRoutes
 * Description: Composes application-level and portal-specific routes.
 *
 * Responsibilities:
 * - Redirect the application entry to portal selection.
 * - Delegate public authentication routes to AuthRoutes.
 * - Apply the authentication boundary to protected routes.
 * - Delegate portal-specific routing to dedicated route modules.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * ============================================================================
 */

import { Navigate, Route, Routes } from "react-router-dom";

import { PortalSelection } from "../features/authentication";
import { ROUTES } from "../global/constants/RouteConstants";

import AdminRoutes from "./AdminRoutes";
import AuthRoutes from "./AuthRoutes";
import CustomerRoutes from "./CustomerRoutes";
import DeliveryRoutes from "./DeliveryRoutes";
import ProtectedRoute from "./ProtectedRoute";
import RestaurantRoutes from "./RestaurantRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Application entry */}
      <Route
        path={ROUTES.HOME}
        element={
          <Navigate
            to={ROUTES.PORTAL_SELECTION}
            replace
          />
        }
      />

      {/* Public authentication routes */}
      <Route
        path="/*"
        element={<AuthRoutes />}
      />

      {/* Authentication boundary */}
      <Route element={<ProtectedRoute />}>
        <Route
          path={ROUTES.PORTAL_SELECTION}
          element={<PortalSelection />}
        />

        {/* Admin portal */}
        <Route
          path={`${ROUTES.ADMIN}/*`}
          element={<AdminRoutes />}
        />

        {/* Customer portal */}
        <Route
          path={`${ROUTES.CUSTOMER}/*`}
          element={<CustomerRoutes />}
        />

        {/* Restaurant portal */}
        <Route
          path={`${ROUTES.RESTAURANT}/*`}
          element={<RestaurantRoutes />}
        />

        <Route
          path={`${ROUTES.DELIVERY_PARTNER}/*`}
          element={<DeliveryRoutes />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
