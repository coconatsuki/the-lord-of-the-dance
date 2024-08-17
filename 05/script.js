// script.js

let sequence = [];
let playerSequence = [];
let level = 0;
const maxMoves = 30; // Define the maximum number of moves for the game
const sequenceDisplay = document.getElementById("sequence");
const playerSequenceDisplay = document.getElementById("player-sequence");
const feedbackDisplay = document.getElementById("feedback");
const startButton = document.getElementById("start-button");
const instruction = document.getElementById("instruction");
const turnCounter = document.getElementById("turn-counter");

// Sound elements
const soundUp = document.getElementById("sound-up");
const soundDown = document.getElementById("sound-down");
const soundLeft = document.getElementById("sound-left");
const soundRight = document.getElementById("sound-right");

const moves = ["↑", "↓", "←", "→"];
const colors = {
  "↑": "green",
  "↓": "red",
  "←": "blue",
  "→": "yellow",
};

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.disabled = true;
  sequence = [];
  playerSequence = [];
  level = 0;
  updateTurnCounter();
  instruction.textContent = "Watch the lizard's moves...";
  nextRound();
}

function nextRound() {
  if (level >= maxMoves) {
    endGame(); // End the game after 30 moves
    return;
  }

  playerSequence = [];
  playerSequenceDisplay.textContent = ""; // Clear the player's sequence display
  level++;
  updateTurnCounter();
  sequence.push(moves[Math.floor(Math.random() * moves.length)]); // Add a random move
  displaySequence();
}

function displaySequence() {
  sequenceDisplay.textContent = "";
  let delay = 0;

  sequence.forEach((move, index) => {
    setTimeout(() => {
      sequenceDisplay.textContent = move;
      sequenceDisplay.style.color = colors[move];
      playSound(move);
    }, delay);

    delay += 1000; // Show each move for 1 second

    setTimeout(() => {
      sequenceDisplay.textContent = "";
    }, delay - 500); // Clear after half a second
  });

  setTimeout(() => {
    instruction.textContent = "Now it's your turn!";
    listenForPlayerInput();
  }, delay);
}

function listenForPlayerInput() {
  window.addEventListener("keydown", handlePlayerInput);
}

function handlePlayerInput(event) {
  let key = "";
  if (event.key === "ArrowUp") key = "↑";
  if (event.key === "ArrowDown") key = "↓";
  if (event.key === "ArrowLeft") key = "←";
  if (event.key === "ArrowRight") key = "→";

  if (key) {
    playerSequence.push(key);
    displayPlayerMove(key);

    // Check player's input
    if (playerSequence.length === sequence.length) {
      window.removeEventListener("keydown", handlePlayerInput); // Remove listener to stop input during evaluation
      checkPlayerSequence();
    }
  }
}

function displayPlayerMove(key) {
  playerSequenceDisplay.textContent = key;
  playerSequenceDisplay.style.color = colors[key];
  playSound(key);

  setTimeout(() => {
    playerSequenceDisplay.textContent = ""; // Clear the player's arrow after 500ms
  }, 500);
}

function checkPlayerSequence() {
  if (playerSequence.join("") === sequence.join("")) {
    feedbackDisplay.textContent = "Correct! Get ready for the next round...";
    setTimeout(() => {
      feedbackDisplay.textContent = "";
      instruction.textContent = "Watch the lizard's moves...";
      nextRound();
    }, 2000);
  } else {
    feedbackDisplay.textContent = `Oops! You made it to level ${level}. Try again!`;
    endGame(); // Trigger game end when the player makes a mistake
    startButton.disabled = false; // Re-enable the start button for a new game
  }
}

function playSound(direction) {
  switch (direction) {
    case "↑":
      soundUp.play();
      break;
    case "↓":
      soundDown.play();
      break;
    case "←":
      soundLeft.play();
      break;
    case "→":
      soundRight.play();
      break;
  }
}

function endGame() {
  let message = "";

  if (level === 0) {
    message =
      "Oh no! Jimli couldn’t mimic a single move. If he can't keep up with a lizard, the elves will laugh him off the dance floor! Better practice those steps, Jimli!";
  } else if (level >= 1 && level <= 5) {
    message =
      "Well, Jimli managed to mimic a few steps, but it’s not looking good. The lizard isn’t impressed, and neither will be the elves. Time to step it up!";
  } else if (level >= 6 && level <= 10) {
    message =
      "Jimli’s got some moves, but let’s be honest… he’s still struggling. The lizard’s giving him a puzzled look. He’s going to need more practice before facing those elves!";
  } else if (level >= 11 && level <= 13) {
    message =
      "Jimli is really getting into the groove! The lizard is actually impressed, and there’s hope yet for the Elven Festival. Keep those feet moving, Jimli!";
  } else if (level >= 14 && level <= 20) {
    message =
      "Wow, Jimli! You’re on fire! The lizard can barely keep up with you now. If you keep this up, the elves might have to take notice of your dance skills!";
  } else if (level >= 21 && level <= 29) {
    message =
      "Incredible, Jimli! You’ve almost perfected the lizard’s dance. Even the lizard is clapping for you! The Elven Festival better watch out, Jimli’s on his way!";
  } else if (level === 30) {
    message =
      "Unbelievable, Jimli! You’ve mastered the lizard’s dance perfectly! The lizard is bowing to your superior moves, and the elves won’t know what hit them at the festival!";
  }

  alert(message); // Display the appropriate message based on the level
  startButton.disabled = false; // Re-enable the start button for a new game
}

function updateTurnCounter() {
  turnCounter.textContent = `${level} / ${maxMoves}`;
}
