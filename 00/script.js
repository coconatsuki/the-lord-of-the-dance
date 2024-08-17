// script.js

// Typewriter effect function with sound
function typeWriter(element, text, delay = 25) {
  let i = 0;
  const typewriterSound = document.getElementById("typewriter-sound");

  // Play the typewriter sound
  typewriterSound.play();

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
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
  const nextPart = storyParts[partIndex];

  if (nextPart) {
    const textElement = nextPart.querySelector(".section-text");
    const fullText = textElement.textContent;
    textElement.innerHTML = ""; // Clear the content
    nextPart.classList.remove("hidden");

    // Apply the typewriter effect with sound
    typeWriter(textElement, fullText);

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
    document.getElementById("intro-screen").style.display = "none";
    document.getElementById("backstory-page").style.display = "block";

    // Start with the first part using the typewriter effect
    showNextPart(currentPart);
  }, 6000); // 1s static + 5s animation
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
