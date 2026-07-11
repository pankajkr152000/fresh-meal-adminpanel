import PropTypes from "prop-types";
import CommonCard from "./CommonCard";

console.log("Inside StatisticsCard Component");
/**
 * -----------------------------------------------------------------------------
 * Component : StatisticsCard
 * -----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Displays a reusable statistics summary card.
 *
 * Responsibilities
 * ----------------
 * • Display title and value.
 * • Display optional subtitle.
 * • Display optional icon.
 * • Support Bootstrap variants.
 * • Display loading state.
 *
 * Notes
 * -----
 * Domain-specific logic belongs to feature components.
 * -----------------------------------------------------------------------------
 */

const StatisticsCard = ({
  title,
  value,
  subtitle,
  icon,
  variant = "primary",
  loading = false,
  onClick,
}) => {
  console.log("Inside CommonCard Component");

  const clickable = typeof onClick === "function";

  return (
    <CommonCard
      loading={loading}
      className={[clickable ? "cursor-pointer" : "", "h-100"].join(" ")}>
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={onClick}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}>
        <div>
          <small className="text-muted">{title}</small>

          <h3 className="fw-bold mt-2 mb-1">{value}</h3>

          {subtitle && <small className="text-muted">{subtitle}</small>}
        </div>

        {icon && (
          <div className={["fs-1", `text-${variant}`].join(" ")}>{icon}</div>
        )}
      </div>
    </CommonCard>
  );
};

StatisticsCard.propTypes = {
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  icon: PropTypes.node,
  variant: PropTypes.oneOf([
    "primary",
    "success",
    "danger",
    "warning",
    "info",
    "secondary",
    "dark",
  ]),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default StatisticsCard;
