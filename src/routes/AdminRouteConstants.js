import { ROUTES } from "../global/constants/RouteConstants";
import { buildRoutePath } from "../global/utils/RouteUtils";

const ADMIN_BASE_PATH = ROUTES.ADMIN;

export const ADMIN_ROUTE_PATHS = Object.freeze({
  INDEX: "",
  FOODS: "foods",
  ADD_FOOD: "foods/new",
  ARCHIVED_FOODS: "foods/archived",
  VIEW_FOOD: "foods/:foodId",
  EDIT_FOOD: "foods/:foodId/edit",
  ORDERS: "orders",
});

export const ADMIN_ROUTES = Object.freeze({
  ROOT: buildRoutePath(ADMIN_BASE_PATH, ADMIN_ROUTE_PATHS.INDEX),
  FOODS: buildRoutePath(ADMIN_BASE_PATH, ADMIN_ROUTE_PATHS.FOODS),
  ADD_FOOD: buildRoutePath(ADMIN_BASE_PATH, ADMIN_ROUTE_PATHS.ADD_FOOD),

  ARCHIVED_FOODS: buildRoutePath(
    ADMIN_BASE_PATH,
    ADMIN_ROUTE_PATHS.ARCHIVED_FOODS,
  ),

  VIEW_FOOD: (foodId) =>
    buildRoutePath(ADMIN_BASE_PATH, ADMIN_ROUTE_PATHS.VIEW_FOOD, {
      foodId,
    }),

  EDIT_FOOD: (foodId) =>
    buildRoutePath(ADMIN_BASE_PATH, ADMIN_ROUTE_PATHS.EDIT_FOOD, {
      foodId,
    }),

  ORDERS: buildRoutePath(ADMIN_BASE_PATH, ADMIN_ROUTE_PATHS.ORDERS),
});
