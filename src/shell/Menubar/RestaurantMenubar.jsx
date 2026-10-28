import { useEffect } from "react";
import { Link } from "react-router-dom";

import useLogout from "../../features/authentication/hooks/useLogout";
import { initializeTheme } from "../../global/utils/themeChangeScriptButton";
import { RESTAURANT_ROUTES } from "../../routes/RestaurantRouteConstants";

import "./restaurantMenubarStyle.css";

/**
 * Provides the primary navigation bar for the FreshMeal Restaurant Portal.
 *
 * Responsibilities:
 * - Toggle restaurant navigation visibility.
 * - Initialize the existing application theme behavior.
 * - Navigate to the restaurant home page.
 * - Handle logout through the shared authentication workflow.
 *
 * @param {{ toggleSidebar: () => void }} props
 * @returns {JSX.Element}
 */
const RestaurantMenubar = ({ toggleSidebar }) => {
  const { logout, isLoggingOut } = useLogout();

  useEffect(() => {
    initializeTheme();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to logout from the Restaurant Portal.", error);
    }
  };

  return (
    <nav
      className="restaurant-menubar"
      aria-label="Restaurant portal toolbar">
      <div className="restaurant-menubar-start">
        <button
          type="button"
          className="restaurant-menu-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle restaurant navigation"
          title="Toggle navigation">
          <i
            className="bi bi-list"
            aria-hidden="true"
          />
        </button>

        <Link
          to={RESTAURANT_ROUTES.ROOT}
          className="restaurant-menubar-home"
          aria-label="FreshMeal Restaurant Portal home">
          <span
            className="restaurant-menubar-home-mark"
            aria-hidden="true">
            <i className="bi bi-shop" />
          </span>
          <span className="restaurant-menubar-home-text">
            Restaurant Portal
          </span>
        </Link>
      </div>

      <div className="restaurant-menubar-actions">
        <button
          type="button"
          id="theme-change-button"
          className="restaurant-theme-toggle"
          aria-label="Toggle theme"
          title="Toggle theme">
          <span
            id="theme-icon"
            aria-hidden="true">
            ☀️
          </span>
          <span id="theme-text">Light</span>
        </button>

        <button
          type="button"
          className="restaurant-logout-button"
          onClick={handleLogout}
          disabled={isLoggingOut}>
          <i
            className={`bi ${isLoggingOut ? "bi-arrow-repeat" : "bi-box-arrow-right"}`}
            aria-hidden="true"
          />
          <span>{isLoggingOut ? "Logging out…" : "Logout"}</span>
        </button>
      </div>
    </nav>
  );
};

export default RestaurantMenubar;
