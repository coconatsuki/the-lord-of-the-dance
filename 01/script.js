const narrativeText = [
  "The sun is just rising over the peaks of Stonehelm as Jimli, with a heart full of dreams and a bag full of snacks, takes his first step beyond the safety of his home. The ancient forest looms ahead, full of mysteries and spirits who watch over the land.<br /><br />As he enters the forest, Jimli recalls the stories his grandfather told him about the ancient spirits dwelling in these woods. 'Right,' he mutters, gripping his trusty axe—not that he’ll need it, of course, but it’s comforting. 'Let’s see if the spirits are in a dancing mood today.'",
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
let typingInProgress = false; // Track whether the typewriter effect is in progress

const nextButton = document.getElementById("next-button");
const diceInstructionDiv = document.getElementById("dice-instruction");
const diceArea = document.getElementById("dice-area");
const dice = document.getElementById("dice");
const previousLabel = document.getElementById("previous-label");
const previousResults = document.querySelectorAll(".result-square");
const diceSound = document.getElementById("dice-sound");
const typewriterSound = document.getElementById("typewriter-sound");

// Ensure the dice is disabled on page load
diceArea.classList.add("disabled");
diceArea.style.cursor = "not-allowed";

// Typewriter effect function with optional sound
function typeWriter(element, text, delay = 25, playSound = true, callback) {
  let i = 0;

  // Function to play and loop the sound
  function playTypewriterSound() {
    if (playSound) {
      typewriterSound.play();
      typewriterSound.addEventListener("ended", () => {
        if (i < text.length) {
          typewriterSound.currentTime = 0; // Reset sound to the beginning
          typewriterSound.play(); // Play again if typing is not complete
        }
      });
    }
  }

  // Start playing the sound when typing starts
  playTypewriterSound();
  typingInProgress = true; // Mark typing as in progress

  function typing() {
    if (i < text.length) {
      element.innerHTML = text.slice(0, i + 1).replace(/\n/g, "<br />");
      i++;
      setTimeout(typing, delay);
    } else {
      // Stop the sound when typing is complete
      if (playSound) {
        typewriterSound.pause();
        typewriterSound.currentTime = 0; // Reset sound for the next section
      }
      typingInProgress = false; // Mark typing as complete
      if (callback) callback(); // Call the callback function if provided
    }
  }
  typing();
}

// Trigger the first narrative on load
window.addEventListener("load", () => {
  typeWriter(
    document.getElementById("narrative-text"),
    narrativeText[0],
    25,
    false, // Don't play sound on load
    () => {
      nextButton.style.display = "flex"; // Show the "Next" button after typing is done
    }
  );
});

// Handle "Next" button click
nextButton.addEventListener("click", () => {
  nextButton.style.display = "none";

  if (currentStep === 0 && !typingInProgress) {
    currentStep++;
    typeWriter(
      document.getElementById("narrative-text"),
      narrativeText[currentStep],
      25,
      true,
      () => {
        diceInstructionDiv.classList.remove("hidden");
        diceArea.classList.remove("disabled"); // Enable the dice area
        diceArea.style.cursor = "grab"; // Set grab cursor
        gameInProgress = true; // Mark game as in progress
      }
    );
  }
});

// Handle Dice Rolling Logic
diceArea.addEventListener("click", () => {
  if (
    diceArea.classList.contains("disabled") ||
    diceRolling ||
    typingInProgress
  )
    return;

  diceInstructionDiv.classList.add("hidden");

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
      currentStep++;
      typeWriter(
        document.getElementById("narrative-text"),
        narrativeText[currentStep],
        25,
        true,
        () => {
          diceInstructionDiv.classList.remove("hidden");
          diceInstructionDiv.textContent = diceInstructions[rolls];
          diceRolling = false; // Re-enable the dice for the next roll
          diceArea.classList.remove("disabled");
          diceArea.style.cursor = "grab"; // Set grab cursor
        }
      );
    } else {
      diceArea.classList.add("disabled");
      diceArea.style.cursor = "default"; // Reset cursor when disabled
      gameInProgress = false; // Mark game as finished
      diceRolling = false; // Reset rolling status
      diceInstructionDiv.classList.add("hidden");

      // Display the final message based on the totalScore
      let finalMessage = "";

      if (totalScore === 0) {
        finalMessage = `Total score: ${totalScore}\n\nMistriva's waters remained still, Sylvas's leaves didn't so much as rustle, and Kragrok barely gave a pebble a nudge. It seems like Jimli's prayers were met with… nothing.\n\nThe road ahead may be long, dark, and filled with dwarven curses, but hey, Jimli always did like a good challenge.`;
      } else if (totalScore >= 1 && totalScore <= 20) {
        finalMessage = `Total score: ${totalScore}\n\nThe spirits gave Jimli a nod… well, a small nod. Mistriva stirred the waters just enough for a light drizzle, Sylvas dropped a single leaf of wisdom (it's still a leaf, right?), and Kragrok rumbled… slightly.\n\nNot exactly the luckiest start, but hey, even a drizzle can fill a dwarven cup.`;
      } else if (totalScore >= 21 && totalScore <= 40) {
        finalMessage = `Total score: ${totalScore}\n\nJimli's prayers were met with some solid support! Mistriva's waters flowed smoothly, Sylvas whispered a few wise words, and Kragrok shifted his stony weight to clear a path.\n\nThe spirits aren't dancing with him yet, but they've certainly got a foot tapping. Jimli's journey might just be a bit brighter after all!`;
      } else if (totalScore >= 41 && totalScore <= 60) {
        finalMessage = `Total score: ${totalScore}\n\nThe spirits are practically throwing a party for Jimli! Mistriva's waters are dancing, Sylvas's branches are bowing with wisdom, and Kragrok is rolling stones out of the way like they're pebbles.\n\nJimli's steps feel lighter and he starts believing he's invincible. Just don't trip on your beard, Jimli!`;
      }

      setTimeout(() => {
        alert(finalMessage);
      }, 500);

      // Send email with the score
      sendEmail(totalScore, "1", "Setting Forth", () => {
        console.log("Email sent for game 1.");
      });
    }
  }, 1500); // Stop after 1.5 seconds

  diceArea.classList.add("disabled"); // Disable the dice during the roll
  diceArea.style.cursor = "not-allowed"; // Set not-allowed cursor during rolling
});

// Disable the "Back to Calendar" link during the game
document.getElementById("back-to-calendar").addEventListener("click", (e) => {
  if (gameInProgress || typingInProgress) {
    e.preventDefault(); // Prevent navigation if the game is in progress or typing
    alert("Finish the game before returning to the calendar.");
  }
});
