import React, { useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  return (
    <>
      {cart.map((gif) => (
        <p>gif component here, yo</p>
      ))}
    </>
  );
}
