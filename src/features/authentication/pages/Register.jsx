/**
 * ============================================================================
 * Page : Register
 * ============================================================================
 *
 * Provides the public FreshMeal account-registration experience.
 *
 * <p>
 * This page is responsible only for collecting the common account details
 * required to create a FreshMeal account. Role-specific onboarding is handled
 * separately after account registration and email verification.
 * </p>
 *
 * <h3>Supported public registration roles</h3>
 * <ul>
 *   <li>USER</li>
 *   <li>RESTAURANT_OWNER</li>
 *   <li>DELIVERY_PARTNER</li>
 * </ul>
 *
 * <p>
 * ADMIN registration is intentionally not exposed through this page.
 * Registration does not authenticate the user, persist tokens, or navigate
 * into a protected portal.
 * </p>
 *
 * ============================================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";

import { assets } from "../../../assets/assets";
import PrimaryButton from "../../../global/components/forms/buttons/PrimaryButton";
import CommonInput from "../../../global/components/forms/input/CommonInput";
import { ROUTES } from "../../../global/constants/RouteConstants";

import useRegister from "../hooks/useRegister";

import "./register.css";

// ============================================================================
// Registration Configuration
// ============================================================================

/**
 * Public roles that can be requested through self-service registration.
 *
 * ADMIN is intentionally excluded. Administrative access must be provisioned
 * through a trusted administrative workflow.
 */
const REGISTRATION_ROLES = Object.freeze([
  {
    value: "USER",
    label: "Customer",
  },
  {
    value: "RESTAURANT_OWNER",
    label: "Restaurant Owner",
  },
  {
    value: "DELIVERY_PARTNER",
    label: "Delivery Partner",
  },
]);

/**
 * Initial registration form values.
 */
const INITIAL_FORM_DATA = Object.freeze({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phoneNumber: "",
  requestedRole: "USER",
  password: "",
  confirmPassword: "",
});

// ============================================================================
// Validation
// ============================================================================

/**
 * Validates registration form values against the backend registration
 * contract.
 *
 * Client-side validation improves the user experience. The backend remains
 * the authoritative validation boundary.
 *
 * @param {Object} formData registration form values.
 * @returns {Object} field-specific validation errors.
 */
const validateRegistrationForm = (formData) => {
  const errors = {};

  const firstName = formData.firstName.trim();
  const lastName = formData.lastName.trim();
  const username = formData.username.trim();
  const email = formData.email.trim();
  const phoneNumber = formData.phoneNumber.trim();

  if (!firstName) {
    errors.firstName = "First name is required.";
  } else if (firstName.length > 100) {
    errors.firstName = "First name cannot exceed 100 characters.";
  }

  if (lastName.length > 100) {
    errors.lastName = "Last name cannot exceed 100 characters.";
  }

  if (!username) {
    errors.username = "Username is required.";
  } else if (username.length < 3 || username.length > 100) {
    errors.username = "Username must be between 3 and 100 characters.";
  }

  if (!email) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!phoneNumber) {
    errors.phoneNumber = "Phone number is required.";
  }

  const isSupportedRole = REGISTRATION_ROLES.some(
    (role) => role.value === formData.requestedRole,
  );

  if (!isSupportedRole) {
    errors.requestedRole = "Please select a valid account type.";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 6 || formData.password.length > 16) {
    errors.password = "Password must be between 6 and 16 characters.";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

/**
 * Creates the backend registration request.
 *
 * EmailAddress and PhoneNumber are backend value objects. Their JSON
 * representations therefore use the nested `value` property.
 *
 * @param {Object} formData validated registration form values.
 * @returns {Object} backend RegisterRequest payload.
 */
const buildRegistrationRequest = (formData) => ({
  firstName: formData.firstName.trim(),
  lastName: formData.lastName.trim(),
  username: formData.username.trim(),
  email: {
    value: formData.email.trim().toLowerCase(),
  },
  phoneNumber: {
    value: formData.phoneNumber.trim(),
  },
  requestedRole: formData.requestedRole,
  password: formData.password,
  confirmPassword: formData.confirmPassword,
});

// ============================================================================
// Component
// ============================================================================

const Register = () => {
  const {
    register,
    error: registrationError,
    isLoading,
    reset,
  } = useRegister();

  const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  /**
   * Handles changes to registration form fields.
   *
   * Clears the corresponding field validation error when the user edits
   * that field. Existing API errors are cleared when the user starts
   * correcting the form.
   *
   * @param {Event} event input change event.
   */
  /**
   * Handles changes emitted by the reusable CommonInput component.
   *
   * CommonInput provides the field name and updated value as separate
   * arguments rather than a native DOM event.
   *
   * @param {string} name  input field name.
   * @param {string} value updated field value.
   */
  const handleInputChange = (name, value) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));

    setFieldErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    if (registrationError) {
      reset();
    }
  };

  /**
   * Submits the registration request.
   *
   * On success, the page displays the email-verification next step.
   * It deliberately does not authenticate the user or navigate to a
   * protected portal.
   *
   * @param {Event} event form submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateRegistrationForm(formData);

    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const registrationRequest = buildRegistrationRequest(formData);

    try {
      await register(registrationRequest);

      setRegisteredEmail(registrationRequest.email.value);
    } catch {
      /*
       * The useRegister hook exposes the user-friendly API error
       * through registrationError. No additional error state is
       * required in this component.
       */
    }
  };

  /**
   * Resets the registration page to its initial state.
   */
  const handleRegisterAnotherAccount = () => {
    setFormData({ ...INITIAL_FORM_DATA });
    setFieldErrors({});
    setRegisteredEmail("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    reset();
  };

  // =========================================================================
  // Registration Success
  // =========================================================================

  if (registeredEmail) {
    return (
      <main className="freshmeal-register">
        <section className="freshmeal-register__card freshmeal-register__success">
          <div className="freshmeal-register__brand">
            <img
              src={assets.brandLogo}
              alt="FreshMeal"
              className="freshmeal-register__logo"
            />
          </div>

          <div className="freshmeal-register__success-icon">
            <i
              className="bi bi-envelope-check"
              aria-hidden="true"
            />
          </div>

          <h1 className="freshmeal-register__title">Registration successful</h1>

          <p className="freshmeal-register__subtitle">
            Your FreshMeal account has been created successfully.
          </p>

          <div className="freshmeal-register__verification-message">
            <p>We have sent an email verification OTP to:</p>

            <strong>{registeredEmail}</strong>

            <p>
              Verify your email address to continue with your FreshMeal account.
            </p>
          </div>

          <p className="freshmeal-register__success-note">
            You can proceed to email verification using the OTP sent to your
            inbox.
          </p>

          <button
            type="button"
            className="freshmeal-register__secondary-button"
            onClick={handleRegisterAnotherAccount}>
            Register another account
          </button>

          <p className="freshmeal-register__footer">
            Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link>
          </p>
        </section>
      </main>
    );
  }

  // =========================================================================
  // Registration Form
  // =========================================================================

  return (
    <main className="freshmeal-register">
      <section className="freshmeal-register__card">
        <div className="freshmeal-register__brand">
          <img
            src={assets.brandLogo}
            alt="FreshMeal"
            className="freshmeal-register__logo"
          />
        </div>

        <header className="freshmeal-register__header">
          <h1 className="freshmeal-register__title">Create your account</h1>

          <p className="freshmeal-register__subtitle">
            Join FreshMeal and get started.
          </p>
        </header>

        {registrationError && (
          <div
            className="freshmeal-register__error"
            role="alert"
            aria-live="polite">
            <i
              className="bi bi-exclamation-circle"
              aria-hidden="true"
            />
            <span>{registrationError}</span>
          </div>
        )}

        <form
          className="freshmeal-register__form"
          onSubmit={handleSubmit}
          noValidate>
          {/* ----------------------------------------------------- */}
          {/* Personal Information                                  */}
          {/* ----------------------------------------------------- */}

          <div className="freshmeal-register__section">
            <h2 className="freshmeal-register__section-title">
              Personal information
            </h2>

            <div className="freshmeal-register__grid">
              <CommonInput
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                required
                disabled={isLoading}
                error={fieldErrors.firstName}
              />

              <CommonInput
                label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                disabled={isLoading}
                error={fieldErrors.lastName}
              />

              <CommonInput
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choose a username"
                required
                disabled={isLoading}
                error={fieldErrors.username}
              />

              <CommonInput
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
                disabled={isLoading}
                error={fieldErrors.email}
              />

              <CommonInput
                label="Phone number"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
                disabled={isLoading}
                error={fieldErrors.phoneNumber}
              />

              <div className="freshmeal-register__field">
                <label
                  htmlFor="requestedRole"
                  className="freshmeal-register__label">
                  Account type
                  <span className="freshmeal-register__required">*</span>
                </label>

                <select
                  id="requestedRole"
                  name="requestedRole"
                  value={formData.requestedRole}
                  onChange={handleInputChange}
                  className={`freshmeal-register__select ${
                    fieldErrors.requestedRole ? "is-invalid" : ""
                  }`}
                  disabled={isLoading}
                  required
                  aria-invalid={Boolean(fieldErrors.requestedRole)}>
                  {REGISTRATION_ROLES.map((role) => (
                    <option
                      key={role.value}
                      value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>

                {fieldErrors.requestedRole && (
                  <small className="freshmeal-register__field-error">
                    {fieldErrors.requestedRole}
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------- */}
          {/* Account Security                                      */}
          {/* ----------------------------------------------------- */}

          <div className="freshmeal-register__section">
            <h2 className="freshmeal-register__section-title">
              Account security
            </h2>

            <div className="freshmeal-register__grid">
              <div className="freshmeal-register__password-field">
                <CommonInput
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  required
                  disabled={isLoading}
                  error={fieldErrors.password}
                />

                <button
                  type="button"
                  className="freshmeal-register__password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div className="freshmeal-register__password-field">
                <CommonInput
                  label="Confirm password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                  error={fieldErrors.confirmPassword}
                />

                <button
                  type="button"
                  className="freshmeal-register__password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  disabled={isLoading}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }>
                  <i
                    className={`bi ${
                      showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <p className="freshmeal-register__helper-text">
              Password must contain between 6 and 16 characters.
            </p>
          </div>

          {/* ----------------------------------------------------- */}
          {/* Submit                                                 */}
          {/* ----------------------------------------------------- */}

          <div className="freshmeal-register__actions">
            <PrimaryButton
              type="submit"
              loading={isLoading}
              loadingText="Creating account..."
              disabled={isLoading}
              className="freshmeal-register__submit">
              Create account
            </PrimaryButton>
          </div>
        </form>

        <p className="freshmeal-register__footer">
          Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link>
        </p>

        <p className="freshmeal-register__terms">
          By creating an account, you agree to FreshMeal's terms and privacy
          policy.
        </p>
      </section>
    </main>
  );
};

export default Register;
