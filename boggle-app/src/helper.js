const wordList = require('./full-wordlist.json');
var random1 = Math.random(), random2 = Math.random();


export default function getGrid(num) {
  const dice = ["MUOFRS", "AGEYEE", "KAFIRS", "ADENNN", "AEEEEM",
                "AEEGMU", "AEGMNN", "AFIRSY", "BJKQXZ", "CCNSTW",
                "CEIILT", "CEILPT", "CEIPST", "DHHNOT", "DHHLOR",
                "DHLNOR", "DDLNOR", "EIIITT", "EMOTTT", "ENSSSU",
                "FIPRSY", "GORRVW", "HIPRRY", "NOOTUW", "OOOTTU"];
  // let chars = dice.map(cube => cube[Math.floor(random1 * cube.length)]);
  // chars.sort(() => random2 - 0.5); // Shuffle the letters.

  const SIZE = num;
  let grid = [];
  for (let row = 0; row < SIZE; row++) {
    grid[row] = [];
    for (let col = 0; col < SIZE; ++col) {
			grid[row][col] = dice[row][col].toLowerCase();
      // grid[row][col] = chars[SIZE * row + col].toLowerCase();
      if (grid[row][col] === "Q") grid[row][col] = "Qu";
    }
  }
  return [grid, getSolution(grid, wordList.words)];
}


function validatePoint(point, grid) {
  if ((0 <= point[0] && point[0] <= grid.length - 1) && (0 <= point[1] &&
point[1] <= grid[0].length - 1)) {
    return true;
  }
  return false;
}

function getResults(grid, usedPoints, i, j, currentSubWord, allCasesDictionary,
    solutions) {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
    return;
  }
  if (!(currentSubWord in allCasesDictionary)) {
    return;
  }

  if ((allCasesDictionary[currentSubWord] === true) &&
(currentSubWord.length >= 3)) {
    if (!(solutions.includes(currentSubWord))) {
      solutions.push(currentSubWord);
    }
  }

  const adjMatrix = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0],
    [1, -1], [0, -1]];
  for (let idx = 0; idx < adjMatrix.length; idx++) {
    let num1 = adjMatrix[idx][0] + i;
    let num2 = adjMatrix[idx][1] + j;
    if (!(usedPoints.includes((String(num1) + ',' + String(num2)))) &&
validatePoint([num1, num2], grid)) {
      let currentUsedPoints = [...usedPoints];
      currentUsedPoints.push(String(num1) + ',' + String(num2));
      getResults(grid, currentUsedPoints, num1, num2, currentSubWord +
grid[num1][num2], allCasesDictionary, solutions);
    }
  }
}

function isGridValid(grid) {
  let regex = /(st|qu)|[a-prt-z]/;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!grid[i][j].match(regex)) {
        return false;
      }
    }
  }
  return true;
}

function gridToLower(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }
  return grid;
}

function dictToLower(dict) {
  for (let i = 0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
  return dict;
}

// function to return our answer
function getSolution(grid, dictionary) {
  const solutions = [];
  const allCasesDictionary = {'': false};

  grid = gridToLower(grid);
  dictionary = dictToLower(dictionary);

  if ((!isGridValid(grid)) || (grid == null) || (dictionary == null)||
(grid.constructor !== Array) || (dictionary.constructor !== Array)) {
    return solutions;
  }

  const N = grid.length;
  for (let i = 0; i < N; i++) {
    if (grid[i].length !== N || grid[i] === []) {
      return solutions;
    }
  }

  for (let i = 0; i < dictionary.length; i++) {
    allCasesDictionary[dictionary[i]] = true;
    let wordSubString = '';

    for (let j = 0; j < dictionary[i].length - 1; j++) {
      wordSubString += dictionary[i][j];
      if (!(wordSubString in allCasesDictionary)) {
        allCasesDictionary[wordSubString] = false;
      } else if ((wordSubString in allCasesDictionary) &&
(allCasesDictionary[wordSubString]) == true) {
        allCasesDictionary[wordSubString] = true;
      }
    }
  }

  for (let i = 0; i <grid.length; i++) {
    for (let j = 0; j <grid.length; j++) {
      getResults(grid, [String(i) + ',' + String(j)], i, j, grid[i][j],
          allCasesDictionary, solutions);
    }
  }
  return solutions;
};

console.log(getGrid(4)[1])
