document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const laps = document.getElementById('laps');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');

    let timer;
    let milliseconds = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let isRunning = false;
    let lapIndex = 1; // Initialize lap index outside of the function

    function updateDisplay() {
        const ms = milliseconds < 10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds;
        const hr = hours < 10 ? '0' + hours : hours;
        const min = minutes < 10 ? '0' + minutes : minutes;
        const sec = seconds < 10 ? '0' + seconds : seconds;

        display.textContent = `${hr}:${min}:${sec}:${ms}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            timer = setInterval(() => {
                milliseconds++;
                if (milliseconds >= 100) {
                    milliseconds = 0;
                    seconds++;
                    if (seconds >= 60) {
                        seconds = 0;
                        minutes++;
                        if (minutes >= 60) {
                            minutes = 0;
                            hours++;
                        }
                    }
                }
                updateDisplay();
            }, 10); // Update every 10 milliseconds
        }
    }

    function stopTimer() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
        }
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        milliseconds = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
        lapIndex = 1; // Reset lap index
        updateDisplay();
        laps.innerHTML = ''; // Clear lap list
        laps.classList.add('hidden'); // Hide lap display
    }

    function recordLap() {
        if (isRunning) {
            const lapTime = document.createElement('div');
            lapTime.textContent = `Lap ${lapIndex} : ${display.textContent}`;
            lapTime.className = 'text-gray-300';
            laps.appendChild(lapTime);

            // Show lap display if it's hidden
            laps.classList.remove('hidden');
            lapIndex++; // Increment lap index for next lap
        }
    }

    // Add initial hidden class to laps container
    laps.classList.add('hidden');

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener('click', recordLap);
});
