const typewriterSound = document.getElementById("typewriter-sound");
const narrativeModal = document.getElementById("modal");
const instructionContainer = document.getElementById("instructions-container");
const startGameButton = document.getElementById("start-game");
const gameContainer = document.getElementById("game-container");
const timeCounter = document.getElementById("time-counter");
const gameMusic = new Audio("./narrative-music.mp3");
const footer = document.getElementById("footer");
const header = document.getElementById("header-section");
const categoriesDiv = document.getElementById("categories");
const pickOutfitBtn = document.getElementById("pick-outfit");

// Loop the narrative music only if the flag is set to true
gameMusic.addEventListener("ended", function () {
  gameMusic.currentTime = 0;
  gameMusic.play();
});

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

// Modal & narrative functions

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
    fadeInAudio(gameMusic, 1000);
    gameMusic.volume = 0.8;
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

// -------------------------- Game Logic --------------------------------- \\

let timerInterval; // Store the interval ID globally
let selectedOptions = {}; // Global to track selected options
let selectedPuzzle;
let spareTime;

startGameButton.addEventListener("click", startGame);

// Finalize selection when the timer runs out or the player picks the outfit
function finalizeSelection(feedback) {
  alert(`Outfit evaluation: ${feedback}`);

  // Reset the game state for replay
  resetGame();
}

function handleHalfNaked() {
  if (Object.keys(selectedOptions).length === categories.length) {
    finalizeSelection(selectedPuzzle.evaluation(selectedOptions, spareTime));
  } else {
    alert(
      `"My dear dwarf, you can't expect to join the festival half-dressed! We elves have standards, you know.\nPut on a proper outfit before you think about stepping onto our dance floor!"\n\n(Pick up one item per category before stopping the timer)`
    );
  }
}

function startGame() {
  // Hide instructions and show the game
  instructionContainer.classList.add("hidden");
  header.classList.add("hidden");
  footer.classList.add("hidden");
  gameContainer.classList.remove("hidden");

  // Start the game timer and initialize game logic
  initializeGame();
}

function initializeGame() {
  selectedOptions = {}; // Reset selected options

  // Clear any previous categories
  categoriesDiv.innerHTML = "";

  // Select a random puzzle
  selectedPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

  // Display clues in the clue cards
  document.querySelectorAll(".clue-card").forEach((card, index) => {
    if (selectedPuzzle.clues[index]) {
      card.querySelector(".clue-front").textContent =
        selectedPuzzle.clues[index];
      card.classList.remove("flipped"); // Reset clue cards
    }
  });

  // Create option buttons
  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category");
    const label = document.createElement("h3");
    label.textContent = category;
    categoryContainer.appendChild(label);

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");
    categoryContainer.appendChild(optionsContainer);

    options[category].forEach((option) => {
      const btn = document.createElement("button");
      btn.classList.add("category-option");
      btn.textContent = option;
      btn.addEventListener("click", () => {
        selectOption(category, option, btn);
      });
      optionsContainer.appendChild(btn);
    });

    categoriesDiv.appendChild(categoryContainer);
  });

  // Select option function
  function selectOption(category, option, btn) {
    // Deselect previously selected button in this category
    const previousSelected = document.querySelector(
      `.category-option.selected[data-category="${category}"]`
    );
    if (previousSelected) {
      previousSelected.classList.remove("selected");
    }

    // Mark current option as selected
    btn.classList.add("selected");
    btn.setAttribute("data-category", category);

    // Store selected option
    selectedOptions[category] = option;
  }

  // Clue card flip logic
  document.querySelectorAll(".clue-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.add("flipped");
    });
  });

  // Button to stop timer and evaluate the outfit
  pickOutfitBtn.addEventListener("click", handleHalfNaked);

  // Timer logic
  let timeLeft = 300;
  updateTimerDisplay(); // Initial timer display
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      if (timeLeft === 10) {
        forceSelection();
      }
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      finalizeSelection(selectedPuzzle.evaluation(selectedOptions));
    }
  }, 1000);

  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    spareTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    timeCounter.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  // Warn the player when 10 seconds remain
  function forceSelection() {
    alert("Time's almost up! You have 10 seconds to finish your selection.");
  }
}

function resetGame() {
  clearInterval(timerInterval); // Clear the timer interval
  instructionContainer.classList.remove("hidden");
  header.classList.remove("hidden");
  footer.classList.remove("hidden");
  gameContainer.classList.add("hidden");

  pickOutfitBtn.removeEventListener("click", handleHalfNaked);

  // Prepare for next game
}
