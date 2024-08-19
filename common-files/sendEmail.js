function sendEmail(score, callback) {
  fetchGeolocationData((locationInfo) => {
    const emailParams = {
      player_score: score,
      player_country: locationInfo.country,
      player_city: locationInfo.city,
      player_ip: locationInfo.ip,
      timestamp: new Date().toLocaleString(),
    };

    // Assuming you have EmailJS configured
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        if (callback) callback();
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
      });
  });
}
