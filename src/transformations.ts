export type Grid<T = number> = T[][];
export type Coord = [r: number, c: number];

export function generateGrid(rows: number, columns: number, colours: number): Grid {
  const offset = colours / Math.floor(Math.sqrt(colours));
  return new Array(rows).fill(0).map((_, r) =>
    new Array(columns).fill(0).map((_, c) => {
      return (c + offset * r) % colours;
    })
  );
}

export function gridToString(grid: Grid) {
  return grid.map(i => i.join(" ")).join("\n");
}

function renderGrid(grid: Grid, note?: string) {
  console.log(`${gridToString(grid)}\n${note ?? ""}----`);
}

export function flipX(grid: Grid, [top, left]: Coord, [bottom, right]: Coord): Grid {
  const newGrid: Grid = [];
  for (let r = 0; r < grid.length; r++) {
    newGrid[r] = [];
    for (let c = 0; c < grid[0].length; c++) {
      if (r >= top && r <= bottom && c >= left && c <= right) {
        newGrid[r][c] = grid[top + bottom - r][c];
      } else {
        newGrid[r][c] = grid[r][c];
      }
    }
  }
  renderGrid(newGrid);
  return newGrid;
}

export function flipY(grid: Grid, [top, left]: Coord, [bottom, right]: Coord): Grid {
  const newGrid: Grid = [];
  for (let r = 0; r < grid.length; r++) {
    newGrid[r] = [];
    for (let c = 0; c < grid[0].length; c++) {
      if (r >= top && r <= bottom && c >= left && c <= right) {
        newGrid[r][c] = grid[r][left + right - c];
      } else {
        newGrid[r][c] = grid[r][c];
      }
    }
  }
  renderGrid(newGrid);
  return newGrid;
}

export function flipPos(grid: Grid, [top, left]: Coord, [bottom, right]: Coord): Grid {
  const newGrid: Grid = [];
  for (let r = 0; r < grid.length; r++) {
    newGrid[r] = [];
    for (let c = 0; c < grid[0].length; c++) {
      if (r >= top && r <= bottom && c >= left && c <= right) {
        newGrid[r][c] = grid[top + right - c][left + bottom - r];
      } else {
        newGrid[r][c] = grid[r][c];
      }
    }
  }
  renderGrid(newGrid);
  return newGrid;
}

export function flipNeg(grid: Grid, [top, left]: Coord, [bottom, right]: Coord): Grid {
  const newGrid: Grid = [];
  for (let r = 0; r < grid.length; r++) {
    newGrid[r] = [];
    for (let c = 0; c < grid[0].length; c++) {
      if (r >= top && r <= bottom && c >= left && c <= right) {
        newGrid[r][c] = grid[top + c - left][left + r - top];
      } else {
        newGrid[r][c] = grid[r][c];
      }
    }
  }
  renderGrid(newGrid);
  return newGrid;
}

export function rotate90(grid: Grid, [top, left]: Coord, [bottom, right]: Coord): Grid {
  const newGrid: Grid = [];
  for (let r = 0; r < grid.length; r++) {
    newGrid[r] = [];
    for (let c = 0; c < grid[0].length; c++) {
      if (r >= top && r <= bottom && c >= left && c <= right) {
        newGrid[r][c] = grid[top + right - c][left + r - top];
      } else {
        newGrid[r][c] = grid[r][c];
      }
    }
  }
  renderGrid(newGrid);
  return newGrid;
}

export function rotate270(grid: Grid, [top, left]: Coord, [bottom, right]: Coord): Grid {
  const newGrid: Grid = [];
  for (let r = 0; r < grid.length; r++) {
    newGrid[r] = [];
    for (let c = 0; c < grid[0].length; c++) {
      if (r >= top && r <= bottom && c >= left && c <= right) {
        newGrid[r][c] = grid[top + c - left][left + bottom - r];
      } else {
        newGrid[r][c] = grid[r][c];
      }
    }
  }
  renderGrid(newGrid);
  return newGrid;
}

export function rotate180(grid: Grid, [top, left]: Coord, [bottom, right]: Coord): Grid {
  const newGrid: Grid = [];
  for (let r = 0; r < grid.length; r++) {
    newGrid[r] = [];
    for (let c = 0; c < grid[0].length; c++) {
      if (r >= top && r <= bottom && c >= left && c <= right) {
        newGrid[r][c] = grid[top + bottom - r][left + right - c];
      } else {
        newGrid[r][c] = grid[r][c];
      }
    }
  }
  renderGrid(newGrid);
  return newGrid;
}

export enum TransformationType {
  Flip,
  Rotate,
}

export enum FlipType {
  X,
  Y,
  Pos,
  Neg,
}

export enum RotateType {
  R90,
  R180,
  R270,
}

export function applyTransformation(
  grid: Grid,
  pos1: Coord,
  pos2: Coord,
  type: TransformationType.Flip,
  value: FlipType
): Grid;
export function applyTransformation(
  grid: Grid,
  pos1: Coord,
  pos2: Coord,
  type: TransformationType.Rotate,
  value: RotateType
): Grid;
export function applyTransformation(
  grid: Grid,
  pos1: Coord,
  pos2: Coord,
  type: TransformationType,
  value: FlipType | RotateType
): Grid {
  const topLeft: Coord = [Math.min(pos1[0], pos2[0]), Math.min(pos1[1], pos2[1])];
  const bottomRight: Coord = [Math.max(pos1[0], pos2[0]), Math.max(pos1[1], pos2[1])];

  switch (type) {
    case TransformationType.Flip:
      switch (value) {
        case FlipType.X:
          return flipX(grid, topLeft, bottomRight);
        case FlipType.Y:
          return flipY(grid, topLeft, bottomRight);
        case FlipType.Pos:
          return flipPos(grid, topLeft, bottomRight);
        case FlipType.Neg:
          return flipNeg(grid, topLeft, bottomRight);
      }
      break;
    case TransformationType.Rotate:
      switch (value) {
        case RotateType.R90:
          return rotate90(grid, topLeft, bottomRight);
        case RotateType.R180:
          return rotate180(grid, topLeft, bottomRight);
        case RotateType.R270:
          return rotate270(grid, topLeft, bottomRight);
      }
      break;
  }

  throw new Error("Invalid transformation type");
}

function applyRandomTransformation(grid: Grid): Grid {
  const top = Math.floor(Math.random() * (grid.length - 2));
  const bottom = Math.floor(Math.random() * (grid.length - 2 - top)) + top + 2;
  const size = bottom - top;
  const left = Math.floor(Math.random() * (grid[0].length - size));
  const right = left + size;

  const transformationType =
    Math.random() < 0.5 ? TransformationType.Flip : TransformationType.Rotate;
  if (transformationType === TransformationType.Flip) {
    const flipType = [FlipType.X, FlipType.Y, FlipType.Pos, FlipType.Neg][
      Math.floor(Math.random() * 4)
    ];
    console.log(
      [top, left],
      [bottom, right],
      TransformationType[transformationType],
      FlipType[flipType]
    );
    return applyTransformation(grid, [top, left], [bottom, right], transformationType, flipType);
  } else {
    const rotateType = [RotateType.R90, RotateType.R180, RotateType.R270][
      Math.floor(Math.random() * 3)
    ];
    console.log(
      [top, left],
      [bottom, right],
      TransformationType[transformationType],
      RotateType[rotateType]
    );
    return applyTransformation(grid, [top, left], [bottom, right], transformationType, rotateType);
  }
}

export function applyRandomTransformations(grid: Grid, count: number): Grid {
  let transformedGrid = grid;
  for (let i = 0; i < count; i++) {
    transformedGrid = applyRandomTransformation(transformedGrid);
  }
  return transformedGrid;
}
