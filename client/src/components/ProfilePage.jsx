import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert } from "./Alert.jsx";

/* Refactor to be used in Register page as well? */
const UserForm = props => {
  const auth = useSelector(state => state.auth);
  const user = props.formData.user;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  /* Password field does not update anything currently */
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user.role);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(null);

  const update = e => {
    e.preventDefault();
    const updatedUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role
    };

    fetch(user.links[0].self, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    })
      .then(response => {
        if (response.ok) {
          setAlertType("success");
          setAlertMessage("User info updated");
        } else {
          setAlertType("danger");
          setAlertMessage("Failed to update user info");
        }
      })
      .catch(e => console.error("Error: " + e));
  };

  const deleteUser = e => {
    fetch(user.links[0].self, {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          setAlertType("success");
          setAlertMessage("User deleted");
        } else {
          setAlertType("danger");
          setAlertMessage("Failed to delete user");
        }
      })
      .catch(e => console.error("Error: " + e));
  };

  return (
    <div>
      <form onSubmit={update}>
        <div className="form-group">
          <label>First name</label>
          <input
            className="form-control"
            placeholder="John"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last name</label>
          <input
            className="form-control"
            placeholder="Doe"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="john.doe@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <select
          className="form-control"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="shopkeeper">Shopkeeper</option>
          {auth.role === "admin" ? <option value="admin">Admin</option> : null}
        </select>
        <br />
        <button type="submit" className="btn btn-primary my-3">
          Save
        </button>
        <button
          type="button"
          onClick={deleteUser}
          className="btn btn-danger my-3 ml-3"
        >
          Delete user
        </button>
      </form>
      <Alert type={alertType} message={alertMessage} />
    </div>
  );
};

export const ProfilePage = () => {
  const [formData, setFormData] = useState(null);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.token) {
      fetch("http://localhost:5000/api/users/" + auth.id)
        .then(response => response.json())
        .then(data => {
          setFormData(data);
        });
    }
  }, [auth]);

  if (!auth.token) {
    return (
      <div className="alert alert-danger" role="alert">
        No user logged in
      </div>
    );
  } else {
    return (
      <div>
        <h1>Profile page</h1>
        {formData ? <UserForm formData={formData} /> : null}
      </div>
    );
  }
};
