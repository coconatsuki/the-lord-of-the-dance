const typewriterSound = document.getElementById("typewriter-sound");
const narrativeModal = document.getElementById("modal");
const instructionContainer = document.getElementById("instructions-container");
const gameMusic = new Audio("./narrative-music.mp3");

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
