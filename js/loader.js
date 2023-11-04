// Function to hide the loading screen
function hideLoadingScreen() {
    // Hide the loading screen
    var loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.style.display = 'none';

    // Show the site content
    var siteContent = document.getElementById('site-content');
    siteContent.style.display = 'block';
}

// Wait for the entire document to load
window.addEventListener('load', function () {
    // Select all img elements with .png and .jpg extensions
    var imageElements = document.querySelectorAll('img[src$=".png"], img[src$=".jpg"]');

    // Count the number of images to be loaded
    var totalImages = imageElements.length;

    // Variable to keep track of loaded images
    var loadedImages = 0;

    // Function to check if all images are loaded
    function checkAllImagesLoaded() {
        if (loadedImages === totalImages) {
            // All images are loaded, hide the loading screen
            hideLoadingScreen();
        }
    }

    // Iterate through each image element
    imageElements.forEach(function (img) {
        // Listen for the 'load' event for each image
        img.addEventListener('load', function () {
            // Increment the count of loaded images
            loadedImages++;

            // Check if all images are loaded
            checkAllImagesLoaded();
        });

        // Check if the image is already cached (loaded before this event)
        if (img.complete && img.naturalWidth !== 0) {
            // Image is already loaded, increment the count
            loadedImages++;

            // Check if all images are loaded
            checkAllImagesLoaded();
        }
    });
});

