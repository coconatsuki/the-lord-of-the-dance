const totalDays = 14; // Total days (including the last special day)
let currentDay = 8; // Set current day
let totalPoints = 48;

// Day1: 31 (6/10) / Day2: 17 (6/10) / Dat3: 124 (10/10) / Day4: 32 (5/10) / Day5: 12 (5/10) / Day 6: 8 (9/10) / Day 7: 42 (7)
// let questScore = {day1: 6, day2: 6, day3: 10, day4: 5, day5: 5, day6: 9, day7: 7}

let winTheContest;
// Update days left and points display
document.getElementById("days-left").textContent = totalDays - currentDay;
document.getElementById("total-points").textContent = totalPoints;

const calendarContainer = document.getElementById("calendar-container");

// Generate dynamic dates starting from August 23, ending on September 5
function generateDates(totalDays) {
  const endDate = new Date(2024, 8, 5); // September 5, 2024
  const dates = [];

  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(endDate);
    currentDate.setDate(endDate.getDate() - (totalDays - 1 - i));
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    dates.push(`${day}/${month}`);
  }

  return dates;
}

const dates = generateDates(totalDays);

// Function to create a day square
function createDaySquare(dayNumber, date) {
  const daySquare = document.createElement("div");
  daySquare.classList.add("day-square");

  const dateSpan = document.createElement("div");
  dateSpan.classList.add("day-date");
  dateSpan.textContent = date;

  let gamesInPlace = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  let allCookies = document.cookie;
  let unblockCookie =
    allCookies
      .split("; ")
      .find((row) => row.startsWith("coconatsuki="))
      ?.split("=")[1] === "unblock";
  let localEnv = window.location.href.includes("C:/Users/natsu");

  let unblock = unblockCookie || localEnv;
  //let unblock = false;

  console.log("unblockCookie: ", unblockCookie, " / localEnv: ", localEnv);

  // Lock future days (but not for me)
  if (!unblock && dayNumber > currentDay) {
    daySquare.classList.add("locked");
  } else if (unblock && !gamesInPlace.includes(dayNumber)) {
    daySquare.classList.add("locked");
  } else {
    // Create correct path for each day based on the day number
    const folder = dayNumber < 10 ? `0${dayNumber}` : dayNumber.toString();
    const path = `./${folder}/day${dayNumber}.html`;

    daySquare.classList.add("unlocked");
    daySquare.addEventListener("click", () => {
      window.location.href = path; // Redirect to the correct page for that day
    });
  }

  if (dayNumber === totalDays) {
    daySquare.setAttribute("id", "contest-square");
  }

  daySquare.appendChild(dateSpan);
  calendarContainer.appendChild(daySquare);
}

function createFinalSquare(outcome) {
  const finalDaySquare = document.createElement("div");
  finalDaySquare.classList.add("day-square");
  finalDaySquare.setAttribute("id", "final-day-square");

  const folder = totalDays + 1;
  const path = `./${folder}/${outcome}.html?points=${totalPoints}`;
  finalDaySquare.addEventListener("click", () => {
    window.location.href = path;
  });

  calendarContainer.appendChild(finalDaySquare);
}

// Create the day squares dynamically with dates
for (let i = 1; i <= totalDays; i++) {
  createDaySquare(i, dates[i - 1]);
}

if (winTheContest === "true") {
  createFinalSquare("victory");
} else if (winTheContest === "false") {
  createFinalSquare("defeat");
}
