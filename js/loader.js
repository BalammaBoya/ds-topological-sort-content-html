var loadPromise= function(realEstate, tag) {
  var url = getUrl(tag);
  return new Promise((resolve, reject) => {
    tag.onload = function() {
      resolve(url);
    };
    tag.onerror = function() {
      reject(url);
    };
    realEstate.appendChild(tag);
  });
};

var loadScript = function(realEstate, url) {
  var script = createScriptTag(url);
  return loadPromise(realEstate, script);
};

var loadCss = function(realEstate, url) {
  var link = createCssTag(url);
  return loadPromise(realEstate, link);
};

var createHtmlElement = function(el) {
  var elem = document.createElement(el);
  return elem;
};

var createScriptTag = function(url){
  var script = createHtmlElement('script');
  script.type = "text/javascript";  
  script.src = url;
  return script;
};

var createCssTag = function(url){
  var cssTag = createHtmlElement('link');
  cssTag.rel = "stylesheet";
  cssTag.type = "text/css";
  cssTag.href = url; 
  return cssTag;
};

var get = function get(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest(url);
    req.open('GET', url);
    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = function() {
      reject(Error("network error"));
    };
    req.send();
  });
};

var loadTag = function(realEstate, type, resp, resource) {
  var parsedJson = JSON.parse(resp);
  var tag = null;
  if (type == 'css') {
    tag = createCssTag(parsedJson[type][resource]);
  } else {
    tag = createScriptTag(parsedJson[type][resource]);
  }
  return new Promise((resolve, reject) => {
    tag.onload = function() {
      console.log("Inside Resolve");
      console.log(tag);
      resolve(resp);
    };
    tag.onerror = function() {
      reject(tag);
    };
    console.log("Outside promise");
    console.log(tag);
    document[realEstate].appendChild(tag);
  });
};

var loader = () => {
  get('js/config.json')
    .then((resp) => loadTag('head', 'js', resp, 'jquery'))
    .then((resp) => loadTag('head', 'js', resp, 'utils'))
    .then((resp) => loadTag('head', 'css', resp, 'bootstrap'))
    .then((resp) => loadTag('head', 'css', resp, 'fontawesome'))
    .then((resp) => loadTag('head', 'css', resp, 'common'))
    .then((resp) => loadTag('head', 'css', resp, 'header'))
    .then((resp) => loadTag('head', 'css', resp, 'toc'))
    .then((resp) => loadTag('head', 'css', resp, 'content'))
    .then((resp) => loadTag('head', 'css', resp, 'artefacts'))
    .then((resp) => loadTag('head', 'css', resp, 'quiz'))
    .then((resp) => loadTag('body', 'js', resp, 'bootstrap'))
    .then((resp) => loadTag('body', 'js', resp, 'apis'))
    .then((resp) => loadTag('body', 'js', resp, 'artefacts-path'))
    .then((resp) => loadTag('body', 'js', resp, 'realization'))
    .then((resp) => loadTag('body', 'js', resp, 'layoutRenderer'))
    .then((resp) => loadTag('body', 'js', resp, 'headerRenderer'))
    .then((resp) => loadTag('body', 'js', resp, 'tocRenderer'))
    .then((resp) => loadTag('body', 'js', resp, 'contentRenderer'))
    .then((resp) => loadTag('body', 'js', resp, 'artefactsRenderer'))
    .then((resp) => loadTag('body', 'js', resp, 'quizRenderer'))
    .then((resp) => loadTag('body', 'js', resp, 'quizValidator'))
    .then(() => {
      layoutRenderer();
      headerRenderer();
      tocRenderer();
      contentRenderer();
    })
    .then(() => {
      console.log("All Loaded");
    })
    .catch(function(Error) {
      console.log(Error);
    });
};
loader();
