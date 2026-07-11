import PropTypes from "prop-types";

import ErrorAlert from "../alerts/ErrorAlert";
import EmptyState from "../empty/EmptyState";
import LoadingSpinner from "../loaders/LoadingSpinner";

/**
 * -----------------------------------------------------------------------------
 * Component : TableContainer
 * -----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Standard container for all data tables in the Admin Panel.
 *
 * Responsibilities
 * ----------------
 * • Render toolbar.
 * • Handle loading.
 * • Handle error.
 * • Handle empty state.
 * • Render responsive table.
 * • Render footer.
 *
 * Notes
 * -----
 * Business logic intentionally belongs outside this component.
 * -----------------------------------------------------------------------------
 */

const TableContainer = ({
  loading = false,
  error = "",
  empty = false,
  emptyTitle = "No Records Found",
  emptyMessage = "There are no records to display.",
  toolbar,
  footer,
  children,
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (empty) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
      />
    );
  }

  return (
    <>
      {toolbar}

      <div className="table-responsive">{children}</div>

      {footer}
    </>
  );
};

TableContainer.propTypes = {
  loading: PropTypes.bool,

  error: PropTypes.string,

  empty: PropTypes.bool,

  emptyTitle: PropTypes.string,

  emptyMessage: PropTypes.string,

  toolbar: PropTypes.node,

  footer: PropTypes.node,

  children: PropTypes.node.isRequired,
};

export default TableContainer;
