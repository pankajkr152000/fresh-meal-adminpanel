import PropTypes from "prop-types";

/**
 * -----------------------------------------------------------------------------
 * Component : TableHeader
 * -----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Renders reusable table headers based on column configuration.
 *
 * Responsibilities
 * ----------------
 * • Render header labels.
 * • Render sortable columns.
 * • Display sort indicators.
 * • Apply alignment and width.
 * • Emit sort events.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * -----------------------------------------------------------------------------
 */

const TableHeader = ({ columns, sortField, sortDirection, onSort }) => {
  /**
   * Returns sort icon.
   */
  const getSortIcon = (column) => {
    if (!column.sortable) {
      return null;
    }

    if (sortField !== column.accessor) {
      return <span className="ms-2 text-muted">⇅</span>;
    }

    return <span className="ms-2">{sortDirection === "asc" ? "▲" : "▼"}</span>;
  };

  return (
    <thead className="table-light">
      <tr>
        {columns
          .filter((column) => column.visible)
          .map((column) => (
            <th
              key={column.id}
              scope="col"
              style={{
                width: column.width,
                minWidth: column.minWidth,
              }}
              className={[`text-${column.align}`, column.className ?? ""].join(
                " ",
              )}
              aria-sort={
                sortField === column.accessor
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }>
              {column.sortable ? (
                <button
                  type="button"
                  className="btn btn-link p-0 fw-semibold text-decoration-none text-dark"
                  onClick={() => onSort(column.accessor)}>
                  {column.header}

                  {getSortIcon(column)}
                </button>
              ) : (
                column.header
              )}
            </th>
          ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,

  sortField: PropTypes.string,

  sortDirection: PropTypes.oneOf(["asc", "desc"]),

  onSort: PropTypes.func.isRequired,
};

export default TableHeader;
