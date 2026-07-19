// ============================================================================
// File: FoodHero.jsx
// Description:
// Food-specific page header for View Food page.
// ============================================================================

import { Edit, RefreshCw } from "lucide-react";
import PropTypes from "prop-types";

import PageDetailHeader from "../../Common/details/header/PageDetailHeader";
import PrimaryButton from "../../Common/forms/buttons/PrimaryButton";
import FoodStatusBadge from "../status/FoodStatusBadge";

const FoodHero = ({ food, onBack, onEdit, onStatusChange }) => {
  if (!food) return null;

  return (
    <PageDetailHeader
      title={food.foodName}
      subtitle={`Food ID : ${food.id}`}
      onBack={onBack}
      status={<FoodStatusBadge status={food.foodStatus} />}>
      <PrimaryButton
        variant="outline-warning"
        onClick={onStatusChange}>
        <RefreshCw
          size={16}
          className="me-2"
        />
        Change Status
      </PrimaryButton>

      <PrimaryButton
        variant="primary"
        onClick={onEdit}>
        <Edit
          size={16}
          className="me-2"
        />
        Edit Food
      </PrimaryButton>
    </PageDetailHeader>
  );
};

export default FoodHero;

FoodHero.propTypes = {
  food: PropTypes.object,

  onBack: PropTypes.func,

  onEdit: PropTypes.func,

  onStatusChange: PropTypes.func,
};
