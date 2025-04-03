// camera_access.js
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const toggleCameraBtn = document.getElementById('toggleCamera');
const captureBtn = document.getElementById('captureBtn');
const liveStatus = document.getElementById('liveStatus');
let stream = null;

// Initialize camera
async function initCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user' 
            },
            audio: false
        });
        video.srcObject = stream;
        liveStatus.textContent = '● LIVE';
        liveStatus.style.color = '#4caf50';
        captureBtn.disabled = false;
    } catch (err) {
        console.error("Camera error:", err);
        liveStatus.textContent = '● OFFLINE';
        liveStatus.style.color = '#f44336';
    }
}

// Toggle camera on/off
function toggleCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        stream = null;
        liveStatus.textContent = '● OFFLINE';
        liveStatus.style.color = '#f44336';
        toggleCameraBtn.innerHTML = '<span>📷</span> Start Camera';
        captureBtn.disabled = true;
    } else {
        initCamera();
        toggleCameraBtn.innerHTML = '<span>📷</span> Stop Camera';
    }
}

// Capture photo
function capturePhoto() {
    if (!stream) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Here you would typically send the image for face detection
    // For now, we'll just display an alert
    alert('Photo captured! Would be sent for face detection in full implementation.');
}

// Event listeners
toggleCameraBtn.addEventListener('click', toggleCamera);
captureBtn.addEventListener('click', capturePhoto);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    captureBtn.disabled = true;
});