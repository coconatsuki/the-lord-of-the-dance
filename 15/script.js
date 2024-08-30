// Get the query string from the URL
const queryString = window.location.search;

// Parse the query string to get the 'points' parameter
const urlParams = new URLSearchParams(queryString);
const totalPoints = urlParams.get("points");

console.log(`Total Points: ${totalPoints}`);

document.getElementById(
  "points-display"
).textContent = `Total Points: ${totalPoints}`;

// Event listener for the "Back to calendar" button
document.getElementById("calendar-button").addEventListener("click", () => {
  window.location.href = "../calendar.html";
});
