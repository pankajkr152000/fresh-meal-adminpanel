import PropTypes from "prop-types";
import { memo, useMemo } from "react";

/**
 * =============================================================================
 * Component : TablePagination
 * =============================================================================
 *
 * Purpose
 * -------
 * Generic pagination component for reusable data tables.
 *
 * Responsibilities
 * ----------------
 * • Display pagination information.
 * • Render page navigation controls.
 * • Render page size selector.
 * • Forward user interactions to the parent.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * All pagination calculations are delegated to the business layer.
 * =============================================================================
 */

const DEFAULT_PAGE_SIZE_OPTIONS = Object.freeze([10, 20, 50, 100]);

const TablePagination = ({
  pagination,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onPageChange,
  onPageSizeChange,
}) => {
  const {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    startRecord,
    endRecord,
    hasPrevious,
    hasNext,
  } = pagination;

  /**
   * Generates visible page numbers.
   */
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = [];

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3">
      {/* =============================================================== */}
      {/* Record Information */}
      {/* =============================================================== */}

      <div className="small text-muted">
        {totalItems === 0
          ? "No records found"
          : `Showing ${startRecord}–${endRecord} of ${totalItems} records`}
      </div>

      {/* =============================================================== */}
      {/* Page Size */}
      {/* =============================================================== */}

      <div className="d-flex align-items-center gap-2">
        <label
          htmlFor="page-size"
          className="form-label mb-0">
          Rows
        </label>

        <select
          id="page-size"
          className="form-select form-select-sm"
          style={{ width: 90 }}
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}>
          {pageSizeOptions.map((size) => (
            <option
              key={size}
              value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* =============================================================== */}
      {/* Navigation */}
      {/* =============================================================== */}

      <nav aria-label="Table pagination">
        <ul className="pagination pagination-sm mb-0">
          <li className={`page-item ${!hasPrevious ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(1)}
              disabled={!hasPrevious}>
              «
            </button>
          </li>

          <li className={`page-item ${!hasPrevious ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!hasPrevious}>
              ‹
            </button>
          </li>

          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <li
                key={`ellipsis-${index}`}
                className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            ) : (
              <li
                key={page}
                className={`page-item ${page === currentPage ? "active" : ""}`}>
                <button
                  type="button"
                  className="page-link"
                  onClick={() => onPageChange(page)}>
                  {page}
                </button>
              </li>
            ),
          )}

          <li className={`page-item ${!hasNext ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!hasNext}>
              ›
            </button>
          </li>

          <li className={`page-item ${!hasNext ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(totalPages)}
              disabled={!hasNext}>
              »
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

TablePagination.propTypes = {
  /**
   * Pagination information.
   */
  pagination: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    startRecord: PropTypes.number.isRequired,
    endRecord: PropTypes.number.isRequired,
    hasPrevious: PropTypes.bool.isRequired,
    hasNext: PropTypes.bool.isRequired,
  }).isRequired,

  /**
   * Allowed page sizes.
   */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),

  /**
   * Invoked when the page changes.
   */
  onPageChange: PropTypes.func.isRequired,

  /**
   * Invoked when the page size changes.
   */
  onPageSizeChange: PropTypes.func.isRequired,
};

export default memo(TablePagination);
