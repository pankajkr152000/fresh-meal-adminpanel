/**
 * =============================================================================
 * FreshMeal - Authentication
 * =============================================================================
 *
 * <p>
 * Page: Login
 * </p>
 *
 * =============================================================================
 *
 * Purpose
 * -------
 *
 * <p>
 * Common FreshMeal authentication page used by all supported application
 * roles.
 * </p>
 *
 * Responsibilities
 * ----------------
 *
 * <ul>
 *     <li>Render the FreshMeal login experience.</li>
 *     <li>Manage local login-form state.</li>
 *     <li>Perform client-side validation.</li>
 *     <li>Support password visibility toggling.</li>
 *     <li>Support Remember Me preference.</li>
 *     <li>Present loading and authentication error states.</li>
 *     <li>Delegate authentication to {@link useLogin}.</li>
 *     <li>Navigate to the application after successful authentication.</li>
 * </ul>
 *
 * Architecture
 * ------------
 *
 * <pre>
 * Login.jsx
 *     ↓
 * useLogin()
 *     ↓
 * AuthenticationService
 *     ↓
 * Existing API Client
 *     ↓
 * FreshMeal Spring Boot Authentication API
 * </pre>
 *
 * Notes
 * -----
 *
 * <ul>
 *     <li>This page contains no Axios calls.</li>
 *     <li>JWT/token management does not belong here.</li>
 *     <li>Role resolution does not belong here.</li>
 *     <li>Authorization does not belong here.</li>
 *     <li>Backend authentication errors are interpreted by the
 *         authentication layer.</li>
 * </ul>
 *
 * =============================================================================
 */

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { assets } from "../../../assets/assets";

import PrimaryButton from "../../../global/components/forms/buttons/PrimaryButton";
import CommonCheckbox from "../../../global/components/forms/checkbox/CommonCheckbox";
import CommonInput from "../../../global/components/forms/input/CommonInput";

import { MESSAGES } from "../../../global/constants/MessageConstants";
import { ROUTES } from "../../../global/constants/RouteConstants";

import useLogin from "../hooks/useLogin";

import "./Login.css";

/**
 * =============================================================================
 * Login
 * =============================================================================
 *
 * <p>
 * Renders the common FreshMeal login page and delegates authentication to the
 * authentication hook.
 * </p>
 *
 * @returns {JSX.Element} FreshMeal login page.
 * =============================================================================
 */
const Login = () => {
  // ===========================================================================
  // Navigation
  // ===========================================================================

  const navigate = useNavigate();
  const location = useLocation();

  // ===========================================================================
  // Authentication
  // ===========================================================================

  const { login, isLoading, error: authenticationError } = useLogin();

  // ===========================================================================
  // Form State
  // ===========================================================================

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

  // ===========================================================================
  // Validation State
  // ===========================================================================

  const [errors, setErrors] = useState({
    identifier: "",
    password: "",
  });

  // ===========================================================================
  // UI State
  // ===========================================================================

  const [showPassword, setShowPassword] = useState(false);

  // ===========================================================================
  // Handlers
  // ===========================================================================

  /**
   * Handles text input changes.
   *
   * @param {string} name
   *        Form field name.
   *
   * @param {string} value
   *        Updated field value.
   */
  const handleInputChange = (name, value) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /**
   * Handles Remember Me checkbox changes.
   *
   * @param {string} name
   *        Checkbox field name.
   *
   * @param {boolean} checked
   *        Updated checkbox state.
   */
  const handleCheckboxChange = (name, checked) => {
    setFormData((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  /**
   * Validates the login form.
   *
   * @returns {boolean}
   *          true when the form is valid.
   */
  const validateForm = () => {
    const validationErrors = {
      identifier: "",
      password: "",
    };

    if (!formData.identifier.trim()) {
      validationErrors.identifier = MESSAGES.VALIDATION.REQUIRED_FIELD;
    }

    if (!formData.password) {
      validationErrors.password = MESSAGES.VALIDATION.REQUIRED_FIELD;
    }

    setErrors(validationErrors);

    return !validationErrors.identifier && !validationErrors.password;
  };

  /**
   * Resolves the destination to use after successful authentication.
   *
   * <p>
   * If the user originally attempted to access a protected route, the saved
   * location is restored. Otherwise, FreshMeal uses the application home
   * route.
   * </p>
   *
   * @returns {string} Post-login navigation destination.
   */
  const getPostLoginDestination = () => {
    const requestedLocation = location.state?.from;

    if (requestedLocation && typeof requestedLocation.pathname === "string") {
      return `${requestedLocation.pathname}${
        requestedLocation.search ?? ""
      }${requestedLocation.hash ?? ""}`;
    }

    return ROUTES.HOME;
  };

  /**
   * Handles login form submission.
   *
   * <p>
   * Authentication is delegated entirely to {@link useLogin}. This component
   * remains responsible only for form interaction, validation, presentation,
   * and post-authentication navigation.
   * </p>
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   *        Form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login({
        identifier: formData.identifier.trim(),
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      navigate(getPostLoginDestination(), {
        replace: true,
      });
    } catch (error) {
      /*
       * The authentication hook has already translated the backend error
       * into a safe UI-facing message.
       *
       * The original error is intentionally not rendered here.
       */
      console.error("FreshMeal login failed:", error);
    }
  };

  // ===========================================================================
  // Render
  // ===========================================================================

  return (
    <main className="freshmeal-login min-vh-100 d-flex align-items-center">
      <div className="container-fluid px-3 px-md-4 px-lg-5 py-4 py-md-5">
        <div className="row justify-content-center align-items-stretch g-0">
          {/* =================================================================
              Brand / Visual Section
              ================================================================= */}

          <section className="col-lg-6 d-none d-lg-flex">
            <div className="freshmeal-login__brand w-100 d-flex flex-column justify-content-center p-5">
              <div className="freshmeal-login__brand-content mx-auto">
                <img
                  src={assets.brandLogo}
                  alt="FreshMeal"
                  className="freshmeal-login__brand-logo img-fluid mb-4"
                />

                <p className="freshmeal-login__eyebrow mb-2">
                  FRESH FOOD. BETTER MOMENTS.
                </p>

                <h1 className="freshmeal-login__brand-title mb-3">
                  Good food starts
                  <br />
                  with FreshMeal.
                </h1>

                <p className="freshmeal-login__brand-text mb-0">
                  Discover delicious meals, connect with trusted restaurants,
                  and enjoy a simpler food experience.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================================
              Login Section
              ================================================================= */}

          <section className="col-12 col-lg-6">
            <div className="freshmeal-login__panel h-100 d-flex align-items-center justify-content-center">
              <div className="freshmeal-login__card w-100">
                {/* -----------------------------------------------------------
                    Mobile Brand
                    ----------------------------------------------------------- */}

                <div className="d-lg-none text-center mb-4">
                  <img
                    src={assets.brandLogo}
                    alt="FreshMeal"
                    className="freshmeal-login__mobile-logo img-fluid"
                  />
                </div>

                {/* -----------------------------------------------------------
                    Header
                    ----------------------------------------------------------- */}

                <header className="mb-4">
                  <p className="freshmeal-login__section-label mb-1">
                    WELCOME BACK
                  </p>

                  <h2 className="freshmeal-login__title mb-2">
                    Sign in to FreshMeal
                  </h2>

                  <p className="freshmeal-login__subtitle mb-0">
                    Sign in to continue to your account.
                  </p>
                </header>

                {/* -----------------------------------------------------------
                    Authentication Error
                    ----------------------------------------------------------- */}

                {authenticationError && (
                  <div
                    className="alert alert-danger py-2 px-3 mb-3"
                    role="alert"
                    aria-live="polite">
                    <span className="small">{authenticationError}</span>
                  </div>
                )}

                {/* -----------------------------------------------------------
                    Login Form
                    ----------------------------------------------------------- */}

                <form
                  onSubmit={handleSubmit}
                  noValidate>
                  {/* =========================================================
                      Identifier
                      ========================================================= */}

                  <div className="mb-3">
                    <CommonInput
                      label="Email or Username"
                      name="identifier"
                      value={formData.identifier}
                      onChange={handleInputChange}
                      placeholder="Enter your email or username"
                      required
                      disabled={isLoading}
                      error={errors.identifier}
                      className="freshmeal-login__field"
                    />
                  </div>

                  {/* =========================================================
                      Password
                      ========================================================= */}

                  <div className="mb-3">
                    <div className="position-relative">
                      <CommonInput
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        disabled={isLoading}
                        error={errors.password}
                        className="freshmeal-login__field"
                      />

                      <button
                        type="button"
                        className="freshmeal-login__password-toggle"
                        onClick={() => setShowPassword((previous) => !previous)}
                        disabled={isLoading}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        title={
                          showPassword ? "Hide password" : "Show password"
                        }>
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  {/* =========================================================
                      Remember Me / Forgot Password
                      ========================================================= */}

                  <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
                    <CommonCheckbox
                      label="Remember me"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleCheckboxChange}
                      disabled={isLoading}
                      className="mb-0"
                    />

                    <Link
                      to={ROUTES.FORGOT_PASSWORD}
                      className="freshmeal-login__link text-decoration-none">
                      Forgot password?
                    </Link>
                  </div>

                  {/* =========================================================
                      Submit
                      ========================================================= */}

                  <PrimaryButton
                    type="submit"
                    loading={isLoading}
                    loadingText="Signing in..."
                    disabled={isLoading}
                    className="w-100 freshmeal-login__submit">
                    Sign In
                  </PrimaryButton>
                </form>

                {/* -----------------------------------------------------------
                    Registration
                    ----------------------------------------------------------- */}

                <div className="freshmeal-login__register text-center mt-4">
                  <span className="freshmeal-login__register-text">
                    Don't have an account?
                  </span>{" "}
                  <Link
                    to={ROUTES.REGISTER}
                    className="freshmeal-login__link fw-semibold text-decoration-none">
                    Create account
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

export default Login;
