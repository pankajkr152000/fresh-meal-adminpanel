// src/constants/RouteConstants.js

export const ROUTES = {
  HOME: "/",
  ADD_FOOD: "/api/foods/add",
  FETCH_ALL_FOODS: "/api/foods/readAllFoods",
  FETCH_ALL_ORDERS: "/orders",
  VIEW_FOOD: "/foods/view/:foodId", // ✅ Add this
  EDIT_FOOD: "/foods/edit/:foodId",
  GET_ARCHIVED_FOODS: "/api/foods/archived", // to get archived / soft deleted food
  ARCHIVE_FOOD: "/api/foods/archive", // for archived / soft deleted food
  BULK_ARCHIVE_FOOD: "/api/foods/bulkArchive", // for archived / soft deleted food
};

export default ROUTES;
