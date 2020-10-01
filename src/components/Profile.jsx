import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import FormField from "./FormField";

export default function Profile({ name, email, address, handleDelete }) {
  const [showForms, setShowForms] = useState([]);
  const [formName, setName] = useState(name);
  const [formEmail, setEmail] = useState(email);

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
    <div>
      Welcome {name}
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
        <div onClick={() => handleClick("name")}>{name}</div>
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
        <div onClick={() => handleClick("email")}>{email}</div>
      )}
      <div>{address}</div>
      <NavLink to="/" onClick={handleDelete}>
        Delete Profile
      </NavLink>
    </div>
  );
}
