import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: DetailContainer
 * ============================================================================
 *
 * Purpose:
 * Provides a consistent responsive container for all detail-related layouts.
 *
 * Responsibilities:
 * - Responsive page width
 * - Fluid or fixed container support
 * - Additional container styling
 *
 * Accessibility:
 * Pure layout component.
 *
 * ============================================================================
 */

const DetailContainer = ({ children, fluid = false, className = "" }) => {
  const containerClass = fluid ? "container-fluid" : "container-xxl";

  return <div className={`${containerClass} ${className}`}>{children}</div>;
};

DetailContainer.propTypes = {
  children: PropTypes.node.isRequired,
  fluid: PropTypes.bool,
  className: PropTypes.string,
};

export default DetailContainer;
