import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: EmptyValue
 * ============================================================================
 *
 * Purpose:
 * Displays a consistent placeholder for missing values.
 *
 * ============================================================================
 */

const EmptyValue = ({ text = "—" }) => {
  return <span className="text-body-secondary fst-italic">{text}</span>;
};

EmptyValue.propTypes = {
  text: PropTypes.node,
};

export default EmptyValue;
