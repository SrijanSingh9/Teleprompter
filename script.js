let interval;
let speed = 5;
let position = 0;
let isAtEnd = false;

// Start the teleprompter
function startTeleprompter() {
    const scriptText = document.getElementById('script').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerText = scriptText;
    outputDiv.style.display = 'block';
    document.getElementById('script').style.display = 'none';

    // Clear any existing interval to prevent multiple intervals running simultaneously
    clearInterval(interval);

    // If the teleprompter is at the end of the script, reset to the top
    if (isAtEnd) {
        position = 0;
        isAtEnd = false;
    }

    interval = setInterval(() => {
        if (outputDiv.scrollTop + outputDiv.clientHeight >= outputDiv.scrollHeight) {
            clearInterval(interval);
            isAtEnd = true;
        } else {
            position += speed;
            outputDiv.scrollTop = position;
        }
    }, 100);
}

// Stop the teleprompter
function stopTeleprompter() {
    clearInterval(interval);
    const outputDiv = document.getElementById('output');
    // Save the current scroll position
    position = outputDiv.scrollTop;
}

// Adjust the speed of scrolling
function adjustSpeed() {
    speed = parseInt(document.getElementById('speed').value, 10);
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
