import React from "react";

export default function Gif({ title, image, price }) {
  return (
    <div className="px-s">
      <img alt="gif by giphy" src={image} />
      <p>{title.split(" GIF by ")[0]}</p>
      <p>{price}</p>
    </div>
  );
}
