/**
 * ============================================================================
 * Component: CustomerLayout
 * Description: Provides the shared application shell for the Customer portal.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * ============================================================================
 */

import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
  return (
    <main className="container-fluid px-3 px-md-4 py-4">
      <Outlet />
    </main>
  );
};

export default CustomerLayout;
