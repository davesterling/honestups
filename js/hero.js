document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('video-element');
    var playButton = document.getElementById('play-button');

    // Check if the video can play after some time (e.g., 2 seconds)
    setTimeout(function () {
        if (video.paused || video.ended) {
            // Autoplay failed, show play button and add click event listener
            playButton.style.display = 'block';
            playButton.addEventListener('click', startVideo);
        }
    }, 2000);

    function startVideo() {
        // Play the video on loop muted without controls
        video.setAttribute('loop', true);
        video.setAttribute('muted', true);
        video.removeAttribute('controls');
        
        // Play the video
        video.play();

        // Hide the play button
        playButton.style.display = 'none';

        // Remove the click event listener
        playButton.removeEventListener('click', startVideo);
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('video-element');

    // Disable right-click context menu on the video
    video.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });

    // Additional code for handling play button click
    var playButton = document.getElementById('play-button');
    playButton.addEventListener('click', startVideo);

    function startVideo() {
        video.play();
        playButton.style.display = 'none';
    }
});




const video = document.getElementById('video-element');

// Update the CSS variable with the actual video height
function updateVideoHeight() {
    const videoHeight = video.clientHeight;
    document.documentElement.style.setProperty('--video-height', videoHeight + 'px');
}

// Update the video height when it's loaded
video.addEventListener('loadedmetadata', updateVideoHeight);

// Also update the video height when the window is resized
window.addEventListener('resize', updateVideoHeight);

// Initially, set the video height based on its initial load
updateVideoHeight();