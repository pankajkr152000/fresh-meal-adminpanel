import PropTypes from "prop-types";

/**
 * -----------------------------------------------------------------------------
 * Component : Pagination
 * -----------------------------------------------------------------------------
 *
 * Purpose
 * -------
 * Reusable Bootstrap pagination component.
 *
 * Responsibilities
 * ----------------
 * • Display current page information.
 * • Navigate between pages.
 * • Render page numbers.
 * • Notify parent when page changes.
 *
 * Notes
 * -----
 * This component intentionally contains no business logic.
 * -----------------------------------------------------------------------------
 */

const Pagination = ({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const startRecord = (currentPage - 1) * pageSize + 1;

  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-3">
      <small className="text-muted">
        Showing {startRecord} - {endRecord} of {totalRecords} records
      </small>

      <nav aria-label="Table pagination">
        <ul className="pagination pagination-sm mb-0">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}>
              Previous
            </button>
          </li>

          {pages.map((page) => (
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
          ))}

          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,

  totalPages: PropTypes.number.isRequired,

  totalRecords: PropTypes.number.isRequired,

  pageSize: PropTypes.number.isRequired,

  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
