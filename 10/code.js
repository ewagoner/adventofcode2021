const fs = require('fs');
const inputArray = fs.readFileSync('input.txt').toString().split("\n");

const chunks = new Map();
chunks.set("(", ")");
chunks.set("{", "}");
chunks.set("[", "]");
chunks.set("<", ">");

const scores = new Map();
scores.set(")", 3);
scores.set("}", 1197);
scores.set("]", 57);
scores.set(">", 25137);

const completeScores = new Map();
completeScores.set("(", 1);
completeScores.set("{", 3);
completeScores.set("[", 2);
completeScores.set("<", 4);

function simplify(line) {
  const length = line.length;
  for (let x = 0; x < length; x++) {
    for (let i = 0; i < length; i++) {
      if (line[i+1] && chunks.get(line[i]) === line[i+1]) {
        line = line.substring(0,i) + line.substring(i+2);
      }
    }
  }

  for (let i = 0; i < length; i++) {
    if (line[i+1] && chunks.has(line[i]) && !chunks.has(line[i+1])) {
      return line[i+1];
    }
  }

  return line;
}

let score = 0;
let completeScoreArray = [];

for (const line of inputArray) {
  const simplifiedLine = simplify(line);
  if (simplifiedLine.length === 1) {
    score += scores.get(simplifiedLine);
  } else {
    let lineScore = 0;
    for (let i = simplifiedLine.length - 1; i >= 0; i--) {
      lineScore = (lineScore * 5) + completeScores.get(simplifiedLine[i]);
    }
    completeScoreArray.push(lineScore);
  }
}

// Part one
console.log(score);

// Part two
console.log(completeScoreArray.sort((a,b) => b - a)[Math.floor(completeScoreArray.length / 2)]);


