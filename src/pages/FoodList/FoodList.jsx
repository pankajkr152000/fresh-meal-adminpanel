import { useCallback, useEffect, useMemo, useState } from "react";

import FoodService from "../../services/FoodService";

import EmptyState from "../../components/Common/EmptyState";
import ErrorAlert from "../../components/Common/ErrorAlert";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import FoodSearch from "../../components/Food/FoodSearch";
import FoodTable from "../../components/Food/FoodTable";
import useDebounce from "../../hooks/useDebounce";

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useDebounce(searchText, 400);

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

  const filteredFoods = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return foods;
    }

    const keyword = debouncedSearch.toLowerCase();

    return foods.filter((food) =>
      food.foodName?.toLowerCase().includes(keyword),
    );
  }, [foods, debouncedSearch]);

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
    <FoodSearch
      value={searchText}
      onChange={setSearchText}
    />;

    {
      filteredFoods.length === 0 ? (
        <EmptyState
          title="No matching foods"
          message="Try a different search keyword."
        />
      ) : (
        <FoodTable foods={filteredFoods} />
      );
    }
  }

  return (
    <div className="container-fluid">
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h4 className="mb-0">Food List</h4>
        </div>

        <div className="card-body">
          <FoodSearch
            value={searchText}
            onChange={setSearchText}
          />

          <FoodTable foods={filteredFoods} />
        </div>
      </div>
    </div>
  );
};

export default FoodList;
