import { getFoodImage, handleImageError } from "../../utils/ImageUtils";

const FoodTable = ({ foods }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Availability</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>
                <img
                  src={getFoodImage(food.imageUrl)}
                  onError={handleImageError}
                  width="70"
                  height="70"
                  className="rounded object-fit-cover"
                  alt={food.foodName}
                />
              </td>

              <td>{food.foodName}</td>

              <td>{food.description}</td>

              <td>₹ {food.price}</td>

              <td>{food.foodCategory}</td>

              <td>
                {food.available ? (
                  <span className="badge bg-success">Available</span>
                ) : (
                  <span className="badge bg-danger">Out Of Stock</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodTable;
