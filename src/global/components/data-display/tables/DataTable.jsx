import PropTypes from "prop-types";

import EmptyState from "../../feedback/EmptyState";
import ErrorAlert from "../../feedback/ErrorAlert";
import LoadingSpinner from "../../feedback/LoadingSpinner";

import TableHeader from "./TableHeader";

/**
 * ============================================================================
 * Component : DataTable
 * ============================================================================
 *
 * Purpose
 * -------
 * Generic reusable data table for the FreshMeal Admin Panel.
 *
 * Responsibilities
 * ----------------
 * • Render toolbar.
 * • Render loading state.
 * • Render error state.
 * • Render empty state.
 * • Render responsive Bootstrap table.
 * • Render reusable table header.
 * • Render table rows.
 * • Render footer.
 * • Optionally support row selection.
 *
 * Notes
 * -----
 * Selection is a generic table capability.
 * Feature-specific selection logic remains outside this component.
 *
 * ============================================================================
 */

const DataTable = ({
  columns,
  data,
  rowKey,
  renderRow,

  loading = false,
  error = "",

  toolbar,
  footer,

  sortField,
  sortDirection,
  onSort,

  retryAction,

  tableClassName = "table table-hover align-middle mb-0",

  // Selection
  selectable = false,
  selectedRowKeys = new Set(),
  allRowsSelected = false,
  someRowsSelected = false,
  onSelectAll,
}) => {
  // =========================================================================
  // Loading State
  // =========================================================================

  if (loading) {
    return (
      <>
        {toolbar}

        <LoadingSpinner />

        {footer}
      </>
    );
  }

  // =========================================================================
  // Error State
  // =========================================================================

  if (error) {
    return (
      <>
        {toolbar}

        <ErrorAlert
          message={error}
          onRetry={retryAction}
        />

        {footer}
      </>
    );
  }

  // =========================================================================
  // Empty State
  // =========================================================================

  if (data.length === 0) {
    return (
      <>
        {toolbar}

        <EmptyState
          title="No Records Found"
          message="Try changing your search or filters."
        />

        {footer}
      </>
    );
  }

  // =========================================================================
  // Table
  // =========================================================================

  return (
    <>
      {toolbar}

      <div className="table-responsive">
        <table className={tableClassName}>
          <TableHeader
            columns={columns}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
            selectable={selectable}
            allRowsSelected={allRowsSelected}
            someRowsSelected={someRowsSelected}
            onSelectAll={onSelectAll}
          />

          <tbody>{data.map((row) => renderRow(row, row[rowKey]))}</tbody>
        </table>
      </div>

      {footer}
    </>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,

  data: PropTypes.array.isRequired,

  rowKey: PropTypes.string.isRequired,

  renderRow: PropTypes.func.isRequired,

  loading: PropTypes.bool,

  error: PropTypes.string,

  retryAction: PropTypes.func,

  toolbar: PropTypes.node,

  footer: PropTypes.node,

  sortField: PropTypes.string,

  sortDirection: PropTypes.oneOf(["asc", "desc"]),

  onSort: PropTypes.func,

  tableClassName: PropTypes.string,

  // Selection
  selectable: PropTypes.bool,

  selectedRowKeys: PropTypes.instanceOf(Set),

  allRowsSelected: PropTypes.bool,

  someRowsSelected: PropTypes.bool,

  onSelectAll: PropTypes.func,
};

export default DataTable;
