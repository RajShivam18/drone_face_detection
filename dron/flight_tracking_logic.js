document.addEventListener('DOMContentLoaded', () => {
  initMap();
  loadFlightHistory();
  document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
  document.getElementById('trackFlight').addEventListener('click', startTracking);
});

function initMap() {
  const mapOptions = {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 15,
      styles: [{ stylers: [{ saturation: -100 }, { lightness: 50 }] }]
  };
  
  window.map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function loadFlightHistory() {
  const flightList = document.getElementById('flightList');
  const flightLogs = [
      { date: '2025-03-01', duration: '15 min', location: 'San Francisco' },
      { date: '2025-03-03', duration: '20 min', location: 'Los Angeles' }
  ];
  
  flightLogs.forEach(log => {
      let li = document.createElement('li');
      li.innerHTML = `📅 ${log.date} | ⏳ ${log.duration} | 📍 ${log.location}`;
      flightList.appendChild(li);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
function startTracking() {
  alert("Flight Tracking Started! 🚀");
}
