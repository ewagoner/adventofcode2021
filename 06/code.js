const fs = require('fs');
const inputArray = fs.readFileSync('input.txt').toString().split(",").map(Number);

function countFish(days) {
  const fishPerDay = new Array(9).fill(0); // Array of number of fish at each day remaining
  inputArray.forEach(f => (fishPerDay[f]++)); // Populate the array based on the input

  for (let d = 0; d < days; d++){
      const fish = fishPerDay.shift();  // The number of fish at zero
      (fishPerDay.push(fish)) && (fishPerDay[6] += fish); // Put that many fish at eight and add this number to six
  }

  return fishPerDay.reduce((a, b) => a + b, 0); // add up all the fish
}

// Part One
console.log(countFish(80));

// Part Two
console.log(countFish(256));