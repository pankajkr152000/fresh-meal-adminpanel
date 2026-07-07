import PropTypes from "prop-types";
import { memo } from "react";

import { PrimaryButton } from "../forms/buttons";

/**
 * =============================================================================
 * Component : ConfirmationModal
 * =============================================================================
 *
 * Purpose
 * -------
 * Generic reusable confirmation modal used before executing destructive or
 * irreversible actions.
 *
 * Responsibilities
 * ----------------
 * • Display title and message.
 * • Display confirm and cancel actions.
 * • Support loading state.
 * • Delegate user actions to parent.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * =============================================================================
 */

const ConfirmationModal = ({
  show,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "btn-danger",
  loading = false,
  onConfirm,
  onCancel,
  children,
}) => {
  if (!show) {
    return null;
  }

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onCancel}
                disabled={loading}
              />
            </div>

            <div className="modal-body">
              {message && <p className="mb-0">{message}</p>}

              {children}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
                disabled={loading}>
                {cancelText}
              </button>

              <PrimaryButton
                className={confirmButtonClass}
                loading={loading}
                onClick={onConfirm}>
                {confirmText}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" />
    </>
  );
};

ConfirmationModal.propTypes = {
  /**
   * Controls modal visibility.
   */
  show: PropTypes.bool.isRequired,

  /**
   * Modal title.
   */
  title: PropTypes.string.isRequired,

  /**
   * Modal message.
   */
  message: PropTypes.string,

  /**
   * Confirm button text.
   */
  confirmText: PropTypes.string,

  /**
   * Cancel button text.
   */
  cancelText: PropTypes.string,

  /**
   * Bootstrap button class.
   */
  confirmButtonClass: PropTypes.string,

  /**
   * Loading state.
   */
  loading: PropTypes.bool,

  /**
   * Confirm callback.
   */
  onConfirm: PropTypes.func.isRequired,

  /**
   * Cancel callback.
   */
  onCancel: PropTypes.func.isRequired,

  /**
   * Optional custom body.
   */
  children: PropTypes.node,
};

export default memo(ConfirmationModal);
