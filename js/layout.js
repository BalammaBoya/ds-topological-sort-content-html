var layoutRenderer = function() {
  var createWrapperDiv = createHtmlElem({tag:'div', name:'wrapper', type:'class'});
  
  var createHeaderDiv = createHtmlElem({tag:'div', name:'header', type:'class'});
  
  var createTocDiv  = createHtmlElem({tag:'div', name:'toc', type:'class'});
  
  var createCntDiv  = createHtmlElem({tag:'div', name:'content', type:'class'});
  
  var buildLayout = function() {
    var wrapperDiv = createWrapperDiv();
    var headerDiv = createHeaderDiv();
    var tocDiv = createTocDiv();
    var cntDiv = createCntDiv();
    wrapperDiv.appendChild(headerDiv);
    wrapperDiv.appendChild(tocDiv);
    wrapperDiv.appendChild(cntDiv);
    document.body.appendChild(wrapperDiv);
  };
    
  buildLayout();
};

var getWrapperDiv = () => {
  return getObjByClassName(document, "wrapper");
};

var getHeaderDiv = () => {
  return getObjByClassName(getWrapperDiv(), "header");
};

var getTocDiv = () => {
  return getObjByClassName(getWrapperDiv(), "toc");
};

var getContentDiv = () => {
  return getObjByClassName(getWrapperDiv(), "content");
};
