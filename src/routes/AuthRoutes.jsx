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

const AuthRoutes = () => {
  return (
    <Routes>
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
    </Routes>
  );
};

export default AuthRoutes;
