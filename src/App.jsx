import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Menubar from "./shell/Menubar/Menubar";
import Sidebar from "./shell/Sidebar/Sidebar";

import ROUTES from "./global/constants/RouteConstants";

import { AddFood, EditFood, FoodList, ViewFood } from "./features/foods/pages";

import Orders from "./features/orders/pages/orders";

import "./global/styles/appLayout.css";

/**
 * =============================================================================
 * Component : App
 * =============================================================================
 *
 * Purpose
 * -------
 * Root component responsible for rendering the complete admin layout.
 *
 * Responsibilities
 * ----------------
 * • Render fixed sidebar.
 * • Render fixed top navigation bar.
 * • Render application routes.
 * • Maintain sidebar toggle state.
 * • Provide global toast notifications.
 *
 * Layout Structure
 * ----------------
 * Sidebar (Fixed)
 *        +
 * Menubar (Fixed)
 *        +
 * Main Content (Scrollable)
 *
 * =============================================================================
 */

const App = () => {
  const [getSidebarVisible, setSidebarVisible] = useState(true);

  /**
   * Toggles sidebar visibility.
   */
  const toggleSidebar = () => {
    setSidebarVisible((previous) => !previous);
  };

  return (
    <div
      className="d-flex"
      id="wrapper">
      {/* ================= Sidebar ================= */}
      <Sidebar getSidebarVisible={getSidebarVisible} />

      {/* ================= Main Layout ================= */}
      <div
        id="page-content-wrapper"
        className={getSidebarVisible ? "sidebar-open" : "sidebar-closed"}>
        {/* Top Navigation */}
        <Menubar toggleSidebar={toggleSidebar} />

        {/* Toast Notifications */}
        <ToastContainer />

        {/* Main Page Content */}
        <main className="container-fluid app-content">
          <Routes>
            <Route
              path={ROUTES.HOME}
              element={<FoodList />}
            />

            <Route
              path={ROUTES.ADD_FOOD}
              element={<AddFood />}
            />

            <Route
              path={ROUTES.FETCH_ALL_FOODS}
              element={<FoodList />}
            />

            <Route
              path={ROUTES.FETCH_ALL_ORDERS}
              element={<Orders />}
            />

            <Route
              path={ROUTES.VIEW_FOOD}
              element={<ViewFood />}
            />

            <Route
              path={ROUTES.EDIT_FOOD}
              element={<EditFood />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
