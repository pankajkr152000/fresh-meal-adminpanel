/**
 * =============================================================================
 * FreshMeal - Admin Layout
 * =============================================================================
 *
 * <p>
 * Application layout responsible for rendering the FreshMeal Admin area.
 * </p>
 *
 * <p>
 * This layout owns the Admin-specific application shell including the Sidebar,
 * Menubar, Sidebar visibility state, feature providers, toast notifications,
 * and nested Admin route content.
 * </p>
 *
 * <h3>Responsibilities</h3>
 * <ul>
 *     <li>Render the Admin Sidebar.</li>
 *     <li>Maintain Sidebar visibility state.</li>
 *     <li>Provide Sidebar toggle behavior to the Menubar.</li>
 *     <li>Render the Admin Menubar.</li>
 *     <li>Provide feature-level contexts required by the Admin area.</li>
 *     <li>Render toast notifications for the Admin area.</li>
 *     <li>Render nested Admin routes through {@link Outlet}.</li>
 * </ul>
 *
 * <h3>Architecture Boundary</h3>
 * <p>
 * This component belongs to the application layout layer and is responsible
 * only for composing the Admin application shell. It does not contain
 * Admin business logic.
 * </p>
 *
 * @module layouts/AdminLayout/AdminLayout
 * =============================================================================
 */

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
 * =============================================================================
 * AdminLayout
 * =============================================================================
 *
 * <p>
 * Provides the complete application shell for the FreshMeal Admin area.
 * </p>
 *
 * <p>
 * The existing Sidebar visibility behavior is intentionally preserved:
 * <code>true</code> represents a visible Sidebar and
 * <code>false</code> represents a collapsed/hidden Sidebar.
 * </p>
 *
 * @returns {JSX.Element} FreshMeal Admin application layout.
 * =============================================================================
 */
const AdminLayout = () => {
  /**
   * ---------------------------------------------------------------------------
   * Sidebar Visibility
   * ---------------------------------------------------------------------------
   *
   * Maintains the current Sidebar visibility state.
   *
   * Sidebar expansion/collapse is a shell-level concern and therefore belongs
   * to the Admin Layout.
   */
  const [getSidebarVisible, setSidebarVisible] = useState(true);

  /**
   * ---------------------------------------------------------------------------
   * Toggle Sidebar
   * ---------------------------------------------------------------------------
   *
   * Toggles the Sidebar between its visible and collapsed states.
   */
  const toggleSidebar = () => {
    setSidebarVisible((previousVisibility) => !previousVisibility);
  };

  return (
    <FoodListProvider>
      <ArchivedFoodProvider>
        <div
          id="wrapper"
          className="d-flex">
          {/* -----------------------------------------------------------------
              Admin Sidebar
              ----------------------------------------------------------------- */}
          <Sidebar getSidebarVisible={getSidebarVisible} />

          {/* -----------------------------------------------------------------
              Admin Main Area
              ----------------------------------------------------------------- */}
          <div
            id="page-content-wrapper"
            className={getSidebarVisible ? "sidebar-open" : "sidebar-closed"}>
            {/* ---------------------------------------------------------------
                Admin Top Navigation
                --------------------------------------------------------------- */}
            <Menubar toggleSidebar={toggleSidebar} />

            {/* ---------------------------------------------------------------
                Toast Notifications
                --------------------------------------------------------------- */}
            <ToastContainer />

            {/* ---------------------------------------------------------------
                Nested Admin Page Content
                --------------------------------------------------------------- */}
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
