const typewriterSound = document.getElementById("typewriter-sound");
const narrativeModal = document.getElementById("modal");
const instructionContainer = document.getElementById("instructions-container");
const narrativeMusic = new Audio("./narrative-music.mp3");
const snakeMusic = new Audio("./snake-music.mp3");
const buzzSound = new Audio("./buzz.mp3");
const biteSound = new Audio("./eat.mp3");
const gameContainer = document.getElementById("game-container");
const counterContainer = document.getElementById("counter-container");
const timeCounter = document.getElementById("time-counter");
const scoreText = document.getElementById("score-text");
const scoreCounter = document.getElementById("score-container");
const footer = document.getElementById("footer");
const header = document.getElementById("header-section");
const scoresAndGameContainer = document.getElementById("scores-and-game");

let loopNarrativeMusic = true; // Flag to control whether the music should loop
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let initialSnakeSpeed = 200; // Initial snake speed
let snakeSpeed = initialSnakeSpeed;
let score = 0;
let timerInterval;
let gameTimer;
let gameActive = false; // Flag to check if the game is active

// Loop the narrative music only if the flag is set to true
narrativeMusic.addEventListener("ended", function () {
  if (loopNarrativeMusic) {
    narrativeMusic.currentTime = 0;
    narrativeMusic.play();
  }
});

// Function to handle snakeMusic replay during the game
function handleSnakeMusic() {
  snakeMusic.addEventListener("ended", function () {
    if (gameActive) {
      snakeMusic.currentTime = 0;
      snakeMusic.play();
    }
  });
}

// Typewriter effect function with looping sound
function typeWriter(element, text, delay = 25) {
  let i = 0;

  // Function to play and loop the sound
  function playSound() {
    typewriterSound.play();
    typewriterSound.addEventListener("ended", () => {
      if (i < text.length) {
        typewriterSound.currentTime = 0; // Reset sound to the beginning
        typewriterSound.play(); // Play again if typing is not complete
      }
    });
  }

  playSound();

  function typing() {
    if (i < text.length) {
      // Insert HTML characters correctly with innerHTML
      element.innerHTML = text.slice(0, i + 1);
      i++;
      setTimeout(typing, delay);
    } else {
      // Stop the sound when typing is complete
      typewriterSound.pause();
      typewriterSound.currentTime = 0; // Reset sound for the next section
    }
  }
  typing();
}

// Show next story part with typewriter effect
function showNextPart(partIndex) {
  const storyParts = document.querySelectorAll(".story-part");

  // Hide all previous sections
  storyParts.forEach((part, index) => {
    if (index < partIndex) {
      part.classList.add("hidden");
    }
  });

  const nextPart = storyParts[partIndex];
  if (nextPart) {
    const textElement = nextPart.querySelector(".section-text");
    const fullHtml = textElement.innerHTML; // Use innerHTML instead of textContent
    textElement.innerHTML = ""; // Clear the content
    nextPart.classList.remove("hidden");

    // Apply the typewriter effect with sound
    typeWriter(textElement, fullHtml);

    // Show the correct button (either Next Page or Begin the Adventure)
    if (partIndex === storyParts.length - 1) {
      document.getElementById("next-button").classList.add("hidden");
      document.getElementById("close-modal-button").classList.remove("hidden");
    }
  }
}

let currentPart = 0; // Start with the first part

// Event listener for the Next Page button
document.getElementById("next-button").addEventListener("click", () => {
  if (currentPart === 0) {
    fadeInAudio(narrativeMusic, 500);
    narrativeMusic.volume = 0.8;
  }

  currentPart++;
  showNextPart(currentPart);
});

// Hide modal and allow game interaction
document.getElementById("close-modal-button").addEventListener("click", () => {
  typewriterSound.pause(); // Stop typewriter sound
  instructionContainer.classList.remove("hidden");
  narrativeModal.style.display = "none";
});

// Gradually decrease volume
function fadeOutAudio(audioElement, duration) {
  let volume = audioElement.volume;
  const step = volume / (duration / 50); // Decrease volume over time

  const fadeOutInterval = setInterval(() => {
    volume = Math.max(0, volume - step); // Decrease volume, ensuring it doesn't go below 0
    audioElement.volume = volume;

    if (volume <= 0) {
      clearInterval(fadeOutInterval); // Stop when volume reaches 0
      audioElement.pause(); // Pause the audio when it's completely faded out
    }
  }, 50);
}

// Gradually increase volume
function fadeInAudio(audioElement, duration, targetVolume = 0.8) {
  let volume = 0;
  audioElement.volume = volume;
  audioElement.play();
  const step = targetVolume / (duration / 50); // Increase volume over time

  const fadeInInterval = setInterval(() => {
    volume = Math.min(targetVolume, volume + step); // Increase volume, ensuring it doesn't exceed targetVolume
    audioElement.volume = volume;

    if (volume >= targetVolume) {
      clearInterval(fadeInInterval); // Stop when volume reaches targetVolume
    }
  }, 50);
}

// Event listener for the Start Game button
document.getElementById("start-game").addEventListener("click", startGame);

function startGame() {
  gameActive = true; // Set the game as active
  handleSnakeMusic(); // Start handling snakeMusic replay during the game

  loopNarrativeMusic = false; // Stop looping the music
  fadeOutAudio(narrativeMusic, 1000); // Gradually fade out narrative music over 1 second
  fadeInAudio(snakeMusic, 1000); // Gradually fade in snake music over 1 second

  // Show scoresAndGameContainer and start timer
  instructionContainer.classList.add("hidden");
  header.classList.add("hidden");
  footer.classList.add("hidden");
  scoresAndGameContainer.classList.remove("hidden");

  // Reset the snake speed and other game state
  snakeSpeed = initialSnakeSpeed;
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  placeFood();

  document.addEventListener("keydown", changeDirection);
  timerInterval = setInterval(updateGame, snakeSpeed);

  // Start the game timer with correct minute and second format
  let totalTime = 90; // Total time in seconds (1:30 = 90 seconds)
  gameTimer = setInterval(() => {
    totalTime--;

    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    timeCounter.textContent = `Time: ${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    if (totalTime <= 0) {
      clearInterval(gameTimer);
      endGame();
    }
  }, 1000);
}

function placeFood() {
  const maxX = 22; // Number of columns
  const maxY = 18; // Number of rows
  food.x = Math.floor(Math.random() * maxX);
  food.y = Math.floor(Math.random() * maxY);
}

function changeDirection(e) {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

function updateGame() {
  moveSnake();
  if (checkCollision()) {
    buzzSound.play();
    endGame();
  } else if (checkFoodCollision()) {
    biteSound.play();
    growSnake();
    placeFood();
    score++;
    console.log("what score is now: ", score);
    if (snakeSpeed > 50) snakeSpeed -= 10;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateGame, snakeSpeed);
  }
  drawGame();
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  snake.pop();
}

function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= 22 || // Number of columns
    head.y >= 18 // Number of rows
  ) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }
  return false;
}

function checkFoodCollision() {
  const head = snake[0];
  return (
    Math.floor(head.x) === Math.floor(food.x) &&
    Math.floor(head.y) === Math.floor(food.y)
  );
}

function growSnake() {
  const tail = { ...snake[snake.length - 1] };
  snake.push(tail);
  scoreText.textContent = `Score: ${score}`; // Update score display
}

function drawGame() {
  // Clear the previous frame
  gameContainer.innerHTML = "";

  // Draw the snake
  snake.forEach((segment, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y + 1;
    snakeElement.style.gridColumnStart = segment.x + 1;

    snakeElement.classList.add("snake");
    gameContainer.appendChild(snakeElement);
  });

  // Draw the food
  const foodElement = document.createElement("div");

  // Ensure correct placement of the food
  foodElement.style.gridRowStart = food.y + 1;
  foodElement.style.gridColumnStart = food.x + 1;

  foodElement.classList.add("food");
  gameContainer.appendChild(foodElement);
}

function endGame() {
  gameActive = false; // Set the game as inactive
  clearInterval(timerInterval);
  clearInterval(gameTimer); // Clear the game timer interval
  snakeMusic.pause();
  fadeInAudio(narrativeMusic, 1000);

  // Custom messages based on the score
  let message = "";

  if (score === 0) {
    message = `Jimli stares at the empty path ahead, his stomach growling louder than ever.\n\n'Not a single berry in sight,' he grumbles. Looks like he'll have to face the elves on an empty stomach.`;
  } else if (score >= 1 && score <= 5) {
    message = `Jimli managed to grab a few berries, but it's hardly enough to satisfy his hunger.\n\n'This will have to do,' he mutters, knowing the festival won't be any easier on a half-empty stomach.`;
  } else if (score >= 6 && score <= 10) {
    message = `With a small handful of berries, Jimli feels a bit better.\n\n'Not enough to boast about, but it’ll keep me going,' he says, ready to face the festival with just enough energy.`;
  } else if (score >= 11 && score <= 15) {
    message = `Jimli’s belly feels comfortably full.\n\n'That’ll do nicely,' he chuckles. He’s ready to show those elves a thing or two at the festival.`;
  } else if (score >= 16 && score <= 20) {
    message = `Jimli’s belly is full, and his spirits are high.\n\n'Now that’s a feast!' he declares, confident that he’ll out-dance any elf who dares challenge him at the festival.`;
  } else if (score >= 21) {
    message = `Jimli has stuffed himself beyond belief! 'By the beard of Durin, I couldn’t eat another bite!' he roars.\n\nWith a belly full of berries, Jimli is more than ready to conquer the festival!`;
  }

  alert(`You scored ${score} points.\n\n${message}`);
  resetGame();
}

function resetGame() {
  // Reset game state
  clearInterval(timerInterval); // Clear the snake movement interval
  clearInterval(gameTimer); // Clear the game timer interval

  // Reset the timer display
  timeCounter.textContent = "Time: 1:30";

  // Hide game elements and show instructions again
  scoresAndGameContainer.classList.add("hidden");
  instructionContainer.classList.remove("hidden");
  footer.classList.remove("hidden");
  header.classList.remove("hidden");

  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  food = { x: 15, y: 15 };
  initialSnakeSpeed = 200; // Initial snake speed
  snakeSpeed = initialSnakeSpeed;

  // Remove event listener for snake movement to prevent duplication on restart
  document.removeEventListener("keydown", changeDirection);
}
