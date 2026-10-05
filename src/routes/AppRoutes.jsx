/**
 * ============================================================================
 * Component : AppRoutes
 * ============================================================================
 *
 * <p>
 * Centralized route configuration for the FreshMeal frontend application.
 * </p>
 *
 * <p>
 * This component composes public routes, authentication-protected routes,
 * role-protected routes, and role-specific application layouts.
 * </p>
 *
 * <p>
 * Authentication and authorization are intentionally separated:
 * ProtectedRoute verifies authentication, while RoleRoute verifies
 * frontend role access.
 * </p>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

import { Route, Routes } from "react-router-dom";

// ---------------------------------------------------------------------------
// Layouts
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Authentication
// ---------------------------------------------------------------------------

import { PortalSelection, RoleRoute } from "../features/authentication";

import Login from "../features/authentication/pages/Login";

// ---------------------------------------------------------------------------
// Admin Pages
// ---------------------------------------------------------------------------

import {
  AddFood,
  ArchivedFoods,
  EditFood,
  FoodList,
  ViewFood,
} from "../features/foods";

import Orders from "../features/orders/pages/Orders";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

import { ROUTES } from "../global/constants";
import AdminLayout from "../global/layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================================================================
          Public Routes
         ================================================================ */}

      <Route
        path={ROUTES.LOGIN}
        element={<Login />}
      />

      {/* ================================================================
          Authenticated Routes
         ================================================================ */}

      <Route element={<ProtectedRoute />}>
        {/* Portal selection is available to authenticated users. */}
        <Route
          path={ROUTES.PORTAL_SELECTION}
          element={<PortalSelection />}
        />

        {/* ============================================================
            Admin Portal
           ============================================================ */}

        <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
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
      </Route>
    </Routes>
  );
};

export default AppRoutes;
