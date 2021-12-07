const fs = require('fs');
const inputArray = fs.readFileSync('input.txt').toString().split(",").map(Number);

const min = Math.min(...inputArray);
const max = Math.max(...inputArray);

// Day One

let fuel = max * max;
for (let i = min; i <= max; i++) {
  let thisFuel = 0;
  for (const crab of inputArray) {
    thisFuel = thisFuel + Math.abs(i - crab);
  }
  if (thisFuel < fuel) {
    fuel = thisFuel;
  }
}

console.log(fuel)

// Day Two

fuel = max * max * max * max;
for (let i = min; i <= max; i++) {
  let thisFuel = 0;
  for (const crab of inputArray) {
    const steps = Array.from({length: Math.abs(i - crab)}, (_, n) => n + 1);
    thisFuel = thisFuel + steps.reduce((a, b) => a + b, 0);
  }
  if (thisFuel < fuel) {
    fuel = thisFuel;
  }
}

console.log(fuel)