/**
 * ============================================================================
 * Component : Sidebar
 * ============================================================================
 *
 * <p>
 * Primary navigation sidebar for the FreshMeal Admin Portal.
 * </p>
 *
 * <p>
 * The sidebar is responsible only for navigation and its visible state.
 * Layout positioning, responsive behavior, transitions, and visual styling
 * are handled by {@code sidebarStyle.css}.
 * </p>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

import { NavLink } from "react-router-dom";

import { assets } from "../../assets/assets";
import ROUTES from "../../global/constants/RouteConstants";

import "./sidebarStyle.css";

/**
 * Sidebar navigation for the Admin Portal.
 *
 * @param {Object} props component properties
 * @param {boolean} props.getSidebarVisible whether the sidebar is visible
 * @returns {JSX.Element} Admin navigation sidebar
 */
const Sidebar = ({ getSidebarVisible }) => {
  /**
   * Generates the CSS class for a navigation item based on its active state.
   *
   * @param {Object} params React Router NavLink class callback parameters
   * @param {boolean} params.isActive whether the current route is active
   * @returns {string} navigation item classes
   */
  const getNavItemClassName = ({ isActive }) =>
    `sidebar-nav-item ${isActive ? "active" : ""}`;

  return (
    <aside
      id="sidebar-wrapper"
      className={`app-sidebar ${
        getSidebarVisible ? "sidebar-visible" : "sidebar-hidden"
      }`}
      aria-label="Admin navigation">
      {/* ===================================================================
          Sidebar Header
         =================================================================== */}

      <div className="sidebar-heading">
        <NavLink
          to={ROUTES.HOME}
          className="sidebar-brand text-decoration-none"
          aria-label="FreshMeal Admin home">
          <img
            src={assets.brandLogo}
            alt=""
            className="sidebar-brand-logo"
          />

          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">FreshMeal</span>
            <span className="sidebar-brand-role">Admin Portal</span>
          </div>
        </NavLink>
      </div>

      {/* ===================================================================
          Navigation
         =================================================================== */}

      <nav className="sidebar-navigation">
        {/* -----------------------------------------------------------------
            Main
           ----------------------------------------------------------------- */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">Main</span>

          <NavLink
            to={ROUTES.HOME}
            end
            className={getNavItemClassName}>
            <i
              className="bi bi-grid-1x2-fill sidebar-nav-icon"
              aria-hidden="true"
            />

            <span className="sidebar-nav-label">Dashboard</span>
          </NavLink>
        </div>

        {/* -----------------------------------------------------------------
            Food Management
           ----------------------------------------------------------------- */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">Food Management</span>

          <NavLink
            to={ROUTES.FETCH_ALL_FOODS}
            className={getNavItemClassName}>
            <i
              className="bi bi-list-ul sidebar-nav-icon"
              aria-hidden="true"
            />

            <span className="sidebar-nav-label">All Foods</span>
          </NavLink>

          <NavLink
            to={ROUTES.ADD_FOOD}
            className={getNavItemClassName}>
            <i
              className="bi bi-plus-circle sidebar-nav-icon"
              aria-hidden="true"
            />

            <span className="sidebar-nav-label">Add Food</span>
          </NavLink>

          <NavLink
            to={ROUTES.GET_ARCHIVED_FOODS}
            className={getNavItemClassName}>
            <i
              className="bi bi-archive sidebar-nav-icon"
              aria-hidden="true"
            />

            <span className="sidebar-nav-label">Archived Foods</span>
          </NavLink>
        </div>

        {/* -----------------------------------------------------------------
            Order Management
           ----------------------------------------------------------------- */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">Order Management</span>

          <NavLink
            to={ROUTES.FETCH_ALL_ORDERS}
            className={getNavItemClassName}>
            <i
              className="bi bi-cart3 sidebar-nav-icon"
              aria-hidden="true"
            />

            <span className="sidebar-nav-label">All Orders</span>
          </NavLink>
        </div>

        {/* -----------------------------------------------------------------
            Account
           ----------------------------------------------------------------- */}

        <div className="sidebar-section">
          <span className="sidebar-section-title">Account</span>

          <button
            type="button"
            className="sidebar-nav-item sidebar-nav-placeholder"
            disabled>
            <i
              className="bi bi-person sidebar-nav-icon"
              aria-hidden="true"
            />

            <span className="sidebar-nav-label">Profile</span>
          </button>

          <button
            type="button"
            className="sidebar-nav-item sidebar-nav-placeholder"
            disabled>
            <i
              className="bi bi-info-circle sidebar-nav-icon"
              aria-hidden="true"
            />

            <span className="sidebar-nav-label">Status</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
