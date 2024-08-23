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
  const oasisLeftImage = document.getElementById("oasis-left-image");
  const oasisRightImage = document.getElementById("oasis-right-image");

  // Array to store image sets and corresponding number of differences
  const imageSets = [
    {
      leftImagePath: "./oasis-set1-left.jpeg",
      rightImagePath: "./oasis-set1-right.jpeg",
      differences: 4,
    },
    {
      leftImagePath: "./oasis-set2-left.jpeg",
      rightImagePath: "./oasis-set2-right.jpeg",
      differences: 16,
    },
    {
      leftImagePath: "./oasis-set3-left.jpg",
      rightImagePath: "./oasis-set3-right.jpg",
      differences: 11,
    },
    {
      leftImagePath: "./oasis-set4-left.jpg",
      rightImagePath: "./oasis-set4-right.jpeg",
      differences: 7,
    },
    {
      leftImagePath: "./oasis-set5-left.jpg",
      rightImagePath: "./oasis-set5-right.jpg",
      differences: 14,
    },
  ];

  let totalDifferences = 10; // Default, will be updated after random selection
  let timeLimit = 120; // 2 minutes in seconds
  let timerInterval;

  // Start the game when the button is clicked
  startButton.addEventListener("click", () => {
    // Randomly select an image set
    const randomIndex = Math.floor(Math.random() * imageSets.length);
    const selectedSet = imageSets[randomIndex];
    oasisLeftImage.src = selectedSet.leftImagePath; // Set the image source
    oasisRightImage.src = selectedSet.rightImagePath; // Set the image source
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
    let message;

    if (difference === 0) {
      score = 10;
      message = `Perfect score! Jimli not only finds the oasis but also spots another one just a bit further.\n\nIt's a dwarven paradise, complete with flowing ale and cool shade.\n\nHe settles down for a well-deserved rest.`;
    } else if (difference <= 1) {
      score = 9;
      message = `So close! Jimli finds the oasis, and it's everything he hoped for. But just as he's about to relax, he notices something odd... \n\nThe water tastes a bit like elf tea! He grumbles, "I knew there was something off about this place."\n\nStill, it's a great spot to rest, even if it could use a proper dwarven brew.`;
    } else if (difference <= 2) {
      score = 8;
      message = `Well done! Jimli reaches the oasis, though it's not quite the paradise he envisioned.\n\nThe ground is littered with stubborn cactus that seem to have a personal grudge against dwarves, and the water... well, it's more lukewarm than refreshing.\n\nStill, it's a far cry better than roasting under the desert sun!`;
    } else if (difference <= 3) {
      score = 7;
      message = `Not bad! Jimli makes it to the oasis, but it's not exactly what he imagined.\n\nThe water is a bit murky, and the trees offer little shade, but it's an oasis nonetheless.\n\nHe takes a quick rest before continuing his journey.`;
    } else if (difference <= 4) {
      score = 5;
      message = `Good effort! Jimli thinks he finds the oasis, but as he gets closer, it seems more like a mirage.\n\nHe splashes his face with some lukewarm water and grumbles before moving on.`;
    } else if (difference <= 5) {
      score = 3;
      message = `Jimli almost had it! He sees what he thinks is an oasis, but by the time he gets there, it's just another patch of sand.\n\nBetter luck next time, dwarf!`;
    } else if (difference <= 6) {
      score = 2;
      message = `Oh no! Jimli is convinced the oasis is nearby, but after wandering in circles, he ends up even thirstier than before.\n\nMaybe next time, Jimli. Maybe next time.`;
    } else if (difference <= 7) {
      score = 1;
      message = `Poor Jimli... He can't tell a mirage from a real oasis.\n\nExhausted and parched, he trudges on, vowing to get better at this 'spot the oasis' business.`;
    } else {
      score = 0;
      message = `Disaster! Jimli's eyes deceive him completely, and he walks right past a perfectly good oasis, never realizing what he missed.\n\nHe continues on his way, grumbling about elves and their tricks.`;
    }

    alert(
      `You found ${playerGuess} differences. Your score is: ${score}\n\n${message}`
    );

    // Reset to start screen
    startScreen.classList.remove("hidden");
    backgroundImage.classList.remove("hidden");
    header.classList.remove("hidden");
    gameContainer.classList.add("hidden");
    pictureContainer.classList.add("hidden");
    backToCalendarLink.classList.remove("disabled-blur");

    sendEmail(score, "6", "Mirage or Oasis?", () => {
      console.log("Email sent for game 6.");
    });
  }
});
