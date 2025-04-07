// Updated state variables
let stream = null;
let isDetectionActive = true;
let detectionInterval = null;
let detectionHistory = [];
let isCameraInitialized = false;

// Updated capture function
function captureFrame() {
    if (!stream) return;
    
    // Pause detection during capture
    const wasDetectionActive = isDetectionActive;
    isDetectionActive = false;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Process the frame (simulated)
    setTimeout(() => {
        alert('Frame captured successfully!');
        
        // Restore detection state
        isDetectionActive = wasDetectionActive;
        if (isDetectionActive && stream) {
            startDetectionSimulation();
        }
    }, 100);
}

// Updated toggle camera function
async function toggleCamera() {
    if (stream) {
        // Proper cleanup
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        stream = null;
        liveStatus.textContent = '● OFFLINE';
        liveStatus.style.color = '#f44336';
        clearInterval(detectionInterval);
        detectionInterval = null;
        isCameraInitialized = false;
        toggleCameraBtn.innerHTML = '<span>📷</span> Start Camera';
        
        // Clear canvas
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        await initCamera();
        toggleCameraBtn.innerHTML = '<span>📷</span> Stop Camera';
    }
}

// Updated initCamera function
async function initCamera() {
    try {
        // Stop any existing stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 1280, height: 720, facingMode: 'user' } 
        });
        video.srcObject = stream;
        liveStatus.textContent = '● LIVE';
        liveStatus.style.color = '#4caf50';
        isCameraInitialized = true;
        
        // Ensure video plays
        video.play().catch(e => console.error("Video play error:", e));
        
        // Start face detection simulation
        startDetectionSimulation();
    } catch (err) {
        console.error("Camera error:", err);
        handleCameraError();
    }
}

// New function to handle camera errors
function handleCameraError() {
    liveStatus.textContent = '● OFFLINE';
    liveStatus.style.color = '#f44336';
    isCameraInitialized = false;
    alert("Could not access the camera. Please check permissions.");
}

// Updated event listeners
toggleCameraBtn.addEventListener('click', toggleCamera);
toggleDetectionBtn.addEventListener('click', toggleDetection);
captureBtn.addEventListener('click', captureFrame);
searchBox.addEventListener('keyup', filterResults);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Start camera automatically
    initCamera();
    
    // Simulate some initial detections
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