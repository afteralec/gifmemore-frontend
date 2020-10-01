import React from "react";
import Column from "./Column";
import Gif from "./Gif";

export default function StoreFront({ gifs, handleClick }) {
  return (
    <div className="flex flex-start storefront">
      {renderColumns(gifs, handleClick)}
      {/* {gifs.map((gif) => (
        <Gif key={gif.id} handleClick={handleClick} {...gif} />
      ))} */}
    </div>
  );
}

function renderColumns(gifs, handleClick, colHeight = 10) {
  const columns = [[]];

  const columnGifs = [...gifs];
  let colIdx = 0;

  while (columnGifs.length > 0) {
    while (columns[colIdx].length < colHeight) {
      columns[colIdx].push(columnGifs.pop());
    }
    colIdx++;
    if (!columns[colIdx]) columns.push([]);
  }

  const columnComponents = [];

  let i = 0;
  for (const column of columns) {
    columnComponents.push(
      <Column key={i} gifs={column} handleClick={handleClick} />
    );
    i++;
  }

  return <>{columnComponents}</>;
}
