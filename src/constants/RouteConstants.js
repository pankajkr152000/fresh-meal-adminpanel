// src/constants/RouteConstants.js

export const ROUTES = {
  HOME: "/",
  ADD_FOOD: "/api/foods/add",
  FETCH_ALL_FOODS: "/api/foods/readAllFoods",
  FETCH_ALL_ORDERS: "/orders",
  VIEW_FOOD: "/foods/view/:foodId", // ✅ Add this
  EDIT_FOOD: "/foods/edit/:foodId",
};

export default ROUTES;
