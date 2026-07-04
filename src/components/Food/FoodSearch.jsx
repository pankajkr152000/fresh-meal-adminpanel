const FoodSearch = ({ value, onChange }) => {
  return (
    <div className="mb-3">
      <div className="input-group">
        <span className="input-group-text">🔍</span>

        <input
          type="text"
          className="form-control"
          placeholder="Search food by name..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Search food"
        />
      </div>
    </div>
  );
};

export default FoodSearch;
