/**
 * ============================================================================
 * Utility: formatFileSize
 * ============================================================================
 */

const FILE_SIZE_UNITS = ["Bytes", "KB", "MB", "GB", "TB"];

export const formatFileSize = (bytes) => {
  if (bytes === null || bytes === undefined || Number.isNaN(Number(bytes))) {
    return "-";
  }

  const value = Number(bytes);

  if (value === 0) {
    return "0 Bytes";
  }

  const unitIndex = Math.floor(Math.log(value) / Math.log(1024));

  const size = value / Math.pow(1024, unitIndex);

  return `${size.toFixed(2)} ${FILE_SIZE_UNITS[unitIndex]}`;
};
