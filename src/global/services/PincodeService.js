import apiClient from "../../api/apiClient";
import { API } from "../../config/apiEndpoints";

/**
 * Provides shared API operations for Indian pincode lookups.
 *
 * This service is intentionally independent of any particular feature
 * so restaurant, customer, and delivery workflows can reuse it.
 */
const PincodeService = Object.freeze({
  /**
   * Fetches location details for a six-digit Indian pincode.
   *
   * @param {string} pincode - Six-digit Indian postal code.
   * @param {AbortSignal} [signal] - Optional request cancellation signal.
   * @returns {Promise<*>} Backend API response payload.
   */
  async lookup(pincode, signal) {
    const normalizedPincode = String(pincode ?? "").trim();

    if (!/^\d{6}$/.test(normalizedPincode)) {
      throw new Error("Please enter a valid six-digit pincode.");
    }

    const response = await apiClient.post(
      API.PINCODE.LOOKUP,
      { pincode: normalizedPincode },
      { signal },
    );

    return response.data;
  },
});

export default PincodeService;
