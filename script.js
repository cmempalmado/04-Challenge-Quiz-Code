// global variables
var startButton = document.getElementById(`start-btn`);
var questionContainerEl = document.getElementById(`question-container`);
var questionContainer = document.getElementById(`container`);
var initialsEl = document.getElementById("initials");
var questionEl = document.getElementById(`questions`);
var btnEl = document.getElementById('btn');
var choicesEl = document.getElementById("choices");
var choicesBtn = document.getElementById(`choice-btns`);
var feedbackEl = document.getElementById(`feedback`);
var scoreEl = document.getElementById('score');
var nextButton = document.getElementById('next-btn');
var scoreButton = document.getElementById('score-btn');
var score = document.getElementById('score');
var timerEl = document.getElementById("time");
var wordsEl = document.getElementById('words');
var highscoreDiv = document.getElementById('wrapper');
var submitBtn = document.getElementById("submit");

var timerId;

var currentQuestionIndex = 0;
var time = 60;

startButton.addEventListener(`click`, startGame)

nextButton.addEventListener(`click`, function(){
  currentQuestionIndex++;
  nextQuestion()
})

// Start the Coding Quiz!
function startGame() {
  startButton.classList.add(`hide`)

  questionContainerEl.classList.remove(`hide`)

  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  nextQuestion()
  
}

function nextQuestion() {
  showQuestion(currentQuestionIndex)
}

// update current question
function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  
  var titleEl = questionEl;
  titleEl.innerText = currentQuestion.title;

  currentQuestion.choices.forEach(function(choice) {
  var choicesEl = document.getElementById('answer-btn');
  choicesEl.setAttribute("value", choice)

  choicesEl.innerText = choice;
  
  choicesEl.onclick = correctAnswer;
  
  choicesBtn.appendChild(choicesEl);
  nextButton.classList.add('hide')
  })
}

// See if user choice is correct
function correctAnswer() {
  if (this.value === questions[currentQuestionIndex].answer) {
    

    feedbackEl.textContent = "You picked the Correct answer";
    console.log(true);
    
  } else {
    feedbackEl.textContent = "Wrong, the correct answer is " + questions[currentQuestionIndex].answer;
    time -= 10;
    
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
  }
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 3000);
  if (questions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
      
  } else {
    quizEnd()
  }
  
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var scoreScreen = document.getElementById("scores");
  scoreScreen.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  wordsEl.setAttribute("class", "hide");
  questionContainer.setAttribute("class", "hide");
}



function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}
submitBtn.addEventListener('click', function() {
  saveHighscore()
  var scoreScreen = document.getElementById("scores");
  scoreScreen.setAttribute("class", "hide");
})



// List of Questions
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
  }
]