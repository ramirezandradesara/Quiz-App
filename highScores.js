const highScoresList = document.getElementById('highScoresList');

// takes high scores from local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);

//takes the incoming array (high scores) and converts it in a new array, objects -> strings
highScoresList.innerHTML = highScores.map(score => {
   return(`<li class="high-score"> ${score.name} - ${score.score}</li>`);}).join(" ")