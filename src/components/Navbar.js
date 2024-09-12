import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(props) {
  const logout = () => {
    localStorage.clear();
  };

  let location = useLocation();
  return (
    <nav className={`navbar navbar-expand-lg  fixed-top navbar-dark bg-dark`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            {localStorage.getItem("user") && (
              <>
               
                  <span className="text-light m-auto mr-3">
                    Hello, {localStorage.getItem("user")}
                  </span>
                
                <button
                  className="btn btn-outline-secondary mx-2"
                  onClick={logout}
                >
                  Log Out
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string,
};
