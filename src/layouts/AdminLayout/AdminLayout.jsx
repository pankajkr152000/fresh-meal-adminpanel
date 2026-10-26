import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Menubar from "../../shell/Menubar/Menubar";
import Sidebar from "../../shell/Sidebar/Sidebar";

import {
  ArchivedFoodProvider,
  FoodListProvider,
} from "../../features/foods/context";

import "../../global/styles/appLayout.css";
import "./adminLayout.css";

/**
 * Provides the application shell for the FreshMeal Admin portal.
 *
 * Responsibilities:
 * - Compose the Admin sidebar and menubar.
 * - Manage sidebar visibility.
 * - Provide Admin food-management contexts.
 * - Render notifications and nested Admin routes.
 *
 * @returns {JSX.Element}
 */
const AdminLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible((previousVisibility) => !previousVisibility);
  };

  return (
    <FoodListProvider>
      <ArchivedFoodProvider>
        <div
          id="wrapper"
          className="d-flex">
          <Sidebar isSidebarVisible={isSidebarVisible} />

          <div
            id="page-content-wrapper"
            className={isSidebarVisible ? "sidebar-open" : "sidebar-closed"}>
            <Menubar toggleSidebar={toggleSidebar} />

            <ToastContainer />

            <main className="container-fluid app-content">
              <Outlet />
            </main>
          </div>
        </div>
      </ArchivedFoodProvider>
    </FoodListProvider>
  );
};

export default AdminLayout;
