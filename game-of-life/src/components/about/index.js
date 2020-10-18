import React from "react";

const Rules = () => (
  <div className="rules">
    <h1>Rules for Conway's Game of Life</h1>
    <p>
      At the heart of this game are four rules that determine if a cell is live
      or dead. All depend on how many of that cell's neighbors are alive.{" "}
    </p>
    <ul>
      <li>
        {" "}
        <strong>Births: </strong>Each dead cell adjacent to exactly three live
        neighbors will become live in the next generation.
      </li>

      <li>
        {" "}
        <strong>Death by isolation: </strong>Each live cell with one or fewer
        live neighbors will die in the next generation.{" "}
      </li>
      <li>
        {" "}
        <strong>Death by overcrowding: </strong>Each live cell with four or more
        live neighbors will die in the next generation.
      </li>
      <li>
        {" "}
        <strong>Survival: </strong>Each live cell with either two or three live
        neighbors will remain alive for the next generation.{" "}
      </li>
    </ul>
    <p>
      Another important fact about the rules for the game of life is that all
      rules apply to all cells at the same time.{" "}
    </p>
  </div>
);

export default Rules;
