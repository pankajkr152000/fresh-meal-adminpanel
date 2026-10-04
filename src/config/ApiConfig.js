/**
 * ============================================================================
 * Configuration : ApiConfig
 * ============================================================================
 *
 * Centralized configuration for backend communication.
 *
 * ============================================================================
 *
 * @author Pankaj Kumar
 * @since 1.0
 */

/**
 * Backend base URL supplied by the active Vite environment.
 */
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * Validates the backend URL during application initialization.
 *
 * Failing early prevents requests from silently falling back to the frontend
 * origin when the backend configuration is missing or invalid.
 */
const validateApiBaseUrl = (url) => {
  if (!url || !url.trim()) {
    throw new Error(
      "[FreshMeal Configuration] VITE_API_BASE_URL is not configured.",
    );
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error(
      "[FreshMeal Configuration] VITE_API_BASE_URL must be a valid absolute URL.",
    );
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error(
      "[FreshMeal Configuration] Only HTTP and HTTPS URLs are supported.",
    );
  }

  return url.replace(/\/+$/, "");
};

/**
 * Validated backend base URL.
 */
export const API_BASE_URL = validateApiBaseUrl(configuredApiBaseUrl);
