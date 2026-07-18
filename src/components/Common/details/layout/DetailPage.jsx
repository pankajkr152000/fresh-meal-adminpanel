import PropTypes from "prop-types";

/**
 * ============================================================================
 * DetailPage
 * ============================================================================
 *
 * Root layout wrapper for all entity detail pages.
 *
 * Responsibilities:
 * - Responsive page container
 * - Consistent spacing
 * - Theme compatibility
 * - Mobile-first layout
 * - Accessibility
 *
 * This component intentionally contains no business logic and no
 * entity-specific knowledge.
 *
 * Examples:
 *
 * <DetailPage>
 *     <DetailHeader />
 *     <DetailGrid />
 * </DetailPage>
 *
 * ============================================================================
 */

const DetailPage = ({
  children,
  className = "",
  contentClassName = "",
  fluid = false,
}) => {
  const containerClass = fluid ? "container-fluid" : "container-xxl";

  return (
    <main
      className={`py-4 py-lg-5 ${className}`}
      role="main">
      <div className={`${containerClass} ${contentClassName}`}>{children}</div>
    </main>
  );
};

DetailPage.propTypes = {
  children: PropTypes.node.isRequired,

  className: PropTypes.string,

  contentClassName: PropTypes.string,

  fluid: PropTypes.bool,
};

export default DetailPage;
