import { useCallback, useEffect, useState } from "react";

import FoodService from "../../services/FoodService";

import EmptyState from "../../components/Common/EmptyState";
import ErrorAlert from "../../components/Common/ErrorAlert";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import FoodTable from "../../components/Food/FoodTable";

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadFoods = useCallback(async (signal) => {
    try {
      setLoading(true);

      setError("");

      const response = await FoodService.getAllFoods(signal);

      if (!response.success) {
        throw new Error(response.message);
      }

      setFoods(response.data);
    } catch (error) {
      if (error.name !== "CanceledError") {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFoods(controller.signal);

    return () => controller.abort();
  }, [loadFoods]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorAlert
        message={error}
        onRetry={() => loadFoods()}
      />
    );
  }

  if (!foods.length) {
    return <EmptyState />;
  }

  return (
    <div className="container-fluid">
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h4 className="mb-0">Food List</h4>
        </div>

        <div className="card-body">
          <FoodTable foods={foods} />
        </div>
      </div>
    </div>
  );
};

export default FoodList;
