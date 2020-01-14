// start button from homepage
// var start = document.getElementById("start-btn");
// start.addEventListener("click", function() {
//   start.startQuiz();
// });
// all variables from the index page starting from the top
// first, display question with options
// display timer
// timer function
let countdown;

function timer(second) {
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
  console.log({ minutes, remainderSeconds });
}
