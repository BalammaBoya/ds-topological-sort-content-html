var scrollPageToTop = function() {
  document.documentElement.scrollTop = 0; 
};

var setNextElHref = function() {
  var nextHashPath;
  var tocDiv = getTocDiv();
  var tocDivHref = makeArray(tocDiv.getElementsByTagName('a'));
  for(var i = 0; i < tocDivHref.length; i++) {
    if(tocDivHref[i].classList.contains('toc-active-el')) {
      if(tocDivHref.indexOf(tocDivHref[i]) === tocDivHref.length-1) 
        nextHashPath = tocDivHref[i].getAttribute('href');
      else 
        nextHashPath = tocDivHref[i+1].getAttribute('href');
      break;
    }
  }
  return nextHashPath;
};

var setPrevElHref = function() {
  var prevHashPath;
  var tocDiv = getTocDiv();
  var tocDivHref = makeArray(tocDiv.getElementsByTagName('a'));
  for(var i = 0; i < tocDivHref.length; i++) {
    if(tocDivHref[i].classList.contains('toc-active-el')) {
      if(tocDivHref.indexOf(tocDivHref[i]) > 0) 
        prevHashPath = tocDivHref[i-1].getAttribute('href');
      else 
        prevHashPath = tocDivHref[i].getAttribute('href');
      break;
    }
  }
  return prevHashPath;
};

var createPrevEl = function() {
  var prevEl = createHtmlElementWithClass('a', 'prev');
  prevEl.appendChild(createGlyphiconIcon('glyphicon-menu-left'));
  prevEl.href = setPrevElHref();
  prevEl.title = 'Previous';
  prevEl.addEventListener('click', function() {
    var currentHash = this.getAttribute('href').replace('#', '');
    changeState(currentHash);
  });
  return prevEl;
};

var createNextEl = function() {
  var nextEl = createHtmlElementWithClass('a', 'next');
  nextEl.appendChild(createGlyphiconIcon('glyphicon-menu-right'));
  nextEl.title = 'Next';
  nextEl.href = setNextElHref();
  nextEl.addEventListener('click', function() {    
    var currentHash = this.getAttribute('href').replace('#', '');
    changeState(currentHash);
  });
  return nextEl;
};

var clearCurrentCnt = function() {
  var cntDiv = getContentDiv();
  if(cntDiv !== null) 
    cntDiv.innerHTML = '';
};

var changeState = function(hashPath) {
  var els = makeArray(document.getElementsByTagName('*'));
  els.forEach(function(el) {
    if(el['title'] === hashPath) {
      if(isExp(el) || isLu(el) || isTask(el)) 
        artfctsRenderer(el);
      if(isQuiz(el)) 
        quizRenderer(el);
    }
  });
};


var contentRenderer = function() {  
  var setCurrentState = function() {
    var currentHash = decodeURI(getWindowHashPath());
    if(currentHash === '') {
      var expEl = getExp(document);
      currentHash = getShortTitle(expEl);
      navigate(currentHash);
    }
    changeState(currentHash);
  };
  
  setCurrentState();
};
