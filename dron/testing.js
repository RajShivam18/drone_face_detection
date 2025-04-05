// Drone Control Dashboard - Main Application
class DroneDashboard {
  constructor() {
      this.activeSection = 'live-feed';
      this.batteryLevel = 87;
      this.flightMode = 'STANDBY';
      this.velocity = 0.0;
      this.altitude = 0.0;
      
      this.init();
  }
  
  // Initialize the dashboard
  init() {
      this.setupEventListeners();
      this.showSection(this.activeSection);
      this.startBatterySimulation();
      this.simulateVideoFeed();
  }
  
  // Setup all event listeners
  setupEventListeners() {
      // Navigation buttons
      document.querySelectorAll('nav button').forEach(button => {
          button.addEventListener('click', () => {
              const sectionId = button.getAttribute('data-section');
              this.showSection(sectionId);
          });
      });
      
      // Control buttons
      document.querySelectorAll('.controls-grid button').forEach(button => {
          button.addEventListener('click', () => {
              const command = button.getAttribute('data-command');
              this.sendCommand(command);
          });
      });
      
      // AI Settings
      document.getElementById('faceThreshold').addEventListener('input', (e) => {
          document.getElementById('thresholdValue').textContent = e.target.value;
      });
  }
  
  // Show the selected section
  showSection(sectionId) {
      // Hide current active section
      document.querySelector(`.section.active`).classList.remove('active');
      
      // Show new section
      document.getElementById(sectionId).classList.add('active');
      
      // Update active section
      this.activeSection = sectionId;
  }
  
  // Send command to drone
  sendCommand(command) {
      const logList = document.getElementById('logList');
      const li = document.createElement('li');
      
      let message = '';
      const statusIndicator = document.querySelector('header h1 .status-indicator');
      const flightModeElement = document.querySelector('.vitals-display .vital-card:nth-child(4) .value');
      
      switch(command) {
          case 'takeoff':
              message = 'TAKEOFF command sent - Drone ascending';
              this.flightMode = 'ACTIVE';
              statusIndicator.className = 'status-indicator status-active';
              this.startFlightSimulation();
              break;
              
          case 'land':
              message = 'LAND command sent - Drone descending';
      }}}