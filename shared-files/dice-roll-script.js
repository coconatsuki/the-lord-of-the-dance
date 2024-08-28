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

  const modal = document.getElementById("modal");
  const content = document.getElementById("content");
  const diceInstructionDiv = document.getElementById("dice-instruction");
  const diceArea = document.getElementById("dice-area");
  const dice = document.getElementById("dice");
  const previousLabel = document.getElementById("previous-label");
  const previousResults = document.querySelectorAll(".result-square");
  const diceSound = document.getElementById("dice-sound");
  const typewriterSound = document.getElementById("typewriter-sound");
  const gameMusic = document.getElementById("game-music");
  const backToCalendarLink = document.getElementById("back-to-calendar");

  // Hide previous results initially
  document.getElementById("previous-results").style.display = "none";

  // Ensure the dice is disabled on page load
  diceArea.classList.add("disabled");
  backToCalendarLink.classList.add("disabled-blur");
  diceArea.style.cursor = "not-allowed";

  // Typewriter effect function with optional sound
  function typeWriter(element, text, delay = 25, playSound = true, callback) {
    let i = 0;

    function playTypewriterSound() {
      if (playSound) {
        typewriterSound.play();
        typewriterSound.addEventListener("ended", () => {
          if (i < text.length) {
            typewriterSound.currentTime = 0;
            typewriterSound.play();
          }
        });
      }
    }

    playTypewriterSound();
    typingInProgress = true;

    function typing() {
      if (i < text.length) {
        element.innerHTML = text.slice(0, i + 1).replace(/\n/g, "<br />");
        i++;
        setTimeout(typing, delay);
      } else {
        if (playSound) {
          typewriterSound.pause();
          typewriterSound.currentTime = 0;
        }
        typingInProgress = false;
        if (callback) callback();
      }
    }
    typing();
  }

  // Function to hide the modal, play music, and reveal the content
  function hideModal() {
    modal.style.display = "none"; // Hide the modal
    content.classList.remove("hidden"); // Show the main content
    gameMusic.play(); // Play the background music
    startSecondNarrative(); // Start the narrative after modal is dismissed
  }

  // Add event listener to the modal button to hide the modal and start the game
  document
    .getElementById("start-game-button")
    .addEventListener("click", hideModal);

  // Loop the game music
  gameMusic.addEventListener("ended", function () {
    gameMusic.currentTime = 0;
    gameMusic.play();
  });

  // Start narrative 2 after the modal is dismissed
  function startSecondNarrative() {
    typeWriter(
      document.getElementById("narrative-text"),
      narrativeText[0], // Display the second narrative (first one is in the modal)
      25,
      true, // Play sound for typewriter effect
      () => {
        diceInstructionDiv.classList.remove("hidden"); // Show dice instructions
        diceArea.classList.remove("disabled"); // Enable the dice area
        diceArea.style.cursor = "grab"; // Change cursor to grab
        gameInProgress = true; // Mark game as in progress
      }
    );
  }

  // Handle dice rolling logic
  diceArea.addEventListener("click", () => {
    if (
      diceArea.classList.contains("disabled") ||
      diceRolling ||
      typingInProgress
    )
      return;

    diceInstructionDiv.classList.add("hidden");
    rolls++;
    diceRolling = true;
    diceSound.play(); // Play dice roll sound

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
        document.getElementById("previous-results").style.display = "block"; // Show the container
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
            diceRolling = false;
            diceArea.classList.remove("disabled");
            diceArea.style.cursor = "grab";
          }
        );
      } else {
        diceArea.classList.add("disabled");
        diceArea.style.cursor = "default";
        gameInProgress = false;
        diceRolling = false;
        diceInstructionDiv.classList.add("hidden");

        // Display the final message based on totalScore
        let finalMessage = "";

        if (totalScore >= 0 && totalScore < 10) {
          finalMessage = finalMessages[0];
        } else if (totalScore >= 10 && totalScore <= 20) {
          finalMessage = finalMessages[1];
        } else if (totalScore >= 21 && totalScore <= 40) {
          finalMessage = finalMessages[2];
        } else if (totalScore >= 41 && totalScore <= 60) {
          finalMessage = finalMessages[3];
        }

        finalMessage = finalMessage.replace("{score}", totalScore);

        setTimeout(() => {
          alert(finalMessage);
        }, 500);

        backToCalendarLink.classList.remove("disabled-blur");

        // Send email with the score
        sendEmail(totalScore, gameNumber, gameName, () => {
          console.log(`Email sent for game ${gameNumber}.`);
        });
      }
    }, 1500);

    diceArea.classList.add("disabled");
    diceArea.style.cursor = "not-allowed";
  });
}
