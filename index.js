const pomodoroButton = document.querySelector("#pomodoro");
const shortBreakButton = document.querySelector("#short-break");
const longBreakButton = document.querySelector("#long-break");
const timerString = document.querySelector(".timer-string");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
let time = timerString.textContent;
let timeInSeconds = time.slice(0, time.indexOf(':')) * 60 + +time.slice(time.indexOf(':') + 1);

let nIntervId;



pomodoroButton.addEventListener('click', () => {
    timerString.textContent = "25:00";
});

shortBreakButton.addEventListener('click', () => {
    timerString.textContent = "05:00";
});

longBreakButton.addEventListener('click', () => {
    timerString.textContent = "15:00";
});

startButton.addEventListener('click', () => {

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
    timerString.textContent = (timeInSeconds % 60 > 9) ? `${Math.floor(timeInSeconds / 60)}:${timeInSeconds % 60}` : `${Math.round(timeInSeconds / 60)}:0${timeInSeconds % 60}`;
    timeInSeconds--;
}

resetButton.addEventListener()
