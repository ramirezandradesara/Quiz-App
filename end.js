const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const mostRecentScore = localStorage.getItem("mostRecentScore")
const finalScore = document.getElementById('finalScore');
const MAX_HIGH_SCORES = 5;


// converts string to JSON
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', function () {
    console.log(typeof (username.value));

    // disabled the btn if it's null
    saveScoreBtn.disabled = !username.value


});
saveHighScore = e => {
    console.log("clocked the save");
    e.preventDefault()
    // info that it's sent to local storage
    const score = {
        score: Math.floor(Math.random()*100), //checks if the splice is working
   //     score: mostRecentScore,
        name: username.value
    }
    highScores.push(score)
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5)

    // save the info as a string in local storage
    localStorage.setItem('highScores', JSON.stringify(highScores))

    //back to home page after saving score
    window.location.assign('/')

    console.log(highScores);
    console.log(score);
}