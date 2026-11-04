import { Route, Routes } from "react-router-dom";

import DeliveryLayout from "../layouts/DeliveryLayout";
import DeliveryHome from "../portals/delivery/pages/DeliveryHome";
import RoleRoute from "./RoleRoute";

/**
 * Defines routes accessible to delivery partners.
 *
 * @returns {JSX.Element}
 */
const DeliveryRoutes = () => (
  <Routes>
    <Route element={<RoleRoute allowedRoles={["DELIVERY_PARTNER"]} />}>
      <Route element={<DeliveryLayout />}>
        <Route
          index
          element={<DeliveryHome />}
        />
      </Route>
    </Route>
  </Routes>
);

export default DeliveryRoutes;
