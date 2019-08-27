var quizRenderer = function(quizEl) {
  var createSubmitBtn = function() {
    var submitBtn = createHtmlElementWithClass('button', 'submit-btn');
    submitBtn.classList.add('btn');
    submitBtn.classList.add('btn-primary');
    submitBtn.innerText = 'Submit Quiz';
    submitBtn.addEventListener('click', function(){
      validateQuiz();
    });
    return submitBtn;
  };
  
  var createResetBtn = function() {
    var resetBtn = createHtmlElementWithClass('button', 'reset-btn');
    resetBtn.classList.add('btn');
    resetBtn.classList.add('btn-primary');
    resetBtn.innerText = 'Reset';
    resetBtn.addEventListener('click', function(){
      resetQuiz();
    });
    return resetBtn;
  };
  
  var createExplanationDiv = function(mcqEl) {
    var explanationDiv = createHtmlElementWithClass('div', 'explanation');
    explanationDiv.appendChild(displayArtfcts(getExplanation(mcqEl)));
    return explanationDiv;
  };
  
  var createIconForChoice = function(choiceVal) {
    var icon;
    if(choiceVal)
      icon = createFontIcon('fa-check');
    else
      icon = createFontIcon('fa-close');
    return icon;
  };
   
  var showChoices = function(mcqEl, choiceName) {
    var choiceDiv = createHtmlElementWithClass('div', 'choice');
    var choices = getChoices(mcqEl);
    choices.forEach(function(choice){
      var choiceVal = isChoiceCorrect(choice);
      var label = createHtmlElementWithClass('label', 'container');
      var radioEl = createRadioElement(choiceName, choiceVal);
      var checkMark = createHtmlElementWithClass('span', 'checkmark');
      var choiceArtfcts = filterArtfcts(choice);
      choiceArtfcts.forEach(function(choiceArtfct) {
        if(isTextArtefact(choiceArtfct)) 
          label.innerHTML += getInnerHtml(getArtBody(choiceArtfct));
      });
      label.append(radioEl);
      label.append(checkMark);
      label.append(createIconForChoice(choiceVal));
      choiceDiv.appendChild(label);
    });
    return choiceDiv;
  }; 
  
  var showQuestion = function(mcqEl) {
    var questionDiv = createHtmlElementWithClass('div', 'question');
    var questionResDiv = createHtmlElementWithClass('div', 'question-result');
    questionDiv.appendChild(questionResDiv);
    var questionArtfcts = filterArtfcts(mcqEl);
    questionArtfcts.forEach(function(quesArtfct) {
      if(isTextArtefact(quesArtfct)) {      
        questionDiv.innerHTML += getInnerHtml(getArtBody(quesArtfct));
      }
    });
    return questionDiv;
  };
  
  var createQuizHeader = function() {
    var quizHeader = createHtmlElementWithClass('h3', 'quiz-header');
    quizHeader.innerHTML = 'Mutiple Choice Questions';
    return quizHeader;
  };
  
  var createQuizContainer = function(quizEl) {
    var quizContainerDiv = createHtmlElementWithClass('div', 'quiz-container');
    quizContainerDiv.appendChild(createQuizHeader());
    var mcq = getMcqs(quizEl);
    for(var i = 0; i < mcq.length; i++) {
      var choiceName = 'mcq'+i;
      var box = createBoxLayout('quiz-mcq');
      box.getElementsByClassName('box-head')[0].appendChild(showQuestion(mcq[i]));
      box.getElementsByClassName('box-inner')[0].appendChild(showChoices(mcq[i], choiceName));
      box.getElementsByClassName('box-inner')[0].appendChild(createExplanationDiv(mcq[i]));
      quizContainerDiv.appendChild(box);
    }
    quizContainerDiv.appendChild(createSubmitBtn());
    quizContainerDiv.appendChild(createResetBtn());
    return quizContainerDiv;
  };
  
  var createQuizPreamble = function(quizEl) {
    var quizPreambleDiv = createHtmlElementWithClass('div', 'quiz-preamble');
    var quizPreamble = getPreamble(quizEl);
    if(quizPreamble !== undefined)     
      quizPreambleDiv.appendChild(displayArtfcts(quizEl));
    return quizPreambleDiv;
  }; 
  
  var buildQuiz = function() {
    var cntDiv = getContentDiv();
    cntDiv.appendChild(createQuizPreamble(quizEl));
    cntDiv.appendChild(createHtmlElementWithClass('div', 'quiz-results-container'));
    cntDiv.appendChild(createQuizContainer(quizEl));
    cntDiv.appendChild(createPrevEl());
    cntDiv.appendChild(createNextEl());
  };
  
  var goAhead = function() {
    scrollPageToTop();
    styleActiveTocEl(quizEl);
    clearCurrentCnt();
    buildQuiz();
  };
  
  goAhead();
};
var getQuizPreambleDiv = function() {
  return getObjByClassName(getContentDiv(), 'quiz-preamble');
};

var getQuizResContainerDiv = function() {
  return getObjByClassName(getContentDiv(), 'quiz-results-container');
};

var getQuizContainerDiv = function() {
  return getObjByClassName(getContentDiv(), 'quiz-container');
};

var getQuizHeaderDiv = function() {
  return getObjByClassName(getQuizContainerDiv(), 'quiz-header');
};

var getMcqsDiv = function() {
  return getObjsByClassName(getQuizContainerDiv(), 'quiz-mcq');
};

var getQuestionsDiv = function() {
  return getObjsByClassName(getQuizContainerDiv(), 'question');
};

var getChoicesDiv = function() {
  return getObjsByClassName(getQuizContainerDiv(), 'choice');
};

var getExplanationsDiv = function() {
  return getObjsByClassName(getQuizContainerDiv(), 'explanation');
};

var getSubmitBtn = function() {
  return getObjByClassName(getQuizContainerDiv(), 'submit-btn');
};

var getResetBtn = function() {
  return getObjByClassName(getQuizContainerDiv(), 'reset-btn');
};
