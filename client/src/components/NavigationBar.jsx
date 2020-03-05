import React from "react";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/market" className="nav-link">
            Market
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/users" className="nav-link">
            Users
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/pending-items" className="nav-link">
            Pending items
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};
