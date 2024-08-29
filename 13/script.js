// Elements related to the typewriter effect and modal
const typewriterSound = document.getElementById("typewriter-sound");
const narrativeModal = document.getElementById("modal");
const instructionsContainer = document.getElementById("instructions-container");
const gameContainer = document.getElementById("game-container");
const counterContainer = document.getElementById("counter-container");
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const timeCounter = document.getElementById("time-counter");

// Sound effects for correct and incorrect answers
const correctAnswerSound = new Audio("../08/correct-answer.mp3");
const wrongAnswerSound = new Audio("../08/wrong-answer.mp3");
const gameMusic = new Audio("./game-music.mp3");
const backToCalendarLink = document.getElementById("back-to-calendar");

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLimit = 15; // 15 seconds per question
let totalQuestions = 10;
let spareTimeScore = 0; // Track unused time for spareTimeScore

// Loop the narrative music only if the flag is set to true
gameMusic.addEventListener("ended", function () {
  gameMusic.currentTime = 0;
  gameMusic.play();
});

// Function to shuffle the array of questions or answers
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Typewriter effect function with looping sound
function typeWriter(element, text, delay = 25) {
  let i = 0;

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
      document.getElementById("close-modal-button").classList.remove("hidden");
    }
  }
}

let currentPart = 0; // Start with the first part

// Event listener for the Next Page button
document.getElementById("next-button").addEventListener("click", () => {
  if (currentPart === 0) {
    gameMusic.play();
    gameMusic.volume = 0.8;
  }

  currentPart++;
  showNextPart(currentPart);
});

// Hide modal and allow game interaction
document.getElementById("close-modal-button").addEventListener("click", () => {
  typewriterSound.pause(); // Play again if typing is not complete
  narrativeModal.style.display = "none";
  instructionsContainer.classList.remove("hidden");
});

// Start quiz event listener
document.getElementById("start-quiz").addEventListener("click", () => {
  instructionsContainer.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  counterContainer.classList.remove("hidden");
  startQuiz();
});

function startQuiz() {
  backToCalendarLink.classList.add("disabled-blur");
  currentQuestionIndex = 0;
  score = 0;
  spareTimeScore = 0; // Reset spare time score
  gameMusic.volume = 0.5;
  timeLimit = 15; // Set timer to 15 seconds per question
  shuffleArray(questions); // Shuffle the questions array
  showQuestion();
  startTimer();
}

function startTimer() {
  let timeRemaining = timeLimit;
  timeCounter.textContent = `0:${timeRemaining}`;
  timerInterval = setInterval(() => {
    timeRemaining--;
    timeCounter.textContent = `0:${
      timeRemaining < 10 ? "0" : ""
    }${timeRemaining}`;
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionContainer.textContent = question.question;

  // Shuffle the answers before displaying them
  const shuffledAnswers = [...question.answers];
  shuffleArray(shuffledAnswers);

  answersContainer.innerHTML = "";
  shuffledAnswers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.classList.add("answer-button");
    button.textContent = answer;

    // Check if the current answer matches the correct answer
    const isCorrectAnswer =
      question.answers.indexOf(answer) === question.correctAnswer;

    button.addEventListener("click", () =>
      handleAnswerClick(button, isCorrectAnswer)
    );
    answersContainer.appendChild(button);
  });
}

function handleAnswerClick(button, isCorrectAnswer) {
  clearInterval(timerInterval);

  // Calculate spare time score
  const timeRemaining = parseInt(timeCounter.textContent.split(":")[1], 10);
  spareTimeScore += timeRemaining;

  // Disable all buttons
  const buttons = document.querySelectorAll(".answer-button");
  buttons.forEach((button) => (button.disabled = true));

  // Highlight the selected button based on whether it is correct or not
  if (isCorrectAnswer) {
    score++;
    button.classList.add("correct");
    correctAnswerSound.play();
  } else {
    button.classList.add("wrong");
    wrongAnswerSound.play();
  }

  // Wait for a moment before moving to the next question
  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    showQuestion();
    startTimer();
  } else {
    endGame();
  }
}

function getFinalMessage(score, spareTimeScore) {
  let timeMessage = "";
  if (spareTimeScore >= 100) {
    timeMessage =
      "Jimli answered with the speed of a dwarf eager to prove himself, not a moment wasted!";
  } else if (spareTimeScore >= 50) {
    timeMessage =
      "Jimli moved at a thoughtful pace, carefully considering each question before answering.";
  } else {
    timeMessage =
      "Jimli took his time, perhaps too much of it, as he pondered over each question with a furrowed brow.";
  }

  let scoreMessage;
  if (score === 10) {
    scoreMessage =
      "Lady Elowen is thoroughly impressed! 'You know more about elves than some elves themselves!' she exclaims, her admiration evident. 'With a connection like this, our dance will be truly magical!'";
  } else if (score >= 8) {
    scoreMessage =
      "'Impressive,' Elowen says with a warm smile. 'You have a solid grasp of elven lore. We're well on our way to a graceful performance!'";
  } else if (score >= 6) {
    scoreMessage =
      "'Not bad at all,' Elowen nods approvingly. 'You may not know everything, but your heart is in the right place. We'll make a fine pair on the dance floor.'";
  } else if (score >= 4) {
    scoreMessage =
      "Elowen chuckles softly. 'Well, we might need a bit more practice, but I can see your potential. Let's hope the judges appreciate effort as much as skill!'";
  } else if (score >= 2) {
    scoreMessage =
      "Elowen raises an eyebrow, though she tries to keep her smile. 'That was... something. But don't worry, Jimli. We'll find our rhythm on the dance floor, even if it takes a bit of work.'";
  } else {
    scoreMessage =
      "Elowen sighs, though she quickly hides it behind a reassuring smile. 'Well, we may not win the trivia round, but we'll give it our best in the dance! Don't worry, I'll lead you through the steps.'";
  }

  return `Total score: ${score}/10\n\n${timeMessage}\n\n${scoreMessage}`;
}

function endGame() {
  let finalMessage = getFinalMessage(score, spareTimeScore);
  alert(finalMessage);
  gameMusic.volume = 0.8;

  console.log(`${score}/10 - time left: ${spareTimeScore}`);

  // Send email with the score
  sendEmail(
    `${score}/10 - time left: ${spareTimeScore}`,
    "13",
    "Know your partner",
    () => {
      console.log("Email sent for game 13.");
    }
  );

  resetGame();
}

function resetGame() {
  clearInterval(timerInterval);
  gameContainer.classList.add("hidden");
  counterContainer.classList.add("hidden");
  instructionsContainer.classList.remove("hidden");
  backToCalendarLink.classList.remove("disabled-blur");
}
