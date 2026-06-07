import { useEffect } from "react";
import { initializeTheme } from "../../utils/themeChangeScriptButton";

const Menubar = () => {

  useEffect(() => {
    initializeTheme();
  }, []);
  
  return (
    <nav className="navbar navbar-expand-lg bg-body border-bottom">
      <div className="container-fluid">
        <button
          className="btn btn-primary"
          id="sidebarToggle">
          Toggle Menu
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item-theme-change-button">
              {/* <!-- dark/light button --> */}
              <button id="theme-change-button"
                  className="btn btn-outline-secondary 900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  <i className="bi bi-sun"></i><span> Light</span>
              </button>
            </li>
            

            <li className="nav-item active">
              <a
                className="nav-link"
                href="#!">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#!">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Dropdown
              </a>
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown">
                <a
                  className="dropdown-item"
                  href="#!">
                  Action
                </a>
                <a
                  className="dropdown-item"
                  href="#!">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  href="#!">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
