import PropTypes from "prop-types";

import DetailLabel from "./DetailLabel";
import DetailValue from "./DetailValue";

/**
 * ============================================================================
 * Component: DetailRow
 * ============================================================================
 *
 * Purpose:
 * Displays a label/value pair using the project's
 * standard responsive layout.
 *
 * ============================================================================
 */

const DetailRow = ({
  label,
  value,
  required = false,
  className = "",
  labelClassName = "",
  valueClassName = "",
}) => {
  return (
    <div
      className={`
                row
                gy-2
                mb-3
                ${className}
            `}>
      <div className="col-12 col-md-4">
        <DetailLabel
          required={required}
          className={labelClassName}>
          {label}
        </DetailLabel>
      </div>

      <div className="col-12 col-md-8">
        <DetailValue
          value={value}
          className={valueClassName}
        />
      </div>
    </div>
  );
};

DetailRow.propTypes = {
  label: PropTypes.node.isRequired,

  value: PropTypes.node,

  required: PropTypes.bool,

  className: PropTypes.string,

  labelClassName: PropTypes.string,

  valueClassName: PropTypes.string,
};

export default DetailRow;
