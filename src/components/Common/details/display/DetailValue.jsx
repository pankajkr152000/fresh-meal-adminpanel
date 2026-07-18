import PropTypes from "prop-types";

import EmptyValue from "./EmptyValue";

/**
 * ============================================================================
 * Component: DetailValue
 * ============================================================================
 */

const DetailValue = ({ value, className = "" }) => {
  const isEmpty = value === null || value === undefined || value === "";

  return <div className={className}>{isEmpty ? <EmptyValue /> : value}</div>;
};

DetailValue.propTypes = {
  value: PropTypes.node,

  className: PropTypes.string,
};

export default DetailValue;
