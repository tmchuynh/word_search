// Variables
const tempList = [
      "Adventure",
      "Dolphin",
      "Freedom",
      "Galaxy",
      "Horizon",
      "Knowledge",
      "Ocean",
      "Rainbow",
      "Sunflower",
      "Vacation",
      "Lighthouse",
      "Revolution",
      "Candle",
      "Festival",
      "Knowledge",
      "Library",
      "Invention",
      "Journey",
      "Lighthouse",
      "Miracle",
      "Puzzle",
      "Sculpture",
      "Universe",
      "Waterfall",
      "Adventure",
      "Airport",
      "Beach",
      "Baggage",
      "Caravan",
      "Cityscape",
      "Cruise",
      "Destination",
      "Explore",
      "Flight",
      "Holiday",
      "Journey",
      "Landmark",
      "Luggage",
      "Mountain",
      "Museum",
      "Nature",
      "Oasis",
      "Passport",
      "Reservation",
      "Safari",
      "Souvenir",
      "Sunset",
      "Train",
      "Travel",
      "Vacation",
      "Wanderlust",
      "Waterfall",
      "Tourist",
      "Island",
      "Hiking",
      "Guidebook",
      "Adventure",
      "Resort",
      "Cruise",
      "Excursion",
      "Landmark",
      "Quarantine",
      "Excursion",
      "Itinerary",
      "Navigator"
]


const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let answeredList = [];
let maxWordLength = 0;
let totalWordLength = 0;
let selectedArray = [];
let selectedCells = [];
let isMouseDown = false;
let tick = 0;
let timerStarted = false;
let allAnswered = false;

// Remove duplicates in the word list
const removeDuplicates = (array) => array.filter((item, index) => array.indexOf(item) === index);

const wordList = removeDuplicates(tempList);

// Find the length of the longest word and total length of all words
wordList.forEach((word) => {
      const wordLength = word.length;
      if (wordLength > maxWordLength) { maxWordLength = wordLength };
      totalWordLength += wordLength;
});

// Determine grid dimensions
const dimensions = Math.max(
      maxWordLength,
      Math.ceil(Math.sqrt(totalWordLength)) + 10
);

// Create a 2D array
const create2dArray = (width, height) =>
      Array.from({ length: height }, () => Array(width).fill(null));

// Add a word to the grid in the specified direction
const addWord = (word, grid, direction) => {
      const wordLength = word.length;
      let rand1, rand2, isWritable;

      for (let attempts = 0; attempts < 1000; attempts++) {
            isWritable = true;

            if (direction === "H") {
                  rand1 = Math.floor(Math.random() * grid.length);
                  rand2 = Math.floor(Math.random() * (grid[0].length - wordLength));
            } else if (direction === "V") {
                  rand1 = Math.floor(Math.random() * (grid.length - wordLength));
                  rand2 = Math.floor(Math.random() * grid[0].length);
            } else {
                  rand1 = Math.floor(Math.random() * (grid.length - wordLength));
                  rand2 = Math.floor(Math.random() * (grid[0].length - wordLength));
            }

            for (let i = 0; i < wordLength; i++) {
                  const x = direction === "H" ? rand1 : rand1 + i;
                  const y = direction === "H" ? rand2 + i : rand2;
                  if (grid[x][y] !== null && grid[x][y] !== word[i]) {
                        isWritable = false;
                        break;
                  }
            }

            if (isWritable) {
                  for (let i = 0; i < wordLength; i++) {
                        const x = direction === "H" ? rand1 : rand1 + i;
                        const y = direction === "H" ? rand2 + i : rand2;
                        grid[x][y] = word[i];
                  }
                  return true;
            }
      }
      return false;
};

// Select a direction to place the word
const selectDirection = (word, grid) => {
      const directions = ["H", "V", "D"];
      for (let i = 0; i < directions.length; i++) {
            if (
                  addWord(
                        word,
                        grid,
                        directions[Math.floor(Math.random() * directions.length)]
                  )
            ) {
                  return;
            }
      }
};

// Create and populate the word search grid
const wordSearch = create2dArray(dimensions, dimensions);
wordList.sort((a, b) => b.length - a.length);
console.log(wordList);

wordList.forEach((word) => selectDirection(word.toUpperCase(), wordSearch));

// Fill empty cells with random letters
wordSearch.forEach((row) =>
      row.forEach((cell, index, arr) => {
            if (cell === null)
                  arr[index] = alphabet[Math.floor(Math.random() * alphabet.length)];
      })
);

// Output the word search and word list to the document
const outputGrid = () => {
      const table = document.getElementById("wordSearch")
      const wordListDisplay = document.getElementById("wordList");

      // Displays the word search grid
      wordSearch.forEach((row, rowIndex) => {
            const tr = document.createElement("tr");
            row.forEach((cell, colIndex) => {
                  const td = document.createElement("td");
                  td.textContent = cell;
                  td.id = `cell-${rowIndex}-${colIndex}`;
                  tr.appendChild(td);
            });
            table.appendChild(tr);
      });

      // Displays the word list in alphabetical order
      const wordsPerRow = Math.ceil(wordList.length / dimensions);
      for (let i = 0; i < wordList.length; i += wordsPerRow) {
            const tr = document.createElement("tr");

            for (let j = 0; j < wordsPerRow; j++) {
                  if (i + j < wordList.length) {
                        const td = document.createElement("td");
                        td.textContent = wordList[i + j];
                        tr.appendChild(td);
                  }
            }

            wordListDisplay.appendChild(tr);
      }
};

outputGrid();

// Main function to handle interactions
const main = () => {
      const msToTime = (s) => {
            const addZ = (n) => (n < 10 ? "0" : "") + n;
            const ms = s % 1000;
            s = (s - ms) / 1000;
            const secs = s % 60;
            s = (s - secs) / 60;
            const mins = s % 60;
            return `${addZ(mins)}:${addZ(secs)}.${ms}`;
      };

      setInterval(() => {
            timerStarted = true;
      })

      setInterval(() => {
            if (timerStarted) {
                  tick++;
                  document.getElementById("timer").textContent = msToTime(tick * 100);
            }
            document.querySelectorAll("td").forEach((td) => {
                  if (!td.classList.contains("correct")) {
                        allAnswered = false;
                        return false;
                  } else {
                        allAnswered = true;
                  }
            });
            if (allAnswered) {
                  timerStarted = false;
            }
      }, 100);

      selectedArray = [];
      selectedCells = [];
};

const table = document.getElementById("wordSearch");
table.addEventListener("mousedown", (event) => {
      if (!allAnswered) {
            timerStarted = true;
      }
      isMouseDown = true;
      const target = event.target;
      if (!target.classList.contains("highlighted")) {
            selectedArray.push(target.textContent);
            selectedCells.push(target);
            target.classList.add("highlighted");
      }
      event.preventDefault();
});

table.addEventListener("mousemove", (event) => {
      if (isMouseDown) {
            const target = event.target;
            if (!target.classList.contains("highlighted")) {
                  selectedArray.push(target.textContent);
                  selectedCells.push(target);
                  target.classList.add("highlighted");
            }
      }
});

document.addEventListener("mouseup", () => {
      isMouseDown = false;
      const compareString = selectedArray.join("");
      const reversedString = selectedArray.reverse().join("");

      wordList.forEach((word) => {
            if (
                  compareString === word.toUpperCase() ||
                  reversedString === word.toUpperCase()
            ) {
                  answeredList.push(word);
                  selectedCells.forEach((cell) => {
                        cell.classList.add("correct");
                        cell.classList.remove("highlighted");
                        cell.style.backgroundColor = "green";
                  });
                  document.querySelectorAll("td").forEach((td) => {
                        if (td.textContent.toUpperCase() === word.toUpperCase()) {
                              td.classList.add("correct");
                              td.style.backgroundColor = "green";
                        }
                  });
            } else {
                  selectedCells.forEach((cell) => {
                        cell.classList.remove("highlighted");
                  });
            }
      });
});

main();
