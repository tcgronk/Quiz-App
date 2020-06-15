let questionNumber = 0;
let score = 0;

function startQuiz(){
 
    $("#js-wine-form").on("click",".startButton", function(event){
        $(".startButton").css('display', 'none');
        $(".intro").css('display', 'none');
        $(".questionNumber").text(`Question: 1 of 10`);
        $('.questionAnswerForm').css('display', 'block');
        renderQuestion();
        
    });
}


function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}" id="questionNumber">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset role="radiogroup">
    <label class="answerOption">
    <input class='option' type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    ${STORE[questionNumber].answers[0]}
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    ${STORE[questionNumber].answers[1]}
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    ${STORE[questionNumber].answers[2]}
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    ${STORE[questionNumber].answers[3]}
    </label>
    <button type="submit" class="submitButton"><h3>Submit</h3></button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(`Quiz Complete!`)
  }
}


function changeQuestionNumber () {
  
    questionNumber ++;

  $('.questionNumber').text(`Question: ${questionNumber+1} of 10`);
}
function lessQuestionNumber () {
    if(questionNumber!=0){
      questionNumber --;
    $('.questionNumber').text(questionNumber);
    }
}

function changeScore () {
  score ++;
}


function renderQuestion () {
    $('.questionAnswerForm').html(generateQuestion());
}



function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    
    if (answer === correctAnswer) {
      console.log(true)
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } 
    else if(answer===undefined){
      console.log(undefined)
    }
    else  {
      console.log(false)
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
  
}

function userAnswerFeedbackCorrect () {
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div><i  class="fas fa-wine-glass-alt"></i></div><p><b>You got it right!</b></p><button type=button class="nextButton"><h3>Next</h3></button></div>`);
}

function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><i class="fas fa-wine-glass-alt"></i></div><p class="animatedShake"><b>You got it wrong</b><br>the correct answer is <span>${correctAnswer}</span></p><button type=button class="nextButton"><h3>Next</h3></button></div>`);
}


function updateScore () {
  changeScore();
  $('.score').text(`Score: ${score}`);
}

function renderResults () {
  if (score >= 9) {
    $('.questionAnswerForm').html(`<div class="results-correctFeedback"><i class="fas fa-award"></i> <h3>You just might be on your way to becoming a "Master Sommelier!"</h3><p>You got ${score} out of 10! 
    You're an expert on all things wine making, storage, and pairing!</p><button class="restartButton"><h3>Restart Quiz</h3></button></div>`);
  } else if (score < 9 && score >6) {
    $('.questionAnswerForm').html(`<div class="results-correctFeedback"><i class="fas fa-glass-cheers"></i><h3>You got "Sommelier in Training!"</h3><p>You got ${score} out of 10! Keep studying your wine education to become a master somm!</p><button class="restartButton"><h3>Restart Quiz</h3></button></div>`);
  } else if (score ===5 || score ===6){
      $(".questionAnswerForm").html(`<div class="results-correctFeedback"><i class="fas fa-thumbs-up"></i><h3>You got "Wine Rookie"</h3><p>You got ${score} out of 10! With more studying, you'll be on your way to mastering all things wine education!</p><button class="restartButton"><h3>Restart Quiz</h3></button></div>`);
  }
    else {
    $('.questionAnswerForm').html(`<div class="results-correctFeedback"><i class="fas fa-question"></i><h3>You're a "Wine newbie!"</h3><p>You got ${score} out of 10! With more studying, you'll be on your way to mastering all things wine education!</p><button class="restartButton"><h3>Restart Quiz</h3></button></div>`);
  }
}

function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

function renderPreviousQuestion(){
$("main").on("click",".backButton",function(event){
   lessQuestionNumber();
    renderQuestion();
    userSelectAnswer();

});
}

//restart quiz function - reloads page to start quiz over
function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    score=0;
    questionNumber=0;
    $(".questionNumber").text(`10 Questions`);
    $(".score").text(`Score: 0`);
    $(".questionAnswerForm").css('display', 'none');
    $(".startButton").css('display', 'flex');
    $(".intro").css('display', 'flex');
    
  });
  $(".title").click(function (event) {
    score=0;
    questionNumber=0;
    $(".questionNumber").text(`10 Questions`);
    $(".score").text(`Score: 0`);
    $(".questionAnswerForm").css('display', 'none');
    $(".startButton").css('display', 'flex');
    $(".intro").css('display', 'flex');
    
  });
}

function createQuiz () {
    startQuiz();
    renderQuestion();
    userSelectAnswer();
    renderNextQuestion();
    restartQuiz();
    renderPreviousQuestion();
  }
  
  $(createQuiz);
  

