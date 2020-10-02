import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import FormField from "./FormField";
import { updateUser } from "../services/api2";

export default function Profile({ name, email, setUser, handleDelete }) {
  const [showForms, setShowForms] = useState([]),
    [formName, setName] = useState(name),
    [formEmail, setEmail] = useState(email);

  function showFormField(name) {
    setShowForms((state) => [...state, name]);
  }

  function hideFormField(name) {
    setShowForms(showForms.filter((showName) => showName !== name));
  }

  function showForm(name) {
    return showForms.includes(name);
  }

  function handleSubmit(event, name) {
    event.preventDefault();

    hideFormField(name);

    let value;

    switch (name) {
      case "name":
        value = formName;
        break;
      case "email":
        value = formEmail;
        break;
      default:
        break;
    }

    setUser((user) => ({ ...user, [name]: value }));
    updateUser({ [name]: value });
  }

  function handleClick(name) {
    if (showForms.includes(name)) {
      hideFormField(name);
    } else {
      showFormField(name);
    }
  }

  function handleChange(event) {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="flex flex-col flex-center flow fx-2">
      <p>Welcome, {name}!</p>
      <p>Click a field below to edit your profile.</p>
      {showForm("name") ? (
        <FormField
          type="text"
          name="name"
          placeholder={name}
          value={formName}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      ) : (
        <div onClick={() => handleClick("name")}>
          <span className="profile-link">Name: {name}</span>
        </div>
      )}
      {showForm("email") ? (
        <FormField
          type="text"
          name="email"
          placeholder={email}
          value={formEmail}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      ) : (
        <div onClick={() => handleClick("email")}>
          <span className="profile-link">Email: {email}</span>
        </div>
      )}
      <NavLink className="delete-link" to="/" onClick={handleDelete}>
        Delete Profile
      </NavLink>
    </div>
  );
}
