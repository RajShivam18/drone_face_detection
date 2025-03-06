document.addEventListener('DOMContentLoaded', () => {
  // Dark Mode Toggle
  document.getElementById('darkModeToggle').addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
  });

  // Face Recognition Threshold
  const thresholdSlider = document.getElementById('faceThreshold');
  const thresholdValue = document.getElementById('thresholdValue');
  thresholdSlider.addEventListener('input', () => {
      thresholdValue.innerText = thresholdSlider.value;
      console.log("Face Recognition Threshold Set To:", thresholdSlider.value);
  });

  // Tracking Speed
  document.getElementById('trackingSpeed').addEventListener('change', (event) => {
      console.log("Tracking Speed Set To:", event.target.value);
  });

  // Detection Mode
  document.querySelectorAll('input[name="detectionMode"]').forEach(radio => {
      radio.addEventListener('change', (event) => {
          console.log("Detection Mode Set To:", event.target.value);
      });
  });

  // Drone Behavior Settings
  document.getElementById('followMode').addEventListener('change', (event) => {
      console.log("Follow Mode:", event.target.checked ? "Enabled" : "Disabled");
  });

  document.getElementById('autoAdjust').addEventListener('change', (event) => {
      console.log("Auto Adjustments:", event.target.checked ? "Enabled" : "Disabled");
  });

  // Data Logging Toggle
  document.getElementById('loggingToggle').addEventListener('change', (event) => {
      console.log("AI Logging:", event.target.checked ? "Enabled" : "Disabled");
  });

  // Custom Alerts
  document.getElementById('setAlert').addEventListener('click', () => {
      const alertMessage = document.getElementById('alertMessage').value;
      if (alertMessage.trim() !== "") {
          alert("🚨 ALERT SET: " + alertMessage);
      }
  });
});
