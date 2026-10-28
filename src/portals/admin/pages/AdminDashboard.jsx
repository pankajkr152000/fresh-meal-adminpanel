import { Link } from "react-router-dom";

import { ADMIN_ROUTES } from "../../../routes/AdminRouteConstants";

import "./adminDashboard.css";

/**
 * Admin landing page providing an overview of FreshMeal operations.
 *
 * KPI values will be connected to existing backend APIs in a later step.
 *
 * @returns {JSX.Element}
 */
const AdminDashboard = () => {
  const metrics = [
    {
      id: "foods",
      label: "Total Foods",
      description: "Manage your food catalogue",
      icon: "bi-egg-fried",
      path: ADMIN_ROUTES.FOODS,
    },
    {
      id: "orders",
      label: "Total Orders",
      description: "Review customer orders",
      icon: "bi-bag-check",
      path: ADMIN_ROUTES.ORDERS,
    },
    {
      id: "archived-foods",
      label: "Archived Foods",
      description: "Review archived items",
      icon: "bi-archive",
      path: ADMIN_ROUTES.ARCHIVED_FOODS,
    },
  ];

  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard-header">
        <div>
          <p className="admin-dashboard-eyebrow">FRESHMEAL ADMINISTRATION</p>
          <h1>Dashboard</h1>
          <p className="admin-dashboard-subtitle">
            Overview of your food catalogue and order management.
          </p>
        </div>
      </header>

      <section
        className="admin-dashboard-metrics"
        aria-label="Management overview">
        {metrics.map((metric) => (
          <Link
            key={metric.id}
            to={metric.path}
            className="admin-dashboard-metric">
            <span
              className="admin-dashboard-metric-icon"
              aria-hidden="true">
              <i className={`bi ${metric.icon}`} />
            </span>

            <span className="admin-dashboard-metric-content">
              <span className="admin-dashboard-metric-label">
                {metric.label}
              </span>
              <span className="admin-dashboard-metric-value">—</span>
              <span className="admin-dashboard-metric-description">
                {metric.description}
              </span>
            </span>

            <i
              className="bi bi-arrow-up-right admin-dashboard-metric-arrow"
              aria-hidden="true"
            />
          </Link>
        ))}
      </section>

      <section className="admin-dashboard-section">
        <div className="admin-dashboard-section-header">
          <div>
            <h2>Quick Actions</h2>
            <p>Jump directly to a common task.</p>
          </div>
        </div>

        <div className="admin-dashboard-actions">
          <Link
            to={ADMIN_ROUTES.ADD_FOOD}
            className="admin-dashboard-action">
            <i
              className="bi bi-plus-circle"
              aria-hidden="true"
            />
            <span>
              <strong>Add Food</strong>
              <small>Create a catalogue item</small>
            </span>
            <i
              className="bi bi-chevron-right"
              aria-hidden="true"
            />
          </Link>

          <Link
            to={ADMIN_ROUTES.FOODS}
            className="admin-dashboard-action">
            <i
              className="bi bi-list-ul"
              aria-hidden="true"
            />
            <span>
              <strong>All Foods</strong>
              <small>Browse and manage foods</small>
            </span>
            <i
              className="bi bi-chevron-right"
              aria-hidden="true"
            />
          </Link>

          <Link
            to={ADMIN_ROUTES.ORDERS}
            className="admin-dashboard-action">
            <i
              className="bi bi-cart3"
              aria-hidden="true"
            />
            <span>
              <strong>All Orders</strong>
              <small>Open order management</small>
            </span>
            <i
              className="bi bi-chevron-right"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
