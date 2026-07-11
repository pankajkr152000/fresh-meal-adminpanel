/**
 * =============================================================================
 * Component : SortNeutral
 * =============================================================================
 *
 * Displays the default sortable indicator.
 *
 * =============================================================================
 */

const SortNeutral = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 16 16"
    aria-hidden="true">
    <path d="M8 2l3 3H9v6h2l-3 3-3-3h2V5H5l3-3z" />
  </svg>
);

export default SortNeutral;
