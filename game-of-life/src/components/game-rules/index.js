import React from "react";
import { MakeGrid } from "../utils";

const rulesOfLife = () => {
  let g2 = MakeGrid();
  if (!stop) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let count = 0;
        if (i > 0) if (grid[i - 1][j] !== 0) count++; // top
        if (i > 0 && j > 0) if (grid[i - 1][j - 1] !== 0) count++; //top left
        if (i > 0 && j < grid[i].length - 1)
          if (grid[i - 1][j + 1] !== 0) count++; // top right
        if (j < grid[i].length - 1) if (grid[i][j + 1] !== 0) count++; //right
        if (j > 0) if (grid[i][j - 1] !== 0) count++; // left
        if (i < grid.length - 1) if (grid[i + 1][j] !== 0) count++; //bottom
        if (i < grid.length - 1 && j > 0) if (grid[i + 1][j - 1] !== 0) count++; //bottom left
        if (i < grid.length - 1 && j < grid[i].length - 1)
          if (grid[i + 1][j + 1] !== 0) count++; //bottom right

        // let mostLeft  = grid[i - 1][j - 1] || grid[i][j - 1];
        // let mostRigth = grid[i - 1][j + 1] || grid[i][j + 1];
        // let mostbottom = grid[i + 1][j + 1] || grid[i + 1][j] || grid[i + 1][j - 1];

        // #1 Any live cell with fewer than two live neighbors dies, as if caused by under-population.
        // #3 Any live cell with more than three live neighbors dies, as if by overcrowding.
        if (grid[i][j] !== 0 && (count < 2 || count > 3)) g2[i][j] = 0;

        // #2 Any live cell with two or three live neighbors lives on to the next generation.
        if (grid[i][j] !== 0 && (count === 2 || count === 3))
          g2[i][j] = color || 1;

        // #4 Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
        if (grid[i][j] === 0 && count === 3) g2[i][j] = color || 1;
      }
    }

    setGrid(g2);

    if (stop) {
      return null;
    }
  }
};

export default rulesOfLife;
