/**
 * ============================================================================
 * Component: RestaurantLayout
 * Description: Provides the shared application shell for the FreshMeal
 *              Restaurant Portal.
 *
 * Responsibilities:
 * - Compose the Restaurant Menubar and Sidebar.
 * - Manage sidebar visibility.
 * - Render nested Restaurant routes.
 * - Display application-level notifications.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * ============================================================================
 */

import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RestaurantMenubar from "../../shell/Menubar/RestaurantMenubar";
import RestaurantSidebar from "../../shell/Sidebar/RestaurantSidebar";

import "../../global/styles/appLayout.css";
import "./restaurantLayout.css";

/**
 * Shared application shell for authorized Restaurant Portal pages.
 *
 * @returns {JSX.Element}
 */
const RestaurantLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = useCallback(() => {
    setIsSidebarVisible((previousVisibility) => !previousVisibility);
  }, []);

  return (
    <div
      id="restaurant-wrapper"
      className="restaurant-layout d-flex">
      <RestaurantSidebar isSidebarVisible={isSidebarVisible} />

      <div
        id="restaurant-page-content-wrapper"
        className={
          isSidebarVisible
            ? "restaurant-sidebar-open"
            : "restaurant-sidebar-closed"
        }>
        <RestaurantMenubar toggleSidebar={toggleSidebar} />

        <ToastContainer />

        <main className="container-fluid restaurant-app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RestaurantLayout;
