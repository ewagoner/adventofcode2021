const fs = require('fs');
const inputArray = fs.readFileSync('input.txt').toString().split("\n");

const seabed = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
const vents = [];

for (const vent of inputArray) {
  const ventArray = [];
  const endpoints = vent.split(" -> ");
  ventArray.push(endpoints[0].split(",").map(Number));
  ventArray.push(endpoints[1].split(",").map(Number));
  vents.push(ventArray);
}

// Part One
// const part = 1;

// Part Two
const part = 2;

for (const vent of vents) {
  let x1 = vent[0][0];
  let x2 = vent[1][0];
  let y1 = vent[0][1];
  let y2 = vent[1][1];

  if (x1 === x2) {
    if (y1 > y2) {
      [y1, y2] = [y2, y1];
    }
    for (let y = y1; y <= y2; y++) {
      seabed[x1][y]++;
    }
  } else if (y1 === y2) {
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
    }
    for (let x = x1; x <= x2; x++) {
      seabed[x][y1]++;
    }
  } else if (part === 2) {
    const distance = Math.abs(x2 - x1);
    for (let i = 0; i <= distance; i++) {
      if (y1 > y2 && x1 > x2) {
        seabed[x1 - i][y1 - i]++;
      } else if (y1 > y2) {
        seabed[x1 + i][y1 - i]++;
      } else if (x1 > x2) {
        seabed[x1 - i][y1 + i]++;
      } else {
        seabed[x1 + i][y1 + i]++;
      }
    }
  }
}

let multiples = 0;
for (const coordinate of seabed.flat(1)) {
  if (coordinate > 1) {
    multiples++;
  }
}

console.log(multiples);