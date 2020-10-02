import React from "react";

export default function Gif({ id, title, image, price, handleClick }) {
  return (
    <>
      <img
        className="gif-hover"
        onClick={() => handleClick(id)}
        alt="gif by giphy"
        src={image}
      />
      {/* <p className="ps-f btm-0">{title.split(" GIF by ")[0]}</p> */}
      {/* <p>{price}</p> */}
    </>
  );
}
