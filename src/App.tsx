import { useState } from "react";
import "./App.css";
import "./transformations";
import {
  applyTransformation,
  Coord,
  FlipType,
  generateGrid,
  RotateType,
  TransformationType,
} from "./transformations";
import type { Grid } from "./transformations";

function GridComponent({
  grid,
  onCellClick,
  borders,
}: {
  grid: Grid;
  onCellClick?: (row: number, column: number) => void;
  borders?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}) {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div
              onClick={() => {
                onCellClick?.(rowIndex, cellIndex);
              }}
              className={getCellClasses(rowIndex, cellIndex, borders)}
              key={cellIndex}>
              <div
                className="cellinner"
                style={{ backgroundColor: ["#ff7777", "#ffff77", "#77ff77", "#7777ff"][cell] }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [grid, setGrid] = useState(generateGrid(8, 8, 4));

  const [positions, setPositions] = useState<Coord[]>([]);

  const canMove = positions.length >= 2 && (positions[0][0] !== positions[1][0] || positions[0][1] !== positions[1][1]);
  const canSquareMove =
    canMove &&
    Math.abs(positions[0][0] - positions[1][0]) === Math.abs(positions[0][1] - positions[1][1]);
  const canFlipX = canMove && positions[0][0] !== positions[1][0];
  const canFlipY = canMove && positions[0][1] !== positions[1][1];

  return (
    <div>
      <GridComponent
        grid={grid}
        borders={
          positions.length === 0
            ? undefined
            : {
                top: Math.min(...positions.map(p => p[0])),
                bottom: Math.max(...positions.map(p => p[0])),
                left: Math.min(...positions.map(p => p[1])),
                right: Math.max(...positions.map(p => p[1])),
              }
        }
        onCellClick={(row, col) => {
          if (positions.length >= 2) {
            setPositions([[row, col]]);
          } else {
            setPositions([...positions, [row, col]]);
          }
        }}
      />
      {canMove && (
        <div>
          {canFlipX && <button
            onClick={() => {
              setPositions([]);
              setGrid(
                applyTransformation(
                  grid,
                  positions[0],
                  positions[1],
                  TransformationType.Flip,
                  FlipType.X
                )
              );
            }}>
            Flip X
          </button>}
          {canFlipY && <button
            onClick={() => {
              setPositions([]);
              setGrid(
                applyTransformation(
                  grid,
                  positions[0],
                  positions[1],
                  TransformationType.Flip,
                  FlipType.Y
                )
              );
            }}>
            Flip Y
          </button>}
          {canSquareMove && (
            <>
              <button
                onClick={() => {
                  setPositions([]);
                  setGrid(
                    applyTransformation(
                      grid,
                      positions[0],
                      positions[1],
                      TransformationType.Flip,
                      FlipType.Pos
                    )
                  );
                }}>
                Flip +
              </button>
              <button
                onClick={() => {
                  setPositions([]);
                  setGrid(
                    applyTransformation(
                      grid,
                      positions[0],
                      positions[1],
                      TransformationType.Flip,
                      FlipType.Neg
                    )
                  );
                }}>
                Flip -
              </button>
              <button
                onClick={() => {
                  setPositions([]);
                  setGrid(
                    applyTransformation(
                      grid,
                      positions[0],
                      positions[1],
                      TransformationType.Rotate,
                      RotateType.R90
                    )
                  );
                }}>
                Rotate 90
              </button>
            </>
          )}
          <button
            onClick={() => {
              setPositions([]);
              setGrid(
                applyTransformation(
                  grid,
                  positions[0],
                  positions[1],
                  TransformationType.Rotate,
                  RotateType.R180
                )
              );
            }}>
            Rotate 180
          </button>
          {canSquareMove && (
            <button
              onClick={() => {
                setPositions([]);
                setGrid(
                  applyTransformation(
                    grid,
                    positions[0],
                    positions[1],
                    TransformationType.Rotate,
                    RotateType.R270
                  )
                );
              }}>
              Rotate 270
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
function getCellClasses(
  rowIndex: number,
  cellIndex: number,
  borders: { top: number; bottom: number; left: number; right: number } | undefined
): string | undefined {
  const classes = ["cell"];

  if (borders) {
    if (rowIndex === borders.top && cellIndex >= borders.left && cellIndex <= borders.right) {
      classes.push("cellbordertop");
    }
    if (rowIndex === borders.bottom && cellIndex >= borders.left && cellIndex <= borders.right) {
      classes.push("cellborderbottom");
    }
    if (cellIndex === borders.left && rowIndex >= borders.top && rowIndex <= borders.bottom) {
      classes.push("cellborderleft");
    }
    if (cellIndex === borders.right && rowIndex >= borders.top && rowIndex <= borders.bottom) {
      classes.push("cellborderright");
    }
  }

  return classes.join(" ");
}
