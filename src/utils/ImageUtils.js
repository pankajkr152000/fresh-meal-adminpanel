import placeholder from "../assets/images/food-placeholder.png";

export const getFoodImage = (imageUrl) => {
  return imageUrl || placeholder;
};

export const handleImageError = (event) => {
  event.target.src = placeholder;
};
