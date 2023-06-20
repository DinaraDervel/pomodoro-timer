const pomodoroButton = document.querySelector("#pomodoro");
const shortBreakButton = document.querySelector("#short-break");
const longBreakButton = document.querySelector("#long-break");
const timerString = document.querySelector(".timer-string");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
let time;
let timeInSeconds;
let nIntervId;



pomodoroButton.addEventListener('click', () => {
    resetTimer('25:00');
});

shortBreakButton.addEventListener('click', () => {
    resetTimer('05:00');
});

longBreakButton.addEventListener('click', () => {
    resetTimer('15:00');
});

resetButton.addEventListener('click', () => {
    resetTimer('25:00');
});

startButton.addEventListener('click', () => {
    time = timerString.textContent;
    timeInSeconds = time.slice(0, time.indexOf(':')) * 60 + +time.slice(time.indexOf(':') + 1);
    if (startButton.textContent === "Start") {
        startButton.textContent = "Pause";
        if (!nIntervId) {
            nIntervId = setInterval(timer, 1000);
        }
    }
    else {
        startButton.textContent = "Start";
        clearInterval(nIntervId);
        nIntervId = null;
    }

});

function timer() {
    const minutes = Math.floor(timeInSeconds / 60) > 9 ? Math.floor(timeInSeconds / 60) : '0' + Math.floor(timeInSeconds / 60);
    const seconds = (timeInSeconds % 60 > 9) ? timeInSeconds % 60 : '0' + timeInSeconds % 60
    timerString.textContent = `${minutes}:${seconds}`;
    timeInSeconds--;
}

function resetTimer(newTime) {
    clearInterval(nIntervId);
    nIntervId = null;
    timerString.textContent = newTime;
    startButton.textContent = "Start";
}
