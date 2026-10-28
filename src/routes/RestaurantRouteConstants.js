import { ROUTES } from "../global/constants/RouteConstants";
import { buildRoutePath } from "../global/utils/RouteUtils";

const RESTAURANT_BASE_PATH = ROUTES.RESTAURANT;

/**
 * Relative route paths for the Restaurant Portal.
 *
 * Keep these paths relative to the restaurant base path so they can
 * be composed consistently using buildRoutePath().
 */
export const RESTAURANT_ROUTE_PATHS = Object.freeze({
  INDEX: "",
  DASHBOARD: "dashboard",

  // Restaurant selection and onboarding.
  SELECT_RESTAURANT: "select",
  ONBOARDING: "onboarding",

  // Restaurant management.
  PROFILE: "profile",
  BRANCHES: "branches",
  MENU: "menu",
  ORDERS: "orders",
  SETTINGS: "settings",
});

/**
 * Centralized absolute route paths for the Restaurant Portal.
 */
export const RESTAURANT_ROUTES = Object.freeze({
  ROOT: buildRoutePath(RESTAURANT_BASE_PATH, RESTAURANT_ROUTE_PATHS.INDEX),

  DASHBOARD: buildRoutePath(
    RESTAURANT_BASE_PATH,
    RESTAURANT_ROUTE_PATHS.DASHBOARD,
  ),

  SELECT_RESTAURANT: buildRoutePath(
    RESTAURANT_BASE_PATH,
    RESTAURANT_ROUTE_PATHS.SELECT_RESTAURANT,
  ),

  ONBOARDING: buildRoutePath(
    RESTAURANT_BASE_PATH,
    RESTAURANT_ROUTE_PATHS.ONBOARDING,
  ),

  PROFILE: buildRoutePath(RESTAURANT_BASE_PATH, RESTAURANT_ROUTE_PATHS.PROFILE),

  BRANCHES: buildRoutePath(
    RESTAURANT_BASE_PATH,
    RESTAURANT_ROUTE_PATHS.BRANCHES,
  ),

  MENU: buildRoutePath(RESTAURANT_BASE_PATH, RESTAURANT_ROUTE_PATHS.MENU),

  ORDERS: buildRoutePath(RESTAURANT_BASE_PATH, RESTAURANT_ROUTE_PATHS.ORDERS),

  SETTINGS: buildRoutePath(
    RESTAURANT_BASE_PATH,
    RESTAURANT_ROUTE_PATHS.SETTINGS,
  ),
});

export default RESTAURANT_ROUTES;
