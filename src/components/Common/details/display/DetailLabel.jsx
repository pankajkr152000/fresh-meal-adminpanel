import PropTypes from "prop-types";

/**
 * ============================================================================
 * Component: DetailLabel
 * ============================================================================
 *
 * Purpose:
 * Displays the label for a detail field.
 *
 * ============================================================================
 */

const DetailLabel = ({ children, required = false, className = "" }) => {
  return (
    <div
      className={`
                fw-semibold
                text-body
                ${className}
            `}>
      {children}

      {required && (
        <span
          className="text-danger ms-1"
          aria-hidden="true">
          *
        </span>
      )}
    </div>
  );
};

DetailLabel.propTypes = {
  children: PropTypes.node.isRequired,

  required: PropTypes.bool,

  className: PropTypes.string,
};

export default DetailLabel;
