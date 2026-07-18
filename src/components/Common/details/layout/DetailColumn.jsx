import PropTypes from "prop-types";

/**
 * ============================================================================
 * DetailColumn
 * ============================================================================
 *
 * Responsive Bootstrap column wrapper for DetailGrid.
 *
 * Responsibilities:
 * - Responsive column sizing
 * - Mobile-first layout
 * - Consistent Bootstrap grid integration
 *
 * ============================================================================
 */

const DetailColumn = ({
  children,

  className = "",

  xs = 12,

  sm,

  md,

  lg,

  xl,

  xxl,
}) => {
  const classes = [
    xs && `col-${xs}`,
    sm && `col-sm-${sm}`,
    md && `col-md-${md}`,
    lg && `col-lg-${lg}`,
    xl && `col-xl-${xl}`,
    xxl && `col-xxl-${xxl}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};

DetailColumn.propTypes = {
  children: PropTypes.node.isRequired,

  className: PropTypes.string,

  xs: PropTypes.number,

  sm: PropTypes.number,

  md: PropTypes.number,

  lg: PropTypes.number,

  xl: PropTypes.number,

  xxl: PropTypes.number,
};

export default DetailColumn;
