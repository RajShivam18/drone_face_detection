document.addEventListener('DOMContentLoaded', () => {
  switchSection('live-feed');
  updateStatus();
});

function switchSection(section) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(section).style.display = 'block';
}

function sendCommand(command) {
  console.log(`Drone Command: ${command}`);
}

function updateStatus() {
  document.getElementById('battery').innerText = "95%";
  document.getElementById('mode').innerText = "Hovering";
  document.getElementById('speed').innerText = "3 m/s";
  document.getElementById('gps').innerText = "27.1751° N, 78.0421° E";
}

// Initialize Google Map
function initMap() {
  const location = { lat: 27.1751, lng: 78.0421 }; // Example: Taj Mahal GPS
  const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: location,
  });

  new google.maps.Marker({
      position: location,
      map: map,
      title: "Drone Location",
  });
}

// Update AI Settings in Real-Time
document.getElementById('faceThreshold').addEventListener('input', (event) => {
  document.getElementById('thresholdValue').innerText = event.target.value;
});
