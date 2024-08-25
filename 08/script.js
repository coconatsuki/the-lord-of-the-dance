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
const correctAnswerSound = new Audio("./correct-answer.mp3");
const wrongAnswerSound = new Audio("./wrong-answer.mp3");

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLimit = 10; // 10 seconds per question
let totalQuestions = 10;

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
  currentQuestionIndex = 0;
  score = 0;
  timeLimit = 10; // Reset timer
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

  answersContainer.innerHTML = "";
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.classList.add("answer-button");
    button.textContent = answer;
    button.addEventListener("click", () => handleAnswerClick(index));
    answersContainer.appendChild(button);
  });
}

function handleAnswerClick(selectedIndex) {
  const question = questions[currentQuestionIndex];
  clearInterval(timerInterval);

  // Disable all buttons
  const buttons = document.querySelectorAll(".answer-button");
  buttons.forEach((button) => (button.disabled = true));

  // Highlight correct and wrong answers
  if (selectedIndex === question.correctAnswer) {
    score++;
    buttons[selectedIndex].classList.add("correct");
    correctAnswerSound.play();
  } else {
    buttons[selectedIndex].classList.add("wrong");
    buttons[question.correctAnswer].classList.add("correct");
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

function endGame() {
  alert(`Quiz over! You scored ${score} out of ${totalQuestions}.`);
  resetGame();
}

function resetGame() {
  clearInterval(timerInterval);
  gameContainer.classList.add("hidden");
  counterContainer.classList.add("hidden");
  instructionsContainer.classList.remove("hidden");
}
