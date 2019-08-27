var validateQuiz = function() {
  var showQuestionsResult = function() {
    var mcqs = getMcqsDiv();
    mcqs.forEach(function(mcq) {      
      var inputs = makeArray(mcq.getElementsByTagName('input'));
      inputs.forEach(function(input) {
        var parentElement = input.parentElement;
        if(input.checked && input.value === 'false') {
          parentElement.getElementsByClassName('fa-close')[0].style.visibility = 'visible';
          mcq.getElementsByClassName('question-result')[0].classList.add('incorrect');
          mcq.getElementsByClassName('question-result')[0].innerHTML = 'Wrong';
        }
        if(input.checked && input.value === 'true') {
          parentElement.getElementsByClassName('fa-check')[0].style.visibility = 'visible';
          mcq.getElementsByClassName('question-result')[0].classList.add('correct');
          mcq.getElementsByClassName('question-result')[0].innerHTML = 'Correct';
        }
        if(input.value === 'true') {
          parentElement.getElementsByClassName('fa-check')[0].style.visibility = 'visible';
        }
      });
    });
  };
  
  var showQuizScore = function() {
    var score = 0;
    var quizContainerDiv = getQuizContainerDiv();
    var inputs = makeArray(quizContainerDiv.getElementsByTagName('input'));
    inputs.forEach(function(input) {
      if(input.checked && input.value === 'true')
        score += 1;
    });
    var totalMcqs = getMcqsDiv().length;    
    var quizResContainerDiv = getQuizResContainerDiv();
    quizResContainerDiv.innerHTML = 'Your score: '+score+'/'+totalMcqs;
    var trophyIcon = createFontIcon('fa-trophy');
    var scorePercentage = ((totalMcqs*10) * score / totalMcqs).toFixed();
    if(scorePercentage < 40) 
      trophyIcon.style.color = 'red';
    else
      trophyIcon.style.color = 'green';
    quizResContainerDiv.prepend(trophyIcon);
    quizResContainerDiv.style.display = 'block';
  };
  
  var showMcqsExplanation = function() {
    var mcqsExplanations = getExplanationsDiv();
    mcqsExplanations.forEach(function(mcqExplanation) {
      mcqExplanation.style.display = 'block';
    });
  };
  
  var disableChoices = function() {
    var choices = getChoicesDiv();
    choices.forEach(function(choice) {
      var labels = makeArray(choice.getElementsByTagName('label'));
      labels.forEach(function(label) {
        label.classList.add('disable-choices');
      });
    });
  };
  
  var disableSubmitBtn = function() {
    var submitBtn = getSubmitBtn();
    submitBtn.classList.add('disable-btn');
  };
  
  var checkRadioBtns = function() {
    var mcqs = getMcqsDiv();
    if($('input:radio:checked').length < mcqs.length) 
      alert('Please answer all the questions');
    else {
      scrollPageToTop();
      disableSubmitBtn();
      disableChoices();
      showMcqsExplanation();
      showQuizScore();
      showQuestionsResult();
    }
  }; 
  
  checkRadioBtns();
};
var resetQuiz = function() {
  window.location.reload();
};
