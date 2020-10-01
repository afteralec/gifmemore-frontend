import React from "react";
import { useHistory } from 'react-router-dom';

export default function Profile({name, email, address, handleDelete}) {
  
  const history = useHistory()

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
