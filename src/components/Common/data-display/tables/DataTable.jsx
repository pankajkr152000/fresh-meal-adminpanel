import PropTypes from "prop-types";

import ErrorAlert from "../../feedback/alerts/ErrorAlert";
import LoadingSpinner from "../../feedback/loaders/LoadingSpinner";
import EmptyState from "../empty-state/EmptyState";

import TableHeader from "./TableHeader";

/**
 * -----------------------------------------------------------------------------
 * Component : DataTable
 * -----------------------------------------------------------------------------
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
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * Feature modules provide column definitions and row renderers.
 * -----------------------------------------------------------------------------
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

  tableClassName = "table table-hover align-middle mb-0",
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!data.length) {
    return (
      <EmptyState
        title="No Records Found"
        message="There is no data available."
      />
    );
  }

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

  toolbar: PropTypes.node,

  footer: PropTypes.node,

  sortField: PropTypes.string,

  sortDirection: PropTypes.oneOf(["asc", "desc"]),

  onSort: PropTypes.func,

  tableClassName: PropTypes.string,
};

export default DataTable;
