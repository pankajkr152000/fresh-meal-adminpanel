/**
 * =============================================================================
 * Component : SortDescending
 * =============================================================================
 *
 * Displays a descending sort indicator.
 *
 * =============================================================================
 */

const SortDescending = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 16 16"
    aria-hidden="true">
    <path d="M8 12L4 8h3V2h2v6h3l-4 4z" />
  </svg>
);

export default SortDescending;
