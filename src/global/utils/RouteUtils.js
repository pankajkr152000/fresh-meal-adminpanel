/**
 * ============================================================================
 * File: RouteUtils.js
 * Description: Reusable utilities for constructing application route paths.
 * ============================================================================
 */

/**
 * Builds an absolute route path from a base path and a route pattern.
 *
 * Replaces named parameters such as ":foodId" with encoded values.
 *
 * @param {string} basePath - Base path, e.g. "/admin".
 * @param {string} routePattern - Relative route pattern, e.g. "foods/:foodId".
 * @param {Record<string, string | number>} [params={}] - Route parameters.
 * @returns {string} Resolved absolute route path.
 * @throws {TypeError} If the base path or route pattern is invalid.
 * @throws {Error} If a required route parameter is missing.
 */
export const buildRoutePath = (basePath, routePattern, params = {}) => {
  if (typeof basePath !== "string" || !basePath.trim()) {
    throw new TypeError("A valid route base path is required.");
  }

  if (typeof routePattern !== "string") {
    throw new TypeError("A valid route pattern is required.");
  }

  if (!params || typeof params !== "object" || Array.isArray(params)) {
    throw new TypeError("Route parameters must be an object.");
  }

  const normalizedBasePath = `/${basePath.trim().replace(/^\/+|\/+$/g, "")}`;
  const normalizedPattern = routePattern.replace(/^\/+|\/+$/g, "");

  const resolvedPattern = normalizedPattern.replace(
    /:([A-Za-z0-9_]+)/g,
    (_, parameterName) => {
      const value = params[parameterName];

      if (value === undefined || value === null || value === "") {
        throw new Error(`Missing required route parameter: ${parameterName}`);
      }

      return encodeURIComponent(String(value));
    },
  );

  return resolvedPattern
    ? `${normalizedBasePath}/${resolvedPattern}`
    : normalizedBasePath;
};
