// getting current time to open site


let currentTime = new Date();

// let currentHour = currentTime.getUTCHours();
// let currentMinute = currentTime.getUTCMinutes();
// let currentSecond = currentTime.getUTCSeconds();

let closingTime = new Date();
closingTime.setHours(15);
closingTime.setMinutes(3);
closingTime.setSeconds(0);

const diffMs = closingTime - currentTime;
const diffHrs = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
const diffMins = Math.floor((diffMs / (1000 * 60)) % 60);
const diffSecs = Math.floor((diffMs / 1000) % 60);

let isOpen = false;
if (diffHrs = 0 && diffMins <= 3) {
  isOpen = true;
}

let minutesSecondsLeft = diffMins + ':' + diffSecs;
let fullTimeLeft = diffHrs + ':' + diffMins + ':' + diffSecs;


let countdown = {
  minutesSecondsLeft,
  fullTimeLeft,
  isOpen
};


export default countdown;
