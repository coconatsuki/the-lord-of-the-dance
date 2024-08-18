// script.js

// Event listener for the Start Adventure button
document.getElementById("start-button").addEventListener("click", () => {
  window.location.href = "./calendar.html"; // Redirect to the calendar page
});

// Event listener for the Skip button
document.getElementById("skip-button").addEventListener("click", () => {
  window.location.href = "./calendar.html"; // Redirect to the calendar page
});

// Typewriter effect function with looping sound
// Typewriter effect function with looping sound
function typeWriter(element, text, delay = 25) {
  let i = 0;
  const typewriterSound = document.getElementById("typewriter-sound");

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
      document.getElementById("start-button").classList.remove("hidden");
    }
  }
}

// Initial page load event
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("intro-text").style.display = "none"; // Hide the title
    document.getElementById("start-story-btn").style.display = "block"; // Show the button
  }, 6000); // After the 6-second animation

  document.getElementById("start-story-btn").addEventListener("click", () => {
    document.getElementById("intro-screen").style.display = "none";
    document.getElementById("backstory-page").style.display = "block";
    document.getElementById("next-button").classList.remove("hidden");

    // Start with the first part using the typewriter effect
    showNextPart(currentPart);
  });
});

let currentPart = 0; // Start with the first part

// Event listener for the Next Page button
document.getElementById("next-button").addEventListener("click", () => {
  currentPart++;
  showNextPart(currentPart);
});

// Event listener for the Start Adventure button
document.getElementById("start-button").addEventListener("click", () => {
  window.location.href = "calendar.html"; // Redirect to the calendar page
});

// Event listener for the Skip button
document.getElementById("skip-button").addEventListener("click", () => {
  window.location.href = "calendar.html"; // Redirect to the calendar page
});
