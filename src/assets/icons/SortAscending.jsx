/**
 * =============================================================================
 * Component : SortAscending
 * =============================================================================
 *
 * Displays an ascending sort indicator.
 *
 * =============================================================================
 */

const SortAscending = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 16 16"
    aria-hidden="true">
    <path d="M8 4l4 4H9v6H7V8H4l4-4z" />
  </svg>
);

export default SortAscending;
