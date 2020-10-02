import React from "react";
import { Link } from "react-router-dom";

export default function OrderConfirmation({ confirmation }) {
  return (
    <div className="flex flex-center flex-col flow mx-auto">
      <h3>Thank You For Your Order!</h3>
      <div>{confirmation && <h4>Order Details Here</h4>}</div>
      <Link to="/">
        <button className="btn">Show Me The Gifs!</button>
      </Link>
    </div>
  );
}
