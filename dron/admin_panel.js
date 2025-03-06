document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
  loadUsers();
  loadLogs();
  loadFlightLogs();
});

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function loadUsers() {
  const userList = document.getElementById('userList');
  const users = [
      { name: 'Admin', role: 'Administrator' },
      { name: 'User1', role: 'Regular User' }
  ];
  users.forEach(user => {
      let tr = document.createElement('tr');
      tr.innerHTML = `<td>${user.name}</td><td>${user.role}</td><td><button>Delete</button></td>`;
      userList.appendChild(tr);
  });
}

function loadLogs() {
  const logList = document.getElementById('logList');
  const logs = [
      "🚀 Drone started patrol mode",
      "🔍 Face detected at 14:32:10",
      "⚠️ Unrecognized face detected",
      "📡 Drone command executed: Return to Base"
  ];
  logs.forEach(log => {
      let li = document.createElement('li');
      li.innerHTML = log;
      logList.appendChild(li);
  });
}

function loadFlightLogs() {
  const flightLogs = document.getElementById('flightLogs');
  const logs = [
      "🛰️ Flight started at 10:15 AM",
      "📍 GPS Lock Acquired at 10:17 AM",
      "🛬 Drone Landed at 10:45 AM"
  ];
  logs.forEach(log => {
      let li = document.createElement('li');
      li.innerHTML = log;
      flightLogs.appendChild(li);
  });
}
