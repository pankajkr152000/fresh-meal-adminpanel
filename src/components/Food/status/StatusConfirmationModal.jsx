import PropTypes from "prop-types";

/**
 * -----------------------------------------------------------------------------
 * Component : StatusConfirmationModal
 * -----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Confirms a food status transition before updating the backend.
 *
 * Responsibilities
 * ----------------
 * • Display current and target status.
 * • Allow user to confirm or cancel.
 * • Prevent duplicate submissions.
 * • Remain completely stateless.
 *
 * Notes
 * -----
 * The parent component owns all state.
 * -----------------------------------------------------------------------------
 */

const StatusConfirmationModal = ({
  show,
  food,
  previousStatus,
  nextStatus,
  loading = false,
  onCancel,
  onConfirm,
}) => {
  if (!show || !food) {
    return null;
  }

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
        aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Food Status</h5>

              <button
                type="button"
                className="btn-close"
                disabled={loading}
                onClick={onCancel}
              />
            </div>

            <div className="modal-body">
              <p className="mb-3">
                Are you sure you want to change the status of
                <strong> {food.foodName}</strong>?
              </p>

              <div className="alert alert-light border">
                <div className="d-flex justify-content-between">
                  <div>
                    <small className="text-muted d-block">Current Status</small>

                    <strong>{previousStatus}</strong>
                  </div>

                  <div className="align-self-center fs-4">→</div>

                  <div>
                    <small className="text-muted d-block">New Status</small>

                    <strong>{nextStatus}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={onCancel}
                disabled={loading}>
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={onConfirm}
                disabled={loading}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Updating...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

StatusConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  food: PropTypes.object,
  previousStatus: PropTypes.string,
  nextStatus: PropTypes.string,
  loading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default StatusConfirmationModal;
