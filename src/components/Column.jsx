import React from "react";
import Gif from "./Gif";

export default function Column({ gifs, handleClick }) {
  return (
    <div className="column">
      {gifs.map((gif) => (
        <Gif key={gif.id} {...gif} handleClick={handleClick} />
      ))}
    </div>
  );
}
