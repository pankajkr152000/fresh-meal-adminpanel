import PropTypes from "prop-types";
import { memo } from "react";

console.log("Inside TableSkeleton Component");
/**
 * =============================================================================
 * Component : TableSkeleton
 * =============================================================================
 *
 * Purpose
 * -------
 * Displays a loading placeholder for data tables while records are being
 * fetched from the server.
 *
 * Responsibilities
 * ----------------
 * • Render placeholder rows.
 * • Mimic the layout of a table.
 * • Improve perceived loading performance.
 *
 * Notes
 * -----
 * This component is intentionally generic and can be reused by any table
 * throughout the application.
 * =============================================================================
 */

const TableSkeleton = ({ rows = 5, columns = 6 }) => {
  console.log("Inside TableSkeleton Component");
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((__, columnIndex) => (
                <td key={columnIndex}>
                  <div
                    className="placeholder-glow"
                    aria-hidden="true">
                    <span
                      className="placeholder col-12 rounded"
                      style={{ height: "18px" }}
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TableSkeleton.propTypes = {
  /**
   * Number of placeholder rows.
   */
  rows: PropTypes.number,

  /**
   * Number of placeholder columns.
   */
  columns: PropTypes.number,
};

export default memo(TableSkeleton);
