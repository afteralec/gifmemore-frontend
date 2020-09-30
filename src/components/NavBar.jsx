import React from "react";
import { NavLink } from 'react-router-dom'

export default function NavBar({user, handleClick}) {
  return (
    <div>
      <NavLink to="/">
      <span className="logo">gifMeMore.</span>
      </NavLink>
      <NavLink to="/checkout">Checkout</NavLink>
      {user ? <NavLink to='/' onClick={handleClick}>Log Out</NavLink> : <NavLink to="/login">Login</NavLink>}
      {user && <NavLink to='/profile'>Profile</NavLink>}
    </div>
  );
}
