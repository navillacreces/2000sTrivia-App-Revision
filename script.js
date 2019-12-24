
function hideButtons(){
    $("#play-again-button").hide();
    $("#next-button").hide();
    $("#next-question-button").hide();
    }
    
    function userClicksPlayAgain(){
    
      $("#play-again-button").click(function(){
    
      STORE[6].currentQuestionIndex = 0;
      STORE[6].userScore = 0;
      STORE[6].currentQuestion = 1;
      $("#score-count").empty();
      $("#question-count").empty();
      loadQuestion(0);
     
      });
    
    }
    
    
    function userClickNext(){
    
      $("#next-button").click(function(){
        if ($("input[name='possibleAnswers']:checked").length === 0){
          alert("please select an answer");
          
          }else {
            let chosen = $('input[name=\"possibleAnswers\"]:checked').val();
            verifyAnswer(chosen);
          }
      });
    }
    
    function verifyAnswer(usersChosenAnswer){
    
      if (usersChosenAnswer === STORE[STORE[6].currentQuestionIndex].correctAnswer){
        
        incrementUserScore();
        postQuestionCorrect();
    
      } else {
      
        postQuestionWrong();
      }
    
      $("#next-button").hide();
    
    }
    
    function userClickStart(){
    
      
      $("#start-button").click(function(){
        $("#start-button").hide();
        //incrementCurrentQuestion();
        $("#question-count").html(STORE[6].currentQuestion);
        loadQuestion(0);
        $("#next-button").show();
        $("#score-count").html(STORE[6].userScore);
      });
    
    }
    
    
    function loadQuestion(questionIndex){
    
      $("#play-again-button").hide();
      $("#next-button").show();
      $("#next-question-button").hide();
      $("h3").html(STORE[questionIndex].question);
      for (x = 0; x < 4; x++){
          $(".possible-answers-div").append(`<input type="radio" class="radio-bttn"  name="possibleAnswers" value="${STORE[questionIndex].answers[x]}"> ${STORE[questionIndex].answers[x]}</input><br>`);
      }
    }
    
    function postQuestionWrong(){
       $(".information").show();
      $(".possible-answers-div").empty();
      $("h3").html("Wrong");
      $(".information").html(`The correct answer was ${STORE[STORE[6].currentQuestionIndex].correctAnswer}`);
      $("#next-question-button").show();
    
    }
    
    function postQuestionCorrect(){
      $(".possible-answers-div").empty();
      $("h3").html("Correct");
      $("#next-question-button").show();
    }
    
    
    function incrementCurrentQuestionIndex(){
        STORE[6].currentQuestionIndex ++;
    }
    
    function incrementUserScore(){
        STORE[6].userScore ++;
        $("#score-count").html(STORE[6].userScore);
    }
    
    function incrementCurrentQuestion(){
        STORE[6].currentQuestion ++;
        $("#question-count").html(STORE[6].currentQuestion);
        
    }
    
    function nextQuestion(){
      $("#next-question-button").click(function(){
    
        if (STORE[6].currentQuestionIndex === 5){
          $("#play-again-button").show();
          $("#next-question-button").hide();
          $(".information").hide();
          $("h3").html("Out of questions. Play again?");
          
        } else{
        incrementCurrentQuestionIndex();
        incrementCurrentQuestion(); // might be here
        loadQuestion(STORE[6].currentQuestionIndex);
        $(".information").hide();
        $("#next-button").show();
    
        }
    
      });
    }
    
    
    function runTheApp(){
      hideButtons();
      userClickStart();
      userClickNext();
      nextQuestion();
      userClicksPlayAgain();
    }
    
    $(runTheApp);