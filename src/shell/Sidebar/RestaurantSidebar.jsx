import { NavLink } from "react-router-dom";

import { assets } from "../../assets/assets";
import { RESTAURANT_ROUTES } from "../../routes/RestaurantRouteConstants";

import "./restaurantSidebarStyle.css";

/**
 * Primary navigation sidebar for the FreshMeal Restaurant Portal.
 *
 * @param {{ isSidebarVisible: boolean }} props
 * @returns {JSX.Element}
 */
const RestaurantSidebar = ({ isSidebarVisible }) => {
  const getNavItemClassName = ({ isActive }) =>
    `restaurant-sidebar-nav-item${isActive ? " active" : ""}`;

  return (
    <aside
      id="restaurant-sidebar-wrapper"
      className={`restaurant-sidebar ${
        isSidebarVisible
          ? "restaurant-sidebar-visible"
          : "restaurant-sidebar-hidden"
      }`}
      aria-label="Restaurant navigation"
      aria-hidden={!isSidebarVisible}>
      <div className="restaurant-sidebar-brand-container">
        <NavLink
          to={RESTAURANT_ROUTES.ROOT}
          end
          className="restaurant-sidebar-brand"
          aria-label="FreshMeal Restaurant Portal home"
          tabIndex={isSidebarVisible ? 0 : -1}>
          <img
            src={assets.brandLogo}
            alt=""
            className="restaurant-sidebar-brand-logo"
          />

          <span className="restaurant-sidebar-brand-text">
            <span className="restaurant-sidebar-brand-name">FreshMeal</span>
            <span className="restaurant-sidebar-brand-role">
              Restaurant Portal
            </span>
          </span>
        </NavLink>
      </div>

      <nav className="restaurant-sidebar-navigation">
        <div className="restaurant-sidebar-section">
          <span className="restaurant-sidebar-section-title">Workspace</span>

          <NavLink
            to={RESTAURANT_ROUTES.ROOT}
            end
            className={getNavItemClassName}
            tabIndex={isSidebarVisible ? 0 : -1}>
            <i
              className="bi bi-grid-1x2-fill"
              aria-hidden="true"
            />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className="restaurant-sidebar-section">
          <span className="restaurant-sidebar-section-title">
            Restaurant Management
          </span>

          <NavLink
            to={RESTAURANT_ROUTES.PROFILE}
            className={getNavItemClassName}
            tabIndex={isSidebarVisible ? 0 : -1}>
            <i
              className="bi bi-shop"
              aria-hidden="true"
            />
            <span>Restaurant Profile</span>
          </NavLink>

          <NavLink
            to={RESTAURANT_ROUTES.BRANCHES}
            className={getNavItemClassName}
            tabIndex={isSidebarVisible ? 0 : -1}>
            <i
              className="bi bi-geo-alt"
              aria-hidden="true"
            />
            <span>Branches</span>
          </NavLink>

          <NavLink
            to={RESTAURANT_ROUTES.MENU}
            className={getNavItemClassName}
            tabIndex={isSidebarVisible ? 0 : -1}>
            <i
              className="bi bi-journal-text"
              aria-hidden="true"
            />
            <span>Menu Management</span>
          </NavLink>
        </div>

        <div className="restaurant-sidebar-section">
          <span className="restaurant-sidebar-section-title">Operations</span>

          <NavLink
            to={RESTAURANT_ROUTES.ORDERS}
            className={getNavItemClassName}
            tabIndex={isSidebarVisible ? 0 : -1}>
            <i
              className="bi bi-receipt"
              aria-hidden="true"
            />
            <span>Orders</span>
          </NavLink>
        </div>

        <div className="restaurant-sidebar-section">
          <span className="restaurant-sidebar-section-title">Account</span>

          <NavLink
            to={RESTAURANT_ROUTES.SETTINGS}
            className={getNavItemClassName}
            tabIndex={isSidebarVisible ? 0 : -1}>
            <i
              className="bi bi-gear"
              aria-hidden="true"
            />
            <span>Settings</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default RestaurantSidebar;
