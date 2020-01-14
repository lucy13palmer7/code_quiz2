let countdown;
const timerDisplay = document.querySelector("#display__time-left");
const buttons = document.querySelectorAll("[data-time]");
function timer(second) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + second * 1000;
  displayTimeLeft(second);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
  console.log({ minutes, remainderSeconds });
}

function startTimer() {
  // console.log(this);
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));
