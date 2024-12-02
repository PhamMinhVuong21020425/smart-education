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
    addMainVideoStream(myVideo, stream, myPeer.id) // Add our video stream to main screen
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
        const mainVideo = document.querySelector('.main-screen video');
        if (mainVideo.id === userId) {
            addMainVideoStream(myVideo, stream, myPeer.id) // Add our video stream to main screen
        }
        console.log('User disconnected:', userId);
        removeVideo(userId);
    });
})

myPeer.on('open', id => { // When we first open the app, have us join a room
    socket.emit('join-room', ROOM_ID, id)
    console.log('Peer connected with ID:', id);
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
function addMainVideoStream(video, stream, userId) {
    const mainVideo = document.querySelector('.main-screen video');
    mainVideo.id = userId;
    mainVideo.srcObject = stream;
    mainVideo.muted = true;
    mainVideo.addEventListener('loadedmetadata', () => { // Play the video as it loads
        mainVideo.play()
    })
    console.log('Adding main video');
}

function addVideoStream(video, stream, userId) {
    video.srcObject = stream
    video.id = userId;
    console.log('Adding video:', userId);
    video.addEventListener('loadedmetadata', () => { // Play the video as it loads
        video.play()

        video.addEventListener('click', () => {
            console.log('Video clicked');

            const mainScreen = document.querySelector('.main-screen video');
            mainScreen.id = userId;
            if (mainScreen) {
                mainScreen.srcObject = video.srcObject;
            } else {
                console.error('Main screen video not found');
            }
            if (mainScreen.classList.contains('my-screen-share')) {
                mainScreen.classList.remove('my-screen-share');
            }
        })
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
    muteButton.classList.toggle('muted');

    const icon = muteButton.querySelector('i');
    if (muteButton.classList.contains('muted')) {
        icon.classList.replace('fa-microphone', 'fa-microphone-slash');
    } else {
        icon.classList.replace('fa-microphone-slash', 'fa-microphone');
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
    cameraButton.classList.toggle('camera-off');

    const icon = cameraButton.querySelector('i');
    if (cameraButton.classList.contains('camera-off')) {
        icon.classList.replace('fa-video', 'fa-video-slash');
    } else {
        icon.classList.replace('fa-video-slash', 'fa-video');
    }

    console.log(videoTracks[0].enabled ? 'Camera enabled' : 'Camera disabled');
}

function toggleFlip() {
    const mainVideo = document.querySelector('.main-screen video');
    if (mainVideo.style.transform === 'scaleX(-1)') {
        mainVideo.style.transform = 'scaleX(1)';
    } else {
        mainVideo.style.transform = 'scaleX(-1)';
    }
}

function toggleControlButtons() {
    const controlButtons = document.getElementsByClassName('call-controls')[0];
    const toggleButton = document.getElementById('toggleControl');
    const icon = toggleButton.querySelector('i');

    controlButtons.classList.toggle('collapsed');
    toggleButton.classList.toggle('collapsed');

    if (controlButtons.classList.contains('collapsed')) {
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

function toggleSidebar() {
    const videoGrid = document.getElementById('video-grid');
    const toggleButton = document.getElementById('toggleSidebar');
    const icon = toggleButton.querySelector('i');

    videoGrid.classList.toggle('collapsed');
    toggleButton.classList.toggle('collapsed');

    if (videoGrid.classList.contains('collapsed')) {
        icon.classList.replace('fa-chevron-left', 'fa-chevron-right');
    } else {
        icon.classList.replace('fa-chevron-right', 'fa-chevron-left');
    }
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

                // Add screen share video element
                const screenVideoElement = document.createElement('video');
                screenVideoElement.srcObject = screenStream;
                screenVideoElement.autoplay = true;
                screenVideoElement.muted = true;
                screenVideoElement.classList.add('screen-share-video');
                screenVideoElement.addEventListener('click', () => {
                    console.log('Video clicked');

                    const mainScreen = document.querySelector('.main-screen video');
                    if (mainScreen) {
                        mainScreen.classList.add('my-screen-share');
                        mainScreen.srcObject = screenVideoElement.srcObject;
                    } else {
                        console.error('Main screen video not found');
                    }
                })
                videoGrid.append(screenVideoElement);


                // Handle screen share ending
                screenVideoTrack.onended = () => {
                    stopScreenShare();
                }

                // Update UI
                const screenShareButton = document.getElementById('screenShareButton');
                screenShareButton.classList.toggle('sharing');

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

    // Remove screen share video element
    const screenVideoElement = document.querySelector('.screen-share-video');
    if (screenVideoElement) {
        videoGrid.removeChild(screenVideoElement);
    }

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

    // Change main stream back to local video if it was screen shared
    const mainVideo = document.querySelector('.main-screen video');
    if (mainVideo && mainVideo.classList.contains('my-screen-share')) {
        mainVideo.srcObject = localStream;
    }

    // Update UI
    const screenShareButton = document.getElementById('screenShareButton');
    screenShareButton.classList.remove('sharing');

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
    window.history.back();
}
