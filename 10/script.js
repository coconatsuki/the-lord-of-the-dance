// Modal, narrative & instructions selectors
const typewriterSound = document.getElementById("typewriter-sound");
const narrativeModal = document.getElementById("modal");
const narrativeMusic = new Audio("./narrative-music.mp3");
const instructionContainer = document.getElementById("instructions-container");
const scoresAndGameContainer = document.getElementById("scores-and-game");
const footer = document.getElementById("footer");
const header = document.getElementById("header-section");

// Game selectors

const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const comboElement = document.getElementById("combo");
const feedbackContainer = document.getElementById("feedback-container");
const timerElement = document.getElementById("timer");
const startGameBtn = document.getElementById("start-game");

// Modal & narrative behaviour

let loopNarrativeMusic = true;

// Loop the narrative music only if the flag is set to true
narrativeMusic.addEventListener("ended", function () {
  if (loopNarrativeMusic) {
    narrativeMusic.currentTime = 0;
    narrativeMusic.play();
  }
});

// Typewriter effect function with looping sound
function typeWriter(element, text, delay = 25) {
  let i = 0;

  // Function to play and loop the sound
  function playSound() {
    typewriterSound.play();
    typewriterSound.addEventListener("ended", () => {
      if (i < text.length) {
        typewriterSound.currentTime = 0;
        typewriterSound.play();
      }
    });
  }

  playSound();

  function typing() {
    if (i < text.length) {
      element.innerHTML = text.slice(0, i + 1);
      i++;
      setTimeout(typing, delay);
    } else {
      typewriterSound.pause();
      typewriterSound.currentTime = 0;
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
    const fullHtml = textElement.innerHTML;
    textElement.innerHTML = "";
    nextPart.classList.remove("hidden");

    typeWriter(textElement, fullHtml);

    // Show the correct button (either Next Page or Accept the Challenge)
    if (partIndex === storyParts.length - 1) {
      document.getElementById("next-button").classList.add("hidden");
      document.getElementById("close-modal-button").classList.remove("hidden");
    }
  }
}

let currentPart = 0; // Start with the first part

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
  typewriterSound.pause();
  instructionContainer.classList.remove("hidden");
  narrativeModal.style.display = "none";
});

// Gradually decrease volume
function fadeOutAudio(audioElement, duration) {
  let volume = audioElement.volume;
  const step = volume / (duration / 50);

  const fadeOutInterval = setInterval(() => {
    volume = Math.max(0, volume - step);
    audioElement.volume = volume;

    if (volume <= 0) {
      clearInterval(fadeOutInterval);
      audioElement.pause();
    }
  }, 50);
}

// Gradually increase volume
function fadeInAudio(audioElement, duration, targetVolume = 0.8) {
  let volume = 0;
  audioElement.volume = volume;
  audioElement.play();
  const step = targetVolume / (duration / 50);

  const fadeInInterval = setInterval(() => {
    volume = Math.min(targetVolume, volume + step);
    audioElement.volume = volume;

    if (volume >= targetVolume) {
      clearInterval(fadeInInterval);
    }
  }, 50);
}

// Game behaviour

let score = 0;
let combo = 0;
let comboMultiplier = 1;
let timeLeft = 90; // 1 minute and 30 seconds
let arrowSpeed = 2.5; // Base speed
let arrowInterval = 3500; // Slower initial spawn rate
let activeArrows = [];
let gameActive = false; // Game starts as inactive
let timerInterval;
let difficultyInterval;
let lastArrowPosition = null;

// Sound effects
const hitSound = new Audio("hit.mp3");
const gameMusic = new Audio("game-music.mp3");
const finishSound = new Audio("finish.mp3");

function startGame() {
  loopNarrativeMusic = false; // Stop looping the music
  fadeOutAudio(narrativeMusic, 1000); // Gradually fade out narrative music over 1 second

  // remove instructions, header, footer, display game
  instructionContainer.classList.add("hidden");
  header.classList.add("hidden");
  footer.classList.add("hidden");
  scoresAndGameContainer.classList.remove("hidden");

  // Clean up any remaining arrows from the previous game
  activeArrows.forEach((arrow) => gameContainer.removeChild(arrow));
  activeArrows = [];

  gameActive = true;
  score = 0;
  combo = 0;
  scoreElement.textContent = score;
  comboElement.textContent = combo;
  comboMultiplier = 1;
  timeLeft = 90;
  arrowSpeed = 2.5;
  arrowInterval = 3500;
  lastArrowPosition = null;

  // Start game music
  gameMusic.currentTime = 0;
  fadeInAudio(gameMusic, 1000);
  gameMusic.loop = true;

  timerInterval = setInterval(updateTimer, 1000);

  difficultyInterval = setInterval(() => {
    if (!gameActive) return;

    arrowSpeed += 0.5;
    arrowInterval = Math.max(arrowInterval - 10, 3450);

    console.log("timeLeft: ", timeLeft, " / arrow Interval: ", arrowInterval);

    spawnArrow();
  }, 10000);

  spawnArrow();

  // startGameBtn.style.display = "none";
}

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

function spawnArrow() {
  if (!gameActive) return;

  const arrowTypes = ["left", "up", "down", "right"];
  const randomType = arrowTypes[Math.floor(Math.random() * arrowTypes.length)];
  createArrow(randomType);

  // Schedule the next arrow based on the current difficulty
  setTimeout(spawnArrow, arrowInterval);
}

function createArrow(type) {
  const arrow = document.createElement("div");
  arrow.classList.add("arrow");
  arrow.dataset.type = type;

  const img = document.createElement("img");
  img.src = `${type}-arrow.svg`;
  arrow.appendChild(img);

  // Randomize arrow start position, ensuring no overlap with last arrow
  let arrowPosition;
  do {
    arrowPosition = Math.random() * (gameContainer.offsetWidth - 50);
  } while (
    lastArrowPosition !== null &&
    Math.abs(arrowPosition - lastArrowPosition) < 100
  ); // Ensure arrows don't spawn too close

  lastArrowPosition = arrowPosition;

  arrow.style.left = `${arrowPosition}px`;
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

function endGame() {
  gameActive = false;
  clearInterval(timerInterval);
  clearInterval(difficultyInterval);

  // Stop game music and play finish sound
  gameMusic.pause();
  finishSound.play();

  // Determine the message based on the score
  let message = `Game over! Your final score is ${score}`;
  if (score <= 100) {
    message +=
      "\n\nThe elf's looking quite pleased with himself as he makes you wait for an eternity while he ‘deliberates’ with the elvish high council.\n\nYou’ve got the portal open, but you might have to sprint to make it to the festival in time.";
  } else if (score <= 250) {
    message +=
      "\n\nThe elf raises an eyebrow and reluctantly opens the portal. 'Not impressive, but it'll do. Go on then, before I change my mind!'";
  } else if (score <= 300) {
    message +=
      "\n\nThe elf begrudgingly nods and opens the portal. ‘Well, well. I suppose that's decent enough for a dwarf. Hurry up and get going!’";
  } else if (score <= 350) {
    message +=
      "\n\nThe elf looks surprised but still maintains a facade of superiority. ‘Impressive enough to let you through. Just don't expect a medal!’";
  } else if (score <= 400) {
    message +=
      "\n\nThe elf’s eyes widen in genuine admiration. ‘Alright, you've got some moves. The portal’s open, but don't think this means you’re one of us!’";
  } else if (score <= 450) {
    message +=
      "\n\nThe elf looks utterly astonished and reluctantly admits, ‘You’ve outdone yourself, dwarf. The portal's wide open. Maybe you do have some grace after all!’";
  } else {
    message +=
      "\nThe elf's jaw drops as you finish with style. ‘Incredible! I'll be writing about you in the elvish history books. The portal’s open, and you’ve earned my respect!’";
  }

  setTimeout(() => {
    alert(message);
  }, 600);

  // Send email with the score
  sendEmail(score, "10", "The Dance of Arrows", () => {
    console.log("Email sent for game 10.");
  });

  instructionContainer.classList.remove("hidden");
  header.classList.remove("hiremoveen");
  footer.classList.remove("hidden");
  scoresAndGameContainer.classList.add("hidden");
}

document.addEventListener("keydown", handleKeyPress);
startGameBtn.addEventListener("click", startGame);
