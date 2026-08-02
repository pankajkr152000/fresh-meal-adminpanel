import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: DetailActions
 * ============================================================================
 *
 * Purpose:
 * Responsive action container for detail pages.
 *
 * ============================================================================
 */

const DetailActions = ({ children, className = "" }) => {
  if (!children) {
    return null;
  }

  return (
    <div
      className={`
                d-flex
                flex-wrap
                gap-2
                justify-content-end
                ${className}
            `}>
      {children}
    </div>
  );
};

DetailActions.propTypes = {
  children: PropTypes.node,

  className: PropTypes.string,
};

export default DetailActions;
