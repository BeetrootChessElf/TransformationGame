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

function renderGrid(grid: Grid) {
  console.log(gridToString(grid) + "\n----");
}

export function flipX(grid: Grid, [top, left]: Coord, [bottom, right]: Coord): Grid {
  const newGrid: Grid = [];
  for (let r = 0; r < grid.length; r++) {
    newGrid[r] = [];
    for (let c = 0; c < grid[0].length; c++) {
      if (r >= top && r <= bottom && c >= left && c <= right) {
        newGrid[r][c] = grid[top+bottom - r][c];
      } else {
        newGrid[r][c] = grid[r][c]
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
        newGrid[r][c] = grid[r][c]
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
        newGrid[r][c] = grid[r][c]
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
        newGrid[r][c] = grid[r][c]
      }
    }
  }
  renderGrid(newGrid);
  return newGrid;
}


export function rotate90C(grid: Grid, [top, left]: Coord, [bottom, right]: Coord): Grid {
  const newGrid: Grid = [];
  for (let r = 0; r < grid.length; r++) {
    newGrid[r] = [];
    for (let c = 0; c < grid[0].length; c++) {
      if (r >= top && r <= bottom && c >= left && c <= right) {
        newGrid[r][c] = grid[top + right - c][left + r - top];
      } else {
        newGrid[r][c] = grid[r][c]
      }
    }
  }
  renderGrid(newGrid);
  return newGrid;
}

export function rotate90A(grid: Grid, [top, left]: Coord, [bottom, right]: Coord): Grid {
  const newGrid: Grid = [];
  for (let r = 0; r < grid.length; r++) {
    newGrid[r] = [];
    for (let c = 0; c < grid[0].length; c++) {
      if (r >= top && r <= bottom && c >= left && c <= right) {
        newGrid[r][c] = grid[top + c - left][left + bottom - r];
      } else {
        newGrid[r][c] = grid[r][c]
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
        newGrid[r][c] = grid[r][c]
      }
    }
  }
  renderGrid(newGrid);
  return newGrid;
}
