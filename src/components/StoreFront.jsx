import React from "react";
import Gif from "./Gif";

export default function StoreFront({ gifs, handleClick }) {
  return (
    <div className="flex flex-wrap">
      {gifs.map((gif) => (
        <Gif key={gif.id} handleClick={handleClick} {...gif} />
      ))}
    </div>
  );
}
