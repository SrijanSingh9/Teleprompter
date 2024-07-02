let animationFrame;
let speed = 10;
let position = 0;
let isAtEnd = false;

// Start the teleprompter
function startTeleprompter() {
    const scriptText = document.getElementById('script').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerText = scriptText;
    outputDiv.style.display = 'block';
    document.getElementById('script').style.display = 'none';
    position = outputDiv.scrollTop;

    // If the teleprompter is at the end of the script, reset to the top
    if (isAtEnd) {
        position = 0;
        isAtEnd = false;
    }

    // Start the smooth scrolling animation
    smoothScroll();
}

// Smooth scrolling function
function smoothScroll() {
    const outputDiv = document.getElementById('output');

    if (outputDiv.scrollTop + outputDiv.clientHeight >= outputDiv.scrollHeight) {
        isAtEnd = true;
        cancelAnimationFrame(animationFrame);
    } else {
        position += speed / 60; // Adjust speed to achieve smoother scrolling
        outputDiv.scrollTop = position;
        animationFrame = requestAnimationFrame(smoothScroll);
    }
}

// Stop the teleprompter
function stopTeleprompter() {
    cancelAnimationFrame(animationFrame);
    const outputDiv = document.getElementById('output');
    // Save the current scroll position
    position = outputDiv.scrollTop;
}

// Adjust the speed of scrolling
function adjustSpeed() {
    speed = parseInt(document.getElementById('speed').value, 10)*10;
}

// Toggle full-screen mode
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
