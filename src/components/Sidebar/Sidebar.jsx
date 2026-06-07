import { Link } from "react-router-dom";
import ROUTES from "../../constants/RouteConstants";
const Sidebar = ({getSidebarVisible}) => {
  return (
    <div
      className={`border-end ${getSidebarVisible ? '' : 'd-none'}`}
      id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom">
        Start Bootstrap
      </div>
      <div className="list-group list-group-flush">
        <a
          className="list-group-item list-group-item-action  p-3"
          href="#!">
          Dashboard
        </a>
        <Link
          className="list-group-item list-group-item-action  p-3"
          to={ROUTES.ADD_FOOD}>
          <i className="bi bi-plus-circle me-2"></i>
          Add Food
        </Link>
        <Link
          className="list-group-item list-group-item-action  p-3"
          to={ROUTES.FETCH_ALL_FOODS}>
          <i className="bi bi-list-ul me-2"></i>
          All Foods
        </Link>
        <Link
          className="list-group-item list-group-item-action  p-3"
          to={ROUTES.FETCH_ALL_ORDERS}>
          <i className="bi bi-cart me-2"></i>
          All Orders
        </Link>
        <a
          className="list-group-item list-group-item-action  p-3"
          href="#!">
          <i className="bi bi-person me-2"></i>
          Profile
        </a>
        <a
          className="list-group-item list-group-item-action  p-3"
          href="#!">
          <i className="bi bi-info-circle me-2"></i>
          Status
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
