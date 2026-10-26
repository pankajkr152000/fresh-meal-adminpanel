import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  useArchivedFoodContext,
  useFoodListContext,
} from "../../features/foods/context";

import useLogout from "../../features/authentication/hooks/useLogout";
import { initializeTheme } from "../../global/utils/themeChangeScriptButton";
import { ADMIN_ROUTES } from "../../routes/AdminRouteConstants";

import "./menubarStyle.css";

/**
 * Main navigation bar for the FreshMeal Admin portal.
 *
 * Provides sidebar toggling, theme switching, logout, and
 * context-sensitive food-management actions.
 *
 * @param {{ toggleSidebar: () => void }} props
 * @returns {JSX.Element}
 */
const Menubar = ({ toggleSidebar }) => {
  const { logout, isLoggingOut } = useLogout();
  const location = useLocation();

  const {
    selectedCount: archivedSelectedCount,
    openRestoreConfirmation,
    openPermanentDeleteConfirmation,
  } = useArchivedFoodContext();

  const {
    selectedCount: selectedFoodCount,
    hasSelection: hasFoodSelection,
    openArchiveConfirmation,
  } = useFoodListContext();

  const isArchivedFoodPage = location.pathname === ADMIN_ROUTES.ARCHIVED_FOODS;

  const isAllFoodsPage =
    location.pathname === ADMIN_ROUTES.FOODS ||
    location.pathname === ADMIN_ROUTES.ROOT;

  const shouldShowActions = isAllFoodsPage || isArchivedFoodPage;

  const hasArchivedSelection = archivedSelectedCount > 0;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to logout.", error);
    }
  };

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container-fluid">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar">
          ☰
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-2">
              <button
                type="button"
                id="theme-change-button"
                className="btn btn-outline-secondary d-flex align-items-center gap-1"
                aria-label="Toggle theme">
                <span id="theme-icon">☀️</span>
                <span id="theme-text">Light</span>
              </button>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to={ADMIN_ROUTES.ROOT}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className="nav-link btn btn-link"
                onClick={handleLogout}
                disabled={isLoggingOut}>
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </li>

            {shouldShowActions && (
              <li className="nav-item dropdown">
                <button
                  type="button"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Actions
                </button>

                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown">
                  {isArchivedFoodPage ? (
                    <>
                      <button
                        type="button"
                        className="dropdown-item"
                        disabled={!hasArchivedSelection}
                        onClick={openRestoreConfirmation}>
                        Restore
                      </button>

                      <button
                        type="button"
                        className="dropdown-item text-danger"
                        disabled={!hasArchivedSelection}
                        onClick={openPermanentDeleteConfirmation}>
                        Delete Permanently
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="dropdown-item"
                      disabled={!hasFoodSelection}
                      onClick={openArchiveConfirmation}>
                      Archive
                    </button>
                  )}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
