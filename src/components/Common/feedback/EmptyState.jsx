const EmptyState = ({
  title = "No Foods Found",
  message = "There are no food items available.",
}) => {
  return (
    <div className="text-center py-5">
      <div style={{ fontSize: "70px" }}>🍽️</div>

      <h4>{title}</h4>

      <p className="text-muted">{message}</p>
    </div>
  );
};

export default EmptyState;
