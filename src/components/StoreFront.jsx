import React from "react";
import Column from "./Column";

export default function StoreFront({ gifs, handleClick }) {
  return (
    <div className="flex flex-start">{renderColumns(gifs, handleClick)}</div>
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
