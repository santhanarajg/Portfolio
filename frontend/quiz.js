// Simple QA/testing trivia quiz — no backend needed, runs entirely in the browser.

const quizQuestions = [
  {
    question: "What does 'QA' stand for?",
    options: [
      "Quick Assessment",
      "Quality Assurance",
      "Query Analysis",
      "Quantitative Analytics",
    ],
    answer: 1,
  },
  {
    question: "Which testing type checks if a bug fix broke something else?",
    options: [
      "Smoke testing",
      "Regression testing",
      "Load testing",
      "Unit testing",
    ],
    answer: 1,
  },
  {
    question:
      "In Selenium, which command waits for an element to appear before interacting with it?",
    options: ["Thread.sleep()", "WebDriverWait", "PageLoad()", "ElementFinder"],
    answer: 1,
  },
  {
    question: "What's the difference between a 'bug' and a 'defect'?",
    options: [
      "There is no difference — same thing, different names",
      "A bug is found in production, a defect in testing",
      "A bug is a coding error, a defect is any deviation from requirements",
      "A defect is more severe than a bug",
    ],
    answer: 0,
  },
  {
    question: "What is 'smoke testing' used for?",
    options: [
      "Testing under extreme heat conditions",
      "A quick check that critical functions work before deeper testing",
      "Testing error logging",
      "Testing UI animations",
    ],
    answer: 1,
  },
  {
    question: "Which HTTP status code typically means 'Unauthorized'?",
    options: ["200", "404", "401", "500"],
    answer: 2,
  },
  {
    question: "What is a 'test case'?",
    options: [
      "A bug report",
      "A set of conditions/steps to verify a specific feature works as expected",
      "A folder storing test scripts",
      "A type of automation framework",
    ],
    answer: 1,
  },
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const quizQuestionEl = document.getElementById("quiz-question");
const quizOptionsEl = document.getElementById("quiz-options");
const quizProgressEl = document.getElementById("quiz-progress");
const quizResultEl = document.getElementById("quiz-result");
const quizRestartBtn = document.getElementById("quiz-restart");

function loadQuestion() {
  const q = quizQuestions[currentQuestion];
  quizQuestionEl.textContent = q.question;
  quizProgressEl.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  quizOptionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "quiz-option";
    btn.addEventListener("click", () => selectAnswer(index));
    quizOptionsEl.appendChild(btn);
  });

  quizResultEl.textContent = "";
  quizRestartBtn.hidden = true;
}

function selectAnswer(selectedIndex) {
  const q = quizQuestions[currentQuestion];
  const buttons = quizOptionsEl.querySelectorAll(".quiz-option");

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.answer) btn.classList.add("correct");
    if (index === selectedIndex && selectedIndex !== q.answer)
      btn.classList.add("incorrect");
  });

  if (selectedIndex === q.answer) score++;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      loadQuestion();
    } else {
      showFinalResult();
    }
  }, 900);
}

function showFinalResult() {
  quizQuestionEl.textContent = "Quiz complete!";
  quizOptionsEl.innerHTML = "";
  quizProgressEl.textContent = "";
  quizResultEl.textContent = `You scored ${score} out of ${quizQuestions.length}.`;
  quizRestartBtn.hidden = false;
}

quizRestartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  loadQuestion();
});

if (quizContainer) {
  loadQuestion();
}
