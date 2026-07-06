import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const StatusConfirmationModal = ({
  show,

  food,

  newStatus,

  loading,

  onCancel,

  onConfirm,
}) => {
  if (!food) return null;

  return (
    <Modal
      show={show}
      onHide={onCancel}
      centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Food Status</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Change status of
          <strong> {food.foodName}</strong>?
        </p>

        <div className="alert alert-warning">
          {food.status}

          {" → "}

          {newStatus}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={loading}>
          Cancel
        </Button>

        <Button
          variant="primary"
          disabled={loading}
          onClick={onConfirm}>
          {loading ? "Updating..." : "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StatusConfirmationModal;
