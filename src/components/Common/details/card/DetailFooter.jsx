import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: DetailFooter
 * ============================================================================
 *
 * Purpose:
 * Renders the optional footer of a DetailCard.
 *
 * ============================================================================
 */

const DetailFooter = ({ children }) => {
  if (!children) {
    return null;
  }

  return <footer className="border-top p-3">{children}</footer>;
};

DetailFooter.propTypes = {
  children: PropTypes.node,
};

export default DetailFooter;
