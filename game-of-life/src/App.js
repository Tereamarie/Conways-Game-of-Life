import React, { useEffect, useState, useRef} from "react";
import DisplayGrid from "./components/DisplayGrid.js";
import "./App.css";
import About from "./components/about";
import { hexToRGB, useInterval } from "./components/utils";
let tempArr;
let stop = false;

function App() {
  ///////Hook/////
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState(20);
  const [speed, setSpeed] = useState(200);
  const [interval, setInterval] = useState(null);
  const [changeState, setChangeState] = useState(false);
  const [color, setColor] = useState("");

  ///////////////Create grid///////////
  const makeGrid = () => {
    let arr = [];
    for (let i = 0; i < gridSize; i++) {
      arr[i] = [];
      for (let j = 0; j < gridSize; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  };

  useEffect(() => {
    let arr = makeGrid();
    setGrid(arr);
  }, [tempArr]);

  useEffect(() => {
    let arr = makeGrid();
    setGrid(arr);
  }, [gridSize]);

  //   ============== Controller  ==============  //
  const handleGridSizeChange = e => {
    e.preventDefault();
    setGridSize(e.target.value);
  };

  const handleSpeedChange = e => {
    e.preventDefault();
    setSpeed(e.target.value);
  };
  const runGame = () => {
    setInterval(speed);
  };
  const pauseGameOfLife = () => {
    setInterval(null);
  };
  useInterval(() => {
    rulesOfLife();
  }, interval);
  const clear = () => {
    let tempArr = makeGrid();
    setGrid(tempArr);
    setInterval(null);
  };
  const colorChange = e => {
    let color = e.target.value;
    e.preventDefault();
    let rgb = hexToRGB(color);
    setColor(rgb);
  };
  const manualInput = e => {
    e.preventDefault();
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    let newGrid = grid;
    newGrid[row][col] === 0
      ? (newGrid[row][col] = color)
      : (newGrid[row][col] = 0);
    setGrid(newGrid);
    changeState === false ? setChangeState(true) : setChangeState(false);
  };
  ///////////////////////////
  const rulesOfLife = () => {
    let g2 = makeGrid();
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
          if (i < grid.length - 1 && j > 0)
            if (grid[i + 1][j - 1] !== 0) count++; //bottom left
          if (i < grid.length - 1 && j < grid[i].length - 1)
            if (grid[i + 1][j + 1] !== 0) count++; //bottom right
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

  // ============== Algorithm for conway's rules of life ============== //

  ///// =========Make cross ======= //////
  const makeCross = () => {
    let tempArr = makeGrid();
    let len = tempArr.length;
    len = len % 2 === 0 ? len : len - 1;
    for (let i = 0; i < len; i++) {
      tempArr[i][len / 2] = 1;
    }
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[len / 2 - 1][i] = 1;
    }
    setGrid(tempArr);
  };

  return (
    <div className="App">
      <h1>Game Of Life</h1>
      <div className="control-box">
        <div className="controller">
          {" "}
          Speed:{" "}
          <input
            type="number"
            value={speed}
            onChange={handleSpeedChange}
          />{" "}
        </div>
        <div className="controller">
          {" "}
          Size:{" "}
          <input
            type="number"
            value={gridSize}
            onChange={handleGridSizeChange}
          />
        </div>
      </div>
      <DisplayGrid color={color} input={manualInput} grid={grid} />
      <div className="control-box">
        <button onClick={runGame} className="controller">
          {" "}
          Start
        </button>
        <button onClick={e => pauseGameOfLife(e)} className="controller">
          {" "}
          Pause
        </button>
        <button onClick={e => clear(e)} className="controller">
          {" "}
          Clear{" "}
        </button>
        <button onClick={makeCross} className="controller">
          {" "}
          Cross{" "}
        </button>
        <input
          onChange={colorChange}
          type="color"
          name="ColorPicker"
          className="controller color"
        />
      </div>
      <About />
    </div>
  );
}

export default App;

// export function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }
