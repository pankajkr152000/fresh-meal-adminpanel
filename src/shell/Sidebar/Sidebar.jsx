import { NavLink } from "react-router-dom";

import { assets } from "../../assets/assets";
import { ADMIN_ROUTES } from "../../routes/AdminRouteConstants";

import "./sidebarStyle.css";

/**
 * Primary navigation sidebar for the FreshMeal Admin portal.
 *
 * @param {{ isSidebarVisible: boolean }} props
 * @returns {JSX.Element}
 */
const Sidebar = ({ isSidebarVisible }) => {
  const getNavItemClassName = ({ isActive }) =>
    `sidebar-nav-item ${isActive ? "active" : ""}`;

  return (
    <aside
      id="sidebar-wrapper"
      className={`app-sidebar ${
        isSidebarVisible ? "sidebar-visible" : "sidebar-hidden"
      }`}
      aria-label="Admin navigation">
      <div className="sidebar-heading">
        <NavLink
          to={ADMIN_ROUTES.ROOT}
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

      <nav className="sidebar-navigation">
        <div className="sidebar-section">
          <span className="sidebar-section-title">Main</span>

          <NavLink
            to={ADMIN_ROUTES.ROOT}
            end
            className={getNavItemClassName}>
            <i
              className="bi bi-grid-1x2-fill sidebar-nav-icon"
              aria-hidden="true"
            />
            <span className="sidebar-nav-label">Dashboard</span>
          </NavLink>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-section-title">Food Management</span>

          <NavLink
            to={ADMIN_ROUTES.FOODS}
            end
            className={getNavItemClassName}>
            <i
              className="bi bi-list-ul sidebar-nav-icon"
              aria-hidden="true"
            />
            <span className="sidebar-nav-label">All Foods</span>
          </NavLink>

          <NavLink
            to={ADMIN_ROUTES.ADD_FOOD}
            className={getNavItemClassName}>
            <i
              className="bi bi-plus-circle sidebar-nav-icon"
              aria-hidden="true"
            />
            <span className="sidebar-nav-label">Add Food</span>
          </NavLink>

          <NavLink
            to={ADMIN_ROUTES.ARCHIVED_FOODS}
            className={getNavItemClassName}>
            <i
              className="bi bi-archive sidebar-nav-icon"
              aria-hidden="true"
            />
            <span className="sidebar-nav-label">Archived Foods</span>
          </NavLink>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-section-title">Order Management</span>

          <NavLink
            to={ADMIN_ROUTES.ORDERS}
            className={getNavItemClassName}>
            <i
              className="bi bi-cart3 sidebar-nav-icon"
              aria-hidden="true"
            />
            <span className="sidebar-nav-label">All Orders</span>
          </NavLink>
        </div>

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
