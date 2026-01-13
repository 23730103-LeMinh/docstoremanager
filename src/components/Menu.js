import { Link } from "react-router-dom";
import { useContext } from "react";
import { DocStoreContext } from "../context/DocStoreContext.js";

const Menu = () => {
  const { activeMenu, setActiveMenu } = useContext(DocStoreContext);
  return (
    <nav className="nav px-5 d-flex flex-grow-1">
      <div className="d-flex">
        <div className={`nav-item ${activeMenu === "dashboard" ? "active-link" : ""}`} >
          <Link className="nav-link" to="/" onClick={() => setActiveMenu("dashboard")}>
            DASHBOARD
          </Link>
        </div>
        <div className={`nav-item ${activeMenu === "docstores" ? "active-link" : ""}`}>
          <Link className="nav-link" to="/docstores" onClick={() => setActiveMenu("docstores")}>
            DOCSTORES
          </Link>
        </div>

        {/* <div className="nav-item">
          <Link className="nav-link" to="/users">
            USERS
          </Link>
        </div> */}

        <div className={`${activeMenu === "about" ? "active-link" : ""}`}>
          <Link
            className="nav-link dropdown-toggle"
            to="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="aboutDropdown"
          >
            ABOUT
          </Link>
          <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
            <li>
              <Link className="dropdown-item" to="/about" onClick={() => setActiveMenu("about")}>
                TEAM
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/about">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* <div className="nav-item w-auto ms-auto">
        <Link className="nav-link dropdown-toggle"
            to="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="userDropdown">
          USER_1
        </Link>
        <ul className="dropdown-menu" aria-labelledby="userDropdown">
            <li>
              <Link className="dropdown-item" to="/userinfo">
                INFO
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/login">
                LOGOUT
              </Link>
            </li>
          </ul>
      </div> */}
    </nav>
  );
};

export default Menu;
