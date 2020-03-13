import React, { useEffect } from "react";
import { setAuthentication } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export const UsersPage = () => {
  /*const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (!auth) {
      fetch("http://localhost:5000/api/users")
        .then(response => {
          return response.json();
        })
        .then(data => {
          dispatch(setAuthentication(data));
        });
    }
  });

  const userInfo = () => {
    if (!auth) return null;
    else {
      return (
        <>
          <h1>Users</h1>
          <p>
            Username: {auth.username}, password: {auth.password}
          </p>
        </>
      );
    }
  };

  return userInfo();*/
  if (auth.role === "admin") {
    return <h1>Content only admin is supposed to see</h1>;
  } else {
    return <Redirect to="/" />;
  }
};
