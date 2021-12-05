const fs = require('fs');
const inputArray = fs.readFileSync('input.txt').toString().split("\n");

const numbers = inputArray.shift().split(",");
const boards = [];
const winningBoards = [];
const answers = [];

for(let i = 0; i < inputArray.length; i++) {
  if (!inputArray[i]) {
    const board = [];
    for (let x = i+1; x < i+6; x++) {
      board.push(inputArray[x].trim().split(/\s+/).map(Number));
    }
    boards.push(board)
  }
}

function markBoards(number) {
  for (const b of boards) {
    for (const r of b) {
      if (r.indexOf(number) >= 0) {
        r[r.indexOf(number)] = null;
      }
    }
  }

}

function findWinner() {
  let winners = new Map;
  for (const b in boards) {
    if (!winningBoards.includes(b)) {
      const columnTotals = [0, 0, 0, 0, 0];
      const rowTotals = [0, 0, 0, 0, 0];
      for (const r in boards[b]) {
        let total = 0;
        for (const i in boards[b][r]) {
          total = total + boards[b][r][i] || 0;
          columnTotals[i] = columnTotals[i] + boards[b][r][i]|| 0;
        }
        rowTotals[r] = total;
      }

      if(columnTotals.filter(e => e === 0).length || rowTotals.filter(e => e === 0).length) {
        winningBoards.push(b);
        winners.set(b,columnTotals.reduce((columnTotals, a) => columnTotals + a, 0));
      }
    }
  }

  return winners;
}


// Part One

for (n of numbers) {
  const number = parseInt(n);
  markBoards(number);
  const winners = findWinner();

  winners.forEach((value, key) =>
  {
    const answer = value * number;
    answers.push(answer)
    //console.log(answer);
    //process.exit();
  })


}

// Part Two

console.log(answers[answers.length-1])


