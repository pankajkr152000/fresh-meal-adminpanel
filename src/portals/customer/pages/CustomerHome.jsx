/**
 * ============================================================================
 * Component: CustomerHome
 * Description: Initial landing page for the FreshMeal Customer portal.
 *
 * This page is a foundation for future customer-facing features.
 *
 * @author Pankaj Kumar
 * @since 1.0
 * ============================================================================
 */

const CustomerHome = () => {
  return (
    <section aria-labelledby="customer-home-title">
      <div className="mb-4">
        <h1
          id="customer-home-title"
          className="h4 mb-2">
          Welcome to FreshMeal
        </h1>

        <p className="text-body-secondary mb-0">
          Discover meals and manage your food orders from one place.
        </p>
      </div>
    </section>
  );
};

export default CustomerHome;
