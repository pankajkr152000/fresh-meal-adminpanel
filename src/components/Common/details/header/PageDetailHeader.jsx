// ============================================================================
// File: PageDetailHeader.jsx
// Description:
// Generic detail page header.
//
// Features:
// - Back navigation
// - Title
// - Subtitle
// - Status badge
// - Custom action buttons
// ============================================================================

import { ArrowLeft } from "lucide-react";
import PropTypes from "prop-types";

import Button from "../../buttons/Button";

const PageDetailHeader = ({ title, subtitle, status, onBack, children }) => {
  return (
    <div className="d-flex flex-column gap-3 mb-4">
      {/* Top Row */}

      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div className="d-flex align-items-start gap-3">
          <Button
            variant="outline-secondary"
            onClick={onBack}
            icon={<ArrowLeft size={18} />}>
            Back
          </Button>

          <div>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <h2 className="mb-0">{title}</h2>
              {status}
            </div>

            {subtitle && (
              <small className="text-body-secondary">{subtitle}</small>
            )}
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2">{children}</div>
      </div>
    </div>
  );
};

export default PageDetailHeader;

PageDetailHeader.propTypes = {
  title: PropTypes.string.isRequired,

  subtitle: PropTypes.string,

  status: PropTypes.any,

  onBack: PropTypes.func,

  children: PropTypes.node,
};
