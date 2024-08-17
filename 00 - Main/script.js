// script.js

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("intro-screen").style.display = "none";
    document.getElementById("backstory-page").style.display = "block";
  }, 6000); // 1s static + 5s animation
});

let currentPart = 1;
const totalParts = 4;

document.getElementById("next-button").addEventListener("click", () => {
  if (currentPart < totalParts) {
    document
      .getElementById(`story-part-${currentPart}`)
      .classList.add("hidden");
    currentPart++;
    document
      .getElementById(`story-part-${currentPart}`)
      .classList.remove("hidden");
    if (currentPart === totalParts) {
      document.getElementById("next-button").style.display = "none";
      document.getElementById("start-button").classList.remove("hidden");
    }
  }
});

document.getElementById("start-button").addEventListener("click", () => {
  window.location.href = "calendar.html"; // Redirect to the calendar page
});

document.getElementById("skip-button").addEventListener("click", () => {
  window.location.href = "calendar.html"; // Redirect to the calendar page
});
