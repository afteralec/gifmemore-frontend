import React from "react";
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
      <NavLink to="/">
      <span className="logo">gifMeMore.</span>
      </NavLink>
      <NavLink to="/checkout">Checkout</NavLink>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
}
