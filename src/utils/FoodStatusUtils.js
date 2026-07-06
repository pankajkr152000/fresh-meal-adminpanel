import { FOOD_STATUS } from "../constants/FoodStatus";

/**
 * Returns Bootstrap badge class based on food status.
 */
export const getStatusBadgeClass = (status) => {
  switch (status) {
    case FOOD_STATUS.AVAILABLE:
      return "bg-success";

    case FOOD_STATUS.OUT_OF_STOCK:
      return "bg-warning text-dark";

    case FOOD_STATUS.COMING_SOON:
      return "bg-info text-dark";

    case FOOD_STATUS.SEASONAL:
      return "bg-primary";

    case FOOD_STATUS.DISABLED:
      return "bg-secondary";

    case FOOD_STATUS.DISCONTINUED:
      return "bg-danger";

    default:
      return "bg-dark";
  }
};
