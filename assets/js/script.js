// Variables and initial setup for local storage / array 

// Variables

var startingTime = 60;
var timer = 60;
var playerScore = 0;
var questionNumber = 0;
var timerSet;
var questionAnswers = document.querySelectorAll("#quizBox button");

// This array will be for the highScore and will be cleared if not needed
var highScoreArray = [];
// Retrieve the highscore information if it exists, or keep it blank if it doesnt
(localStorage.getItem ("highScoreArray")) ? highScoreArray = JSON.parse(localStorage.getItem("highScoreArray")): highScoreArray = [];