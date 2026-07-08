console.log("Inside FoodStatusDropDown Component");

const FoodStatusDropdown = ({
  currentStatus,
  allowedStatuses = [],
  onStatusChange,
  disabled = false,
}) => {
  console.log("Inside FoodStatusDropDown Component");
  const handleChange = (event) => {
    const value = event.target.value;
    if (!value) return;
    onStatusChange(value);
    event.target.value = ""; // reset the visual select immediately
  };

  return (
    <select
      className="form-select form-select-sm"
      value=""
      disabled={disabled || allowedStatuses.length === 0}
      onChange={handleChange}>
      <option value="">Change Status</option>
      {allowedStatuses.map((status) => (
        <option
          key={status}
          value={status}>
          {status.replaceAll("_", " ")}
        </option>
      ))}
    </select>
  );
};

export default FoodStatusDropdown;
