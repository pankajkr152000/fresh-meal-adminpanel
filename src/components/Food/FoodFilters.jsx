const FoodFilters = ({
  filters,
  categories,
  cuisines,
  diets,
  onChange,
  onClear,
}) => {
  return (
    <div className="row g-3 mb-4">
      <div className="col-lg-3 col-md-6">
        <select
          className="form-select"
          name="foodCategory"
          value={filters.foodCategory}
          onChange={onChange}>
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="col-lg-3 col-md-6">
        <select
          className="form-select"
          name="cuisineCategory"
          value={filters.cuisineCategory}
          onChange={onChange}>
          <option value="">All Cuisines</option>

          {cuisines.map((cuisine) => (
            <option
              key={cuisine}
              value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      <div className="col-lg-2 col-md-6">
        <select
          className="form-select"
          name="dietCategory"
          value={filters.dietCategory}
          onChange={onChange}>
          <option value="">All Diets</option>

          {diets.map((diet) => (
            <option
              key={diet}
              value={diet}>
              {diet}
            </option>
          ))}
        </select>
      </div>

      <div className="col-lg-2 col-md-6">
        <select
          className="form-select"
          name="availability"
          value={filters.availability}
          onChange={onChange}>
          <option value="">All Status</option>

          <option value="AVAILABLE">Available</option>

          <option value="OUT_OF_STOCK">Out Of Stock</option>

          <option value="DISABLED">Disabled</option>
        </select>
      </div>

      <div className="col-lg-2 d-grid">
        <button
          className="btn btn-outline-secondary"
          onClick={onClear}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FoodFilters;
