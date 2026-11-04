import { Outlet } from "react-router-dom";

/**
 * Shared layout boundary for FreshMeal authentication pages.
 *
 * Keeps authentication routes grouped under a common layout without
 * taking ownership of authentication state or business logic.
 *
 * @returns {JSX.Element}
 */
const AuthLayout = () => <Outlet />;

export default AuthLayout;
