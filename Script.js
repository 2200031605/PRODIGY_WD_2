let timer;
let running = false;
let time = 0;
let laps = [];

function startStop() {
    if (running) {
        clearInterval(timer);
        document.getElementById("startStop").innerHTML = "Start";
    } else {
        timer = setInterval(updateTime, 10);
        document.getElementById("startStop").innerHTML = "Stop";
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    time = 0;
    running = false;
    document.getElementById("display").innerHTML = formatTime(time);
    document.getElementById("startStop").innerHTML = "Start";
    laps = [];
    updateLaps();
}

function lap() {
    laps.push(time);
    updateLaps();
}

function updateTime() {
    time += 1;
    document.getElementById("display").innerHTML = formatTime(time);
}

function formatTime(time) {
    let hours = Math.floor(time / 360000);
    let minutes = Math.floor((time % 360000) / 6000);
    let seconds = Math.floor((time % 6000) / 100);
    let milliseconds = time % 100;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, width = 2) {
    return String(number).padStart(width, '0');
}

function updateLaps() {
    const lapsList = document.getElementById("laps");
    lapsList.innerHTML = "";
    laps.forEach((lapTime, index) => {
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapItem);
    });
}
