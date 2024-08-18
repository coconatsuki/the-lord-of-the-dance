const narrativeText = [
  "First, Jimli approaches the River Spirit, Mistriva, who is said to control the flow of time itself. The river glows with an ethereal blue light, and as Jimli kneels before it, he whispers, 'Uh, great Mistriva... I hope this humble dwarf’s prayer doesn’t... um, dam up your waters?'",
  "Next, he finds the Elder Oak, home to the Tree Spirit, Sylvas, guardian of knowledge and wisdom. Jimli places a hand on the ancient bark, 'Sylvas, keeper of leaves and... uh, bark. Might you lend a dancing dwarf some wisdom?'",
  "Finally, Jimli comes upon the Stone of Echoes, a massive boulder said to house Kragrok, the Spirit of Earth and Stone. The rock’s surface is smooth and warm, and Jimli kneels beside it. 'Kragrok, mighty boulder of... er, boulderness, I don’t suppose you’d fancy a dance yourself? Just... you know, keep the ground steady for me?'",
];

const diceInstructions = [
  "Now, roll the dice for Mistriva =>",
  "Now, roll the dice for Sylvas =>",
  "Now, roll the dice for Kragrok =>",
];

let currentStep = 0;
let totalScore = 0;
let rolls = 0;
let gameInProgress = false; // Track whether the game is in progress
let diceRolling = false; // Track whether the dice is currently rolling

const nextButton = document.getElementById("next-button");
const diceInstructionDiv = document.getElementById("dice-instruction");
const diceArea = document.getElementById("dice-area");
const dice = document.getElementById("dice");
const previousLabel = document.getElementById("previous-label");
const previousResults = document.querySelectorAll(".result-square");
const diceSound = document.getElementById("dice-sound");

// Ensure the dice is disabled on page load
diceArea.classList.add("disabled");
diceArea.style.cursor = "not-allowed";

// Handle "Next" button click
nextButton.addEventListener("click", () => {
  if (currentStep === 0) {
    document.getElementById("narrative-text").innerHTML =
      narrativeText[currentStep];
    nextButton.style.display = "none";
    diceInstructionDiv.classList.remove("hidden");
    diceInstructionDiv.classList.add("flex");
    diceArea.classList.remove("disabled"); // Enable the dice area
    diceArea.style.cursor = "grab"; // Set grab cursor
    gameInProgress = true; // Mark game as in progress
  }
});

// Handle Dice Rolling Logic
diceArea.addEventListener("click", () => {
  if (diceArea.classList.contains("disabled") || diceRolling) return;

  rolls++;
  diceRolling = true; // Mark dice as rolling
  diceSound.play(); // Play the dice sound

  // Shake effect on click
  diceArea.classList.add("shake");
  setTimeout(() => {
    diceArea.classList.remove("shake");
  }, 500);

  let rolling = setInterval(() => {
    dice.textContent = Math.floor(Math.random() * 20) + 1;
  }, 100);

  setTimeout(() => {
    clearInterval(rolling);
    const diceRoll = parseInt(dice.textContent);
    totalScore += diceRoll;

    // Display previous roll result
    previousResults[rolls - 1].textContent = diceRoll;
    previousResults[rolls - 1].classList.remove("hidden");

    if (rolls === 1) {
      previousLabel.classList.remove("hidden");
    }

    if (rolls < 3) {
      dice.textContent = "Roll";
      document.getElementById("narrative-text").innerHTML =
        narrativeText[rolls];
      diceInstructionDiv.textContent = diceInstructions[rolls];
      diceRolling = false; // Re-enable the dice for the next roll
      diceArea.classList.remove("disabled");
      diceArea.style.cursor = "grab"; // Set grab cursor
    } else {
      diceArea.classList.add("disabled");
      diceArea.style.cursor = "default"; // Reset cursor when disabled
      gameInProgress = false; // Mark game as finished
      diceRolling = false; // Reset rolling status
      diceInstructionDiv.classList.add("hidden");

      setTimeout(() => {
        alert(
          `Total score: ${totalScore}\n\nWith the spirits' responses guiding his journey, Jimli continues onward, feeling slightly more — or perhaps less — confident about the path ahead.`
        );
      }, 500); // Delay to ensure all UI updates before alert
    }
  }, 1500); // Stop after 1.5 seconds

  diceArea.classList.add("disabled"); // Disable the dice during the roll
  diceArea.style.cursor = "not-allowed"; // Set not-allowed cursor during rolling
});

// Disable the "Back to Calendar" link during the game
document.getElementById("back-to-calendar").addEventListener("click", (e) => {
  if (gameInProgress) {
    e.preventDefault(); // Prevent navigation if the game is in progress
    alert("Finish the game before returning to the calendar.");
  }
});
