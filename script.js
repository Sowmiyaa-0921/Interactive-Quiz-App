const questions = [
  {
    tag: "C",
    question: "Which of the following is not a valid storage class in C?",
    answers: [
      { text: "auto", correct: false },
      { text: "register", correct: false },
      { text: "static", correct: false },
      { text: "persistent", correct: true }
    ]
  },
  {
    tag: "Java",
    question: "In the Java Memory Model, which region is not directly involved in garbage collection?",
    answers: [
      { text: "Heap", correct: false },
      { text: "Stack", correct: true },
      { text: "Young Generation", correct: false },
      { text: "Tenured Generation", correct: false }
    ]
  },
  {
    tag: "Python",
    question: "What role does indentation play in Python?",
    answers: [
      { text: "For documentation only", correct: false },
      { text: "Used only for readability", correct: false },
      { text: "Defines code blocks", correct: true },
      { text: "Optional, like in C", correct: false }
    ]
  },
  {
    tag: "DBMS",
    question: "Which of the following anomalies can occur when concurrent transactions are not properly managed?",
    answers: [
      { text: "Schema drift", correct: false },
      { text: "Phantom reads", correct: true },
      { text: "Data sharding", correct: false },
      { text: "Indexing faults", correct: false }
    ]
  },
  {
    tag: "Java",
    question: "What is the primary purpose of using the volatile keyword in Java?",
    answers: [
      { text: "To prevent thread starvation", correct: false },
      { text: "To increase memory allocation speed", correct: false },
      { text: "To ensure visibility of changes to variables across threads", correct: true },
      { text: "To make variables immutable", correct: false }
    ]
  },
  {
    tag: "ML",
    question: "In Machine Learning, increasing model complexity usually leads to:",
    answers: [
      { text: "Lower bias and higher variance", correct: true },
      { text: "Higher bias and higher variance", correct: false },
      { text: "Lower variance and higher bias", correct: false },
      { text: "Lower bias and lower variance", correct: false }
    ]
  },
  {
    tag: "Java",
    question: "Which of the following is true about interfaces in Java?",
    answers: [
      { text: "Interfaces can have constructors", correct: false },
      { text: "Interfaces support multiple inheritance", correct: true },
      { text: "Interfaces can have instance variables", correct: false },
      { text: "Interfaces cannot contain methods", correct: false }
    ]
  },
  {
    tag: "General Knowledge",
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    tag: "DBMS",
    question: "What is the main goal of normalization in relational databases?",
    answers: [
      { text: "Improve data retrieval speed", correct: false },
      { text: "Eliminate data redundancy", correct: true },
      { text: "Increase table size", correct: false },
      { text: "Enhance graphical interface", correct: false }
    ]
  },
  {
    tag: "C",
    question: "Which of the following operations in C results in undefined behavior?",
    answers: [
      { text: "Dividing by a non-zero integer", correct: false },
      { text: "Accessing an array with a valid index", correct: false },
      { text: "Modifying a variable twice between sequence points", correct: true },
      { text: "Using sizeof on a variable", correct: false }
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const quitButton = document.getElementById('quit-btn');
const tagElement = document.getElementById('tag');
const progressElement = document.getElementById('progress');

let currentQuestionIndex = 0;
let score = 0;
let quizEnded = false;


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizEnded = false;
  nextButton.innerText = 'Next';
  quitButton.style.display = 'block';
  showQuestion();
}


function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  tagElement.innerText = `Category: ${currentQuestion.tag}`;
  progressElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text.trim();
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}


function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('wrong');
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
  if (quizEnded) {
    startQuiz(); 
    return;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = `🎉 You scored ${score} out of ${questions.length}!`;
  tagElement.innerText = '';
  progressElement.innerText = '';
  nextButton.innerText = 'Play Again';
  nextButton.style.display = 'block';
  quitButton.style.display = 'none';
  quizEnded = true;
}

quitButton.addEventListener('click', showScore);

startQuiz();
