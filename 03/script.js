const memoryGameContainer = document.getElementById("memory-game");
const startButton = document.getElementById("start-button");
const backToCalendarLink = document.getElementById("back-to-calendar");

const leaves = [
  "🍁",
  "🍁",
  "🍂",
  "🍂",
  "🍃",
  "🍃",
  "🌿",
  "🌿",
  "🌱",
  "🌱",
  "🌲",
  "🌲",
  "🌳",
  "🌳",
  "🍀",
  "🍀",
  "🍄",
  "🍄",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Shuffle the leaves array
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Create the memory cards
function createMemoryCards() {
  shuffle(leaves);

  leaves.forEach((leaf) => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.leaf = leaf;
    card.innerHTML = leaf;

    card.addEventListener("click", flipCard);
    memoryGameContainer.appendChild(card);
  });
}

// Flip the card and check for a match
function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Check if the two flipped cards match
function checkForMatch() {
  lockBoard = true;
  const isMatch = firstCard.dataset.leaf === secondCard.dataset.leaf;

  if (isMatch) {
    disableCards();
    matchedPairs++;
    if (matchedPairs === leaves.length / 2) {
      setTimeout(() => {
        alert("Congratulations! Jimli found the right path!");
        resetGame();
      }, 500);
    }
  } else {
    unflipCards();
  }
}

// Disable the cards if they match
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  resetBoard();
}

// Unflip the cards if they don't match
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

// Reset the board
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Initialize the game when the Start Game button is clicked
startButton.addEventListener("click", () => {
  startButton.classList.add("disabled-blur");
  backToCalendarLink.classList.add("disabled-blur");

  memoryGameContainer.classList.remove("hidden"); // Show the grid
  memoryGameContainer.innerHTML = ""; // Clear any existing grid

  createMemoryCards(); // Generate the grid only after the start button is clicked
});

// Reset the game
function resetGame() {
  // Enable the "Start Game" button and "Back to Calendar" link
  startButton.classList.remove("disabled-blur");
  backToCalendarLink.classList.remove("disabled-blur");

  // Clear the memory game grid
  memoryGameContainer.innerHTML = "";
  memoryGameContainer.classList.add("hidden"); // Hide the grid
  matchedPairs = 0;
}
