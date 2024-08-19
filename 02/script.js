// script.js

let timeLeft = 60; // Game time limit
let score = 0;
let gameInterval;
const gameArea = document.getElementById("game-area");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-button");
let spawnRate = 1000; // Start with 1 second

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.disabled = true;
  score = 0;
  timeLeft = 60; // Reset time to 1 minute
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;

  gameInterval = setInterval(() => {
    if (timeLeft <= 0) {
      endGame();
    } else {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      spawnFirefly();

      // Increase difficulty every 10 seconds
      if (timeLeft % 10 === 0 && spawnRate > 400) {
        spawnRate -= 200;
      }
    }
  }, 1000);
}

function spawnFirefly() {
  const fireflyContainer = document.createElement("div");
  fireflyContainer.classList.add("fireflyContainer");

  const firefly = document.createElement("div");
  firefly.classList.add("firefly");

  // Center the firefly inside the larger clickable container
  firefly.style.left = "15px";
  firefly.style.top = "15px";

  const x = Math.random() * (gameArea.clientWidth - 45); // Adjusted for larger container
  const y = Math.random() * (gameArea.clientHeight - 45);
  fireflyContainer.style.left = `${x}px`;
  fireflyContainer.style.top = `${y}px`;

  fireflyContainer.appendChild(firefly);
  gameArea.appendChild(fireflyContainer);

  fireflyContainer.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    gameArea.removeChild(fireflyContainer);
  });

  setTimeout(() => {
    if (gameArea.contains(fireflyContainer)) {
      gameArea.removeChild(fireflyContainer);
    }
  }, spawnRate);
}

function endGame() {
  clearInterval(gameInterval);

  let finalMessage;

  if (score === 0) {
    finalMessage =
      "Too bad, you couldn't catch a single firefly... Who's gonna stay in the dark tonight?";
  } else if (score >= 1 && score <= 5) {
    finalMessage = `Well, you caught ${score} fireflies, but it seems the fireflies were faster. At least you'll have a flicker of light!`;
  } else if (score >= 6 && score <= 10) {
    finalMessage = `Not bad! You caught ${score} fireflies. You've got yourself a decent glow. The fireflies seem to like you… sort of.`;
  } else if (score >= 11 && score <= 15) {
    finalMessage = `Impressive! You caught ${score} fireflies. You've captured quite the swarm! You’ll light up the night with all these little glow-bugs.`;
  } else if (score >= 16 && score <= 20) {
    finalMessage = `Wow, look at you! You caught ${score} fireflies. You’re practically glowing yourself. The fireflies must think you're their king!`;
  } else if (score > 20) {
    finalMessage = `Incredible! You caught ${score} fireflies. The forest will sing tales of the 'Great Firefly Catcher' for generations!`;
  }

  alert(finalMessage);

  sendEmail(score, "2", "Catch the Fireflies", () => {
    console.log("Email sent for game 2.");
  });

  startButton.disabled = false;
}
