const typewriterSound = document.getElementById("typewriter-sound");
const narrativeModal = document.getElementById("modal");
const instructionContainer = document.getElementById("instructions-container");
const startGameButton = document.getElementById("start-game");
const gameContainer = document.getElementById("game-container");
const timeCounter = document.getElementById("counter-container");
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

startGameButton.addEventListener("click", startGame);

function startGame() {
  // Hide instructions and show the game
  instructionContainer.classList.add("hidden");
  header.classList.add("hidden");
  footer.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  timeCounter.classList.remove("hidden");

  // Start the game timer and initialize game logic
  initializeGame();
}

function initializeGame() {
  const categories = ["Top", "Bottom", "Cloak", "Belt", "Hat"];
  const options = {
    Top: ["Red Velvet Shirt", "Silk Blouse", "Cotton Shirt", "Linen Vest"],
    Bottom: [
      "Silk Trousers",
      "Leather Pants",
      "Cotton Trousers",
      "Linen Pants",
    ],
    Cloak: ["Velvet Cloak", "Leather Jacket", "Cotton Cloak", "Linen Jacket"],
    Belt: ["Gold Belt", "Leather Belt", "Simple Rope Belt", "Silver Belt"],
    Hat: ["Velvet Hat", "Straw Hat", "Leather Cap", "Silk Hat"],
  };

  let selectedOptions = {};

  // Select a random puzzle
  const selectedPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

  // Display clues in the clue cards
  document.querySelectorAll(".clue-card").forEach((card, index) => {
    if (selectedPuzzle.clues[index]) {
      card.querySelector(".clue-front").textContent =
        selectedPuzzle.clues[index];
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

    // Enable button when all categories are selected
    if (Object.keys(selectedOptions).length === categories.length) {
      pickOutfitBtn.disabled = false;
    }
  }

  // Clue card flip logic
  document.querySelectorAll(".clue-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.add("flipped");
    });
  });

  // Button to stop timer and evaluate the outfit
  pickOutfitBtn.addEventListener("click", () => {
    if (Object.keys(selectedOptions).length === categories.length) {
      selectedPuzzle.evaluation(selectedOptions);
    } else {
      alert(
        `"My dear dwarf, you can't expect to join the festival half-dressed! We elves have standards, you know.\nPut on a proper outfit before you think about stepping onto our dance floor!"\n\n(Pick up one item per category before stopping the timer)`
      );
    }
  });

  // Timer logic
  let timeLeft = 300;
  const timeCounter = document.getElementById("time-counter");
  const timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      forceSelection();
    }
  }, 1000);

  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeCounter.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  // Force selection when timer runs out
  function forceSelection() {
    document.querySelectorAll(".clue-card").forEach((card) => {
      card.style.display = "none"; // Hide clues
    });

    if (Object.keys(selectedOptions).length !== categories.length) {
      alert("Time's up! You have 10 seconds to finish your selection.");
      setTimeout(() => {
        selectedPuzzle.evaluation(selectedOptions);
      }, 10000);
    }
  }

  function evaluateCombination(selectedOptions, correctCombination) {
    let correctCount = 0;
    for (let category in correctCombination) {
      if (selectedOptions[category] === correctCombination[category]) {
        correctCount++;
      }
    }

    // Provide feedback based on the number of correct items
    let feedback;
    if (correctCount === 5) {
      feedback = "Perfection! You’ve nailed the elven fashion!";
    } else if (correctCount >= 3) {
      feedback =
        "Not bad, not bad at all! A few tweaks, and you’d be the talk of the festival.";
    } else {
      feedback = "Oh dear... Perhaps fashion isn't your strong suit after all.";
    }

    alert(`Outfit evaluation: ${feedback}`);

    instructionContainer.classList.remove("hidden");
    header.classList.remove("hidden");
    footer.classList.remove("hidden");
    gameContainer.classList.add("hidden");
    timeCounter.classList.add("hidden");
  }
}
