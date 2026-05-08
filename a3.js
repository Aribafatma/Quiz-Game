// DOM Elements
const startsScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answers-container");

const currentQuestionsSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");

const finalScorespan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-message");

const progressBar = document.getElementById("progress");


// Quiz Questions
const quizQuestions = [

    {
        question: "What is your name?",
        answers: [
            { text: "Amna", correct: false },
            { text: "Ariba", correct: true },
            { text: "Ram", correct: false },
            { text: "Riya", correct: false }
        ]
    },

    {
        question: "Which data structure uses FIFO order?",
        answers: [
            { text: "Stack", correct: false },
            { text: "Tree", correct: false },
            { text: "Graph", correct: false },
            { text: "Queue", correct: true }
        ]
    },

    {
        question: "Which data structure uses LIFO order?",
        answers: [
            { text: "Stack", correct: true },
            { text: "Tree", correct: false },
            { text: "Array", correct: false },
            { text: "Linked List", correct: false }
        ]
    },

    {
        question: "Which language is mainly used for styling web pages?",
        answers: [
            { text: "Python", correct: false },
            { text: "Java", correct: false },
            { text: "CSS", correct: true },
            { text: "SQL", correct: false }
        ]
    },

    {
        question: "Which searching algorithm works only on sorted arrays?",
        answers: [
            { text: "Linear Search", correct: false },
            { text: "DFS", correct: false },
            { text: "BFS", correct: false },
            { text: "Binary Search", correct: true }
        ]
    }

];


// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;


totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


// Start Quiz
function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    scoreSpan.textContent = score;

    startsScreen.classList.remove("active");
    resultScreen.classList.remove("active");

    quizScreen.classList.add("active");

    showQuestion();
}


// Show Question
function showQuestion() {

    answersDisabled = false;

    answerContainer.innerHTML = "";

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionsSpan.textContent = currentQuestionIndex + 1;

    const progressPercent =
        (currentQuestionIndex / quizQuestions.length) * 100;

    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer.text;

        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answerContainer.appendChild(button);

    });

}


// Select Answer
function selectAnswer(event) {

    if (answersDisabled) return;

    answersDisabled = true;

    const selectButton = event.target;

    const isCorrect =
        selectButton.dataset.correct === "true";


    Array.from(answerContainer.children).forEach(button => {

        if (button.dataset.correct === "true") {

            button.classList.add("correct");

        }

        else if (button === selectButton) {

            button.classList.add("incorrect");

        }

    });


    if (isCorrect) {

        score++;

        scoreSpan.textContent = score;

    }


    setTimeout(() => {

        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {

            showQuestion();

        }

        else {

            showResult();

        }

    }, 1000);

}


// Show Result
function showResult() {

    quizScreen.classList.remove("active");

    resultScreen.classList.add("active");

    finalScorespan.textContent = score;

    const percentage =
        (score / quizQuestions.length) * 100;


    if (percentage === 100) {

        resultMessage.textContent =
            "Perfect! You're a genius!";

    }

    else if (percentage >= 80) {

        resultMessage.textContent =
            "Great job! You know your stuff!";

    }

    else if (percentage >= 60) {

        resultMessage.textContent =
            "Good effort! Keep learning!";

    }

    else if (percentage >= 40) {

        resultMessage.textContent =
            "Not bad! Try again to improve!";

    }

    else {

        resultMessage.textContent =
            "Keep studying! You'll get better!";

    }

}


// Restart Quiz
function restartQuiz() {

    resultScreen.classList.remove("active");

    startQuiz();

}