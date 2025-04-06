
        // DOM Elements
        const video = document.getElementById('video');
        const cameraError = document.getElementById('camera-error');
        const captureBtn = document.getElementById('capture-btn');
        const recordBtn = document.getElementById('record-btn');
        const zoomInBtn = document.getElementById('zoom-in-btn');
        const zoomOutBtn = document.getElementById('zoom-out-btn');
        const toggleModeBtn = document.getElementById('toggle-mode-btn');
        const captureFeedback = document.getElementById('capture-feedback');
        const mediaGallery = document.getElementById('media-gallery');
        
        // State variables
        let mediaStream = null;
        let mediaRecorder = null;
        let recordedChunks = [];
        let isRecording = false;
        let zoomLevel = 1;
        let isNightMode = false;
        
        // Initialize camera
        async function initCamera() {
            try {
                // Hide error message if shown
                cameraError.style.display = 'none';
                
                // Try to get camera access
                mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: 'environment'
                    }
                });
                
                video.srcObject = mediaStream;
                video.style.display = 'block';
                
                // Enable buttons after camera is initialized
                enableControls(true);
                
            } catch (error) {
                console.error('Error accessing camera:', error);
                // Show error message
                video.style.display = 'none';
                cameraError.style.display = 'block';
                enableControls(false);
            }
        }
        
        // Enable/disable all controls
        function enableControls(enabled) {
            captureBtn.disabled = !enabled;
            recordBtn.disabled = !enabled;
            zoomInBtn.disabled = !enabled;
            zoomOutBtn.disabled = !enabled;
            toggleModeBtn.disabled = !enabled;
        }
        
        // Capture photo
        captureBtn.addEventListener('click', () => {
            // Create canvas to capture frame
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            
            // Apply zoom transformation
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.scale(zoomLevel, zoomLevel);
            ctx.translate(-canvas.width/2, -canvas.height/2);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            ctx.restore();
            
            // Create image from canvas
            const imgUrl = canvas.toDataURL('image/jpeg');
            
            // Add to gallery
            addToGallery(imgUrl, 'image');
            
            // Show capture feedback
            captureFeedback.style.opacity = 0.7;
            setTimeout(() => {
                captureFeedback.style.opacity = 0;
            }, 100);
        });
        
        // Record video
        recordBtn.addEventListener('click', () => {
            if (!isRecording) {
                // Start recording
                recordedChunks = [];
                mediaRecorder = new MediaRecorder(mediaStream, {
                    mimeType: 'video/webm'
                });
                
                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        recordedChunks.push(e.data);
                    }
                };
                
                mediaRecorder.onstop = () => {
                    const blob = new Blob(recordedChunks, { type: 'video/webm' });
                    const videoUrl = URL.createObjectURL(blob);
                    addToGallery(videoUrl, 'video');
                };
                
                mediaRecorder.start();
                isRecording = true;
                recordBtn.classList.add('recording');
                recordBtn.innerHTML = '<i class="fas fa-stop"></i> STOP RECORDING';
            } else {
                // Stop recording
                mediaRecorder.stop();
                isRecording = false;
                recordBtn.classList.remove('recording');
                recordBtn.innerHTML = '<i class="fas fa-video"></i> START RECORDING';
            }
        });
        
        // Zoom controls
        zoomInBtn.addEventListener('click', () => {
            if (zoomLevel < 3) {
                zoomLevel += 0.25;
                video.style.transform = `scale(${zoomLevel})`;
            }
        });
        
        zoomOutBtn.addEventListener('click', () => {
            if (zoomLevel > 1) {
                zoomLevel -= 0.25;
                video.style.transform = `scale(${zoomLevel})`;
            }
        });
        
        // Toggle night mode
        toggleModeBtn.addEventListener('click', () => {
            isNightMode = !isNightMode;
            if (isNightMode) {
                video.style.filter = 'grayscale(100%) brightness(0.6)';
                toggleModeBtn.innerHTML = '<i class="fas fa-sun"></i> DAY MODE';
            } else {
                video.style.filter = 'none';
                toggleModeBtn.innerHTML = '<i class="fas fa-moon"></i> NIGHT MODE';
            }
        });
        
        // Add media to gallery
        function addToGallery(url, type) {
            const mediaItem = document.createElement(type === 'image' ? 'img' : 'video');
            mediaItem.src = url;
            mediaItem.className = 'media-item';
            
            if (type === 'video') {
                mediaItem.controls = true;
                mediaItem.muted = true;
            }
            
            mediaGallery.insertBefore(mediaItem, mediaGallery.firstChild);
            
            // Auto-scroll to show new items
            mediaGallery.scrollLeft = 0;
        }
        
        // Initialize on load
        window.addEventListener('load', initCamera);