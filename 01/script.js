const narrativeText = [
  "First, Jimli approaches the River Spirit, Mistriva, who is said to control the flow of time itself. The river glows with an ethereal blue light, and as Jimli kneels before it, he whispers, 'Uh, great Mistriva... I hope this humble dwarf’s prayer doesn’t... um, dam up your waters?'",
  "Next, he finds the Elder Oak, home to the Tree Spirit, Sylvas, guardian of knowledge and wisdom. Jimli places a hand on the ancient bark, 'Sylvas, keeper of leaves and... uh, bark. Might you lend a dancing dwarf some wisdom?'",
  "Finally, Jimli comes upon the Stone of Echoes, a massive boulder said to house Kragrok, the Spirit of Earth and Stone. The rock’s surface is smooth and warm, and Jimli kneels beside it. 'Kragrok, mighty boulder of... er, boulderness, I don’t suppose you’d fancy a dance yourself? Just... you know, keep the ground steady for me?'",
];

const diceInstructions = [
  "Now, roll the dice (click on it) for Mistriva =>",
  "Now, roll the dice (click on it) for Sylvas =>",
  "Now, roll the dice (click on it) for Kragrok =>",
];

let currentStep = 0;
let totalScore = 0;
let rolls = 0;

const nextButton = document.getElementById("next-button");
const diceInstructionDiv = document.getElementById("dice-instruction");
const dice = document.getElementById("dice");

// Handle "Next" button click
nextButton.addEventListener("click", () => {
  if (currentStep === 0) {
    document.getElementById("narrative-text").innerHTML =
      narrativeText[currentStep];
    nextButton.style.display = "none";
    diceInstructionDiv.classList.remove("hidden");
    dice.classList.remove("disabled"); // Enable the dice
  }
});

// Handle Dice Rolling Logic
dice.addEventListener("click", () => {
  if (dice.classList.contains("disabled")) return;

  rolls++;
  let rolling = setInterval(() => {
    dice.textContent = Math.floor(Math.random() * 20) + 1;
  }, 100);

  setTimeout(() => {
    clearInterval(rolling);
    const diceRoll = parseInt(dice.textContent);
    totalScore += diceRoll;

    if (rolls < 3) {
      dice.textContent = "Roll";
      document.getElementById("narrative-text").innerHTML =
        narrativeText[rolls];
      diceInstructionDiv.textContent = diceInstructions[rolls];
    } else {
      dice.classList.add("disabled");
      alert(
        `Total score: ${totalScore}\n\nWith the spirits' responses guiding his journey, Jimli continues onward, feeling slightly more — or perhaps less — confident about the path ahead.`
      );
      diceInstructionDiv.classList.add("hidden");
    }
  }, 2000); // Stop after 2 seconds
});

// Disable the "Back to Calendar" link during the game
document.getElementById("back-to-calendar").addEventListener("click", (e) => {
  e.preventDefault();
});
