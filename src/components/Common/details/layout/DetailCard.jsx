import PropTypes from "prop-types";

import DetailBody from "../card/DetailBody";
import DetailFooter from "../card/DetailFooter";
import DetailHeader from "../card/DetailHeader";

import { buildDetailCardClass } from "../utils/buildDetailCardClass";

/**
 * ============================================================================
 * Component: DetailCard
 * ============================================================================
 *
 * Purpose:
 * Generic container for detail pages.
 *
 * ============================================================================
 */

const DetailCard = ({
  title,
  subtitle,
  headerIcon,
  actions,
  footer,
  hoverable = false,
  className = "",
  children,
}) => {
  return (
    <article
      className={buildDetailCardClass({
        className,
        hoverable,
      })}>
      <DetailHeader
        title={title}
        subtitle={subtitle}
        headerIcon={headerIcon}
        actions={actions}
      />

      <DetailBody>{children}</DetailBody>

      <DetailFooter>{footer}</DetailFooter>
    </article>
  );
};

DetailCard.propTypes = {
  title: PropTypes.node,

  subtitle: PropTypes.node,

  headerIcon: PropTypes.node,

  actions: PropTypes.node,

  footer: PropTypes.node,

  hoverable: PropTypes.bool,

  className: PropTypes.string,

  children: PropTypes.node.isRequired,
};

export default DetailCard;
