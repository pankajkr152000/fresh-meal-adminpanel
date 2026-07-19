import PropTypes from "prop-types";

import DetailBody from "../card/DetailBody";
import DetailHeader from "../card/DetailHeader";
import DetailCard from "../layout/DetailCard";
import DetailRow from "./DetailRow";

import { getNestedValue } from "../../../../utils/DisplayOptionUtils";

/**
 * ============================================================================
 * Generic Detail Card Renderer
 *
 * Renders a detail card using configuration.
 *
 * Supports:
 * - Simple properties
 * - Nested properties
 * - Arrays
 * - Custom formatters
 * ============================================================================
 */

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
            key={field.key}
            label={field.label}
            value={getNestedValue(data, field.key)}
            type={field.type}
            formatter={field.formatter}
            emptyValue={field.emptyValue}
            copyable={field.copyable}
          />
        ))}
      </DetailBody>
    </DetailCard>
  );
};

export default DetailCardRenderer;

DetailCardRenderer.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,

    fields: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,

        key: PropTypes.string.isRequired,

        type: PropTypes.string.isRequired,

        formatter: PropTypes.func,

        visible: PropTypes.bool,

        copyable: PropTypes.bool,

        emptyValue: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,

  data: PropTypes.object,
};
