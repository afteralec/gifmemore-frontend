import React from "react";

export default function Profile({name, email, address}) {
  return (
    <div>
      Welcome {name} 
      <div>{name}</div>
      <div>{email}</div>
      <div>{address}</div>
    </div>
  );
}
