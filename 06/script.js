document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const startScreen = document.getElementById("start-screen");
  const gameContainer = document.getElementById("game-container");
  const pictureContainer = document.getElementById("picture-container");
  const timeCounter = document.getElementById("time-counter");
  const backToCalendarLink = document.getElementById("back-to-calendar");
  const backgroundImage = document.getElementById("background-image");
  const header = document.getElementById("header-section");
  const gameMusic = document.getElementById("game-music");
  const oasisImage = document.getElementById("oasis-image");

  // Array to store image sets and corresponding number of differences
  const imageSets = [
    { imagePath: "./oasis-1.png", differences: 4 }, // Example image paths
    { imagePath: "./oasis-2.png", differences: 7 },
    { imagePath: "./oasis-3.png", differences: 13 },
    { imagePath: "./oasis-4.png", differences: 18 },
    { imagePath: "./oasis-5.png", differences: 23 },
  ];

  let totalDifferences = 10; // Default, will be updated after random selection
  let timeLimit = 120; // 2 minutes in seconds
  let timerInterval;

  // Start the game when the button is clicked
  startButton.addEventListener("click", () => {
    // Randomly select an image set
    const randomIndex = Math.floor(Math.random() * imageSets.length);
    const selectedSet = imageSets[randomIndex];
    oasisImage.src = selectedSet.imagePath; // Set the image source
    totalDifferences = selectedSet.differences; // Update the total differences

    // Hide the start screen and show the game screen
    startScreen.classList.add("hidden");
    backgroundImage.classList.add("hidden");
    header.classList.add("hidden");
    backToCalendarLink.classList.add("disabled-blur");
    gameContainer.classList.remove("hidden");
    pictureContainer.classList.remove("hidden");

    // Play background music
    gameMusic.play();

    startTimer();
  });

  // Start the timer
  function startTimer() {
    let timeElapsed = 0;
    timerInterval = setInterval(() => {
      timeElapsed++;
      updateTimeDisplay(timeElapsed);

      if (timeElapsed >= timeLimit) {
        clearInterval(timerInterval);
        // Stop the background music when time is up
        gameMusic.pause();
        promptForDifferences();
      }
    }, 1000);
  }

  // Update the timer display
  function updateTimeDisplay(timeElapsed) {
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    timeCounter.textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")} / 2:00`;
  }

  // Prompt for the number of differences found
  function promptForDifferences() {
    let playerInput;
    while (true) {
      playerInput = prompt(
        "Time's up! How many differences did you spot? (Enter a number)"
      );
      if (
        playerInput !== null &&
        !isNaN(playerInput) &&
        Number.isInteger(+playerInput)
      ) {
        break;
      } else {
        alert("Please enter a valid number.");
      }
    }

    calculateScore(parseInt(playerInput, 10));
  }

  // Calculate score based on player's input
  function calculateScore(playerGuess) {
    const difference = Math.abs(playerGuess - totalDifferences);
    let score;

    if (difference === 0) {
      score = 100; // Perfect score
    } else if (difference <= 2) {
      score = 80; // Very close
    } else if (difference <= 4) {
      score = 60; // Close enough
    } else {
      score = 40; // Not too close
    }

    alert(`You found ${playerGuess} differences. Your score is: ${score}`);

    // Reset to start screen
    startScreen.classList.remove("hidden");
    backgroundImage.classList.remove("hidden");
    header.classList.remove("hidden");
    gameContainer.classList.add("hidden");
    pictureContainer.classList.add("hidden");
    backToCalendarLink.classList.remove("disabled-blur");
  }
});
