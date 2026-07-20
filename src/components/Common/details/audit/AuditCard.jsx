import PropTypes from "prop-types";

import DetailRow from "../display/DetailRow";
import DetailSection from "../display/DetailSection";
import DetailCard from "../layout/DetailCard";

import {
  formatDateTime,
  formatDayDateTime,
} from "../../../../utils/formatDateTime";

/**
 * ============================================================================
 * Component: AuditCard
 * ============================================================================
 *
 * Purpose:
 * Displays audit information for an entity.
 *
 * Features:
 * - Generic
 * - Reusable
 * - Consistent audit presentation
 *
 * ============================================================================
 */

const AuditCard = ({
  createdAt,
  createdBy,
  updatedAt,
  updatedBy,
  title = "Audit Information",
}) => {
  return (
    <DetailCard title={title}>
      <DetailSection>
        <DetailRow
          label="Created By"
          value={createdBy}
        />

        <DetailRow
          label="Created At"
          value={formatDayDateTime(createdAt)}
        />

        <DetailRow
          label="Last Updated By"
          value={updatedBy}
        />

        <DetailRow
          label="Last Updated At"
          value={formatDateTime(updatedAt)}
        />
      </DetailSection>
    </DetailCard>
  );
};

AuditCard.propTypes = {
  title: PropTypes.string,

  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),

  createdBy: PropTypes.string,

  updatedAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),

  updatedBy: PropTypes.string,
};

export default AuditCard;
