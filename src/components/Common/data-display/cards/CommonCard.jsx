import PropTypes from "prop-types";
import LoadingSpinner from "../../feedback/LoadingSpinner";

console.log("Inside CommonCard Component");
/**
 * -----------------------------------------------------------------------------
 * Component : CommonCard
 * -----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Reusable Bootstrap card used throughout the admin panel.
 *
 * Responsibilities
 * ----------------
 * • Render a consistent card layout.
 * • Display optional title, subtitle and header actions.
 * • Render loading state.
 * • Render footer content.
 * • Allow layout customization through class names.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * -----------------------------------------------------------------------------
 */

const CommonCard = ({
  title,
  subtitle,
  children,
  headerActions,
  footer,
  loading = false,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  bordered = false,
  shadow = "shadow-sm",
}) => {
  console.log("Inside CommonCard Component");
  return (
    <div
      className={[
        "card",
        shadow,
        bordered ? "" : "border-0",
        "rounded-3",
        className,
      ].join(" ")}>
      {(title || subtitle || headerActions) && (
        <div
          className={["card-header", "bg-white", "py-3", headerClassName].join(
            " ",
          )}>
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
            <div>
              {title && <h4 className="mb-1 fw-semibold">{title}</h4>}

              {subtitle && <small className="text-muted">{subtitle}</small>}
            </div>

            {headerActions && <div>{headerActions}</div>}
          </div>
        </div>
      )}

      <div className={["card-body", bodyClassName].join(" ")}>
        {loading ? <LoadingSpinner /> : children}
      </div>

      {footer && (
        <div className={["card-footer", "bg-white", footerClassName].join(" ")}>
          {footer}
        </div>
      )}
    </div>
  );
};

CommonCard.propTypes = {
  title: PropTypes.node,

  subtitle: PropTypes.node,

  children: PropTypes.node,

  headerActions: PropTypes.node,

  footer: PropTypes.node,

  loading: PropTypes.bool,

  className: PropTypes.string,

  headerClassName: PropTypes.string,

  bodyClassName: PropTypes.string,

  footerClassName: PropTypes.string,

  bordered: PropTypes.bool,

  shadow: PropTypes.oneOf(["", "shadow-sm", "shadow", "shadow-lg"]),
};

export default CommonCard;
