// src/constants/AppConstants.js

export const APP = {
  NAME: "FreshMeal Admin",

  DEFAULT_PAGE_SIZE: 10,

  IMAGE: {
    MAX_FILE_SIZE_MB: 5,
    ALLOWED_TYPES: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ],
  },

  ORDER_STATUS: {
    PLACED: "PLACED",
    CONFIRMED: "CONFIRMED",
    PREPARING: "PREPARING",
    OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
  },

  FOOD_CATEGORY: {
    STARTERS: "STARTERS",
    MAIN_COURSE: "MAIN_COURSE",
    DESSERTS: "DESSERTS",
    BEVERAGES: "BEVERAGES",
  },

  STORAGE_KEYS: {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
    USER_DETAILS: "userDetails",
  },
};

export default APP;