/**
 * ============================================================================
 * Page: Register
 * ============================================================================
 *
 * Provides the public FreshMeal account-registration experience.
 *
 * Responsibilities:
 * - Collect common account-registration information.
 * - Validate user input before submitting the request.
 * - Submit the registration request through useRegister.
 * - Navigate to email OTP verification after successful registration.
 *
 * Non-responsibilities:
 * - Authentication and token management.
 * - Role-specific onboarding.
 * - Protected portal navigation.
 *
 * Supported public registration roles:
 * - USER
 * - RESTAURANT_OWNER
 * - DELIVERY_PARTNER
 *
 * ADMIN registration is intentionally excluded.
 *
 * ============================================================================
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
 * Administrative access must be provisioned through a trusted workflow.
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

/**
 * Registration validation constraints.
 *
 * Keep these constraints aligned with the backend registration contract.
 */
const REGISTRATION_CONSTRAINTS = Object.freeze({
  FIRST_NAME_MAX_LENGTH: 100,
  LAST_NAME_MAX_LENGTH: 100,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 100,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 16,
});

// ============================================================================
// Validation
// ============================================================================

/**
 * Validates registration form values.
 *
 * Client-side validation improves the user experience.
 * The backend remains the authoritative validation boundary.
 *
 * @param {Object} formData Registration form values.
 * @returns {Object} Field-specific validation errors.
 */
const validateRegistrationForm = (formData) => {
  const errors = {};

  const firstName = formData.firstName.trim();
  const lastName = formData.lastName.trim();
  const username = formData.username.trim();
  const email = formData.email.trim();
  const phoneNumber = formData.phoneNumber.trim();

  // --------------------------------------------------------------------------
  // First name
  // --------------------------------------------------------------------------

  if (!firstName) {
    errors.firstName = "First name is required.";
  } else if (
    firstName.length > REGISTRATION_CONSTRAINTS.FIRST_NAME_MAX_LENGTH
  ) {
    errors.firstName = "First name cannot exceed 100 characters.";
  }

  // --------------------------------------------------------------------------
  // Last name
  // --------------------------------------------------------------------------

  if (lastName.length > REGISTRATION_CONSTRAINTS.LAST_NAME_MAX_LENGTH) {
    errors.lastName = "Last name cannot exceed 100 characters.";
  }

  // --------------------------------------------------------------------------
  // Username
  // --------------------------------------------------------------------------

  if (!username) {
    errors.username = "Username is required.";
  } else if (
    username.length < REGISTRATION_CONSTRAINTS.USERNAME_MIN_LENGTH ||
    username.length > REGISTRATION_CONSTRAINTS.USERNAME_MAX_LENGTH
  ) {
    errors.username = "Username must be between 3 and 100 characters.";
  }

  // --------------------------------------------------------------------------
  // Email
  // --------------------------------------------------------------------------

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errors.email = "Email address is required.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // --------------------------------------------------------------------------
  // Phone number
  // --------------------------------------------------------------------------

  if (!phoneNumber) {
    errors.phoneNumber = "Phone number is required.";
  }

  // --------------------------------------------------------------------------
  // Requested role
  // --------------------------------------------------------------------------

  const isSupportedRole = REGISTRATION_ROLES.some(
    (role) => role.value === formData.requestedRole,
  );

  if (!isSupportedRole) {
    errors.requestedRole = "Please select a valid account type.";
  }

  // --------------------------------------------------------------------------
  // Password
  // --------------------------------------------------------------------------

  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (
    formData.password.length < REGISTRATION_CONSTRAINTS.PASSWORD_MIN_LENGTH ||
    formData.password.length > REGISTRATION_CONSTRAINTS.PASSWORD_MAX_LENGTH
  ) {
    errors.password = "Password must be between 6 and 16 characters.";
  }

  // --------------------------------------------------------------------------
  // Confirm password
  // --------------------------------------------------------------------------

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

// ============================================================================
// Request Builder
// ============================================================================

/**
 * Creates the backend registration request.
 *
 * EmailAddress and PhoneNumber are backend value objects.
 * Their JSON representations use the nested `value` property.
 *
 * @param {Object} formData Validated registration form values.
 * @returns {Object} Backend registration request payload.
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
  const navigate = useNavigate();

  const {
    register,
    error: registrationError,
    isLoading,
    reset,
  } = useRegister();

  // --------------------------------------------------------------------------
  // Component State
  // --------------------------------------------------------------------------

  const [formData, setFormData] = useState({
    ...INITIAL_FORM_DATA,
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --------------------------------------------------------------------------
  // Input Change Handler
  // --------------------------------------------------------------------------

  /**
   * Handles changes emitted by the reusable CommonInput component.
   *
   * CommonInput provides the field name and updated value as separate
   * arguments rather than a native DOM event.
   *
   * @param {string} name Input field name.
   * @param {string} value Updated field value.
   */
  const handleInputChange = (name, value) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));

    setFieldErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
      ...(name === "password" && previousErrors.confirmPassword
        ? {
            confirmPassword: "",
          }
        : {}),
    }));

    // Clear the previous API error when the user starts correcting the form.
    if (registrationError) {
      reset();
    }
  };

  // --------------------------------------------------------------------------
  // Account Type Change Handler
  // --------------------------------------------------------------------------

  /**
   * Handles the native HTML select change event.
   *
   * Unlike CommonInput, a native select emits a DOM event.
   *
   * @param {Event} event Native select change event.
   */
  const handleRoleChange = (event) => {
    const { name, value } = event.target;

    handleInputChange(name, value);
  };

  // --------------------------------------------------------------------------
  // Form Submission
  // --------------------------------------------------------------------------

  /**
   * Validates and submits the registration request.
   *
   * After successful registration, the user is redirected to email OTP
   * verification. Registration does not authenticate the user.
   *
   * @param {Event} event Form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent duplicate submissions.
    if (isLoading) {
      return;
    }

    const validationErrors = validateRegistrationForm(formData);

    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const registrationRequest = buildRegistrationRequest(formData);

    try {
      await register(registrationRequest);

      navigate(ROUTES.VERIFY_EMAIL_OTP, {
        state: {
          email: registrationRequest.email.value,
        },
      });
    } catch {
      /*
       * useRegister handles and exposes the user-friendly API error.
       * The error is displayed through registrationError.
       */
    }
  };

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <main className="freshmeal-register">
      <section className="freshmeal-register__card">
        {/* Brand */}

        <div className="freshmeal-register__brand">
          <img
            src={assets.brandLogo}
            alt="FreshMeal"
            className="freshmeal-register__logo"
          />
        </div>

        {/* Page Header */}

        <header className="freshmeal-register__header">
          <h1 className="freshmeal-register__title">Create your account</h1>

          <p className="freshmeal-register__subtitle">
            Join FreshMeal and get started.
          </p>
        </header>

        {/* API Error */}

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

        {/* Registration Form */}

        <form
          className="freshmeal-register__form"
          onSubmit={handleSubmit}
          noValidate>
          {/* ================================================================
              Personal Information
          ================================================================= */}

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

              {/* Account Type */}

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
                  onChange={handleRoleChange}
                  className={`freshmeal-register__select ${
                    fieldErrors.requestedRole ? "is-invalid" : ""
                  }`}
                  disabled={isLoading}
                  required
                  aria-invalid={Boolean(fieldErrors.requestedRole)}
                  aria-describedby={
                    fieldErrors.requestedRole
                      ? "requestedRole-error"
                      : undefined
                  }>
                  {REGISTRATION_ROLES.map((role) => (
                    <option
                      key={role.value}
                      value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>

                {fieldErrors.requestedRole && (
                  <small
                    id="requestedRole-error"
                    className="freshmeal-register__field-error">
                    {fieldErrors.requestedRole}
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* ================================================================
              Account Security
          ================================================================= */}

          <div className="freshmeal-register__section">
            <h2 className="freshmeal-register__section-title">
              Account security
            </h2>

            <div className="freshmeal-register__grid">
              {/* Password */}

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

              {/* Confirm Password */}

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

          {/* ================================================================
              Submit
          ================================================================= */}

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

        {/* Footer */}

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
