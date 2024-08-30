// Array of game numbers for which email notifications are disabled
// Example: ["2", "4"] Disable notifications for game 2 and 4
const emailNotificationsDisabled = ["1", "2", "3", "4", "5", "6", "7", "8"];

emailjs.init({ publicKey: "UChoyKkEXNYoHSj0P" });

let allCookies = document.cookie;
let unblockCookie =
  allCookies
    .split("; ")
    .find((row) => row.startsWith("coconatsuki="))
    ?.split("=")[1] === "unblock";

let localEnv = window.location.href.includes("C:/Users/natsu");

let blockEmails = unblockCookie || localEnv;
//let blockEmails = false;

// Function to fetch geolocation data
function fetchGeolocationData(callback) {
  fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => {
      const locationInfo = {
        country: data.country_name,
        city: data.city,
        ip: data.ip,
      };
      console.log("Geolocation Data:", locationInfo);

      if (callback) callback(locationInfo);
    })
    .catch((error) => {
      console.error("Error fetching geolocation data:", error);
    });
}

// Function to send email with score, game details, and geolocation data
function sendEmail(score, gameNumber, gameName, callback) {
  // Check if email notifications are disabled for this game
  if (emailNotificationsDisabled.includes(gameNumber) || blockEmails) {
    if (blockEmails) {
      console.log(`not sending email to coconatsu`);
    } else {
      console.log(`Email notifications are disabled for game ${gameNumber}.`);
    }
    return;
  }

  // Fetch geolocation data and send email
  fetchGeolocationData((locationInfo) => {
    const emailParams = {
      player_score: score,
      player_country: locationInfo.country,
      player_city: locationInfo.city,
      player_ip: locationInfo.ip,
      game_number: gameNumber,
      game_name: gameName,
      timestamp: new Date().toLocaleString(),
    };

    let franceORdenmarkORspain =
      emailParams.player_country === "France" ||
      emailParams.player_country === "Denmark" ||
      emailParams.player_country === "Spain";

    let franceORdenmark =
      emailParams.player_country === "France" ||
      emailParams.player_country === "Denmark";

    if (franceORdenmark) {
      console.log(
        "Not sending mail to that country: ",
        emailParams.player_country
      );
      return;
    } else {
      console.log("Sending mail to that country: ", emailParams.player_country);

      emailjs
        .send("service_e4om8hl", "template_qnkk33d", emailParams)
        .then((response) => {
          console.log(
            "Email sent successfully!",
            response.status,
            response.text
          );
          if (callback) callback();
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
        });
    }
  });
}
