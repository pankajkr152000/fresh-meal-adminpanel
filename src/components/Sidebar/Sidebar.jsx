import React from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div
      className="border-end bg-white"
      id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom bg-light">
        Start Bootstrap
      </div>
      <div className="list-group list-group-flush">
        <a
          className="list-group-item list-group-item-action list-group-item-light p-3"
          href="#!">
          Dashboard
        </a>
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to="/add-food">
          Add Food
        </Link>
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to="/all-foods">
          All Foods
        </Link>
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to="/orders">
          All Orders
        </Link>
        <a
          className="list-group-item list-group-item-action list-group-item-light p-3"
          href="#!">
          Profile
        </a>
        <a
          className="list-group-item list-group-item-action list-group-item-light p-3"
          href="#!">
          Status
        </a>
      </div>
    </div>
  )
}

export default Sidebar;
