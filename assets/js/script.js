document.addEventListener('DOMContentLoaded', (event) => {
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
(localStorage.getItem("highScoreArray"))
  ? highScoreArray = JSON.parse(localStorage.getItem("highScoreArray"))
  : highScoreArray = [];

//This is where the functions will go

// Potential functions that will be needed / wanted

// Function for calling elements without having to write them out all the time

var grabElement = function (element) {
  return document.querySelector(element);
};

// Function for hiding all the quiz sections until chosen

var unHideSections = function (element) {
  var sections = document.querySelectorAll("section");
  Array.from(sections).forEach((userItem) => {
    userItem.classList.add("hide");
  });
  grabElement(element).classList.remove("hide");
};

// Function for resetting the HTML to display the score information properly

var recordHTML = function () {
  grabElement("#highScoresList div").innerHTML = "";
  var index = 1;
  highScoreArray.sort((a, b) => b.playerScore - a.playerScore);
  Array.from(highScoreArray).forEach((check) => {
    var playerScores = document.createElement("div");
    playerScores.innerHTML =
      index + ". " + check.initialRecord + " - " + check.playerScores;
    grabElement("#highScoresList div").appendChild(playerScores);
    index = index + 1;
  });
  index = 0;
  Array.from(questionAnswers).forEach((answer) => {
    answer.classList.remove("disable");
  });
};

// Function for setting up the question information in the quizBox

var setQuestionInfo = function () {
  grabElement("#quizBox p").innerHTML = quizQuestions[questionNumber].question;
  grabElement(
    "#quizBox button:nth-of-type(1)"
  ).innerHTML = `1. ${quizQuestions[questionNumber].choices[0]}`;
  grabElement(
    "#quizBox button:nth-of-type(2)"
  ).innerHTML = `2. ${quizQuestions[questionNumber].choices[1]}`;
  grabElement(
    "#quizBox button:nth-of-type(3)"
  ).innerHTML = `3. ${quizQuestions[questionNumber].choices[2]}`;
  grabElement(
    "#quizBox button:nth-of-type(4)"
  ).innerHTML = `4. ${quizQuestions[questionNumber].choices[3]}`;
};

// Function for changing the question, and also tell the player whether they got the question right or wrong

var quizUpdater = function (answerCopy) {
  grabElement("#userScore p").innerHTML = answerCopy;
  grabElement("#userScore").classList.remove("invisible", scoreIndicator());
  Array.from(questionAnswers).forEach((answer) => {
    answer.classList.add("disable");
  });

  // If all the questions have been answered exist the quiz section
  setTimeout(() => {
    if (questionNumber === quizQuestions.length) {
      onlyDisplaySection("#gameFinish");
      timer = 0;
      grabElement("#time").innerHTML = timer;
    } else {
      // Updates copy in questions with the net array"s question text.
      setQuestionData();
      // Removed disabled status.
      Array.from(questionAnswers).forEach((answer) => {
        answer.classList.remove("disable");
      });
    }
  }, 1000);
};

// Function for the timer events

var gameTimer = function () {
  if (timer > 0) {
    timer = timer - 1;
    grabElement("#time").innerHTML = timer;
  } else {
    clearInterval(gameClock);
    grabElement("#highScore").innerHTML = playerScore;
    onlyDisplaySection("#gameFinish");
  }
};

// Function to start timer and start giving the questions to the player
var gameClock;
grabElement("#guide button").addEventListener("click", (e) => {
    //call  function to set Initial data in questionbox 
    setQuestionInfo();
    unHideSections("#quizBox");
    gameClock = setInterval(gameTimer, 1000);
});

var scoreIndicator = function () {
    clearTimeout(timerSet);
    timerSet = setTimeout(() => {
       grabElement("#userScore").classList.add('invisible'); 
    }, 1000);
}

})


// Function for handling what happens when a correct answer is given, or if its incorrect

// Function for error messages

// High Score Control
