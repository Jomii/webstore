import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../..redux/actions/loginActions";

const LogoutPage = () => {
  const dispatch = useDispatch();
  dispatch(logout);

  const redirectToHome = e => {
    e.preventDefault();
    return <Redirect to="/" />; // redirect to main page.
  };

  return (
    <div>
      <p className="alert alert-success">Logout successful</p>
      <button className="btn btn-primary" onClick={redirectToHome}>
        Back to Home
      </button>
    </div>
  );
};
