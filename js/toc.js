var tocRenderer = function() {
  var createTasksUl = function(tsks) {
    var ul = createHtmlElementWithClass('ul', 'toc-tsk-ul');
    tsks.forEach(function(tsk){
      var tskLi = createHtmlElementWithClass('li', 'toc-tsk-li');
      tskLi.appendChild(createAnchorElement(getShortTitle(tsk)));
      ul.appendChild(tskLi);
    });
    return ul;
  };
  
  var createQuizzesUl = function(quiz) {
    var ul = createHtmlElementWithClass('ul', 'toc-quiz-ul');
    quiz.forEach(function(quizEl){
      var quizLi = createHtmlElementWithClass('li', 'toc-quiz-li');
      quizLi.appendChild(createAnchorElement(getShortTitle(quizEl)));
      ul.appendChild(quizLi);
    });
    return ul;
  };
  
  var createLusUl = function(lus) {
    var ul = createHtmlElementWithClass('ul', 'toc-lu-ul');
    lus.forEach(function(lu) {
      var luLi = createHtmlElementWithClass('li', 'toc-lu-li');
      luLi.appendChild(createAnchorElement(getShortTitle(lu)));
      if(getTasks(lu).length !== 0)
        luLi.appendChild(createTasksUl(getTasks(lu)));
      if(getQuizzes(lu).length !== 0)
        luLi.appendChild(createQuizzesUl(getQuizzes(lu)));
      ul.appendChild(luLi);  
    });
    return ul;
  };
  
  var createExpPreamble = function() {
    var expEl = getExp(document);
    var expPreamble = createHtmlElementWithClass('div', 'exp-preamble');
    expPreamble.appendChild(createAnchorElement(getShortTitle(expEl)));
    return expPreamble;
  };
  
  var createTocHeader = function() {
    var tocHeader = createHtmlElementWithClass('div', 'toc-header');
    var title = createHtmlElementWithClass('span', 'title'); 
    title.innerHTML = 'Content';
    tocHeader.appendChild(createGlyphiconIcon('glyphicon-remove'));
    tocHeader.appendChild(title);
    tocHeader.addEventListener('click', function(){
      closeToc();
    });
    return tocHeader;
  };
  
  var buildToc = function() {
    var expEl = getExp(document);
    var tocDiv = getTocDiv();
    tocDiv.appendChild(createTocHeader());
    tocDiv.appendChild(createExpPreamble());  
    tocDiv.appendChild(createLusUl(getLus(expEl)));
  };
  
  var goAhead = function() {
    buildToc();
    collapseLearningUnits();
    openToc();
    registerOnClickHandler();
  };
  
  goAhead();
};
var registerOnClickHandler = function() {
  var tocDiv = getTocDiv();
  var tocEls = makeArray(tocDiv.getElementsByTagName('a'));
  tocEls.forEach(function(tocEl){
    var currentHash = tocEl.getAttribute('href').replace('#', '');
    tocEl.addEventListener('click', function(event) {
      changeState(currentHash);
      toggleLearningUnits(event.target);
    });
  });
};

var styleActiveTocEl = function(el) {
  var tocDiv = getTocDiv();
  var tocEls = makeArray(tocDiv.getElementsByTagName('a'));
  var activeEl = tocDiv.getElementsByClassName('toc-active-el')[0];
  if(activeEl)
    activeEl.classList.remove('toc-active-el');
  tocEls.forEach(function(tocEl){
    var tocElHref = tocEl.getAttribute('href').replace('#', '');
    if(tocElHref === el['title']) {
      tocEl.classList.add('toc-active-el');
      return;
    }
  });
};

var collapseLearningUnits = function() {
  var lusLis = getLusLi();
  lusLis.forEach(function(lusLi) {
    var aTag = lusLi.getElementsByTagName('a')[0];
    var icon = createGlyphiconIcon('glyphicon-triangle-bottom');
    if($(aTag).siblings().length > 0)
       aTag.appendChild(icon);
  });
  var tsksUl = getTasksUl();
  var quizzesUl = getQuizzesUl();
  tsksUl.forEach(function(tskUl) {
    tskUl.classList.add('collapse');
  });
  quizzesUl.forEach(function(quizUl){
    quizUl.classList.add('collapse');
  });
};

var toggleLearningUnits = function(el) {
  $(el).siblings().collapse('toggle');
};

var openToc = function() {
  var tocDiv = getTocDiv();
  var contentDiv = getContentDiv();
  tocDiv.style.width = '350px';
  contentDiv.style.marginLeft = '350px';
};

var closeToc = function() {
  var tocDiv = getTocDiv();
  var contentDiv = getContentDiv();
  tocDiv.style.width = 0;
  contentDiv.style.marginLeft = 0;
};

var getTocHeaderDiv = function() {
  return getObjByClassName(getTocDiv(), 'toc-header');
};

var getExpPreambleDiv = function() {
  return getObjByClassName(getTocDiv(), 'exp-preamble');
};

var getLusUl = function() {
  return getObjByClassName(getTocDiv(), 'toc-lu-ul');
};

var getLusLi = function() {
  return getObjsByClassName(getLusUl(), 'toc-lu-li');
};

var getLuTasksUl = function(obj) {
  return getObjByClassName(obj, 'toc-tsk-ul');
};  

var getLuQuizzesUl = function(obj) {
  return getObjByClassName(obj, 'toc-quiz-ul');
};  

var getTasksUl = function() {
  return getObjsByClassName(getLusUl(), 'toc-tsk-ul');
};

var getQuizzesUl = function() {
  return getObjsByClassName(getLusUl(), 'toc-quiz-ul');
};
