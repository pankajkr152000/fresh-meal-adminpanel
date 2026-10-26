/**
 * =============================================================================
 * FreshMeal - Application Root
 * =============================================================================
 *
 * <p>
 * Root component of the FreshMeal frontend application.
 * </p>
 *
 * <h3>Purpose</h3>
 * <p>
 * Provides the top-level composition boundary for the application and
 * delegates route configuration to {@link AppRoutes}.
 * </p>
 *
 * <h3>Architecture Responsibility</h3>
 * <ul>
 *     <li>Acts as the application's root composition component.</li>
 *     <li>Delegates all route declarations to {@link AppRoutes}.</li>
 *     <li>Does not contain Admin-specific shell logic.</li>
 *     <li>Does not contain authentication or authorization logic.</li>
 *     <li>Does not manage Sidebar or Menubar state.</li>
 * </ul>
 *
 * <h3>Application Flow</h3>
 * <pre>
 * main.jsx
 *     |
 *     +-- BrowserRouter
 *             |
 *             +-- App
 *                    |
 *                    +-- AppRoutes
 *                           |
 *                           +-- Public Routes
 *                           |
 *                           +-- Admin Routes
 *                                  |
 *                                  +-- AdminLayout
 * </pre>
 *
 * <h3>Design Principle</h3>
 * <p>
 * The application root intentionally remains lightweight. Domain-specific
 * behavior belongs to feature modules, application-shell behavior belongs to
 * layouts, and route declarations belong to the routing layer.
 * </p>
 *
 * @module App
 * =============================================================================
 */

import AppRoutes from "./routes/AppRoutes";

/**
 * =============================================================================
 * App
 * =============================================================================
 *
 * <p>
 * Root composition component for FreshMeal.
 * </p>
 *
 * @returns {JSX.Element} FreshMeal application routes.
 * =============================================================================
 */
const App = () => {
  return <AppRoutes />;
};

export default App;
