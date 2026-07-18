import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: DetailBadge
 * ============================================================================
 */

const DetailBadge = ({ children, className = "bg-secondary" }) => {
  return <span className={`badge ${className}`}>{children}</span>;
};

DetailBadge.propTypes = {
  children: PropTypes.node.isRequired,

  className: PropTypes.string,
};

export default DetailBadge;
