import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { setAuthentication } from "./actions/index.js";

export const App = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth) {
      fetch("/users")
        .then(response => {
          return response.json();
        })
        .then(data => {
          dispatch(setAuthentication(data));
        });
    }
  });

  return (
    <>
      <h1>Our app and test user info from backend</h1>
      {auth ? (
        <div>
          Username: {auth.username} and password: {auth.password}
        </div>
      ) : null}
    </>
  );
};
