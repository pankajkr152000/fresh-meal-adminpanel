import PropTypes from "prop-types";
import { memo } from "react";

import { StatisticsCard } from "../../common/data-display/cards";

/**
 * =============================================================================
 * Component : FoodStatistics
 * =============================================================================
 *
 * Purpose
 * -------
 * Displays summary statistics for the Food Management page.
 *
 * Responsibilities
 * ----------------
 * • Render dashboard statistic cards.
 * • Display values received from the parent.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * Statistics are calculated by useFoodList.
 * =============================================================================
 */

const FoodStatistics = ({ statistics }) => {
  const cards = [
    {
      title: "Total Foods",
      value: statistics.total,
      className: "border-primary",
      textClassName: "text-primary",
    },
    {
      title: "Available",
      value: statistics.available,
      className: "border-success",
      textClassName: "text-success",
    },
    {
      title: "Out of Stock",
      value: statistics.outOfStock,
      className: "border-warning",
      textClassName: "text-warning",
    },
    {
      title: "Disabled",
      value: statistics.disabled,
      className: "border-secondary",
      textClassName: "text-secondary",
    },
    {
      title: "Coming Soon",
      value: statistics.comingSoon,
      className: "border-info",
      textClassName: "text-info",
    },
    {
      title: "Discontinued",
      value: statistics.discontinued,
      className: "border-danger",
      textClassName: "text-danger",
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="col-xl-2 col-lg-4 col-md-6">
          <StatisticsCard
            title={card.title}
            value={card.value}
            className={card.className}
            textClassName={card.textClassName}
          />
        </div>
      ))}
    </div>
  );
};

FoodStatistics.propTypes = {
  statistics: PropTypes.shape({
    total: PropTypes.number.isRequired,
    available: PropTypes.number.isRequired,
    outOfStock: PropTypes.number.isRequired,
    disabled: PropTypes.number.isRequired,
    comingSoon: PropTypes.number.isRequired,
    seasonal: PropTypes.number.isRequired,
    discontinued: PropTypes.number.isRequired,
  }).isRequired,
};

export default memo(FoodStatistics);
