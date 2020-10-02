import React from "react";

export default function OrderSummary({ gifs, total, handleClick }) {
  return (
    <div className="cont-order-summary ">
      {gifs.map((gif) => (
        <div
          onClick={() => handleClick(gif.id)}
          className="item-div"
          key={gif.id}
        >
          <p>{gif.title}</p>
          <p>${gif.price}</p>
        </div>
      ))}
      <p className="item-div">
        <strong>Total: </strong>${parseFloat(total).toFixed(2)}
      </p>
    </div>
  );
}
