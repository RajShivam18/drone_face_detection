function sendCommand(command) {
  console.log("Command sent: " + command);
  alert("Drone command: " + command);
  
  if (command === 'takeoff') {
      document.getElementById('mode').innerText = 'Flying';
  } else if (command === 'land') {
      document.getElementById('mode').innerText = 'Landed';
  } else if (command === 'follow') {
      document.getElementById('mode').innerText = 'Following Target';
  } else if (command === 'stop') {
      document.getElementById('mode').innerText = 'Idle';
  } else if (command === 'emergency') {
      document.getElementById('mode').innerText = 'Emergency Stop';
      alert("Emergency Stop Activated!");
  }
}
