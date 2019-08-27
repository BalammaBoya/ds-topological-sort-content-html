var navigate = function(path) {
  var current = window.location.href;
  window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
};

var getWindowHashPath = function() {
  return location.hash.substring(1);
};

var getUrl = function(el) {
  var url;
  if(el.type == "text/css")
     url = el.href;
  else if(el.type == "text/javascript")
     url = el.src;
  return url;
};


var createHtmlElement = function(el) {
  var elem = document.createElement(el);
  return elem;
};

var createHtmlElementWithClass = function(el, cls) {
  var elem = createHtmlElement(el);
  elem.className = cls;
  return elem;
};

var createHtmlElementWithId = function(el, id) {
  var elem = createHtmlElement(el);
  elem.id = id;
  return elem;
};

var createHtmlElem = (args) => {
  var fn;
  if (args['type'] == "class") {
    fn = (tag, cls) => {
      return createHtmlElementWithClass(args['tag'], args['name']);
    };
  } else {
    fn = (tag, cls) => {
      return createHtmlElementWithId(args['tag'], args['name']);
    };
  }
  return fn;
};

var createAnchorElement = function(txt) {
  var aTag = createHtmlElement('a');
  aTag.href = '#'+txt;
  aTag.innerHTML = txt;
  return aTag;
};

var createImgElement = function(url, imgAlt='', imgWidth='', imgHeight='') {
  var imgTag = createHtmlElement("img");
  imgTag.src = url;
  imgTag.alt = imgAlt;
  imgTag.style.width = imgWidth;
  imgTag.style.height = imgHeight;
  return imgTag;
};

var createIframe = function(url) {
  var iframeTag = document.createElement("iframe");
  iframeTag.src = url;
  return iframeTag;
};

var createVideoSrc = function(url) {
  var vidTag = createHtmlElement("video");
  vidTag.setAttribute("controls", "");
  var sourceTag = createHtmlElement("source");
  sourceTag.setAttribute("src", url);
  sourceTag.setAttribute("type", "video/mp4");
  vidTag.appendChild(sourceTag);
  return vidTag;
};

var createGlyphiconIcon = function(icon) {
  var el = createHtmlElementWithClass('span', 'glyphicon');
  el.classList.add(icon);
  return el;
};

var createFontIcon = function(icon) {
  var el = createHtmlElementWithClass('i', 'fa');
  el.classList.add(icon);
  return el;
};

var createRadioElement = function(choiceName, choiceVal) {
  var radioInput = createHtmlElement('input');
  radioInput.setAttribute('type', 'radio');
  radioInput.setAttribute('name', choiceName);
  radioInput.setAttribute('value', choiceVal);
  return radioInput;
};
