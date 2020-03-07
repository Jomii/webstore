import React, { useState } from "react";

const Alert = props => {
  const success = props.success;

  if (success === false) {
    return (
      <div className={"alert alert-danger"} role="alert">
        Incorrect email or password
      </div>
    );
  } else {
    return null;
  }
};

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(true);

  const login = e => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password
    };

    fetch("/api/login", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(response => {
        if (response.ok) {
          setSuccess(true);
          return response.json();
        } else {
          setSuccess(false);
        }
      })
      .then(result => {
        setEmail("");
        setPassword("");

        if (result) {
          // Login ok token is in result
          console.log("Success: " + JSON.stringify(result));
          // Redirect to home page after setting token to Redux store?
        }
      })
      .catch(e => console.error("Error: " + e));
  };

  return (
    <div>
      <Alert success={success} />
      <h1>Login</h1>
      <form onSubmit={login}>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="john.doe@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="*******"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit" className="btn btn-success my-3">
          Login
        </button>
      </form>
    </div>
  );
};
