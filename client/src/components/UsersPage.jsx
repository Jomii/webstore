import React, { useEffect } from "react";
import { setAuthentication } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";

export const UsersPage = () => {
  const dispatch = useDispatch();
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

  return userInfo();
};
