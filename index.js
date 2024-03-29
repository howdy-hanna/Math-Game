$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
  var numberLimet = 10;

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var updateHighScore = function (amount) {
    if (score > highScore) {
      highScore = score;
      $('#highscore').text(highScore);
    }
  }

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  }

  var updateNumberLimit = function(limit) {
    numberLimet = limit;
    $('#numlim').text(numberLimet);
  }

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }
  
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(numberLimet);
    var num2 = randomNumberGenerator(numberLimet);
    
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);
    
    return question;
  }

  
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  }
  
  var checkAnswer = function (userInput, answer) {
    if(userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
      updateHighScore('');
    }
  }

$('#user-input').on('keyup', function () {
  startGame();
  checkAnswer(Number($(this).val()), currentQuestion.answer);
});

$('#numberlimit').on('change', function (e) {
    limit = Number($(this).val());
    updateNumberLimit(limit);
    renderNewQuestion();
  // get the value and update the numberLimet variable
  // should correct your spelling on numberLimet
});
  
  renderNewQuestion();

});

