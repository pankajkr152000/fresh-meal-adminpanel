import { Outlet } from "react-router-dom";

/**
 * Provides the shared layout for the Delivery Partner portal.
 *
 * Portal-specific navigation and UI can be added when the delivery
 * experience is implemented.
 *
 * @returns {JSX.Element}
 */
const DeliveryLayout = () => (
  <main className="container-fluid px-3 px-md-4 py-4">
    <Outlet />
  </main>
);

export default DeliveryLayout;
