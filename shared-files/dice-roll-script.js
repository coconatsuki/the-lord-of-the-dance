function startDiceGame({
  narrativeText,
  diceInstructions,
  finalMessages,
  gameNumber,
  gameName,
}) {
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

  // Initialize the first narrative text with the typewriter effect
  function startFirstNarrative() {
    typeWriter(
      document.getElementById("narrative-text"),
      narrativeText[0],
      25,
      false, // Don't play sound on load
      () => {
        nextButton.style.display = "flex"; // Show the "Next" button after typing is done
      }
    );
  }

  // Trigger the first narrative on load
  window.addEventListener("DOMContentLoaded", startFirstNarrative);

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
          finalMessage = finalMessages[0];
        } else if (totalScore >= 1 && totalScore <= 20) {
          finalMessage = finalMessages[1];
        } else if (totalScore >= 21 && totalScore <= 40) {
          finalMessage = finalMessages[2];
        } else if (totalScore >= 41 && totalScore <= 60) {
          finalMessage = finalMessages[3];
        }

        setTimeout(() => {
          alert(finalMessage);
        }, 500);

        // Send email with the score
        sendEmail(totalScore, gameNumber, gameName, () => {
          console.log(`Email sent for game ${gameNumber}.`);
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
}
