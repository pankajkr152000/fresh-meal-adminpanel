/**
 * ============================================================================
 * Page : PortalSelection
 * ============================================================================
 *
 * <p>
 * Provides the portal-selection experience for authenticated FreshMeal users
 * who have access to multiple application portals.
 * </p>
 *
 * <p>
 * Available portals are derived from the authenticated session and resolved
 * through the centralized portal configuration.
 * </p>
 *
 * <p>
 * The component does not trust router state for role information. The
 * backend-provided roles persisted in the authentication session are used
 * as metadata for determining which portal options to display.
 * </p>
 *
 * <p>
 * Backend authorization remains authoritative. This page only controls
 * frontend navigation and user experience.
 * </p>
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthentication } from "../context/AuthenticationContext";

import { resolveUserPortals } from "../utils/RoleResolver";

import { ROUTES } from "../../../global/constants";

const PORTAL_VISUALS = Object.freeze({
  ADMIN: {
    icon: "🛡️",
    accent: "primary",
    gradient: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)",
    description: "Your central workspace for platform operations.",
  },

  USER: {
    icon: "🍽️",
    accent: "success",
    gradient: "linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)",
    description: "Your personal space for discovering and ordering meals.",
  },

  RESTAURANT_OWNER: {
    icon: "👨‍🍳",
    accent: "warning",
    gradient: "linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)",
    description: "Your workspace for managing restaurant operations.",
  },

  DELIVERY_PARTNER: {
    icon: "🚴",
    accent: "info",
    gradient: "linear-gradient(135deg, #cffafe 0%, #ecfeff 100%)",
    description: "Your workspace for managing delivery assignments.",
  },
});

const PortalSelection = () => {
  const navigate = useNavigate();

  const { session, isInitializing, unauthenticate } = useAuthentication();

  const [selectedRole, setSelectedRole] = useState(null);
  const [portalError, setPortalError] = useState(null);

  /**
   * Resolve available portals from the authenticated session.
   *
   * The resolver normalizes and filters roles against the centralized
   * portal configuration.
   */
  const portalResolution = useMemo(
    () => resolveUserPortals(session?.roles ?? []),
    [session?.roles],
  );

  const { portals, hasSupportedRole } = portalResolution;

  /**
   * A user with exactly one supported portal does not need to make
   * a selection.
   *
   * This also handles direct navigation to the portal-selection route.
   */
  useEffect(() => {
    if (isInitializing) {
      return;
    }

    if (!session) {
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    if (!hasSupportedRole) {
      unauthenticate();
      navigate(ROUTES.LOGIN, {
        replace: true,
        state: {
          authenticationError:
            "Your account does not have access to a supported portal.",
        },
      });
      return;
    }

    if (portals.length === 1) {
      navigate(portals[0].basePath, { replace: true });
    }
  }, [
    isInitializing,
    session,
    hasSupportedRole,
    portals,
    navigate,
    unauthenticate,
  ]);

  /**
   * Handles selection of a portal.
   *
   * Navigation is permitted only when the selected role exists in the
   * resolved portal list.
   */
  const handlePortalSelection = (portal) => {
    if (!portal || selectedRole) {
      return;
    }

    const isAvailable = portals.some(
      (availablePortal) => availablePortal.role === portal.role,
    );

    if (!isAvailable) {
      setPortalError("The selected portal is not available for your account.");
      return;
    }

    setPortalError(null);
    setSelectedRole(portal.role);

    navigate(portal.basePath);
  };

  /**
   * Displays a loading state while the authentication session is restored.
   */
  if (isInitializing) {
    return (
      <main
        className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary"
        aria-live="polite">
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
            aria-label="Loading"
          />
          <p className="text-secondary mb-0">
            Preparing your FreshMeal experience...
          </p>
        </div>
      </main>
    );
  }

  /**
   * Prevents rendering portal cards while redirecting an unauthenticated
   * user or a user with no supported portal.
   */
  if (!session || !hasSupportedRole || portals.length === 1) {
    return (
      <main
        className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary"
        aria-live="polite">
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
            aria-label="Redirecting"
          />
          <p className="text-secondary mb-0">
            Redirecting to your FreshMeal workspace...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="portal-selection-page min-vh-100 bg-body-tertiary">
      <div className="container py-4 py-md-5">
        {/* Brand header */}
        <header className="text-center mb-4 mb-md-5">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-4 bg-success text-white shadow-sm mb-3"
            style={{ width: 64, height: 64 }}
            aria-hidden="true">
            <span className="fs-2">🍃</span>
          </div>

          <h1 className="fw-bold mb-2">Welcome to FreshMeal</h1>

          <p className="text-secondary mb-0">Choose a workspace to continue.</p>
        </header>

        {/* Portal selection */}
        <section
          className="mx-auto"
          style={{ maxWidth: 1000 }}
          aria-labelledby="portal-selection-heading">
          <div className="text-center mb-4">
            <h2
              id="portal-selection-heading"
              className="h4 fw-semibold mb-2">
              Select your portal
            </h2>

            <p className="text-secondary small mb-0">
              You can access multiple workspaces with your account.
            </p>
          </div>

          {portalError && (
            <div
              className="alert alert-danger"
              role="alert"
              aria-live="assertive">
              {portalError}
            </div>
          )}

          <div className="row g-3 g-md-4">
            {portals.map((portal) => {
              const visual = PORTAL_VISUALS[portal.role] ?? {
                icon: "🏠",
                accent: "secondary",
                gradient: "linear-gradient(135deg, #e5e7eb 0%, #f9fafb 100%)",
                description: "Continue to your FreshMeal workspace.",
              };

              const isSelected = selectedRole === portal.role;

              return (
                <div
                  className="col-12 col-md-6"
                  key={portal.role}>
                  <button
                    type="button"
                    className={`portal-selection-card card h-100 w-100 text-start border-0 shadow-sm ${
                      isSelected ? "portal-selection-card-selected" : ""
                    }`}
                    onClick={() => handlePortalSelection(portal)}
                    disabled={Boolean(selectedRole)}
                    aria-label={`Continue to ${portal.name} portal`}>
                    {/* Visual banner */}
                    <div
                      className="portal-visual-banner rounded-top-3 d-flex align-items-center justify-content-center position-relative overflow-hidden"
                      style={{
                        background: visual.gradient,
                        minHeight: 150,
                      }}
                      aria-hidden="true">
                      <div className="portal-visual-decoration portal-visual-decoration-one" />
                      <div className="portal-visual-decoration portal-visual-decoration-two" />

                      <span className="portal-visual-icon">{visual.icon}</span>
                    </div>

                    {/* Card content */}
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                        <div>
                          <h3 className="h5 fw-bold mb-1">{portal.title}</h3>

                          <span
                            className={`badge text-bg-${visual.accent} bg-opacity-10 text-${visual.accent}`}>
                            {portal.name}
                          </span>
                        </div>

                        <span
                          className="text-secondary fs-4"
                          aria-hidden="true">
                          →
                        </span>
                      </div>

                      <p className="text-secondary small mb-3">
                        {portal.description}
                      </p>

                      <p className="small text-secondary mb-4">
                        {visual.description}
                      </p>

                      <div className="mt-auto">
                        <span className={`btn btn-${visual.accent} w-100`}>
                          {isSelected
                            ? "Opening portal..."
                            : `Continue to ${portal.name}`}
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-4 mt-md-5">
          <p className="small text-secondary mb-0">
            FreshMeal · Your food experience, connected.
          </p>
        </footer>
      </div>

      <style>{`
        .portal-selection-card {
          cursor: pointer;
          border-radius: 1rem;
          overflow: hidden;
          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .portal-selection-card:hover:not(:disabled) {
          transform: translateY(-5px);
          box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.10) !important;
        }

        .portal-selection-card:focus-visible {
          outline: 3px solid var(--bs-primary);
          outline-offset: 4px;
        }

        .portal-selection-card:disabled {
          cursor: wait;
          opacity: 0.75;
        }

        .portal-selection-card-selected {
          outline: 2px solid var(--bs-primary);
          outline-offset: 2px;
        }

        .portal-visual-banner {
          isolation: isolate;
        }

        .portal-visual-icon {
          z-index: 1;
          font-size: 4rem;
          line-height: 1;
          filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.10));
          transition: transform 180ms ease;
        }

        .portal-selection-card:hover:not(:disabled) .portal-visual-icon {
          transform: scale(1.08);
        }

        .portal-visual-decoration {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.45);
          z-index: -1;
        }

        .portal-visual-decoration-one {
          width: 130px;
          height: 130px;
          top: -45px;
          left: -25px;
        }

        .portal-visual-decoration-two {
          width: 170px;
          height: 170px;
          bottom: -100px;
          right: -35px;
        }

        @media (prefers-reduced-motion: reduce) {
          .portal-selection-card,
          .portal-visual-icon {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
};

export default PortalSelection;
