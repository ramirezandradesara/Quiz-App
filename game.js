const question = document.getElementById('question');;
// converts HTML collection (it's not a NodeList) to an array. Now we can access to dataset property
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

/*fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
.then(resp => {
  return resp.json()
})
.then(loadedQuestions => {
  console.log(loadedQuestions.results)
  loadedQuestions.results.map( loadedQuestion => {
    const formattedQuestion= {
      question: loadedQuestion.question
    };
    const answerChoices = [... loadedQuestions.incorrect_answers];
  })
  //questions = loadedQuestions
  //startgame();
})
.catch(err =>{
  console.error(err);
})*/
fetch(
  'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
)
  .then((res) => {
      return res.json();
  })
  .then((loadedQuestions) => {
      questions = loadedQuestions.results.map((loadedQuestion) => {
          const formattedQuestion = {
              question: loadedQuestion.question,
          };

          const answerChoices = [...loadedQuestion.incorrect_answers];
          formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
          answerChoices.splice(
              formattedQuestion.answer - 1,
              0,
              loadedQuestion.correct_answer
          );

          answerChoices.forEach((choice, index) => {
              formattedQuestion['choice' + (index + 1)] = choice;
          });

          return formattedQuestion;
      });
   
      startGame();
  })
  .catch((err) => {
      console.error(err);
  });
// CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions] // copy of questions array
  
  getNewQuestion()

     game.classList.remove('hidden')
      loader.classList.add('hidden')
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

