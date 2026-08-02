import { FOOD_STATUS } from "../constants/FoodStatus";

/**
 * Returns Bootstrap badge class based on food status.
 *
 * @param {string} status Food status value (e.g. "AVAILABLE")
 */
export const getStatusBadgeClass = (status) => {
  switch (status) {
    case FOOD_STATUS.AVAILABLE.value:
      return "bg-success";

    case FOOD_STATUS.OUT_OF_STOCK.value:
      return "bg-warning text-dark";

    case FOOD_STATUS.COMING_SOON.value:
      return "bg-info text-dark";

    case FOOD_STATUS.SEASONAL.value:
      return "bg-primary";

    case FOOD_STATUS.DISABLED.value:
      return "bg-secondary";

    case FOOD_STATUS.DISCONTINUED.value:
      return "bg-danger";

    default:
      return "bg-dark";
  }
};
