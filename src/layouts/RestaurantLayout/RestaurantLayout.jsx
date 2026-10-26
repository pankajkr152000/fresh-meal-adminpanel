/**
 * ============================================================================
 * Component: RestaurantLayout
 * Description: Provides the shared application shell for the Restaurant portal.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * ============================================================================
 */

import { Outlet } from "react-router-dom";

const RestaurantLayout = () => {
  return (
    <main className="container-fluid px-3 px-md-4 py-4">
      <Outlet />
    </main>
  );
};

export default RestaurantLayout;
