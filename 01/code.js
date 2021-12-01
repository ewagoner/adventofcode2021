
const fs = require('fs');

const inputArray = fs.readFileSync('input.txt').toString().split("\n");

// Part One
let increases = 0;
let previous;

for(i in inputArray) {
  const value = parseInt(inputArray[i]);
  if (previous && value > previous) {
    increases++;
  }
  previous = value;
}

console.log(increases);


// Part Two
increases = 0;
previous = null;
let a;
let b;
let c;

for(i in inputArray) {
  c = parseInt(inputArray[i]);
  total = a + b + c;
  if (a && b && c && total > previous) {
    increases++;
  }

  a = b;
  b = c;
  previous = total;
}

console.log(increases);