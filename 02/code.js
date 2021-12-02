const fs = require('fs');
const inputArray = fs.readFileSync('input.txt').toString().split("\n");

// Part One
/*
let position = 0;
let depth = 0;
for(i in inputArray) {
  const lineArray = inputArray[i].split(" ");
  const direction = lineArray[0];
  const distance = parseInt(lineArray[1]);

  switch (direction) {
    case "forward":
      position = position + distance;
      break;
    case "up":
      depth = depth - distance;
      break;
    case "down":
      depth = depth + distance;
      break;
  }
}

const product = position * depth;
console.log(`${position} * ${depth} = ${product}`);
*/

// Part Two
let aim = 0;
let depth = 0;
let position = 0;
for(i in inputArray) {
  const lineArray = inputArray[i].split(" ");
  const direction = lineArray[0];
  const distance = parseInt(lineArray[1]);

  switch (direction) {
    case "forward":
      position = position + distance;
      depth = depth + (aim * distance);
      break;
    case "up":
      aim = aim - distance;
      break;
    case "down":
      aim = aim + distance;
      break;
  }
}

const product = position * depth;
console.log(`${position} * ${depth} = ${product}`);
