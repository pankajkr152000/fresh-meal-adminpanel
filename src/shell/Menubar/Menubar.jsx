import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  useArchivedFoodContext,
  useFoodListContext,
} from "../../features/foods/context";
import ROUTES from "../../global/constants/RouteConstants";
import { initializeTheme } from "../../global/utils/themeChangeScriptButton";

import "./menubarStyle.css";

/**
 * ============================================================================
 * Component : Menubar
 * ============================================================================
 *
 * Purpose
 * -------
 * Main navigation bar for the FreshMeal Admin Panel.
 *
 * Responsibilities
 * ----------------
 * • Toggle sidebar.
 * • Provide theme switching.
 * • Provide application navigation.
 * • Provide contextual food actions.
 *
 * ============================================================================
 */

const Menubar = ({ toggleSidebar }) => {
  const location = useLocation();

  // ==========================================================================
  // Archived Food Context
  // ==========================================================================

  const {
    selectedCount,
    openRestoreConfirmation,
    openPermanentDeleteConfirmation,
  } = useArchivedFoodContext();

  const {
    selectedCount: selectedFoodCount,
    hasSelection: hasFoodSelection,
    openArchiveConfirmation,
  } = useFoodListContext();

  // ==========================================================================
  // Page Detection
  // ==========================================================================

  const isArchivedFoodPage = location.pathname === ROUTES.GET_ARCHIVED_FOODS;

  const isAllFoodsPage =
    location.pathname === ROUTES.FETCH_ALL_FOODS ||
    location.pathname === ROUTES.HOME;

  const shouldShowActions = isAllFoodsPage || isArchivedFoodPage;

  const hasSelection = selectedCount > 0;

  // ==========================================================================
  // Theme Initialization
  // ==========================================================================

  useEffect(() => {
    initializeTheme();
  }, []);

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container-fluid">
        {/* ================================================================
            Sidebar Toggle
        ================================================================ */}

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar">
          ☰
        </button>

        {/* ================================================================
            Navigation
        ================================================================ */}

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* ============================================================
                Theme Toggle
            ============================================================ */}

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

            {/* ============================================================
                Home
            ============================================================ */}

            <li className="nav-item active">
              <Link
                className="nav-link"
                to={ROUTES.HOME}>
                Home
              </Link>
            </li>

            {/* ============================================================
                Link
            ============================================================ */}

            <li className="nav-item">
              <a
                className="nav-link"
                href="#!">
                Link
              </a>
            </li>

            {/* ============================================================
                Context Actions
            ============================================================ */}

            {shouldShowActions && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  Actions
                </a>

                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown">
                  {isArchivedFoodPage ? (
                    <>
                      <button
                        type="button"
                        className="dropdown-item"
                        disabled={!hasSelection}
                        onClick={openRestoreConfirmation}>
                        Restore
                      </button>

                      <button
                        type="button"
                        className="dropdown-item text-danger"
                        disabled={!hasSelection}
                        onClick={openPermanentDeleteConfirmation}>
                        Delete Permanently
                      </button>
                    </>
                  ) : (
                    // <Link
                    //   className="dropdown-item"
                    //   to={ROUTES.GET_ARCHIVED_FOODS}>
                    //   Delete
                    // </Link>
                    // <button
                    //   type="button"
                    //   className="dropdown-item"
                    //   disabled={!hasFoodSelection}
                    //   onClick={() => {
                    //     console.log(
                    //       "Selected foods for archive:",
                    //       selectedFoodCount,
                    //     );

                    //     openArchiveConfirmation();
                    //   }}>
                    //   Delete
                    // </button>
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
