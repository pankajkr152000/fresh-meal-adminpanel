import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: DetailHeader
 * ============================================================================
 *
 * Purpose:
 * Renders the header section of a DetailCard.
 *
 * Responsibilities:
 * - Display optional icon
 * - Display title and subtitle
 * - Display optional header actions
 *
 * ============================================================================
 */

const DetailHeader = ({ title, subtitle, headerIcon, actions }) => {
  const hasContent = title || subtitle || headerIcon || actions;

  if (!hasContent) {
    return null;
  }

  return (
    <header className="border-bottom p-4">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div className="d-flex align-items-start gap-3 flex-grow-1">
          {headerIcon && (
            <div
              className="fs-4 text-body-secondary flex-shrink-0"
              aria-hidden="true">
              {headerIcon}
            </div>
          )}

          <div>
            {title && <h2 className="h5 mb-1">{title}</h2>}

            {subtitle && <p className="mb-0 text-body-secondary">{subtitle}</p>}
          </div>
        </div>

        {actions && <div className="d-flex flex-wrap gap-2">{actions}</div>}
      </div>
    </header>
  );
};

DetailHeader.propTypes = {
  title: PropTypes.node,

  subtitle: PropTypes.node,

  headerIcon: PropTypes.node,

  actions: PropTypes.node,
};

export default DetailHeader;
