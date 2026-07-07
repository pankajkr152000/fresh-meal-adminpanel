import { getStatusBadgeClass } from "../../utils/FoodStatusUtils";

/**
 * ============================================================================
 * Component: FoodStatusBadge
 * ============================================================================
 * Displays the lifecycle status of a food item.
 *
 * If the status is missing or invalid, a default "UNKNOWN" badge is shown
 * instead of crashing the application.
 * ============================================================================
 */

const FoodStatusBadge = ({ status }) => {
  const displayStatus = status ?? "UNKNOWN";

  return (
    <span className={`badge ${getStatusBadgeClass(displayStatus)}`}>
      {displayStatus.replaceAll("_", " ")}
    </span>
  );
};

export default FoodStatusBadge;
