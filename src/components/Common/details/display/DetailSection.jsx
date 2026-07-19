import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: DetailSection
 * ============================================================================
 *
 * Purpose:
 * Groups related content inside a DetailCard.
 *
 * Responsibilities:
 * - Optional title
 * - Optional description
 * - Consistent spacing
 * - Optional divider
 *
 * ============================================================================
 */

const DetailSection = ({
  title,
  description,
  children,
  showDivider = true,
}) => {
  return (
    <section>
      {(title || description) && (
        <div className="mb-3">
          {title && <h3 className="h6 mb-1">{title}</h3>}

          {description && (
            <p className="small text-body-secondary mb-0">{description}</p>
          )}
        </div>
      )}

      {children}

      {showDivider && <hr className="my-4" />}
    </section>
  );
};

DetailSection.propTypes = {
  title: PropTypes.node,

  description: PropTypes.node,

  children: PropTypes.node.isRequired,

  showDivider: PropTypes.bool,
};

export default DetailSection;
