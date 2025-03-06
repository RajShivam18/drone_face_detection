// Function to add a detected face to the log
function logDetectedFace(faceID, confidence, action, snapshotURL) {
  const table = document.getElementById("faceLog");
  const row = table.insertRow();
  const timestamp = new Date().toLocaleString();

  row.innerHTML = `
      <td>${timestamp}</td>
      <td>${faceID}</td>
      <td>${(confidence * 100).toFixed(2)}%</td>
      <td>${action}</td>
      <td><img src="${snapshotURL}" width="50"></td>
  `;
}

// Function to log drone commands
function logDroneCommand(command, user, gps) {
  const table = document.getElementById("commandLog");
  const row = table.insertRow();
  const timestamp = new Date().toLocaleString();

  row.innerHTML = `
      <td>${timestamp}</td>
      <td>${command}</td>
      <td>${user}</td>
      <td>${gps}</td>
  `;
}

// Function to add alerts and warnings
function logAlert(message) {
  const alertsList = document.getElementById("alerts");
  const alertItem = document.createElement("li");
  alertItem.textContent = `${new Date().toLocaleTimeString()} - ${message}`;
  alertsList.appendChild(alertItem);
}

// Example: Simulating AI Face Recognition Log
setTimeout(() => {
  logDetectedFace("Face_001", 0.87, "Follow", "https://via.placeholder.com/50");
}, 2000);

// Example: Logging Drone Commands
setTimeout(() => {
  logDroneCommand("Takeoff", "Admin", "27.1751° N, 78.0421° E");
}, 4000);

// Example: Logging Alerts
setTimeout(() => {
  logAlert("⚠️ Unknown face detected! Switching to security mode.");
}, 6000);

