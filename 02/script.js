let timeLeft = 60; // Game time limit
let score = 0;
let gameInterval;
const fireflySound = document.getElementById("firefly-sound");
const fireflyMusic = document.getElementById("firefly-music");
fireflyMusic.volume = 0.8;

const gameArea = document.getElementById("game-area");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-button");
const backToCalendarLink = document.getElementById("back-to-calendar");
let spawnRate = 1000; // Start with 1 second
const minSpawnRate = 300; // Set a minimum spawn rate to prevent overwhelming difficulty

// Modal Elements
const narrativeModal = document.getElementById("narrative-modal");
const closeModalButton = document.getElementById("close-modal-button");

// Start Game when close modal button is clicked
closeModalButton.addEventListener("click", () => {
  narrativeModal.style.display = "none"; // Hide the modal
  fireflyMusic.play();
});

startButton.addEventListener("click", startGame);

function startGame() {
  // Disable and blur the Start button and Back to Calendar link
  fireflyMusic.volume = 0.3;
  gameArea.classList.remove("hidden");
  startButton.disabled = true;
  startButton.classList.add("disabled-blur");
  backToCalendarLink.classList.add("disabled-blur");

  score = 0;
  timeLeft = 60; // Reset time to 1 minute
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  spawnRate = 1000; // Reset spawn rate at the start of the game

  gameInterval = setInterval(() => {
    if (timeLeft <= 0) {
      endGame();
    } else {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      spawnFirefly();

      // Increase difficulty every 10 seconds
      if (timeLeft % 10 === 0 && spawnRate > minSpawnRate) {
        spawnRate -= 100; // Decrease spawn rate more slowly
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
  firefly.style.left = "25px"; // Increased clickable area
  firefly.style.top = "25px"; // Increased clickable area

  const x = Math.random() * (gameArea.clientWidth - 50); // Adjusted for larger container
  const y = Math.random() * (gameArea.clientHeight - 50);
  fireflyContainer.style.left = `${x}px`;
  fireflyContainer.style.top = `${y}px`;

  fireflyContainer.appendChild(firefly);
  gameArea.appendChild(fireflyContainer);

  fireflyContainer.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    fireflySound.play();

    gameArea.removeChild(fireflyContainer);
  });

  setTimeout(() => {
    if (gameArea.contains(fireflyContainer)) {
      gameArea.removeChild(fireflyContainer);
    }
  }, spawnRate); // Firefly stays on screen based on spawnRate
}

function endGame() {
  clearInterval(gameInterval);
  fireflyMusic.volume = 0.8;
  gameArea.classList.add("hidden");

  let finalMessage;

  if (score === 0) {
    finalMessage =
      "Too bad, you couldn't catch a single firefly... Who's gonna stay in the dark tonight?";
  } else if (score >= 1 && score <= 5) {
    finalMessage = `Well, you caught ${score} fireflies, but it seems the fireflies were faster. At least you'll have a flicker of light!`;
  } else if (score >= 6 && score <= 15) {
    finalMessage = `Not bad! You caught ${score} fireflies. You've got yourself a decent glow. The fireflies seem to like you… sort of.`;
  } else if (score >= 16 && score <= 20) {
    finalMessage = `Impressive! You caught ${score} fireflies. You've captured quite the swarm! You’ll light up the night with all these little glow-bugs.`;
  } else if (score >= 21 && score <= 25) {
    finalMessage = `Wow, look at you! You caught ${score} fireflies. You’re practically glowing yourself. The fireflies must think you're their king!`;
  } else if (score > 30) {
    finalMessage = `Incredible! You caught ${score} fireflies. The forest will sing tales of the 'Great Firefly Catcher' for generations!`;
  }

  alert(finalMessage);

  sendEmail(score, "2", "Catch the Fireflies", () => {
    console.log("Email sent for game 2.");
  });

  // Re-enable the Start button and Back to Calendar link after the game ends
  startButton.disabled = false;
  startButton.classList.remove("disabled-blur");
  backToCalendarLink.classList.remove("disabled-blur");
}
