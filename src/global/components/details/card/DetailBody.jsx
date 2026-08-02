import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: DetailBody
 * ============================================================================
 *
 * Purpose:
 * Renders the body content of a DetailCard.
 *
 * ============================================================================
 */

const DetailBody = ({ children }) => {
  return <section className="p-4">{children}</section>;
};

DetailBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailBody;
