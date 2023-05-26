import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  // useEffect(() => {}, [location]);
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <Link className="navbar-brand" to="/">
        CloudNotes
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              aria-current="page"
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
          <Link to="/login" role="button" className="btn btn-primary mx-1">
            Login
          </Link>
          <Link to="/signup" role="button" className="btn btn-primary mx-1">
            Signup
          </Link>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
