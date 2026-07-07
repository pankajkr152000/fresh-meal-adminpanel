import PropTypes from "prop-types";

/**
 * -----------------------------------------------------------------------------
 * Component : PageLayout
 * -----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Provides a consistent page layout across the admin panel.
 *
 * Responsibilities
 * ----------------
 * • Apply responsive page container.
 * • Maintain consistent spacing.
 * • Render page content.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * -----------------------------------------------------------------------------
 */

const PageLayout = ({ children, fluid = true, className = "" }) => {
  const containerClass = fluid ? "container-fluid" : "container";

  return (
    <main className={[containerClass, "py-4", className].join(" ")}>
      {children}
    </main>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,

  fluid: PropTypes.bool,

  className: PropTypes.string,
};

export default PageLayout;
