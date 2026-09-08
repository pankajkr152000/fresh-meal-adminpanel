/**
 * =============================================================================
 * FreshMeal - Application Routes
 * =============================================================================
 *
 * <p>
 * Centralized route configuration for the FreshMeal frontend application.
 * This component defines the public authentication routes and the protected
 * Admin application routes.
 * </p>
 *
 * <h3>Purpose</h3>
 * <p>
 * Provides a single routing boundary for FreshMeal while keeping authentication
 * protection, application layouts, and individual feature pages separated into
 * their respective architectural layers.
 * </p>
 *
 * <h3>Architecture Responsibility</h3>
 * <ul>
 *     <li>Defines public authentication routes.</li>
 *     <li>Defines authenticated application routes.</li>
 *     <li>Places authentication protection at the protected-route boundary.</li>
 *     <li>Connects the Admin route area to {@link AdminLayout}.</li>
 *     <li>Uses nested routing through React Router's {@code Outlet} model.</li>
 * </ul>
 *
 * <h3>Route Hierarchy</h3>
 * <pre>
 * Routes
 *     |
 *     +-- Public
 *     |     |
 *     |     +-- /login
 *     |
 *     +-- ProtectedRoute
 *           |
 *           +-- AdminLayout
 *                 |
 *                 +-- Admin Routes
 * </pre>
 *
 * <h3>Authentication Boundary</h3>
 * <p>
 * {@link ProtectedRoute} is responsible only for determining whether an
 * authenticated application session exists. Token management, session
 * lifecycle, and authentication API communication remain outside this file.
 * </p>
 *
 * <h3>Authorization Boundary</h3>
 * <p>
 * Role and permission authorization are intentionally not implemented here.
 * The current protected boundary establishes authentication first. Role-aware
 * authorization can later be introduced without redesigning the public
 * authentication routes or Admin shell.
 * </p>
 *
 * @module routes/AppRoutes
 * =============================================================================
 */

import { Route, Routes } from "react-router-dom";

import AdminLayout from "../global/layouts/AdminLayout";

import Login from "../features/authentication/pages/Login";

import {
  AddFood,
  ArchivedFoods,
  EditFood,
  FoodList,
  ViewFood,
} from "../features/foods/pages";

import Orders from "../features/orders/pages/orders";

import { ROUTES } from "../global/constants/RouteConstants";

import ProtectedRoute from "./ProtectedRoute";

/**
 * =============================================================================
 * AppRoutes
 * =============================================================================
 *
 * <p>
 * Declares the public and protected routes of the FreshMeal frontend.
 * </p>
 *
 * @returns {JSX.Element} FreshMeal application route configuration.
 * =============================================================================
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* =====================================================================
          Public Authentication Routes
          ===================================================================== */}

      <Route
        path={ROUTES.LOGIN}
        element={<Login />}
      />

      {/* =====================================================================
          Protected Application Routes
          ===================================================================== */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
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

          <Route
            path={ROUTES.GET_ARCHIVED_FOODS}
            element={<ArchivedFoods />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
