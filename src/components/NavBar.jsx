import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar({ gifs, user, handleClick }) {
  return (
    <div className="flow-left mx-1">
      <NavLink className="hover-link" to="/">
        <span className="logo">gifMeMore.</span>
      </NavLink>
      {gifs.length > 0 && (
        <NavLink className="fx-2 hover-link" to="/checkout">
          Checkout
        </NavLink>
      )}
      {user ? (
        <NavLink className="fx-2 hover-link" to="/" onClick={handleClick}>
          Log Out
        </NavLink>
      ) : (
        <>
          <NavLink className="fx-2 hover-link" to="/signup">
            Signup
          </NavLink>
          <NavLink className="fx-2 hover-link" to="/login">
            Login
          </NavLink>
        </>
      )}
      {user && (
        <NavLink className="fx-2 hover-link" to="/profile">
          Profile
        </NavLink>
      )}
    </div>
  );
}
