// DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const faceList = document.getElementById('faceList');
const searchBox = document.getElementById('searchBox');
const facesCount = document.getElementById('facesCount');
const detectionCounter = document.getElementById('detectionCounter');
const detectionCount = document.getElementById('detectionCount');
const toggleCameraBtn = document.getElementById('toggleCamera');
const toggleDetectionBtn = document.getElementById('toggleDetection');
const captureBtn = document.getElementById('captureBtn');
const liveStatus = document.getElementById('liveStatus');

// State variables
let stream = null;
let isDetectionActive = true;
let detectionInterval = null;
let detectionHistory = [];
let isCameraOn = false;

// Sample database of known faces
const knownFaces = [
    { id: 'EMP003', name: 'Shivam Raj', role: 'Manager', avatar: 'photos/shivam.jpeg' },
    { id: 'EMP004', name: 'Ankit Anurag', role: 'HR', avatar: 'photos/ankit.jpeg' },
    { id: 'EMP005', name: 'Pintu Kumar', role: 'CEO', avatar: 'photos/pintu.jpeg' }
];

// Initialize camera
async function initCamera() {
    try {
        // Stop existing stream if any
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 1280, height: 720, facingMode: 'user' } 
        });
        video.srcObject = stream;
        liveStatus.textContent = '● LIVE';
        liveStatus.style.color = '#4caf50';
        isCameraOn = true;
        
        // Start face detection simulation
        startDetectionSimulation();
    } catch (err) {
        console.error("Camera error:", err);
        liveStatus.textContent = '● OFFLINE';
        liveStatus.style.color = '#f44336';
        isCameraOn = false;
        alert("Could not access the camera. Please check permissions.");
    }
}

// Simulate face detection
function startDetectionSimulation() {
    if (detectionInterval) clearInterval(detectionInterval);
    
    detectionInterval = setInterval(() => {
        if (!isDetectionActive || !isCameraOn) return;
        
        if (Math.random() > 0.4) {
            const randomFace = knownFaces[Math.floor(Math.random() * knownFaces.length)];
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const lastDetection = detectionHistory.find(d => d.id === randomFace.id);
            if (!lastDetection || (now - new Date(lastDetection.timestamp)) > 10000) {
                const detection = {
                    ...randomFace,
                    timestamp: now.toISOString(),
                    displayTime: timeString,
                    confidence: Math.floor(Math.random() * 20) + 80
                };
                
                detectionHistory.unshift(detection);
                updateDetectionList();
                updateStats();
            }
        }
    }, 2000);
}

// Update the detection list
function updateDetectionList() {
    faceList.innerHTML = '';
    
    detectionHistory.slice(0, 10).forEach(detection => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="face-info">
                <img src="${detection.avatar}" alt="${detection.name}" class="face-avatar">
                <div class="face-details">
                    <div class="face-name">${detection.name}</div>
                    <div class="face-id">${detection.id} • ${detection.role}</div>
                </div>
            </div>
            <div class="face-time">${detection.displayTime} (${detection.confidence}%)</div>
        `;
        faceList.appendChild(li);
    });
    
    detectionCounter.textContent = `(${detectionHistory.length})`;
    detectionCount.textContent = `${detectionHistory.length} Detections`;
}

// Update statistics
function updateStats() {
    facesCount.textContent = detectionHistory.length;
}

// Filter results based on search input
function filterResults() {
    const searchTerm = searchBox.value.toLowerCase();
    const items = faceList.getElementsByTagName('li');
    
    Array.from(items).forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
    });
}

// Toggle camera on/off
function toggleCamera() {
    if (isCameraOn) {
        // Stop camera
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
            stream = null;
        }
        liveStatus.textContent = '● OFFLINE';
        liveStatus.style.color = '#f44336';
        clearInterval(detectionInterval);
        detectionInterval = null;
        isCameraOn = false;
        toggleCameraBtn.innerHTML = '<span>📷</span> Start Camera';
    } else {
        // Start camera
        initCamera();
        toggleCameraBtn.innerHTML = '<span>📷</span> Stop Camera';
    }
}

// Toggle face detection
function toggleDetection() {
    isDetectionActive = !isDetectionActive;
    toggleDetectionBtn.innerHTML = isDetectionActive ? 
        '<span>👁️</span> Pause Detection' : 
        '<span>👁️</span> Resume Detection';
    
    if (isDetectionActive && isCameraOn && !detectionInterval) {
        startDetectionSimulation();
    }
}

// Capture current frame
function captureFrame() {
    if (!isCameraOn) {
        alert('Please start the camera first!');
        return;
    }
    
    // Temporarily pause detection
    const wasDetectionActive = isDetectionActive;
    isDetectionActive = false;
    
    // Capture frame
    canvas.width = 786.67;
    canvas.height = 450;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Process the frame (simulated)
    setTimeout(() => {
        alert('Frame captured!');
        
        // Restore detection state
        isDetectionActive = wasDetectionActive;
        if (isDetectionActive && isCameraOn) {
            startDetectionSimulation();
        }
    }, 100);
}

// Event listeners
toggleCameraBtn.addEventListener('click', toggleCamera);
toggleDetectionBtn.addEventListener('click', toggleDetection);
captureBtn.addEventListener('click', captureFrame);
searchBox.addEventListener('keyup', filterResults);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Initial state
    isCameraOn = false;
    toggleCameraBtn.innerHTML = '<span>📷</span> Start Camera';
    
    // Simulate some initial detections for demo
    setTimeout(() => {
        const now = new Date();
        knownFaces.forEach((face, i) => {
            setTimeout(() => {
                const detection = {
                    ...face,
                    timestamp: new Date(now.getTime() - (i * 120000)).toISOString(),
                    displayTime: new Date(now.getTime() - (i * 120000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    confidence: Math.floor(Math.random() * 20) + 80
                };
                detectionHistory.unshift(detection);
                updateDetectionList();
                updateStats();
            }, i * 300);
        });
    }, 1000);
});