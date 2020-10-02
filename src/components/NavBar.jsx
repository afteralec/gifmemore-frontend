import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function NavBar({
  gifs,
  user,
  handleClick,
  toggleCart,
  cartLength,
}) {
  function handleScroll() {
    if (window.scrollY > 30) {
      document.querySelector(".logo").classList.add("logo-scrolled");
      document.querySelector(".icon-cart").classList.add("icon-cart-scrolled");
    } else {
      document.querySelector(".logo").classList.remove("logo-scrolled");
      document
        .querySelector(".icon-cart")
        .classList.remove("icon-cart-scrolled");
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="navbar" className="flow-left mx-1">
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
      <span
        onClick={toggleCart}
        className="icon-cart"
        role="img"
        aria-label="cart"
      >
        &#x1F6D2;
        {cartLength > 0 && cartLength}
      </span>
    </div>
  );
}
