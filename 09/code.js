const fs = require('fs');
const inputArray = fs.readFileSync('input.txt').toString().split("\n");

const heights = [];
for (const line of inputArray) {
  const lineArray = line.split("").map(Number);
  heights.push(lineArray);
}

// Day One

const lows = [];
for (const row in heights) {
  for (const column in heights[row]) {
    const above = parseInt(row)-1;
    const below = parseInt(row)+1;
    const left = parseInt(column)-1;
    const right = parseInt(column)+1;
    let highs = 0;

    if (above === -1 || (heights[above][column] > heights[row][column])) highs++; // above
    if (below === heights.length || (heights[below][column] > heights[row][column])) highs++; // below
    if (left === -1 || (heights[row][left] > heights[row][column])) highs++; // left
    if (right === heights[row].length || (heights[row][right] > heights[row][column])) highs++; // right

    if (highs === 4) {
      lows.push(heights[row][column])
    }
  }
}

const risk = lows.reduce((a, b) => a + b, 0) + lows.length;

console.log(risk)

// Day Two
for (const row in heights) {
  for (const column in heights[row]) {
    if (heights[row][column] !== 9) heights[row][column] = 0;
  }
}

const visited = [];
const basins = [];

function inBasin (row, column) {
  if (visited.includes(`${row},${column}`))
    return 0;
  else {
    visited.push(`${row},${column}`)
  }
  if (row < 0 || row >= heights.length) {
    return 0;
  }
  if (column < 0 || column >= heights[0].length) {
    return 0;
  }
  if (heights[row][column] === 9) {
    return 0;
  }

  let size = 1;

  size += inBasin(row - 1, column);
  size += inBasin(row + 1, column);
  size += inBasin(row, column - 1);
  size += inBasin(row, column + 1);
  return size;
}

for (const row in heights) {
  for (const column in heights[row]) {
    const size = inBasin(parseInt(row), parseInt(column));
    if (size > 0) {
      basins.push(size)
    }
  }
}

basins.sort((a,b) => b - a);
console.log(basins[0] * basins[1] * basins[2]);
