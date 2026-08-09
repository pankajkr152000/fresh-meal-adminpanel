import PropTypes from "prop-types";

import CommonCheckbox from "../../forms/checkbox/CommonCheckbox";

/**
 * ============================================================================
 * Component : TableHeader
 * ============================================================================
 *
 * Purpose
 * -------
 * Reusable table header based on column configuration.
 *
 * Responsibilities
 * ----------------
 * • Render header labels.
 * • Render sortable columns.
 * • Display sort indicators.
 * • Apply alignment and width.
 * • Emit sort events.
 * • Optionally render a select-all checkbox.
 *
 * Notes
 * -----
 * This component contains no feature-specific business logic.
 *
 * ============================================================================
 */

const TableHeader = ({
  columns,
  sortField,
  sortDirection,
  onSort,

  // Selection
  selectable = false,
  someRowsSelected = false,
  allRowsSelected = false,
  onSelectAll,
}) => {
  /**
   * Returns sort icon.
   *
   * @param {Object} column Column configuration.
   * @returns {JSX.Element|null} Sort indicator.
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
    <thead>
      <tr>
        {/* ===============================================================
            Select All
            =============================================================== */}

        {selectable && (
          <th
            scope="col"
            className="text-center"
            style={{
              width: "50px",
              minWidth: "50px",
            }}>
            <CommonCheckbox
              name="table-select-all"
              checked={allRowsSelected}
              indeterminate={someRowsSelected}
              onChange={(_, checked) => onSelectAll(checked)}
            />
          </th>
        )}

        {/* ===============================================================
            Table Columns
            =============================================================== */}

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
                  className="btn btn-link p-0 fw-semibold text-decoration-none text-body"
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

  // Selection
  selectable: PropTypes.bool,

  someRowsSelected: PropTypes.bool,

  allRowsSelected: PropTypes.bool,

  onSelectAll: PropTypes.func,
};

export default TableHeader;
