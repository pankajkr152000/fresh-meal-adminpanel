import { useCallback, useEffect, useRef, useState } from "react";
import PincodeService from "../services/PincodeService";

/**
 * Extracts a readable error message from a failed API request.
 *
 * Adjust the response paths to match the actual ApiResponse contract
 * if your backend uses a different error structure.
 *
 * @param {unknown} error - Error thrown by the service or HTTP client.
 * @returns {string} User-friendly error message.
 */
function getErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Unable to fetch pincode details. Please try again."
  );
}

/**
 * Manages pincode lookup state and request lifecycle.
 *
 * @returns {{
 *   lookupPincode: (pincode: string) => Promise<object|null>,
 *   resetLookup: () => void,
 *   isLoading: boolean,
 *   error: string|null,
 *   locationDetails: object|null
 * }}
 */
export default function usePincodeLookup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);

  const abortControllerRef = useRef(null);
  const requestIdRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      requestIdRef.current += 1;
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
    };
  }, []);

  /**
   * Looks up location details for a pincode.
   *
   * Starting a new lookup cancels the previous request.
   *
   * @param {string} pincode - Six-digit Indian postal code.
   * @returns {Promise<object|null>} Location details or null on failure.
   */
  const lookupPincode = useCallback(async (pincode) => {
    const normalizedPincode = String(pincode ?? "").trim();
    const requestId = ++requestIdRef.current;

    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    setError(null);
    setLocationDetails(null);

    if (!/^\d{6}$/.test(normalizedPincode)) {
      setIsLoading(false);
      setError("Please enter a valid six-digit pincode.");
      return null;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);

    try {
      const response = await PincodeService.lookup(
        normalizedPincode,
        controller.signal,
      );

      // Ignore responses belonging to an outdated request.
      if (!isMountedRef.current || requestId !== requestIdRef.current) {
        return null;
      }

      /*
       * Supports a direct payload or a common { data: payload } envelope.
       * Confirm this extraction against your actual ApiResponse DTO.
       */
      const details = response?.data ?? response;

      if (!details || typeof details !== "object" || Array.isArray(details)) {
        throw new Error("The server returned invalid pincode details.");
      }

      setLocationDetails(details);
      return details;
    } catch (lookupError) {
      const isCancelled =
        lookupError?.name === "AbortError" ||
        lookupError?.name === "CanceledError" ||
        lookupError?.code === "ERR_CANCELED";

      if (
        isCancelled ||
        !isMountedRef.current ||
        requestId !== requestIdRef.current
      ) {
        return null;
      }

      setError(getErrorMessage(lookupError));
      return null;
    } finally {
      if (isMountedRef.current && requestId === requestIdRef.current) {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    }
  }, []);

  /**
   * Clears the current lookup state and cancels any pending request.
   */
  const resetLookup = useCallback(() => {
    requestIdRef.current += 1;
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    setIsLoading(false);
    setError(null);
    setLocationDetails(null);
  }, []);

  return {
    lookupPincode,
    resetLookup,
    isLoading,
    error,
    locationDetails,
  };
}
