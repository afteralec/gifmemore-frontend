import React from "react";
import Gif from "./Gif";
import { Link } from "react-router-dom";

export default function Cart({ gifs, handleClick, linkTo, buttonText }) {
  return (
    <>
      <div className="flex flex-wrap">
        {gifs.map((gif) => (
          <Gif key={gif.id} handleClick={handleClick} {...gif} />
        ))}
      </div>
      <Link to={linkTo}>
        {gifs.length > 0 && <button>{buttonText}</button>}
      </Link>
    </>
  );
}
