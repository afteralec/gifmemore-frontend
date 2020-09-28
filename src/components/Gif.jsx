import React from "react";

export default function Gif({ id, title, image, price, handleClick }) {
  return (
    <div className="px-s mx-s" onClick={() => handleClick(id)}>
      <img alt="gif by giphy" src={image} />
      <p>{title.split(" GIF by ")[0]}</p>
      <p>{price}</p>
    </div>
  );
}
