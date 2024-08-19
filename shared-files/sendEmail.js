// Array of game numbers for which email notifications are disabled
const emailNotificationsDisabled = ["1", "2", "5"]; // Example: ["2", "4"] Disable notifications for game 2 and 4

emailjs.init({ publicKey: "UChoyKkEXNYoHSj0P" });

// emailjs.init({
//   publicKey: "8MQIpzoTDZEjqNboW",
//   // Do not allow headless browsers
//   blockHeadless: false,
//   blockList: {
//     // Block the suspended emails
//     list: [],
//     // The variable contains the email address
//     watchVariable: "",
//   },
//   limitRate: {
//     // Set the limit rate for the application
//     id: "app",
//     // Allow 1 request per 10s
//     throttle: 10000,
//   },
// });

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
  if (emailNotificationsDisabled.includes(gameNumber)) {
    console.log(`Email notifications are disabled for game ${gameNumber}.`);
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

    emailjs
      .send("service_e4om8hl", "template_qnkk33d", emailParams)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        if (callback) callback();
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
      });
  });
}
