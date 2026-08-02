/**
 * ============================================================================
 * Utility: buildDetailCardClass
 * ============================================================================
 *
 * Purpose:
 * Generates the Bootstrap utility class list for DetailCard.
 *
 * Design Decisions:
 * - Centralizes all styling decisions.
 * - Avoids long template literals inside components.
 * - Uses Bootstrap semantic utilities for light/dark compatibility.
 * - Supports optional hover styling.
 *
 * ============================================================================
 */

export const buildDetailCardClass = ({ className = "", hoverable = false }) => {
  const classes = [
    "bg-body",
    "border",
    "rounded-4",
    "shadow-sm",
    "h-100",
    "overflow-hidden",
    "transition-all",
    hoverable && "detail-card-hover",
    className,
  ];

  return classes.filter(Boolean).join(" ");
};
