import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import Column from "./Column";
import OrderSummary from "./OrderSummary";
import OrderForm from "./OrderForm";
import { fetchCartTotal } from "../services/api2";

export default function Checkout({
  gifs,
  remGifFromCart,
  setOrderConf,
  emptyCart,
}) {
  const [total, setTotal] = useState("Calculating...");

  useEffect(() => {
    getTotalCost();
  });

  useEffect(() => {
    getTotalCost();
  });

  function getTotalCost() {
    const ids = itemIds();
    fetchCartTotal({ item_ids: ids }).then(setTotal);
  }

  function itemIds() {
    return gifs.map((gif) => gif.id);
  }

  return (
    <div className="flex">
      <Column gifs={gifs} handleClick={remGifFromCart} />
      <div className="flex flex-col">
        <OrderSummary gifs={gifs} total={total} handleClick={remGifFromCart} />
        <OrderForm
          total={total}
          itemIds={itemIds()}
          setOrderConf={setOrderConf}
          emptyCart={emptyCart}
        />
      </div>
    </div>
  );
}
