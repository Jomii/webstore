import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserForm } from "./UserForm.jsx";

export const ProfilePage = () => {
  const [formData, setFormData] = useState(null);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.token) {
      fetch("http://localhost:5000/api/users/" + auth.id)
        .then(response => response.json())
        .then(data => {
          setFormData(data.user);
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
