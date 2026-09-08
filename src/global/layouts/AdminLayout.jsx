/**
 * =============================================================================
 * FreshMeal - Admin Layout
 * =============================================================================
 *
 * <p>
 * Application layout responsible for rendering the FreshMeal Admin area.
 * This layout owns the Admin-specific shell including the Sidebar, Menubar,
 * sidebar visibility state, feature providers, toast notifications, and the
 * protected page content area.
 * </p>
 *
 * <h3>Purpose</h3>
 * <p>
 * The Admin layout separates Admin-specific presentation and shell behavior
 * from the application root and centralized routing configuration.
 * </p>
 *
 * <h3>Responsibilities</h3>
 * <ul>
 *     <li>Render the Admin Sidebar.</li>
 *     <li>Maintain Sidebar expanded/collapsed state.</li>
 *     <li>Provide Sidebar toggle behavior to the Menubar.</li>
 *     <li>Render the Admin Menubar.</li>
 *     <li>Provide feature-level contexts required by the Admin area.</li>
 *     <li>Render global toast notifications for the Admin area.</li>
 *     <li>Render nested Admin routes through {@link Outlet}.</li>
 * </ul>
 *
 * <h3>Layout Structure</h3>
 * <pre>
 * AdminLayout
 *     |
 *     +-- FoodListProvider
 *     |
 *     +-- ArchivedFoodProvider
 *           |
 *           +-- Sidebar
 *           |
 *           +-- Admin Main Area
 *                 |
 *                 +-- Menubar
 *                 |
 *                 +-- ToastContainer
 *                 |
 *                 +-- Main Content
 *                       |
 *                       +-- Outlet
 * </pre>
 *
 * <h3>Architecture Boundary</h3>
 * <p>
 * This layout is intentionally Admin-specific. It must not be used by
 * authentication, Customer, or Restaurant pages. Other application areas can
 * introduce their own layouts without modifying this component.
 * </p>
 *
 * @module global/layouts/AdminLayout
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

import "../styles/appLayout.css";

/**
 * =============================================================================
 * AdminLayout
 * =============================================================================
 *
 * <p>
 * Provides the complete shell for the FreshMeal Admin application area.
 * </p>
 *
 * <p>
 * The existing Sidebar visibility behavior is intentionally preserved:
 * <code>true</code> represents an expanded/visible Sidebar and
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
   * <p>
   * Maintains the current Sidebar visibility state. This state belongs to the
   * Admin shell because Sidebar expansion/collapse is a shell-level concern.
   * </p>
   */
  const [getSidebarVisible, setSidebarVisible] = useState(true);

  /**
   * ---------------------------------------------------------------------------
   * Toggle Sidebar
   * ---------------------------------------------------------------------------
   *
   * <p>
   * Toggles the Sidebar between its visible and collapsed states.
   * </p>
   */
  const toggleSidebar = () => {
    setSidebarVisible((previous) => !previous);
  };

  return (
    <FoodListProvider>
      <ArchivedFoodProvider>
        <div
          className="d-flex"
          id="wrapper">
          {/* =================================================================
              Admin Sidebar
              ================================================================= */}

          <Sidebar getSidebarVisible={getSidebarVisible} />

          {/* =================================================================
              Admin Main Layout
              ================================================================= */}

          <div
            id="page-content-wrapper"
            className={getSidebarVisible ? "sidebar-open" : "sidebar-closed"}>
            {/* ===============================================================
                Admin Top Navigation
                =============================================================== */}

            <Menubar toggleSidebar={toggleSidebar} />

            {/* ===============================================================
                Toast Notifications
                =============================================================== */}

            <ToastContainer />

            {/* ===============================================================
                Nested Admin Page Content
                =============================================================== */}

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
