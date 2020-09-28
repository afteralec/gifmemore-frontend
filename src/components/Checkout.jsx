import React from "react";
import Cart from "./Cart";
import OrderSummary from "./OrderSummary";

export default function Checkout({ gifs, remGifFromCart }) {
  return (
    <>
      <Cart id="checkoutCart" gifs={gifs} handleClick={remGifFromCart} />
      <OrderSummary gifs={gifs} />
    </>
  );
}
