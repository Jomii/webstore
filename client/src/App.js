import React, { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (!user) {
      fetch("/users")
        .then(response => {
          return response.json();
        })
        .then(data => {
          setUser(data);
        });
    }
  });

  return (
    <>
      <h1>Our app and test user info from backend</h1>
      {user ? (
        <div>
          Username: {user.username} and password: {user.password}
        </div>
      ) : null}
    </>
  );
};
