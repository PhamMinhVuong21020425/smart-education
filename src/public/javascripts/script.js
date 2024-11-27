const socket = io('/')
const videoGrid = document.getElementById('video-grid')

const myPeer = new Peer()
const myVideo = document.createElement('video')
myVideo.muted = true

let localStream = null;
console.log(ROOM_ID);

// Access the user's video and audio
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    localStream = stream; // Store the stream globally
    addVideoStream(myVideo, stream, myPeer.id)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream, call.peer)
        })
    })

    socket.on('user-connected', userId => { // If a new user connect
        connectToNewUser(userId, stream)
    })

    socket.on('user-disconnected', (userId) => {
        console.log('User disconnected:', userId);
        removeVideo(userId);
    });
})

myPeer.on('open', id => { // When we first open the app, have us join a room
    socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) { // This runs when someone joins our room
    const call = myPeer.call(userId, screenStream || stream)
    // Add their video
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream, userId)
    })
    // If they leave, remove their video
    call.on('close', () => {
        video.remove()
    })
}

function removeVideo(userId) {
    const video = document.getElementById(userId);
    if (video) {
        videoGrid.removeChild(video);
    }
    console.log('Removed video:', userId);
    console.log(videoGrid);
}


function addVideoStream(video, stream, userId) {
    video.srcObject = stream
    video.id = userId;
    // video.style.transform = 'scaleX(-1)' // Flip the video horizontally
    video.addEventListener('loadedmetadata', () => { // Play the video as it loads
        video.play()
    })
    videoGrid.append(video) // Append video element to videoGrid
}

function toggleMute() {
    if (!localStream) {
        console.error('No active stream');
        return;
    }

    const audioTracks = localStream.getAudioTracks();
    if (audioTracks.length === 0) {
        console.error('No audio tracks found');
        return;
    }

    // Toggle audio track
    audioTracks.forEach(track => {
        track.enabled = !track.enabled;
    });

    // Update UI
    const muteButton = document.getElementById('muteButton');
    if (muteButton) {
        muteButton.textContent = audioTracks[0].enabled ? 'Mute' : 'Unmute';
        muteButton.classList.toggle('muted');
    }

    console.log(audioTracks[0].enabled ? 'Audio unmuted' : 'Audio muted');
}

function toggleCamera() {
    if (!localStream) {
        console.error('No active stream');
        return;
    }

    const videoTracks = localStream.getVideoTracks();
    if (videoTracks.length === 0) {
        console.error('No video tracks found');
        return;
    }

    // Toggle video track
    videoTracks.forEach(track => {
        track.enabled = !track.enabled;
    });

    // Update UI
    const cameraButton = document.getElementById('cameraButton');
    if (cameraButton) {
        cameraButton.textContent = videoTracks[0].enabled ? 'Turn Off Camera' : 'Turn On Camera';
        cameraButton.classList.toggle('camera-off');
    }

    console.log(videoTracks[0].enabled ? 'Camera enabled' : 'Camera disabled');
}

let screenStream = null; // Store screen stream globally

function toggleScreenShare() {
    const button = document.getElementById('screenShareButton');
    if (!localStream) {
        console.error('No active media stream');
        return;
    }

    if (!screenStream) {
        navigator.mediaDevices.getDisplayMedia({
            video: {
                cursor: 'always',
                displaySurface: 'monitor'
            },
            audio: true
        })
            .then((newScreenStream) => {
                // Store screen stream globally
                screenStream = newScreenStream;
                const screenVideoTrack = newScreenStream.getVideoTracks()[0];
                // Sử dụng canvas để lật video chia sẻ màn hình
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const video = document.createElement('video');
                video.srcObject = new MediaStream([screenVideoTrack]);
                video.play();

                // Create a new stream with screen share track
                const combinedStream = new MediaStream();

                // Add audio track from original stream (if needed)
                const audioTracks = localStream.getAudioTracks();
                if (audioTracks.length > 0) {
                    combinedStream.addTrack(audioTracks[0]);
                }

                // Add screen video track
                combinedStream.addTrack(screenVideoTrack);

                // Update all peer connections
                Object.values(myPeer.connections).forEach(connections => {
                    connections.forEach(connection => {
                        // Get all senders
                        const senders = connection.peerConnection.getSenders();

                        // Replace video track in each sender
                        senders.forEach(sender => {
                            if (sender.track && sender.track.kind === 'video') {
                                sender.replaceTrack(screenVideoTrack)
                                    .catch(error => console.error('Error replacing track:', error));
                            }
                        });
                    });
                });

                // Update local video element
                const localVideoElement = document.querySelector('#local-video');
                if (localVideoElement) {
                    localVideoElement.srcObject = combinedStream;
                }

                // Handle screen share ending
                screenVideoTrack.onended = () => {
                    stopScreenShare();
                }

                // Update UI
                const screenShareButton = document.getElementById('screenShareButton');
                if (screenShareButton) {
                    screenShareButton.textContent = 'Stop Screen Share';
                    screenShareButton.classList.add('sharing');
                }

                console.log('Screen sharing started');
            })
            .catch((error) => {
                console.error('Error sharing screen:', error);
            });
    } else {
        stopScreenShare();
    }
}

function stopScreenShare() {
    if (!screenStream) {
        console.error('No active screen stream to stop');
        return;
    }

    // Stop screen stream
    screenStream.getTracks().forEach(track => track.stop());

    // Reset screen stream
    screenStream = null;

    // Update all peer connections
    Object.values(myPeer.connections).forEach(connections => {
        connections.forEach(connection => {
            // Get all senders
            const senders = connection.peerConnection.getSenders();

            // Replace video track in each sender
            senders.forEach(sender => {
                if (sender.track && sender.track.kind === 'video') {
                    sender.replaceTrack(localStream.getVideoTracks()[0])
                        .catch(error => console.error('Error replacing track:', error));
                }
            });
        });
    });

    // Update local video element
    const localVideoElement = document.querySelector('#local-video');
    if (localVideoElement) {
        localVideoElement.srcObject = localStream;
    }

    // Update UI
    const screenShareButton = document.getElementById('screenShareButton');
    if (screenShareButton) {
        screenShareButton.textContent = 'Share Screen';
        screenShareButton.classList.remove('sharing');
    }

    console.log('Screen sharing stopped');
}

function endCall() {
    if (!localStream) {
        console.error('No active stream to end');
        return;
    }

    // Stop all tracks
    localStream.getTracks().forEach(track => {
        track.stop();
    });

    // Close all peer connections
    Object.values(myPeer.connections).forEach(connections => {
        connections.forEach(connection => {
            connection.close();
        });
    });

    // Remove all video elements
    const videoGrid = document.getElementById('video-grid');
    if (videoGrid) {
        videoGrid.innerHTML = '';
    }

    // Disconnect from socket
    if (socket) {
        socket.disconnect();
    }

    // Reset local stream
    localStream = null;

    // Optional: Redirect or show a call ended message
    console.log('Call ended and cleaned up');
    window.location.href = '/'; // Optionally redirect to home or lobby
}
