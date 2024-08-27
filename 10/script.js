let score = 0;
let combo = 0;
let comboMultiplier = 1;
let timeLeft = 90; // 1 minute and 30 seconds
let arrowSpeed = 4; // Increased base speed
let arrowInterval = 800; // Faster initial spawn rate
let activeArrows = [];
let gameActive = true;
const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const comboElement = document.getElementById("combo");
const feedbackContainer = document.getElementById("feedback-container");
const timerElement = document.getElementById("timer");

// Sound effect
const hitSound = new Audio("hit.mp3");
const gameMusic = new Audio("game-music.mp3");
const finishSound = new Audio("finish.mp3");

// Start game timer
const timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
  if (!gameActive) return;

  timeLeft--;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `Time: ${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endGame();
  }
}

function createArrow(type) {
  const arrow = document.createElement("div");
  arrow.classList.add("arrow");
  arrow.dataset.type = type;

  const img = document.createElement("img");
  img.src = `${type}-arrow.svg`;
  arrow.appendChild(img);

  // Randomize arrow start position
  arrow.style.left = `${Math.random() * (gameContainer.offsetWidth - 50)}px`;
  arrow.style.top = "0px";

  gameContainer.appendChild(arrow);
  activeArrows.push(arrow);

  animateArrow(arrow);
}

function animateArrow(arrow) {
  const moveInterval = setInterval(() => {
    if (!gameActive) {
      clearInterval(moveInterval);
      return;
    }

    const currentTop = parseInt(arrow.style.top);
    if (currentTop >= gameContainer.offsetHeight) {
      // Arrow missed
      gameContainer.removeChild(arrow);
      activeArrows = activeArrows.filter((a) => a !== arrow);
      resetCombo();
      feedback("Miss");
      clearInterval(moveInterval);
    } else {
      arrow.style.top = `${currentTop + arrowSpeed}px`;
    }
  }, 50);
}

function handleKeyPress(e) {
  let arrowType;
  if (e.key === "ArrowLeft") arrowType = "left";
  if (e.key === "ArrowUp") arrowType = "up";
  if (e.key === "ArrowDown") arrowType = "down";
  if (e.key === "ArrowRight") arrowType = "right";

  const matchingArrow = activeArrows.find(
    (arrow) =>
      arrow.dataset.type === arrowType &&
      parseInt(arrow.style.top) >= 475 && // Narrowed hitbox range
      parseInt(arrow.style.top) <= 525
  );

  if (matchingArrow) {
    score += 1 * comboMultiplier;
    combo++;
    comboMultiplier = Math.min(comboMultiplier + 1, 4); // Reduced max combo multiplier to 4
    updateScore();
    gameContainer.removeChild(matchingArrow);
    activeArrows = activeArrows.filter((arrow) => arrow !== matchingArrow);
    feedback("Perfect");
    hitSound.play();
  } else {
    resetCombo(); // Reset combo on incorrect key press
    feedback("Miss");
  }
}

function updateScore() {
  scoreElement.textContent = score;
  comboElement.textContent = combo;
}

function resetCombo() {
  combo = 0;
  comboMultiplier = 1;
  updateScore();
}

function feedback(text) {
  feedbackContainer.textContent = text;
  setTimeout(() => (feedbackContainer.textContent = ""), 500);
}

// Difficulty progression (more aggressive)
const difficultyInterval = setInterval(() => {
  if (!gameActive) return;

  arrowSpeed += 0.3; // Increase speed more aggressively
  arrowInterval = Math.max(arrowInterval - 100, 250); // Faster arrow spawn with a cap at 250ms
}, 3000);

// Arrow spawning
const arrowSpawnInterval = setInterval(() => {
  if (!gameActive) return;

  const arrowTypes = ["left", "up", "down", "right"];
  const randomType = arrowTypes[Math.floor(Math.random() * arrowTypes.length)];
  createArrow(randomType);
}, arrowInterval);

function endGame() {
  gameActive = false;
  clearInterval(arrowSpawnInterval);
  clearInterval(difficultyInterval);
  alert(`Game over! Your final score is ${score}`);
}

document.addEventListener("keydown", handleKeyPress);
