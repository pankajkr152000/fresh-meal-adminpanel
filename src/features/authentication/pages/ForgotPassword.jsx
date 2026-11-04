/**
 * ============================================================================
 * FreshMeal - Authentication
 * ============================================================================
 *
 * Page: ForgotPassword
 *
 * Purpose:
 * Provides the password-recovery initiation experience for FreshMeal users.
 *
 * Responsibilities:
 * - Collect the user's registered email address.
 * - Perform client-side email validation.
 * - Delegate password-recovery initiation to useForgotPassword.
 * - Present loading and API error states.
 * - Display a generic confirmation after successful submission.
 * - Allow the user to return to Login.
 *
 * Security:
 * - Does not generate or persist password-reset tokens.
 * - Does not authenticate the user.
 * - Does not manage JWT tokens.
 * - Does not reveal whether an email address is registered.
 * - Password-reset token generation and email delivery are handled by the
 *   backend.
 *
 * Architecture:
 *
 * ForgotPassword.jsx
 *        |
 *        v
 * useForgotPassword()
 *        |
 *        v
 * AuthenticationService
 *        |
 *        v
 * apiClient
 *        |
 *        v
 * FreshMeal Spring Boot Authentication API
 *
 * ============================================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";

import { assets } from "../../../assets/assets";

import PrimaryButton from "../../../global/components/forms/buttons/PrimaryButton";
import CommonInput from "../../../global/components/forms/input/CommonInput";

import { ROUTES } from "../../../global/constants/RouteConstants";

import useForgotPassword from "../hooks/useForgotPassword";

import "./forgot-password.css";

// ============================================================================
// Configuration
// ============================================================================

/**
 * Generic confirmation message.
 *
 * Intentionally does not disclose whether the submitted email address
 * belongs to an existing FreshMeal account.
 */
const PASSWORD_RECOVERY_MESSAGE =
  "If an account exists with this email address, you will receive instructions to reset your password.";

/**
 * Validates the email address format.
 *
 * This is only a client-side usability check.
 * The backend remains the authoritative validation boundary.
 *
 * @param {string} email Email address.
 * @returns {boolean} Whether the email format is valid.
 */
const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
};

// ============================================================================
// Component
// ============================================================================

const ForgotPassword = () => {
  // ==========================================================================
  // Hook
  // ==========================================================================

  const {
    forgotPassword,
    error: forgotPasswordError,
    isLoading,
    reset,
  } = useForgotPassword();

  // ==========================================================================
  // Form State
  // ==========================================================================

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  // ==========================================================================
  // UI State
  // ==========================================================================

  const [isSubmitted, setIsSubmitted] = useState(false);

  // ==========================================================================
  // Handlers
  // ==========================================================================

  /**
   * Handles email input changes.
   *
   * Clears previous validation and API errors when the user edits the
   * email address.
   *
   * @param {string} name Input field name.
   * @param {string} value Updated email address.
   */
  const handleInputChange = (name, value) => {
    setEmail(value);

    setEmailError("");

    // A previous successful submission should not remain visible after
    // the user starts entering a new email address.
    if (isSubmitted) {
      setIsSubmitted(false);
    }

    if (forgotPasswordError) {
      reset();
    }
  };

  /**
   * Validates the forgot-password form.
   *
   * @returns {boolean} True when the form is valid.
   */
  const validateForm = () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setEmailError("Email address is required.");
      return false;
    }

    if (!isValidEmail(normalizedEmail)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    setEmailError("");

    return true;
  };

  /**
   * Submits the password-recovery request.
   *
   * The email is represented as an EmailAddress value object to match
   * FreshMeal's existing backend serialization convention.
   *
   * @param {React.FormEvent<HTMLFormElement>} event Form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const forgotPasswordRequest = {
      email: {
        value: normalizedEmail,
      },
    };

    try {
      await forgotPassword(forgotPasswordRequest);

      setIsSubmitted(true);
    } catch {
      /*
       * The useForgotPassword hook handles the API error and exposes
       * a user-friendly message through forgotPasswordError.
       */
    }
  };

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <main className="freshmeal-forgot-password min-vh-100 d-flex align-items-center">
      <div className="container-fluid px-3 px-md-4 px-lg-5 py-4 py-md-5">
        <div className="row justify-content-center align-items-stretch g-0">
          {/* =================================================================
              Brand / Visual Section
          ================================================================= */}

          <section className="col-lg-6 d-none d-lg-flex">
            <div className="freshmeal-forgot-password__brand w-100 d-flex flex-column justify-content-center p-5">
              <div className="freshmeal-forgot-password__brand-content mx-auto">
                <img
                  src={assets.brandLogo}
                  alt="FreshMeal"
                  className="freshmeal-forgot-password__brand-logo img-fluid mb-4"
                />

                <p className="freshmeal-forgot-password__eyebrow mb-2">
                  FRESH FOOD. BETTER MOMENTS.
                </p>

                <h1 className="freshmeal-forgot-password__brand-title mb-3">
                  A fresh start
                  <br />
                  begins here.
                </h1>

                <p className="freshmeal-forgot-password__brand-text mb-0">
                  Recover access to your FreshMeal account and get back to
                  enjoying a simpler food experience.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================================
              Forgot Password Section
          ================================================================= */}

          <section className="col-12 col-lg-6">
            <div className="freshmeal-forgot-password__panel h-100 d-flex align-items-center justify-content-center">
              <div className="freshmeal-forgot-password__card w-100">
                {/* ---------------------------------------------------------
                    Mobile Brand
                --------------------------------------------------------- */}

                <div className="d-lg-none text-center mb-4">
                  <img
                    src={assets.brandLogo}
                    alt="FreshMeal"
                    className="freshmeal-forgot-password__mobile-logo img-fluid"
                  />
                </div>

                {/* ---------------------------------------------------------
                    Header
                --------------------------------------------------------- */}

                <header className="mb-4">
                  <p className="freshmeal-forgot-password__section-label mb-1">
                    ACCOUNT RECOVERY
                  </p>

                  <h2 className="freshmeal-forgot-password__title mb-2">
                    Forgot your password?
                  </h2>

                  <p className="freshmeal-forgot-password__subtitle mb-0">
                    Enter the email address associated with your account. We'll
                    send you instructions to reset your password.
                  </p>
                </header>

                {/* ---------------------------------------------------------
                    API Error
                --------------------------------------------------------- */}

                {forgotPasswordError && (
                  <div
                    className="alert alert-danger py-2 px-3 mb-3"
                    role="alert"
                    aria-live="polite">
                    <span className="small">{forgotPasswordError}</span>
                  </div>
                )}

                {/* ---------------------------------------------------------
                    Successful Submission
                --------------------------------------------------------- */}

                {isSubmitted ? (
                  <div
                    className="freshmeal-forgot-password__success"
                    role="status"
                    aria-live="polite">
                    <div className="freshmeal-forgot-password__success-icon">
                      <i
                        className="bi bi-envelope-check"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="freshmeal-forgot-password__success-title">
                      Check your inbox
                    </h3>

                    <p className="freshmeal-forgot-password__success-text">
                      {PASSWORD_RECOVERY_MESSAGE}
                    </p>

                    <p className="freshmeal-forgot-password__email">
                      {email.trim().toLowerCase()}
                    </p>

                    <p className="freshmeal-forgot-password__success-note">
                      If you don't see an email, check your spam or junk folder.
                    </p>
                  </div>
                ) : (
                  /* -------------------------------------------------------
                     Forgot Password Form
                  ------------------------------------------------------- */

                  <form
                    onSubmit={handleSubmit}
                    noValidate>
                    <div className="mb-4">
                      <CommonInput
                        label="Email address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleInputChange}
                        placeholder="Enter your registered email"
                        required
                        disabled={isLoading}
                        error={emailError}
                        className="freshmeal-forgot-password__field"
                      />
                    </div>

                    <div className="freshmeal-forgot-password__actions">
                      <PrimaryButton
                        type="submit"
                        loading={isLoading}
                        loadingText="Sending instructions..."
                        disabled={isLoading}
                        className="w-100 freshmeal-forgot-password__submit">
                        Send reset instructions
                      </PrimaryButton>
                    </div>
                  </form>
                )}

                {/* ---------------------------------------------------------
                    Login Navigation
                --------------------------------------------------------- */}

                <div className="freshmeal-forgot-password__footer text-center mt-4">
                  <Link
                    to={ROUTES.LOGIN}
                    className="freshmeal-forgot-password__link text-decoration-none">
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

export default ForgotPassword;
