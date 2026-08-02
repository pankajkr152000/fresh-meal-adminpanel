import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: DetailDivider
 * ============================================================================
 *
 * Purpose:
 * Provides a consistent divider across the Detail framework.
 *
 * ============================================================================
 */

const DetailDivider = ({ className = "" }) => {
  return (
    <hr
      className={`border-secondary-subtle opacity-75 my-4 ${className}`}
      aria-hidden="true"
    />
  );
};

DetailDivider.propTypes = {
  className: PropTypes.string,
};

export default DetailDivider;
