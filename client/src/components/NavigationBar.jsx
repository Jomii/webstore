import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/*
 * Navbar components.
 */

const NavHome = () => {
  return (
    <li className="nav-item active">
      <Link to="/" className="nav-link">
        Home
      </Link>
    </li>
  );
};

const NavMarket = () => {
  return (
    <li className="nav-item active">
      <Link to="/market" className="nav-link">
        Market
      </Link>
    </li>
  );
};

const NavPostItem = () => {
  return (
    <li className="nav-item active">
      <Link to="/post-item" className="nav-link">
        Post item
      </Link>
    </li>
  );
};

const NavUsers = () => {
  return (
    <li className="nav-item active">
      <Link to="/users" className="nav-link">
        Users
      </Link>
    </li>
  );
};

const NavPendingItems = () => {
  return (
    <li className="nav-item active">
      <Link to="/pending-items" className="nav-link">
        Pending items
      </Link>
    </li>
  );
};

const NavProfile = () => {
  return (
    <li className="nav-item active">
      <Link to="/profile" className="nav-link">
        Profile
      </Link>
    </li>
  );
};

const NavRegister = () => {
  return (
    <li className="nav-item active">
      <Link to="/register" className="nav-link">
        Register
      </Link>
    </li>
  );
};

const NavLogin = () => {
  return (
    <li className="nav-item active">
      <Link to="/login" className="nav-link">
        Login
      </Link>
    </li>
  );
};

export const NavigationBar = () => {
  const auth = useSelector(state => state.auth);

  const navBar = () => {
    if (auth.role === "admin") {
      return (
        <>
          <NavHome />
          <NavMarket />
          <NavPostItem />
          <NavUsers />
          <NavPendingItems />
          <NavProfile />
        </>
      );
    } else if (auth.role === "shopkeeper") {
      return (
        <>
          <NavHome />
          <NavMarket />
          <NavPendingItems />
          <NavProfile />
        </>
      );
    } else if (auth.role === "user") {
      return (
        <>
          <NavHome />
          <NavMarket />
          <NavPostItem />
          <NavProfile />
        </>
      );
    } else {
      return (
        <>
          <NavHome />
          <NavRegister />
          <NavLogin />
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
      <ul className="navbar-nav">{navBar()}</ul>
    </nav>
  );
};
