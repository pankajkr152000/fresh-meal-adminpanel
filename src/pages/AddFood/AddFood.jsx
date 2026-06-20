import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FoodMetadataService from "../../services/FoodMetadataService";
import FoodService from "../../services/FoodService";

/**
 * AddFood Component
 *
 * Responsibilities:
 * - Render food creation form.
 * - Load metadata from backend.
 * - Handle image uploads.
 * - Submit food information.
 *
 * Future Enhancements:
 * - Client-side validation.
 * - Drag & Drop image upload.
 * - Image compression.
 * - Loading skeletons.
 */
const AddFood = () => {
  /**
   * Food Form State.
   */
  const [food, setFood] = useState({
    foodName: "",
    description: "",
    price: "",
    foodCategory: "",
    dietCategory: "",
    cuisineType: "",
  });

  /**
   * Metadata State.
   */
  const [foodCategories, setFoodCategories] = useState([]);

  const [dietCategories, setDietCategories] = useState([]);

  const [cuisineCategories, setCuisineCategories] = useState([]);

  /**
   * Image State.
   */
  const [image, setImage] = useState(null);

  /**
   * Image Preview State.
   */
  const [preview, setPreview] = useState(null);

  /**
   * Submit Button Loading State.
   */
  const [loading, setLoading] = useState(false);

  /**
   * Loads metadata when component mounts.
   */

  /**
   * Fetch metadata from backend.
   *
   * Expected Response:
   *
   * {
   *   foodCategories: [],
   *   dietCategories: [],
   *   cuisineTypes: []
   * }
   */
  /**
   * Load metadata when component mounts.
   */
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const metadata = await FoodMetadataService.getMetadata();

        setFoodCategories(metadata.data.foodCategories || []);

        setDietCategories(metadata.data.dietCategories || []);

        setCuisineCategories(metadata.data.cuisineCategories || []);
      } catch (error) {
        console.error("Failed to load food metadata", error);
      }
    };

    fetchMetadata();
  }, []);

  /**
   * Handles all text field
   * and dropdown changes.
   *
   * @param {Event} event
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFood((previousFood) => ({
      ...previousFood,
      [name]: value,
    }));
  };

  /**
   * Handles image selection.
   *
   * @param {Event} event
   */
  const handleImageChange = (event) => {
    const selectedImage = event.target.files?.[0];

    if (!selectedImage) {
      return;
    }

    setImage(selectedImage);

    setPreview(URL.createObjectURL(selectedImage));
  };

  /**
   * Handles form submission.
   *
   * @param {Event} event
   */
  /**
   * Handles food creation.
   *
   * Spring Controller:
   *
   * @RequestPart("food") FoodRequest
   * @RequestPart("image") MultipartFile
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "food",
        new Blob([JSON.stringify(food)], {
          type: "application/json",
        }),
      );

      if (image) {
        formData.append("image", image);
      }

      /**
       * Debug payload.
       */
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await FoodService.addFood(formData);
      //alert("Food Added Successfully");
      toast.success("Food Added Successfully");

      handleReset();
    } catch (error) {
      console.error("Full Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);

        console.log("Response:", error.response.data);
      }
      toast.error("Failed to add food");
      console.error("Failed to add food", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Resets the form.
   */
  const handleReset = () => {
    setFood({
      foodName: "",
      description: "",
      price: "",
      foodCategory: "",
      dietCategory: "",
      cuisineType: "",
    });

    setImage(null);

    setPreview(null);
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="mb-0">
            <i className="bi bi-plus-circle me-2"></i>
            Add New Food
          </h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Food Name */}
            <div className="mb-3">
              <label className="form-label">Food Name</label>

              <input
                type="text"
                name="foodName"
                className="form-control"
                value={food.foodName}
                onChange={handleChange}
                placeholder="Enter food name"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>

              <textarea
                rows="4"
                name="description"
                className="form-control"
                value={food.description}
                onChange={handleChange}
                placeholder="Enter food description"
              />
            </div>

            <div className="row">
              {/* Price */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Price (₹)</label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="price"
                  className="form-control"
                  value={food.price}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Food Category */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Food Category</label>

                <select
                  name="foodCategory"
                  className="form-select"
                  value={food.foodCategory}
                  onChange={handleChange}
                  required>
                  <option value="">Select Food Category</option>

                  {foodCategories.map((category) => (
                    <option
                      key={category}
                      value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Diet Category */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Diet Category</label>

                <select
                  name="dietCategory"
                  className="form-select"
                  value={food.dietCategory}
                  onChange={handleChange}
                  required>
                  <option value="">Select Diet Category</option>

                  {dietCategories.map((category) => (
                    <option
                      key={category}
                      value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cuisine Type */}
            <div className="mb-3">
              <label className="form-label">Cuisine Type</label>

              <select
                name="cuisineType"
                className="form-select"
                value={food.cuisineType}
                onChange={handleChange}
                required>
                <option value="">Select Cuisine Type</option>

                {cuisineCategories.map((cuisine) => (
                  <option
                    key={cuisine}
                    value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Food Image</label>

              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="mb-3">
                <img
                  src={preview}
                  alt="Food Preview"
                  className="img-thumbnail"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            {/* Buttons */}
            <div className="d-flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary">
                <i className="bi bi-check-circle me-2"></i>

                {loading ? "Saving..." : "Add Food"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary">
                <i className="bi bi-arrow-clockwise me-2"></i>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
