// ============================================================================
// File: ViewFood.jsx
// Description:
// Displays complete details of a single food item.
//
// Responsibilities
// - Load food details
// - Handle loading/error/empty states
// - Display food information
// - Preview image
// - Open image viewer
// - Navigate back
// - Navigate to Edit Food
// ============================================================================

import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useFoodDetails from "../../hooks/useFoodDetails";

import { FOOD_DETAIL_SECTIONS } from "../../constants/food/foodDetails.config";

import PageLayout from "../../layouts/PageLayout";

import DetailColumn from "../../components/Common/details/layout/DetailColumn";
import DetailContainer from "../../components/Common/details/layout/DetailContainer";
import DetailGrid from "../../components/Common/details/layout/DetailGrid";

import DetailCardRenderer from "../../components/Common/details/display/DetailCardRenderer";

import ImagePreview from "../../components/Common/details/media/ImagePreview";
import ImageViewerModal from "../../components/Common/details/media/ImageViewerModal";

import AuditCard from "../../components/Common/details/audit/AuditCard";

import EmptyState from "../../components/Common/details/feedback/EmptyState";
import ErrorAlert from "../../components/Common/details/feedback/ErrorAlert";
import LoadingSpinner from "../../components/Common/details/feedback/LoadingSpinner";

import { NavigationCard } from "../../components/Food/details";
import FoodHero from "../../components/Food/details/FoodHero";

const ViewFood = () => {
  // ==========================================================================
  // Router
  // ==========================================================================

  const { foodId } = useParams();

  const navigate = useNavigate();

  // ==========================================================================
  // State
  // ==========================================================================

  const [showImageViewer, setShowImageViewer] = useState(false);

  // ==========================================================================
  // Data
  // ==========================================================================

  const { food, navigation, loading, error, hasFood, refreshFood } =
    useFoodDetails(foodId);

  // ==========================================================================
  // Sections
  // ==========================================================================

  const [
    basicInformation,
    categoryInformation,
    statusInformation,
    additionalInformation,
  ] = useMemo(() => FOOD_DETAIL_SECTIONS, []);

  // ==========================================================================
  // Navigation
  // ==========================================================================

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/foods/edit/${food.id}`);
  };

  const handleNavigate = (id) => {
    if (!id) return;

    navigate(`/foods/view/${id}`);
  };

  const handleStatusChange = () => {
    // Will be implemented with StatusConfirmationModal
  };

  // ==========================================================================
  // Image
  // ==========================================================================

  const openImageViewer = () => {
    if (food?.imageUrl) {
      setShowImageViewer(true);
    }
  };

  const closeImageViewer = () => {
    setShowImageViewer(false);
  };

  // ==========================================================================
  // Loading
  // ==========================================================================

  if (loading) {
    return <LoadingSpinner message="Loading food details..." />;
  }

  // ==========================================================================
  // Error
  // ==========================================================================

  if (error) {
    return (
      <ErrorAlert
        title="Unable to Load Food"
        message={error}
        onRetry={refreshFood}
      />
    );
  }

  // ==========================================================================
  // Empty
  // ==========================================================================

  if (!hasFood) {
    return (
      <EmptyState
        title="Food Not Found"
        message="The requested food does not exist."
      />
    );
  }

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <PageLayout>
      <FoodHero
        food={food}
        onBack={handleBack}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />

      <DetailContainer>
        {/* ================================================================ */}
        {/* Row 1 */}
        {/* ================================================================ */}

        <DetailGrid>
          {/* Image */}

          <DetailColumn lg={4}>
            <ImagePreview
              src={food.imageUrl}
              alt={food.foodName}
              className="rounded shadow-sm overflow-hidden"
              imageClassName="object-fit-cover"
              placeholderText="Food image unavailable"
              overlay={
                food.imageUrl && (
                  <button
                    type="button"
                    className="btn btn-dark btn-sm position-absolute bottom-0 end-0 m-3"
                    onClick={openImageViewer}>
                    View
                  </button>
                )
              }
            />
          </DetailColumn>

          {/* Basic Information */}

          <DetailColumn lg={8}>
            <DetailCardRenderer
              section={basicInformation}
              data={food}
            />
          </DetailColumn>
        </DetailGrid>

        {/* ================================================================ */}
        {/* Row 2 */}
        {/* ================================================================ */}

        <DetailGrid className="mt-1">
          {/* Categories */}

          <DetailColumn lg={4}>
            <DetailCardRenderer
              section={categoryInformation}
              data={food}
            />
          </DetailColumn>

          {/* Status */}

          <DetailColumn lg={4}>
            <DetailCardRenderer
              section={statusInformation}
              data={food}
            />
          </DetailColumn>

          {/* Additional */}

          <DetailColumn lg={4}>
            <DetailCardRenderer
              section={additionalInformation}
              data={food}
            />
          </DetailColumn>
        </DetailGrid>

        {/* ================================================================ */}
        {/* Row 3 */}
        {/* ================================================================ */}

        <DetailGrid className="mt-1">
          <DetailColumn>
            <AuditCard
              createdAt={food.createdAt}
              createdBy={food.createdBy}
              updatedAt={food.updatedAt}
              updatedBy={food.updatedBy}
            />
          </DetailColumn>
        </DetailGrid>
      </DetailContainer>

      {/* ================================================================ */}
      {/* Row 4 - Navigation */}
      {/* ================================================================ */}

      <DetailGrid className="mt-1">
        <DetailColumn>
          <NavigationCard
            navigation={navigation}
            onNavigate={handleNavigate}
          />
        </DetailColumn>
      </DetailGrid>

      {/* ================================================================ */}
      {/* Image Viewer */}
      {/* ================================================================ */}

      <ImageViewerModal
        show={showImageViewer}
        imageUrl={food.imageUrl}
        imageName={food.foodName}
        onClose={closeImageViewer}
      />
    </PageLayout>
  );
};

export default ViewFood;
