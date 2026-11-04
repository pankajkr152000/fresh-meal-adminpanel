/**
 * ============================================================================
 * FreshMeal - Authentication
 * ============================================================================
 *
 * Page: ResetPassword
 *
 * Purpose:
 * Allows a user to set a new password using a password-reset token received
 * through the password-recovery email.
 *
 * Responsibilities:
 * - Extract the reset token from the URL query parameters.
 * - Collect and validate the new password and confirmation.
 * - Support password visibility toggling.
 * - Delegate password reset to useResetPassword.
 * - Present loading, API error, and success states.
 * - Provide navigation back to Login.
 *
 * Security:
 * - Does not generate or persist reset tokens.
 * - Does not authenticate the user.
 * - Does not manage JWT tokens.
 * - Never logs or exposes the reset token.
 * - Backend remains authoritative for token and password validation.
 *
 * Architecture:
 * ResetPassword.jsx
 *        |
 *        v
 * useResetPassword()
 *        |
 *        v
 * AuthenticationService
 *        |
 *        v
 * apiClient
 *
 * ============================================================================
 */

import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { assets } from "../../../assets/assets";

import PrimaryButton from "../../../global/components/forms/buttons/PrimaryButton";
import CommonInput from "../../../global/components/forms/input/CommonInput";

import { ROUTES } from "../../../global/constants/RouteConstants";

import useResetPassword from "../hooks/useResetPassword";

import "./reset-password.css";

// ============================================================================
// Configuration
// ============================================================================

const PASSWORD_RESET_SUCCESS_MESSAGE =
  "Your password has been successfully reset. You can now sign in using your new password.";

// ============================================================================
// Component
// ============================================================================

const ResetPassword = () => {
  // ==========================================================================
  // URL Parameters
  // ==========================================================================

  const [searchParams] = useSearchParams();

  const resetToken = searchParams.get("token")?.trim() ?? "";

  // ==========================================================================
  // Hook
  // ==========================================================================

  const {
    resetPassword,
    error: resetPasswordError,
    isLoading,
    reset,
  } = useResetPassword();

  // ==========================================================================
  // Form State
  // ==========================================================================

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // ==========================================================================
  // UI State
  // ==========================================================================

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ==========================================================================
  // Handlers
  // ==========================================================================

  /**
   * Handles password field changes.
   *
   * Clears previous validation and API errors when the user edits the form.
   *
   * @param {string} name Input field name.
   * @param {string} value Updated input value.
   */
  const handleInputChange = (name, value) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));

    setValidationErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
      ...(name === "newPassword" ? { confirmPassword: "" } : {}),
    }));

    if (resetPasswordError) {
      reset();
    }
  };

  /**
   * Validates the reset-password form.
   *
   * @returns {boolean} True when the form is valid.
   */
  const validateForm = () => {
    const errors = {
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.newPassword) {
      errors.newPassword = "New password is required.";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password.";
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setValidationErrors(errors);

    return !errors.newPassword && !errors.confirmPassword;
  };

  /**
   * Submits the password-reset request.
   *
   * The payload follows the existing ResetPasswordInputDTO contract.
   *
   * @param {React.FormEvent<HTMLFormElement>} event Form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading || !resetToken) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const resetPasswordRequest = {
      resetToken,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };

    try {
      await resetPassword(resetPasswordRequest);

      setIsSubmitted(true);

      setFormData({
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      // The useResetPassword hook exposes a user-friendly API error.
    }
  };

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <main className="freshmeal-reset-password min-vh-100 d-flex align-items-center">
      <div className="container-fluid px-3 px-md-4 px-lg-5 py-4 py-md-5">
        <div className="row justify-content-center align-items-stretch g-0">
          {/* ================================================================
              Brand / Visual Section
          ================================================================ */}

          <section className="col-lg-6 d-none d-lg-flex">
            <div className="freshmeal-reset-password__brand w-100 d-flex flex-column justify-content-center p-5">
              <div className="freshmeal-reset-password__brand-content mx-auto">
                <img
                  src={assets.brandLogo}
                  alt="FreshMeal"
                  className="freshmeal-reset-password__brand-logo img-fluid mb-4"
                />

                <p className="freshmeal-reset-password__eyebrow mb-2">
                  FRESH FOOD. BETTER MOMENTS.
                </p>

                <h1 className="freshmeal-reset-password__brand-title mb-3">
                  A fresh start
                  <br />
                  begins here.
                </h1>

                <p className="freshmeal-reset-password__brand-text mb-0">
                  Secure your account with a new password and get back to
                  enjoying a simpler food experience.
                </p>
              </div>
            </div>
          </section>

          {/* ================================================================
              Reset Password Section
          ================================================================ */}

          <section className="col-12 col-lg-6">
            <div className="freshmeal-reset-password__panel h-100 d-flex align-items-center justify-content-center">
              <div className="freshmeal-reset-password__card w-100">
                {/* Mobile Brand */}

                <div className="d-lg-none text-center mb-4">
                  <img
                    src={assets.brandLogo}
                    alt="FreshMeal"
                    className="freshmeal-reset-password__mobile-logo img-fluid"
                  />
                </div>

                {/* Header */}

                <header className="mb-4">
                  <p className="freshmeal-reset-password__section-label mb-1">
                    ACCOUNT SECURITY
                  </p>

                  <h2 className="freshmeal-reset-password__title mb-2">
                    Reset your password
                  </h2>

                  <p className="freshmeal-reset-password__subtitle mb-0">
                    Choose a new password for your FreshMeal account.
                  </p>
                </header>

                {/* Missing Reset Token */}

                {!resetToken ? (
                  <div
                    className="freshmeal-reset-password__invalid"
                    role="alert"
                    aria-live="polite">
                    <div className="freshmeal-reset-password__invalid-icon">
                      <i
                        className="bi bi-shield-exclamation"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="freshmeal-reset-password__success-title">
                      Invalid reset link
                    </h3>

                    <p className="freshmeal-reset-password__success-text">
                      This password-reset link is missing its token. Please
                      request a new password-reset email.
                    </p>

                    <Link
                      to={ROUTES.FORGOT_PASSWORD}
                      className="freshmeal-reset-password__link text-decoration-none">
                      Request a new reset link
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* API Error */}

                    {resetPasswordError && (
                      <div
                        className="alert alert-danger py-2 px-3 mb-3"
                        role="alert"
                        aria-live="polite">
                        <span className="small">{resetPasswordError}</span>
                      </div>
                    )}

                    {/* Successful Reset */}

                    {isSubmitted ? (
                      <div
                        className="freshmeal-reset-password__success"
                        role="status"
                        aria-live="polite">
                        <div className="freshmeal-reset-password__success-icon">
                          <i
                            className="bi bi-shield-check"
                            aria-hidden="true"
                          />
                        </div>

                        <h3 className="freshmeal-reset-password__success-title">
                          Password reset successful
                        </h3>

                        <p className="freshmeal-reset-password__success-text">
                          {PASSWORD_RESET_SUCCESS_MESSAGE}
                        </p>

                        <PrimaryButton
                          type="button"
                          className="w-100"
                          onClick={() => {
                            window.location.assign(ROUTES.LOGIN);
                          }}>
                          Continue to login
                        </PrimaryButton>
                      </div>
                    ) : (
                      /* Reset Password Form */

                      <form
                        onSubmit={handleSubmit}
                        noValidate>
                        <div className="mb-3">
                          <CommonInput
                            label="New password"
                            name="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder="Enter your new password"
                            required
                            disabled={isLoading}
                            error={validationErrors.newPassword}
                            className="freshmeal-reset-password__field"
                          />

                          <div className="freshmeal-reset-password__password-toggle">
                            <button
                              type="button"
                              className="freshmeal-reset-password__toggle-button"
                              onClick={() =>
                                setShowNewPassword((previous) => !previous)
                              }
                              aria-label={
                                showNewPassword
                                  ? "Hide new password"
                                  : "Show new password"
                              }
                              aria-pressed={showNewPassword}
                              disabled={isLoading}>
                              <i
                                className={`bi ${
                                  showNewPassword ? "bi-eye-slash" : "bi-eye"
                                }`}
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mb-4">
                          <CommonInput
                            label="Confirm new password"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Re-enter your new password"
                            required
                            disabled={isLoading}
                            error={validationErrors.confirmPassword}
                            className="freshmeal-reset-password__field"
                          />

                          <div className="freshmeal-reset-password__password-toggle">
                            <button
                              type="button"
                              className="freshmeal-reset-password__toggle-button"
                              onClick={() =>
                                setShowConfirmPassword((previous) => !previous)
                              }
                              aria-label={
                                showConfirmPassword
                                  ? "Hide confirm password"
                                  : "Show confirm password"
                              }
                              aria-pressed={showConfirmPassword}
                              disabled={isLoading}>
                              <i
                                className={`bi ${
                                  showConfirmPassword
                                    ? "bi-eye-slash"
                                    : "bi-eye"
                                }`}
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="freshmeal-reset-password__actions">
                          <PrimaryButton
                            type="submit"
                            loading={isLoading}
                            loadingText="Resetting password..."
                            disabled={isLoading}
                            className="w-100 freshmeal-reset-password__submit">
                            Reset password
                          </PrimaryButton>
                        </div>
                      </form>
                    )}
                  </>
                )}

                {/* Login Navigation */}

                <div className="freshmeal-reset-password__footer text-center mt-4">
                  <Link
                    to={ROUTES.LOGIN}
                    className="freshmeal-reset-password__link text-decoration-none">
                    <i
                      className="bi bi-arrow-left me-2"
                      aria-hidden="true"
                    />
                    Back to login
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
