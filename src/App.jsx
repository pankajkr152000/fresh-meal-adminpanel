import { Route, Routes } from "react-router-dom";
import Menubar from "./components/Menubar/Menubar";
import Sidebar from "./components/Sidebar/Sidebar";
import AddFood from "./pages/AddFood/AddFood";
import FoodList from "./pages/FoodList/FoodList";
import Orders from "./pages/Orders/Orders";

const App = () => {
  return (
    <div
      className="d-flex"
      id="wrapper">
      {/* Sidebar */}
      <Sidebar />
      {/* Page content wrapper*/}
      <div id="page-content-wrapper">
        {/* Top navigation*/}
        <Menubar />
        {/* Page content*/}
        <div className="container-fluid">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route
              path="/add-food"
              element={<AddFood />}
            />
            <Route
              path="/all-foods"
              element={<FoodList />}
            />
            <Route
              path="/orders"
              element={<Orders />}
            />
            <Route
              path="/"
              element={<FoodList />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
