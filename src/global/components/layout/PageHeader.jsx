import PropTypes from "prop-types";

/**
 * -----------------------------------------------------------------------------
 * Component : PageHeader
 * -----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Provides a consistent page header across the admin panel.
 *
 * Responsibilities
 * ----------------
 * • Display page title.
 * • Display optional subtitle.
 * • Display action buttons.
 * • Maintain responsive layout.
 *
 * Notes
 * -----
 * Business logic should never exist here.
 * -----------------------------------------------------------------------------
 */

const PageHeader = ({ title, subtitle, actions, className = "" }) => {
  return (
    <header
      className={[
        "d-flex",
        "justify-content-between",
        "align-items-start",
        "flex-wrap",
        "gap-3",
        "mb-4",
        className,
      ].join(" ")}>
      <div>
        <h2 className="fw-bold mb-1">{title}</h2>

        {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
      </div>

      {actions && (
        <div className="d-flex align-items-center gap-2 flex-wrap">
          {actions}
        </div>
      )}
    </header>
  );
};

PageHeader.propTypes = {
  title: PropTypes.node.isRequired,

  subtitle: PropTypes.node,

  actions: PropTypes.node,

  className: PropTypes.string,
};

export default PageHeader;
