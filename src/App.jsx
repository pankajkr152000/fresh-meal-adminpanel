import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Menubar from "./components/Menubar/Menubar";
import Sidebar from "./components/Sidebar/Sidebar";
import ROUTES from "./constants/RouteConstants";
import { ViewFood } from "./pages/Food";
import AddFood from "./pages/Food/AddFood";
import FoodList from "./pages/Food/FoodList";
import Orders from "./pages/Orders/Orders";

const App = () => {
  // toggle Menu button script
  const [getSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!getSidebarVisible);
  };

  return (
    <div
      className="d-flex"
      id="wrapper">
      {/* Sidebar */}
      <Sidebar getSidebarVisible={getSidebarVisible} />
      {/* Page content wrapper*/}
      <div id="page-content-wrapper">
        {/* Top navigation*/}
        <Menubar toggleSidebar={toggleSidebar} />
        {/* Toast alert message */}
        <ToastContainer />
        {/* Page content*/}
        <div className="container-fluid">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route
              path={ROUTES.ADD_FOOD}
              element={<AddFood />}
            />
            <Route
              path={ROUTES.FETCH_ALL_FOODS}
              element={<FoodList />}
            />
            <Route
              path={ROUTES.FETCH_ALL_ORDERS}
              element={<Orders />}
            />
            <Route
              path={ROUTES.HOME}
              element={<FoodList />}
            />
            <Route
              path={ROUTES.VIEW_FOOD}
              element={<ViewFood />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
