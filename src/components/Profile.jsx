import React from "react";
import { NavLink } from "react-router-dom";

export default function Profile({ name, email, address, handleDelete }) {
  return (
    <div>
      Welcome {name}
      <div>{name}</div>
      <div>{email}</div>
      <div>{address}</div>
      <NavLink to="/" onClick={handleDelete}>
        Delete Profile
      </NavLink>
    </div>
  );
}
