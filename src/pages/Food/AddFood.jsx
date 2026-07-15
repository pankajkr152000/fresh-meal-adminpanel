import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FoodForm from "../../components/Food/form/FoodForm";
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
   * Handles all the selected options
   * @param {Event} selectedOptions
   */
  const handleFoodCategoriesChange = (selectedOptions) => {
    setFood((previous) => ({
      ...previous,

      foodCategories: selectedOptions ?? [],
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
          <FoodForm
            food={food}
            metadata={{
              foodCategories,
              dietCategories,
              cuisineCategories,
            }}
            preview={preview}
            loading={loading}
            onChange={handleChange}
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
            submitButtonText="Add Food"
            resetButtonText="Reset"
          />
        </div>
      </div>
    </div>
  );
};

export default AddFood;
