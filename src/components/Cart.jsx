import React from "react";
import Gif from "./Gif";

export default function Cart({ gifs, handleClick }) {
  return (
    <>
      <div className="flex flex-wrap cart">
        {gifs.map((gif) => (
          <Gif key={gif.id} handleClick={handleClick} {...gif} />
        ))}
      </div>
    </>
  );
}
