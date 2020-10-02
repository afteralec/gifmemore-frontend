import React from "react";

export default function OrderSummary({ gifs, total }) {
  return (
    <div className="cont-order-summary " >
      {gifs.map((gif) => (
        <div className="item-div" key={gif.id}>
          <p >{gif.title}</p>
          <p >${gif.price}</p>
        </div>
      ))}
      <p className="item-div">
        <strong>Total: </strong>
        {/* {gifs.reduce((memo, gif) => memo + gif.price, 0)} */}
        ${total}
      </p>
    </div>
  );
}
