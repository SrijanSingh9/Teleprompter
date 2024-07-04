let animationFrame;
let speed = 10;  // Increased speed
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
        position += speed / 180; // Adjust speed to achieve smoother scrolling
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
    speed = parseInt(document.getElementById('speed').value, 10)*15;
}

// Adjust the font size
function adjustFontSize() {
    const fontSize = document.getElementById('fontsize').value;
    const scriptTextarea = document.getElementById('script');
    const outputDiv = document.getElementById('output');
    scriptTextarea.style.fontSize = `${fontSize}px`;
    outputDiv.style.fontSize = `${fontSize}px`;
}

// Toggle word wrap
function toggleWordWrap() {
    const outputDiv = document.getElementById('output');
    const scriptTextarea = document.getElementById('script');
    const wordWrap = document.getElementById('wordwrap').checked;
    outputDiv.style.whiteSpace = wordWrap ? 'pre-wrap' : 'pre';
    scriptTextarea.style.whiteSpace = wordWrap ? 'pre-wrap' : 'pre';
}

// Toggle full-screen mode for the teleprompter output
function toggleFullscreen() {
    const outputDiv = document.getElementById('output');
    if (!document.fullscreenElement) {
        outputDiv.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Import text from file
function importText() {
    const fileInput = document.getElementById('fileInput');
    const scriptTextarea = document.getElementById('script');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        scriptTextarea.value = e.target.result;
    };

    reader.readAsText(file);
}
