import React from "react";

export default function OrderSummary({ gifs, total }) {
  return (
    <div>
      {gifs.map((gif) => (
        <div key={gif.id}>
          <p>{gif.title}</p>
          <p>${gif.price}</p>
        </div>
      ))}
      <p>
        <strong>Total: </strong>
        {/* {gifs.reduce((memo, gif) => memo + gif.price, 0)} */}
        ${total}
      </p>
    </div>
  );
}
