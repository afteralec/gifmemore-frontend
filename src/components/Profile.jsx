import React from "react";

export default function Profile({ name, email, address, handleDelete }) {
  return (
    <div>
      Welcome {name}
      <div>{name}</div>
      <div>{email}</div>
      <div>{address}</div>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
}
