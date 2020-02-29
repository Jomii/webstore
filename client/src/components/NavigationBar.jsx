import React from "react";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/items">Items</Link>
    </>
  );
};
