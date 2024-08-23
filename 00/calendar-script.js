const totalDays = 14; // Total days (including the last special day)
let currentDay = 1; // Set current day
let totalPoints = 0;

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

  let gamesInPlace = [1, 2, 3, 4, 5, 6];

  let allCookies = document.cookie;
  let unblock =
    allCookies
      .split("; ")
      .find((row) => row.startsWith("coconatsuki="))
      ?.split("=")[1] === "unblock";

  console.log("unblock coconatsu: " + unblock);

  // Lock future days (but not for me)
  if (!unblock && dayNumber > currentDay) {
    daySquare.classList.add("locked");
  } else if (unblock && !gamesInPlace.includes(dayNumber))
    if (!gamesInPlace.includes(dayNumber)) {
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

  daySquare.appendChild(dateSpan);
  calendarContainer.appendChild(daySquare);
}

// Create the day squares dynamically with dates
for (let i = 1; i <= totalDays; i++) {
  createDaySquare(i, dates[i - 1]);
}
