const typewriterSound = document.getElementById("typewriter-sound");
const narrativeModal = document.getElementById("modal");
const instructionContainer = document.getElementById("instructions-container");
const narrativeMusic = new Audio("./narrative-music.mp3");
const snakeMusic = new Audio("./snake-music.mp3");
const buzzSound = new Audio("./buzz.mp3");
const biteSound = new Audio("./eat.mp3");

// Loop the narrative music
narrativeMusic.addEventListener("ended", function () {
  narrativeMusic.currentTime = 0;
  narrativeMusic.play();
});

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

  // Start playing the sound when typing starts
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
      instructionContainer.classList.remove("hidden");
    }
  }
}

let currentPart = 0; // Start with the first part

// Event listener for the Next Page button
document.getElementById("next-button").addEventListener("click", () => {
  if (currentPart === 0) {
    narrativeMusic.play();
    narrativeMusic.volume = 0.8;
  }

  currentPart++;
  showNextPart(currentPart);
});

// Hide modal and allow game interaction
document.getElementById("close-modal-button").addEventListener("click", () => {
  // gameMusic.play();
  typewriterSound.pause(); // Play again if typing is not complete
  narrativeModal.style.display = "none";
});
