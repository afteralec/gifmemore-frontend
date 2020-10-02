import React from "react";
import { Link } from "react-router-dom";

export default function OrderConfirmation() {
  return (
    <div className="flex flex-center flex-col flow mx-auto">
      <h3>Thank You For Your Order!</h3>
      <Link to="/">
        <button className="btn">Show Me The Gifs!</button>
      </Link>
    </div>
  );
}
