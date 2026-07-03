import { FaHamburger } from "react-icons/fa";

const EmptyState = () => {
  return (
    <div className="text-center py-5">
      <FaHamburger
        size={70}
        className="text-secondary mb-3"
      />

      <h4>No Foods Found</h4>

      <p className="text-muted">There are no food items available.</p>
    </div>
  );
};

export default EmptyState;
