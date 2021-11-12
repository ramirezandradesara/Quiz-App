const question = document.getElementById('question');;
// converts HTML collection (it's not a NodeList) to an array. Now we can access to dataset property
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
];

// CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startgame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions] // copy of questions array
  console.log(availableQuestions);
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    // save the user's scores
    localStorage.setItem("mostRecentScore", score)
    //go to the end page
    return window.location.assign('./end.html')
  }

  // when we start the game this will increment the questionCounter to 1
  questionCounter++;

  // update the question number
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`

  // update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // get a random question
  const questionIndex = Math.floor(Math.random() * availableQuestions.length)

  // reference to the current question and displays it in HTML
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  // the same but for choices
  choices.forEach(choice => {
    // access to the custom attribute 
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]

  });
  // take out the question used 
  availableQuestions.splice(questionIndex, 1)

  acceptingAnswers = true;
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    //ignoring that they click
    if (!acceptingAnswers) return;

    acceptingAnswers = false
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number']

    // add or remove class depending of the answer, 

    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion();

    }, 1000)
  });
});

incrementScore = num => {
  score += num
  scoreText.innerText = score;

}

startgame();
