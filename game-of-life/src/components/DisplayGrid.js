import React, { useState } from "react";
import "./DisplayGrid.css";

function DisplayGrid({ grid, input, color }) {
  const [opacity, setOpacity] = useState(0);
  return (
    <div className="Grid-container">
      {grid.map((row, rowIndex) => {
        return (
          <div className="Grid-row" key={`${rowIndex}`}>
            {row.map((col, colIndex) => {
              let color = `rgb(${col[0]},${col[1]},${col[2]})`;
              return (
                <div
                  onClick={e => input(e)}
                  className={`Grid-column ${col !== 0 ? "living" : ""}`}
                  data-col={`${colIndex}`}
                  data-row={`${rowIndex}`}
                  key={`${colIndex}${rowIndex}`}
                  style={col !== 0 ? { background: color || "black" } : null} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default DisplayGrid;