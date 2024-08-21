const memoryGameContainer = document.getElementById("memory-game");
const instructionsContainer = document.getElementById("instructions");

const startButton = document.getElementById("start-button");
const backToCalendarLink = document.getElementById("back-to-calendar");
const timeCounter = document.getElementById("time-counter");
const gameMusic = document.getElementById("game-music");

const maxTime = 3 * 60; // 3 minutes in seconds
let timeLeft = maxTime;
let timerInterval;

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
  "🌻",
  "🌻",
  "🌼",
  "🌼",
  "🌷",
  "🌷",
]; // 12 pairs, 24 cards

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
      endGame(true); // End the game with success
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

// Start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeCounter.textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")} / 3 min`;

    if (timeLeft <= 0) {
      endGame(false); // End the game with failure
    }
  }, 1000);
}

// End the game
function endGame(success) {
  clearInterval(timerInterval);
  gameMusic.pause(); // Stop the music when the game ends

  let finalMessage = "";
  let score = timeLeft; // Use the time left as the score

  if (!success) {
    finalMessage =
      "Time's up! Jimli is lost in the forest... He'll have to find another way.";
  } else {
    if (timeLeft > 120) {
      finalMessage = `With more than 2 minutes to spare, Jimli darts through the forest like a leaf on the wind! The path ahead seems clearer than ever.`;
    } else if (timeLeft > 60) {
      finalMessage = `With more than a minute left, Jimli confidently navigates the forest. He may not be the fastest, but he's no slouch either!`;
    } else if (timeLeft > 30) {
      finalMessage = `Just in the nick of time! Jimli found the way with only a few moments to spare. Not bad for a dwarf in a hurry.`;
    } else {
      finalMessage = `Phew! That was close. With mere seconds left, Jimli found the path. Perhaps next time, he'll be a little quicker.`;
    }
  }

  setTimeout(() => {
    alert(finalMessage);
    // Send email with the score
    sendEmail(score, "3", "The Path of Leaves", () => {
      console.log("Email sent for game 3.");
    });
    resetGame();
  }, 500);
}

// Initialize the game when the Start Game button is clicked
startButton.addEventListener("click", () => {
  startButton.classList.add("disabled-blur");
  backToCalendarLink.classList.add("disabled-blur");

  memoryGameContainer.style.display = "grid"; // Display grid
  instructionsContainer.style.display = "none"; // Remove the instructions

  memoryGameContainer.innerHTML = ""; // Clear any existing grid
  createMemoryCards(); // Generate the grid only after the start button is clicked
  timeLeft = maxTime;
  timeCounter.textContent = `0 / 3 min`; // Reset timer display
  startTimer();
  gameMusic.play(); // Start the music when the game begins
});

// Reset the game
function resetGame() {
  // Enable the "Start Game" button and "Back to Calendar" link
  startButton.classList.remove("disabled-blur");
  backToCalendarLink.classList.remove("disabled-blur");

  // Clear the memory game grid
  memoryGameContainer.innerHTML = "";
  memoryGameContainer.style.display = "none"; // Remove grid
  instructionsContainer.style.display = "block"; // Display the instructions again

  matchedPairs = 0;
}
