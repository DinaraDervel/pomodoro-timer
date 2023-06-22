//get access to DOM elements
const pomodoroButton = document.querySelector("#pomodoro");
const shortBreakButton = document.querySelector("#short-break");
const longBreakButton = document.querySelector("#long-break");
const timerString = document.querySelector(".timer-string");
const switchButton = document.querySelector("#switch");
const resetButton = document.querySelector("#reset");
//global variables
const pomodoroSeconds = 25;
const shortBreakSeconds = 5;
const longBreakSeconds = 15;
const pomodoro = 'pomodoro';
const shortBreak = 'shortBreak';
const longBreak = 'longBreak';
let timerState = pomodoro;
let timeInSeconds = pomodoroSeconds;
let nIntervId = null;
let numberOfPomodoro = 0;
//timer end sound
let audio = new Audio();
audio.preload = 'auto';
audio.src = './assets/audio/facebook_tone.mp3';

pomodoroButton.addEventListener('click', () => { resetTimer(pomodoroSeconds, pomodoro); switchTimer(); });

shortBreakButton.addEventListener('click', () => { resetTimer(shortBreakSeconds, shortBreak); switchTimer(); });

longBreakButton.addEventListener('click', () => { resetTimer(longBreakSeconds, longBreak); switchTimer(); });

resetButton.addEventListener('click', () => { resetTimer(); switchTimer(); });

switchButton.addEventListener('click', () => { switchTimer(); });


function resetTimer(newTime = null, state = null) {
    timerState = state ?? timerState;
    if (!newTime) {
        switch (timerState) {
            case 'pomodoro': newTime = pomodoroSeconds; break;
            case 'shortBreak': newTime = shortBreakSeconds; break;
            case 'longBreak': newTime = longBreakSeconds; break;
        }
    }
    clearInterval(nIntervId);
    timeInSeconds = newTime;
    timerString.textContent = secondsToString();
    switchButton.textContent = "Start";
    pomodoroButton.style.color = (timerState === pomodoro) ? '#090950' : 'white';
    shortBreakButton.style.color = (timerState === shortBreak) ? '#090950' : 'white';
    longBreakButton.style.color = (timerState === longBreak) ? '#090950' : 'white';
}

function switchTimer() {
    if (switchButton.textContent === "Start") {
        switchButton.textContent = "Pause";
        nIntervId = setInterval(onTimer, 1000);
    }
    else {
        switchButton.textContent = "Start";
        clearInterval(nIntervId);
    }
}

function onTimer() {
    timerString.textContent = secondsToString();
    if (timeInSeconds > 0)
        timeInSeconds--;
    else {
        audio.play();
        clearInterval(nIntervId);
        if (timerState === pomodoro && numberOfPomodoro === 3) {
            setTimeout(() => { resetTimer(longBreakSeconds, longBreak); switchTimer(); }, 2000);
            numberOfPomodoro = 0;
        }
        else if (timerState === pomodoro) { setTimeout(() => { resetTimer(shortBreakSeconds, shortBreak); switchTimer(); }, 2000); numberOfPomodoro++; }
        else if (timerState === shortBreak) { setTimeout(() => { resetTimer(pomodoroSeconds, pomodoro); switchTimer(); }, 2000); }
        else if (timerState === longBreak) { setTimeout(() => { resetTimer(pomodoroSeconds, pomodoro); switchTimer(); }, 2000); }
    }
}

function secondsToString() {
    const minutes = Math.floor(timeInSeconds / 60) > 9 ? Math.floor(timeInSeconds / 60) : '0' + Math.floor(timeInSeconds / 60);
    const seconds = (timeInSeconds % 60 > 9) ? timeInSeconds % 60 : '0' + timeInSeconds % 60
    return `${minutes}:${seconds}`;
}

