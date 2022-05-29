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

//This is where the functions will go

// Potential functions that will be needed / wanted

// Function for calling elements without having to write them out all the time

// Function for hiding all the quiz sections until chosen

// Function for resetting the HTML to display the score information properly

// Function for setting up the question information in the quizBox

// Function for changing the question, and also tell the player whether they got the question right or wrong

// Function for the timer events

// Function to start timer and start giving the questions to the player

// Function for handling what happens when a correct answer is given, or if its incorrect 

// Function for error messages

// High Score Control