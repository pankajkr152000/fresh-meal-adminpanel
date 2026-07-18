// ============================================================================
// File: DetailCardRenderer.jsx
// Description:
// Generic renderer for detail cards.
//
// This component renders a complete detail card based on the supplied section
// configuration and entity data.
//
// It is completely reusable across:
//
// - Food
// - Restaurant
// - Category
// - User
// - Offer
// - Order
//
// ============================================================================

import PropTypes from "prop-types";

import DetailBody from "../card/DetailBody";
import DetailHeader from "../card/DetailHeader";
import DetailCard from "../layout/DetailCard";
import DetailRow from "./DetailRow";

// ============================================================================
// Component
// ============================================================================

const DetailCardRenderer = ({ section, data }) => {
  if (!section) {
    return null;
  }

  const visibleFields = section.fields.filter(
    (field) => field.visible !== false,
  );

  return (
    <DetailCard>
      <DetailHeader title={section.title} />

      <DetailBody>
        {visibleFields.map((field) => (
          <DetailRow
            key={field.field}
            label={field.label}
            value={data?.[field.field]}
            type={field.type}
            emptyValue={field.emptyValue}
            copyable={field.copyable}
          />
        ))}
      </DetailBody>
    </DetailCard>
  );
};

export default DetailCardRenderer;

// ============================================================================
// PropTypes
// ============================================================================

DetailCardRenderer.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,

    fields: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,

        field: PropTypes.string.isRequired,

        type: PropTypes.string.isRequired,

        visible: PropTypes.bool,

        copyable: PropTypes.bool,

        emptyValue: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,

  data: PropTypes.object,
};
