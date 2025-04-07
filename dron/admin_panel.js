// document.addEventListener('DOMContentLoaded', () => {
//   document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
//   loadUsers();
//   loadLogs();
//   loadFlightLogs();
// });

// function toggleDarkMode() {
//   document.body.classList.toggle('dark-mode');
// }

// function loadUsers() {
//   const userList = document.getElementById('userList');
//   const users = [
//       { name: 'Admin', role: 'Administrator' },
//       { name: 'User1', role: 'Regular User' }
//   ];
//   users.forEach(user => {
//       let tr = document.createElement('tr');
//       tr.innerHTML = `<td>${user.name}</td><td>${user.role}</td><td><button>Delete</button></td>`;
//       userList.appendChild(tr);
//   });
// }

// function loadLogs() {
//   const logList = document.getElementById('logList');
//   const logs = [
//       "🚀 Drone started patrol mode",
//       "🔍 Face detected at 14:32:10",
//       "⚠️ Unrecognized face detected",
//       "📡 Drone command executed: Return to Base"
//   ];
//   logs.forEach(log => {
//       let li = document.createElement('li');
//       li.innerHTML = log;
//       logList.appendChild(li);
//   });
// }

// function loadFlightLogs() {
//   const flightLogs = document.getElementById('flightLogs');
//   const logs = [
//       "🛰️ Flight started at 10:15 AM",
//       "📍 GPS Lock Acquired at 10:17 AM",
//       "🛬 Drone Landed at 10:45 AM"
//   ];
//   logs.forEach(log => {
//       let li = document.createElement('li');
//       li.innerHTML = log;
//       flightLogs.appendChild(li);
//   });
// }
  



        // Dark Mode Toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkModeToggle.innerHTML = isDark 
                ? '<i class="fas fa-sun"></i> Light Mode' 
                : '<i class="fas fa-moon"></i> Dark Mode';
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', isDark);
        });
        
        // Initialize dark mode from localStorage
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        }
        
        // Threshold value display
        const thresholdSlider = document.getElementById('faceThreshold');
        const thresholdValue = document.getElementById('thresholdValue');
        thresholdSlider.addEventListener('input', () => {
            thresholdValue.textContent = thresholdSlider.value;
        });
        
        // Simulate live data updates for logs
        setInterval(() => {
            const logList = document.getElementById('logList');
            const newLog = document.createElement('li');
            newLog.className = 'log-entry';
            newLog.innerHTML = `
                <div class="log-time">[${new Date().toISOString().replace('T', ' ').substring(0, 19)}]</div>
                <div class="log-message">System heartbeat - all systems normal</div>
            `;
            logList.insertBefore(newLog, logList.firstChild);
            
            // Keep log list from growing too large
            if (logList.children.length > 20) {
                logList.removeChild(logList.lastChild);
            }
        }, 15000);
 