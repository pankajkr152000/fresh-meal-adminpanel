import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { assets } from "../../../assets/assets";
import PrimaryButton from "../../../global/components/forms/buttons/PrimaryButton";
import CommonInput from "../../../global/components/forms/input/CommonInput";
import { ROUTES } from "../../../global/constants/RouteConstants";

import useResendEmailOtp from "../hooks/useResendEmailOtp";
import useVerifyEmailOtp from "../hooks/useVerifyEmailOtp";

import "./verify-email-otp.css";

// ============================================================================
// OTP Configuration
// ============================================================================

/**
 * Expected number of digits in the email verification OTP.
 */
const OTP_LENGTH = 6;

/**
 * Frontend cooldown between consecutive OTP resend attempts.
 *
 * The backend remains responsible for enforcing the actual resend policy.
 */
const RESEND_COOLDOWN_SECONDS = 60;

// ============================================================================
// Component
// ============================================================================

/**
 * Email OTP verification page.
 *
 * Responsibilities:
 * - Display the email address awaiting verification.
 * - Accept and validate the six-digit OTP.
 * - Submit OTP verification requests.
 * - Allow users to request a new OTP.
 * - Manage the frontend resend cooldown.
 * - Display verification success and API errors.
 *
 * Important:
 * Successful email verification activates the account but does not
 * authenticate the user, issue JWT tokens, or automatically navigate
 * to a protected portal.
 */
const VerifyEmailOtp = () => {
  // ------------------------------------------------------------------------
  // Navigation Context
  // ------------------------------------------------------------------------

  const location = useLocation();
  const navigate = useNavigate();
  /**
   * Email address passed from Register.jsx through React Router state.
   */
  const registeredEmail = location.state?.email ?? "";

  // ------------------------------------------------------------------------
  // Local Component State
  // ------------------------------------------------------------------------

  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [pageError, setPageError] = useState("");

  // ------------------------------------------------------------------------
  // Verification Hook
  // ------------------------------------------------------------------------

  const {
    verifyEmailOtp,
    error: verificationError,
    isLoading: isVerifying,
    reset: resetVerification,
  } = useVerifyEmailOtp();

  // ------------------------------------------------------------------------
  // Resend Hook
  // ------------------------------------------------------------------------

  const {
    resendEmailOtp,
    error: resendError,
    isLoading: isResending,
    reset: resetResend,
  } = useResendEmailOtp();

  // ------------------------------------------------------------------------
  // Derived State
  // ------------------------------------------------------------------------

  const isProcessing = isVerifying || isResending;

  const canVerify = otp.length === OTP_LENGTH && !isProcessing;

  const canResend = resendCooldown === 0 && !isProcessing;

  // =========================================================================
  // Cooldown Management
  // =========================================================================

  /**
   * Maintains the resend cooldown countdown.
   *
   * The timer is cleaned up whenever the cooldown changes or the component
   * unmounts, preventing unnecessary timer execution.
   */
  useEffect(() => {
    if (resendCooldown <= 0) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setResendCooldown((previousValue) => Math.max(previousValue - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [resendCooldown]);

  // =========================================================================
  // Input Handling
  // =========================================================================

  /**
   * Handles OTP input changes.
   *
   * Only numeric characters are accepted, and the input is restricted
   * to the configured OTP length.
   *
   * CommonInput emits the field name and updated value as separate
   * arguments rather than providing a native DOM event.
   *
   * @param {string} name Input field name.
   * @param {string} value Updated input value.
   */
  const handleOtpChange = useCallback(
    (name, value) => {
      const numericOtp = value.replace(/\D/g, "").slice(0, OTP_LENGTH);

      setOtp(numericOtp);
      setPageError("");

      resetVerification();
    },
    [resetVerification],
  );

  // =========================================================================
  // OTP Verification
  // =========================================================================

  /**
   * Validates and submits the email OTP verification request.
   *
   * On success, the page displays the account activation confirmation.
   * Authentication and subsequent navigation are intentionally handled
   * separately.
   *
   * @param {Event} event Form submission event.
   */
  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    if (!registeredEmail) {
      setPageError(
        "Registered email address is missing. Please register again.",
      );
      return;
    }

    if (!/^[0-9]{6}$/.test(otp)) {
      setPageError("Please enter a valid six-digit verification code.");
      return;
    }

    setPageError("");

    try {
      const verificationResponse = await verifyEmailOtp({
        email: {
          value: registeredEmail.trim().toLowerCase(),
        },
        otp,
      });

      if (
        !verificationResponse?.success ||
        verificationResponse?.data?.emailVerified !== true
      ) {
        setPageError(
          "Email verification could not be completed. Please try again.",
        );

        return;
      }

      setIsVerified(true);
      setOtp("");
    } catch {
      // The verification hook maintains the API error state.
    }
  };

  // =========================================================================
  // Resend OTP
  // =========================================================================

  /**
   * Requests a new email verification OTP.
   *
   * The cooldown starts only after the backend confirms a successful
   * resend request.
   *
   * The existing OTP is preserved if the resend request fails.
   */
  const handleResendOtp = async () => {
    if (!registeredEmail || !canResend) {
      return;
    }

    setPageError("");
    resetResend();

    try {
      await resendEmailOtp({
        email: {
          value: registeredEmail.trim().toLowerCase(),
        },
      });

      setOtp("");
      resetVerification();

      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch {
      // The resend hook maintains the API error state.
    }
  };

  // =========================================================================
  // Missing Registration Context
  // =========================================================================

  /**
   * Handles direct navigation to the verification page without the
   * registered email address.
   */
  if (!registeredEmail) {
    return (
      <main className="freshmeal-otp">
        <section className="freshmeal-otp__card">
          <div className="freshmeal-otp__brand">
            <img
              src={assets.brandLogo}
              alt="FreshMeal"
              className="freshmeal-otp__logo"
            />
          </div>

          <div className="freshmeal-otp__message">
            <h1>Email address unavailable</h1>

            <p>
              We couldn't find the registered email address. Please return to
              registration and try again.
            </p>

            <Link
              to={ROUTES.REGISTER}
              className="freshmeal-otp__link">
              Back to registration
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // =========================================================================
  // Verification Page
  // =========================================================================

  return (
    <main className="freshmeal-otp">
      <section className="freshmeal-otp__card">
        {/* ---------------------------------------------------------
                    Brand
                --------------------------------------------------------- */}

        <div className="freshmeal-otp__brand">
          <img
            src={assets.brandLogo}
            alt="FreshMeal"
            className="freshmeal-otp__logo"
          />
        </div>

        {/* ---------------------------------------------------------
                    Verification Success
                --------------------------------------------------------- */}

        {isVerified ? (
          <div
            className="freshmeal-otp__message"
            role="status"
            aria-live="polite">
            <div
              className="freshmeal-otp__success-icon"
              aria-hidden="true">
              &#10003;
            </div>

            <h1>Email verified successfully!</h1>

            <p>
              Your email address has been verified. Your account is now
              activated.
            </p>

            <p className="freshmeal-otp__email">{registeredEmail}</p>

            <p>
              You can now continue with the next step of your account setup.
            </p>

            <PrimaryButton
              type="button"
              onClick={() => navigate(ROUTES.LOGIN, { replace: true })}
              className="freshmeal-otp__submit">
              Continue to Login
            </PrimaryButton>
          </div>
        ) : (
          <>
            {/* -------------------------------------------------
                            Verification Header
                        ------------------------------------------------- */}

            <header className="freshmeal-otp__header">
              <h1>Verify your email</h1>

              <p>We've sent a six-digit verification code to</p>

              <p className="freshmeal-otp__email">{registeredEmail}</p>
            </header>

            {/* -------------------------------------------------
                            Verification Form
                        ------------------------------------------------- */}

            <form
              className="freshmeal-otp__form"
              onSubmit={handleVerifyOtp}
              noValidate>
              <CommonInput
                label="Verification code"
                name="otp"
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit code"
                required
                disabled={isProcessing}
                error={pageError || verificationError}
                className="freshmeal-otp__input"
              />

              <p className="freshmeal-otp__hint">
                Enter the six-digit code sent to your email.
              </p>

              <PrimaryButton
                type="submit"
                loading={isVerifying}
                loadingText="Verifying..."
                disabled={!canVerify}
                className="freshmeal-otp__submit">
                Verify email
              </PrimaryButton>
            </form>

            {/* -------------------------------------------------
                            Resend Verification OTP
                        ------------------------------------------------- */}

            <div className="freshmeal-otp__resend">
              <p>Didn't receive the verification code?</p>

              <button
                type="button"
                className="freshmeal-otp__resend-button"
                onClick={handleResendOtp}
                disabled={!canResend}>
                {isResending
                  ? "Sending..."
                  : resendCooldown > 0
                    ? `Resend code in ${resendCooldown}s`
                    : "Resend verification code"}
              </button>

              {resendError && (
                <p
                  className="freshmeal-otp__error"
                  role="alert"
                  aria-live="polite">
                  {resendError}
                </p>
              )}
            </div>
          </>
        )}

        {/* ---------------------------------------------------------
                    Footer Navigation
                --------------------------------------------------------- */}

        {!isVerified && (
          <div className="freshmeal-otp__footer">
            <Link
              to={ROUTES.LOGIN}
              className="freshmeal-otp__link">
              Back to login
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default VerifyEmailOtp;
