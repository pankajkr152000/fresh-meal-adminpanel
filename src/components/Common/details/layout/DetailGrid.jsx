import PropTypes from "prop-types";

/**
 * ============================================================================
 * DetailGrid
 * ============================================================================
 *
 * Responsive grid wrapper for detail pages.
 *
 * Responsibilities:
 * - Bootstrap row layout
 * - Responsive spacing
 * - Consistent gutters
 *
 * This component intentionally contains no knowledge of
 * cards, sections, or entities.
 *
 * ============================================================================
 */

const DetailGrid = ({ children, className = "", gap = 4 }) => {
  return <div className={`row g-${gap} ${className}`}>{children}</div>;
};

DetailGrid.propTypes = {
  children: PropTypes.node.isRequired,

  className: PropTypes.string,

  gap: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
};

export default DetailGrid;
