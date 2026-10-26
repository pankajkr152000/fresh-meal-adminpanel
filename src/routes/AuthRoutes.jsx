/**
 * ============================================================================
 * Component: AuthRoutes
 * Description: Defines public authentication routes for FreshMeal.
 *
 * Responsibilities:
 * - Register authentication page routes.
 * - Use centralized application route constants.
 * - Keep authentication routing separate from portal routing.
 *
 * Authentication and authorization state are managed by the existing
 * authentication context and route guards.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * ============================================================================
 */

import { Route, Routes } from "react-router-dom";

import Login from "../features/authentication/pages/Login";

import { ROUTES } from "../global/constants/RouteConstants";
import { AuthLayout } from "../layouts/AuthLayout";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {/* Keep all existing authentication routes here. */}

        {/* Login */}
        <Route
          path={ROUTES.LOGIN}
          element={<Login />}
        />

        {/* Password recovery */}
        {/* <Route
        path={ROUTES.FORGOT_PASSWORD}
        element={<ForgotPassword />}
      />
      <Route
        path={ROUTES.RESET_PASSWORD}
        element={<ResetPassword />}
      /> */}

        {/* OTP verification */}
        {/* <Route
        path={ROUTES.VERIFY_EMAIL_OTP}
        element={<VerifyEmailOtp />}
      />
      <Route
        path={ROUTES.VERIFY_OTP}
        element={<VerifyOtp />}
      /> */}

        {/* Unknown paths handled by the parent application router. */}
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
