var getObjAttrValue = function(obj, attr) {
  if (obj.hasAttribute(attr))
    return obj.getAttribute(attr);
  else
    return null;
};

var getObjById = function(obj, id) {
  return document.getElementById(id);
};

var getObjsByClassName = function(obj, cls) {
  return makeArray(obj.getElementsByClassName(cls));
};

var getObjByClassName = function(obj, cls) {
  var clsObjs = getObjsByClassName(obj, cls);
  return clsObjs.filter(clsObj => {
    return (clsObj.parentElement.className == obj.className ||
            clsObj.parentElement.className == "");
  })[0];                       
};

var getInnerHtml = function(obj) {
  return obj.innerHTML;
};

var makeArray = function(obj) {
  return Array.from(obj);
};

var createGetObjs = function(type) {
  var fn = function(obj) {
    return getObjsByClassName(obj, type);
  };

  return fn;
};

var createGetObj = function(type) {
  var fn = function(obj) {
    return getObjByClassName(obj, type);
  };
  return fn;
};

var getArtefactType = function(obj) {
  return makeArray(obj.classList).filter(cls => cls != "art")[0];
};

var getObjType = function(obj) {
  var clsList = ["exp", "lu", "task", "quiz", "art", "preamble", "description", "art-body", "mcq", "choice", "explanation"];
  var objClsList = obj.classList;

  if (objClsList == undefined)
    objClsList = [];
  else
    objClsList = makeArray(objClsList);
  
  var result = objClsList.filter(cls => clsList.indexOf(cls) > -1);
  return result[0];
};

var createPred = function(type, typeFn) {
  var fn = function(obj) {
    return typeFn(obj) == type;
  };
  return fn;
};

var getExp = createGetObj("exp");
var getLus = createGetObjs("lu");
var getTasks = createGetObjs("task");
var getQuizzes = createGetObjs("quiz");
var getArtefacts = createGetObjs("art");
var getMcqs = createGetObjs("mcq");
var getChoices = createGetObjs("choice");
var getExplanation = createGetObj("explanation");

var getPreambles = createGetObjs("preamble");
var getPreamble = createGetObj("preamble");
var getArtBody = createGetObj("art-body");
var getDescription = createGetObj("description");

var getShortTitle = function(obj) {
  return getObjAttrValue(obj, "title");
};

var getLongTitle = function(obj) {
  var lTObj = getObjByClassName(obj, "longt");
  if(lTObj !== undefined) {
    var hElem = getObjByClassName(lTObj, "hlongt");
    return getInnerHtml(hElem);
  }
  else
    return undefined;
};

var getTitle = function(el) {
  var title;
  if(getLongTitle(el) !== undefined)
    title = getLongTitle(el);
  else 
    title = getShortTitle(el);
  return title;
};

var isExp = createPred("exp", getObjType);
var isLu = createPred("lu", getObjType);
var isTask = createPred("task", getObjType);
var isQuiz = createPred("quiz", getObjType);
var isArtefact = createPred("art", getObjType);
var isPreamble = createPred("preamble", getObjType);
var isMcq = createPred("mcq", getObjType);
var isChoice = createPred("choice", getObjType);
var isExplanation = createPred("explanation", getObjType);

var isTextArtefact = createPred("txt", getArtefactType);
var isImgArtefact  = createPred("img", getArtefactType);
var isVideoArtefact  = createPred("video", getArtefactType);
var isAudioArtefact  = createPred("audio", getArtefactType);
var isReqArtefact  = createPred("req", getArtefactType);
var isRefArtefact  = createPred("ref", getArtefactType);
var isChoiceCorrect = (obj) => {
  if (isChoice(obj)) {
    return getObjAttrValue(obj, "data-correct") === "true";
  } else {
    return false;
  }
};
