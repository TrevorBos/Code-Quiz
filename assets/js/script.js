document.addEventListener("DOMContentLoaded", function (event) {
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
  localStorage.getItem("highScoreArray")
    ? (highScoreArray = JSON.parse(localStorage.getItem("highScoreArray")))
    : (highScoreArray = []);

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
        index + ". " + check.initialRecord + " - " + check.playerScore;
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
    grabElement("#quizBox p").innerHTML =
      quizQuestions[questionNumber].question;
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
    grabElement("#userScore").classList.remove("hidden", scoreIndicator());
    Array.from(questionAnswers).forEach((answer) => {
      answer.classList.add("disable");
    });

    // If all the questions have been answered exist the quiz section
    setTimeout(() => {
      if (questionNumber === quizQuestions.length) {
        unHideSections("#gameFinish");
        timer = 0;
        grabElement("#time").innerHTML = timer;
      } else {
        // Updates copy in questions with the net array"s question text.
        setQuestionInfo();
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
      grabElement("#highscore").innerHTML = playerScore;
      unHideSections("#gameFinish");
    }
  };

  // Function to start timer and start giving the questions to the player
  var gameClock;
  grabElement("#guide button").addEventListener("click", function (e) {
    //call  function to set Initial data in questionbox
    setQuestionInfo();
    unHideSections("#quizBox");
    gameClock = setInterval(gameTimer, 1000);
  });

  var scoreIndicator = function () {
    clearTimeout(timerSet);
    timerSet = setTimeout(() => {
      grabElement("#userScore").classList.add("hidden");
    }, 1000);
  };

  // Function for handling what happens when a correct answer is given, or if its incorrect

  Array.from(questionAnswers).forEach((check) => {
    check.addEventListener("click", function (event) {
      // Handles events if a question is answered correctly
      if (
        this.innerHTML.substring(3, this.length) ===
        quizQuestions[questionNumber].answer
      ) {
        playerScore = playerScore + 1;
        questionNumber = questionNumber + 1;
        quizUpdater("Correct");
      } else {
        // Handles events if a question is answered incorrectly.
        timer = timer - 10;
        questionNumber = questionNumber + 1;
        quizUpdater("Wrong");
      }
    });
  });

  // Displays error message if initials given do not meet requirements

  var errorIndicator = function () {
    clearTimeout(timerset);
    timerset = setTimeout(() => {
      grabElement("#errorScore").classList.add("hidden");
    }, 3000);
  };

  // Error handling for submitting high scores
  grabElement("#recordScore button").addEventListener("click", () => {
    var initialsRecord = grabElement("#initials").value;
    if (initialsRecord === "") {
      grabElement("#errorScore p").innerHTML = "You need at least 1 character";
      grabElement("#errorScore").classList.remove("hidden", errorIndicator());
    } else if (initialsRecord.match(/[[A-Za-z]/) === null) {
      grabElement("#errorScore p").innerHTML =
        "Only letters for initials allowed.";
      grabElement("#errorScore").classList.remove("hidden", errorIndicator());
    } else if (initialsRecord.length > 5) {
      grabElement("#errorScore p").innerHTML =
        "Maximum of 5 characters allowed.";
      grabElement("#errorScore").classList.remove("hidden", errorIndicator());
    } else {
      //Sends value to current array for use now.
      highScoreArray.push({
        initialRecord: initialsRecord,
        playerScore: playerScore,
      });
      //Sends value to local storage for later use.
      localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
      grabElement("#highScoresList div").innerHTML = "";
      unHideSections("#highScoresList");
      recordHTML();
      grabElement("#initials").value = "";
    }
  });

  // Clears highscores
  grabElement("#clearHighScores").addEventListener("click", () => {
    highScoreArray = [];
    grabElement("#highScoresList div").innerHTML = "";
    localStorage.removeItem("highScoreArray");
  });

  // Resets all quiz settings
  grabElement("#resetGame").addEventListener("click", () => {
    timer = startingTime;
    playerScore = 0;
    questionNumber = 0;
    unHideSections("#guide");
  });

  // If a player pushes the view high scores button in the html view then this abdandons all quiz progress and lets them view the high scores.
  grabElement("#highscores").addEventListener("click", function (e) {
    e.preventDefault();
    clearInterval(gameClock);
    grabElement("#time").innerHTML = 0;
    timer = startingTime;
    playerScore = 0;
    questionNumber = 0;
    unHideSections("#highScoresList");
    recordHTML();
  });
});
