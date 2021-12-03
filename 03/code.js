const fs = require('fs');
const inputArray = fs.readFileSync('input.txt').toString().split("\n");

// Part One

const lines = inputArray.length;
const oneCount = [];
for (i in inputArray[0]) {
  oneCount[i] = 0;
}
const gammaArray = Object.assign([], oneCount);
const epsilonArray = Object.assign([], oneCount);


for(i in inputArray) {
  const line = inputArray[i];
  for (x in line) {
    if (line[x] === "1") {
      oneCount[x]++;
    }
  }
}

for (i in oneCount) {
  if (oneCount[i] > (lines / 2)) {
    gammaArray[i] = 1;
  } else {
    epsilonArray[i] = 1;
  }
}
const gamma = parseInt(gammaArray.join(""), 2);
const epsilon = parseInt(epsilonArray.join(""), 2);

console.log(`${gamma} * ${epsilon} = ${gamma * epsilon}`);

// Part Two

function arrayFilter(unfilteredArray, testChar, rating) {

  if (unfilteredArray.length === 1) {
    return unfilteredArray;
  }

  let count = 0;
  let greatest = "0";
  const lines = unfilteredArray.length;
  for(i in unfilteredArray) {
    count = count + parseInt(unfilteredArray[i][testChar]);
  }

  if (count >= (lines / 2)) {
    greatest = "1";
  }

  if (rating === "oxygen") {
    filteredArray = unfilteredArray.filter(line => line[testChar] === greatest)
  } else {
    filteredArray = unfilteredArray.filter(line => line[testChar] !== greatest)
  }

  return filteredArray;
}

let oxygenRatingArray = Object.assign([], inputArray);
let co2RatingArray = Object.assign([], inputArray);

for (x in oxygenRatingArray[0]) {
  oxygenRatingArray = arrayFilter(oxygenRatingArray, x, "oxygen")
}

for (x in co2RatingArray[0]) {
  co2RatingArray = arrayFilter(co2RatingArray, x, "co2")
}

const oxygen = parseInt(oxygenRatingArray.join(""), 2);
const co2 = parseInt(co2RatingArray.join(""), 2);
console.log(`${oxygen} * ${co2} = ${oxygen * co2}`);