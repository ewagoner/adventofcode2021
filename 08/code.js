const fs = require('fs');
const inputArray = fs.readFileSync('input.txt').toString().split("\n");

// Day One
/*
const lines = [];
for (const line of inputArray) {
  const entry = line.split(" | ");
  lines.push([entry[0].split(" "), entry[1].split(" ")]);
}

let outputs = [];
for (const output of lines) {
  outputs.push(output[1]);
}
outputs = outputs.flat(1);

lengths = [2,3,4,7];

let count = 0;
for (const entry of outputs) {
  if (lengths.includes(entry.length)) {
    count++
  }
}

console.log(count)
*/

// Day Two

const lines = [];
for (const line of inputArray) {
  const entry = line.split(" | ");
  lines.push([...entry[0].split(" "), ...entry[1].split(" ")]);
}
let total = 0;

for (const line of lines) {
  const digits = new Array(10).fill("");
  const bars = {
    top: "",
    upperLeft: "",
    upperRight: "",
    middle: "",
    lowerLeft: "",
    lowerRight: "",
    bottom: ""
  };
  for (const thing in line) {
    if (line[thing].length === 2) {
      digits[1] = line[thing];
        line[thing] = 1;
    } else if (line[thing].length === 3) {
      digits[7] = line[thing];
      line[thing] = 7;
    } else if (line[thing].length === 4) {
      digits[4] = line[thing];
      line[thing] = 4;
    } else if (line[thing].length === 7) {
      digits[8] = line[thing];
      line[thing] = 8;
    }
  }
  bars.top = digits[7].replace(digits[1][0], "").replace(digits[1][1], "");
  for (const thing in line) {
    if (line[thing].length === 5 && line[thing].includes(digits[1][0]) && line[thing].includes(digits[1][1])) {
      digits[3] = line[thing];
      line[thing] = 3;
    }
  }
  bars.upperLeft = digits[4].replace(digits[3][0], "").replace(digits[3][1], "").replace(digits[3][2], "").replace(digits[3][3], "").replace(digits[3][4], "");
  for (const thing in line) {
    if (line[thing].length === 5 && line[thing].includes(bars.upperLeft)) {
      digits[5] = line[thing];
      line[thing] = 5;
    }
    if (line[thing].length === 5 && !line[thing].includes(bars.upperLeft)) {
      digits[2] = line[thing];
      line[thing] = 2;
    }
  }
  bars.lowerLeft = digits[2].replace(digits[3][0], "").replace(digits[3][1], "").replace(digits[3][2], "").replace(digits[3][3], "").replace(digits[3][4], "");
  bars.lowerRight = digits[5].replace(bars.upperLeft, "").replace(digits[2][0], "").replace(digits[2][1], "").replace(digits[2][2], "").replace(digits[2][3], "").replace(digits[2][4], "");
  bars.upperRight = digits[1].replace(bars.lowerRight, "");
  for (const thing in line) {
    if (line[thing].length === 6 && !line[thing].includes(bars.lowerLeft)) {
      digits[9] = line[thing];
      line[thing] = 9;
    }
    if (line[thing].length === 6 && !line[thing].includes(bars.upperRight)) {
      digits[6] = line[thing];
      line[thing] = 6;
    }
  }
  for (const thing in line) {
    if (line[thing].length === 6) {
      digits[0] = line[thing];
      line[thing] = 0;
    }
  }
  bars.bottom = digits[9].replace(bars.top, "").replace(digits[4][0], "").replace(digits[4][1], "").replace(digits[4][2], "").replace(digits[4][3], "");
  bars.middle = digits[8].replace(digits[0][0], "").replace(digits[0][1], "").replace(digits[0][2], "").replace(digits[0][3], "").replace(digits[0][4], "").replace(digits[0][5], "");

  total = total + parseInt(line.slice(10).join(""),10);
}

console.log(total);