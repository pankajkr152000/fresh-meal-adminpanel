import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../../../global/constants/RouteConstants";

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

import useFoodDetails from "../hooks/useFoodDetails";

import { FOOD_DETAIL_SECTIONS } from "../constants/foodDetails.config";

import PageLayout from "../../../global/layouts/PageLayout";

import DetailColumn from "../../../global/components/details/layout/DetailColumn";
import DetailContainer from "../../../global/components/details/layout/DetailContainer";
import DetailGrid from "../../../global/components/details/layout/DetailGrid";

import DetailCardRenderer from "../../../global/components/details/display/DetailCardRenderer";

import ImagePreview from "../../../global/components/details/media/ImagePreview";
import ImageViewerModal from "../../../global/components/details/media/ImageViewerModal";

import AuditCard from "../../../global/components/details/audit/AuditCard";

import EmptyState from "../../../global/components/details/feedback/EmptyState";
import ErrorAlert from "../../../global/components/details/feedback/ErrorAlert";
import LoadingSpinner from "../../../global/components/details/feedback/LoadingSpinner";

import { NavigationCard } from "../components/details";
import FoodHero from "../components/details/FoodHero";
import StatusConfirmationModal from "../components/status/StatusConfirmationModal";
import { FoodService } from "../services";

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

  const [showStatusModal, setShowStatusModal] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState(null);

  const [statusLoading, setStatusLoading] = useState(false);

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

  // const handleEdit = () => {
  //   navigate(`/foods/edit/${food.id}`);
  // };

  const handleEditFood = () => {
    navigate(ROUTES.EDIT_FOOD.replace(":foodId", food.id));
  };

  const handleNavigate = (id) => {
    if (!id) return;

    navigate(`/foods/view/${id}`);
  };

  const handleStatusChange = () => {
    if (!food?.allowedStatuses?.length) {
      toast.info("No status transition available.");
      return;
    }

    setSelectedStatus(food.allowedStatuses[0]);

    setShowStatusModal(true);
  };

  const handleStatusSelection = (status) => {
    setSelectedStatus(status);
  };

  const handleCancelStatus = () => {
    setShowStatusModal(false);

    setSelectedStatus(null);
  };

  const handleConfirmStatus = async () => {
    try {
      setStatusLoading(true);

      await FoodService.updateFoodStatus(food.id, selectedStatus);
      console.log("Selected Status:", selectedStatus);
      toast.success("Food status updated successfully.");

      setShowStatusModal(false);

      setSelectedStatus(null);

      refreshFood();
    } catch (error) {
      console.error(error);

      toast.error("Unable to update food status.");
    } finally {
      setStatusLoading(false);
    }
  };

  // ==========================================================================
  // Image
  // ==========================================================================

  const openImageViewer = () => {
    if (food?.imageUrl) {
      console.log("Image URL under view food :" + food.imageUrl);
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
        onEdit={handleEditFood}
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

      <StatusConfirmationModal
        show={showStatusModal}
        food={food}
        previousStatus={food.foodStatus}
        nextStatus={selectedStatus}
        onStatusChange={handleStatusSelection}
        loading={statusLoading}
        onCancel={handleCancelStatus}
        onConfirm={handleConfirmStatus}
      />
    </PageLayout>
  );
};

export default ViewFood;
