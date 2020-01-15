let countdown;
const timerDisplay = document.querySelector("#display__time-left");
const buttons = document.querySelectorAll("[data-time]");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionsContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answersButtonsElement = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndex;
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
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));
buttons.forEach(button => button.addEventListener("click", startQuiz));
//
function startQuiz() {
  console.log("Started");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionsContainerElement.classList.remove("hide");
  setNextQuestion();
}
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
  questionElement.innerText = question.question;
  // *****
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answersButtonsElement.appendChild(button);
  });
}
function resetState() {
  nextButton.classList.add("hide");
  while (answersButtonsElement.firstChild) {
    answersButtonsElement.removeChild(answersButtonsElement.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answersButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
}
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
// questions for quiz set up as an array with another array for answers and all of those answers are in an object
const questions = [
  {
    question: "what is 2+2?",
    answers: [
      { text: "4", correct: true },
      { text: "9", correct: false },
      { text: "3", correct: false },
      { text: "12", correct: false }
    ]
  }
];
