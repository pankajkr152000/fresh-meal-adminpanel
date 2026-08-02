// ============================================================================
// File: NavigationCard.jsx
// Location: src/components/food/details/NavigationCard.jsx
//
// Description:
// Reusable navigation component for entity detail pages.
//
// Responsibilities:
// - Display Previous navigation
// - Display Next navigation
// - Handle disabled states
//
// Future Scope:
// Can be reused for Restaurant, User, Category, Order, Offer, etc.
// ============================================================================

import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

// ============================================================================
// Component
// ============================================================================

const NavigationCard = ({ navigation, onNavigate }) => {
  const previous = navigation?.previous;
  const next = navigation?.next;

  return (
    <Card className="shadow-sm border-0 mt-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          {/* Previous */}

          <div>
            <Button
              variant="outline-secondary"
              disabled={!previous?.available}
              onClick={() => onNavigate(previous?.id)}>
              <i className="bi bi-arrow-left me-2" />
              Previous
            </Button>

            {previous?.available && (
              <div className="small text-muted mt-2">
                {previous.displayName}
              </div>
            )}
          </div>

          {/* Next */}

          <div className="text-end">
            <Button
              variant="outline-secondary"
              disabled={!next?.available}
              onClick={() => onNavigate(next?.id)}>
              Next
              <i className="bi bi-arrow-right ms-2" />
            </Button>

            {next?.available && (
              <div className="small text-muted mt-2">{next.displayName}</div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

// ============================================================================
// Prop Types
// ============================================================================

NavigationCard.propTypes = {
  navigation: PropTypes.shape({
    previous: PropTypes.object,
    next: PropTypes.object,
  }),
  onNavigate: PropTypes.func.isRequired,
};

export default NavigationCard;
