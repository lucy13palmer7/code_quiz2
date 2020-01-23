let countdown;
const timerDisplay = document.querySelector("#display__time-left");
const buttons = document.querySelectorAll("[data-time]");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionsContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndex;
//
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
//
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
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
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
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<scripting>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<js>", correct: false }
    ]
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: [
      { text: "<head>", correct: false },
      { text: "<body>", correct: true },
      { text: "<footer>", correct: false },
      { text: "<p>", correct: false }
    ]
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function:myFunction", correct: false },
      { text: "function = myFunction", correct: false },
      { text: "function === myFunction", correct: false },
      { text: "function myFunction()", correct: true }
    ]
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    answers: [
      { text: "Math.rnd(7.25)", correct: false },
      { text: "round(7.25)", correct: false },
      { text: "Math.round(7.25)", correct: true },
      { text: "rnd(7.27)", correct: false }
    ]
  },
  {
    question: "How to write an IF statement in JavaScript?",
    answers: [
      { text: "if i == 5 then", correct: false },
      { text: "if (i == 5)", correct: true },
      { text: "if i = 5 then", correct: false },
      { text: "if i = 5", correct: false }
    ]
  }
];
