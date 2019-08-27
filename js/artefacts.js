var getPublishedArtUrl = function(artfctUrl) {
  var pattern = /^(http|https)/;
  if(!pattern.test(artfctUrl)) 
    return ARTEFACTS_URL + artfctUrl;
  else
    return artfctUrl; 
};

var filterArtfcts = function(el) {
  var artfctsList;
  if(isTask(el) || isExplanation(el)) 
    artfctsList = getArtefacts(el);
  else
    artfctsList = getArtefacts(getPreamble(el));
  return artfctsList;
};

var getTypeOfVideo = function(url) {
  var youtubeRegExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if(url.match(youtubeRegExp))
    return 'youtube';
  else
    return 'html5Video';
};

var renderVideoArt = function(art, url, artfctCntInnerDiv) {
  var videoType = getTypeOfVideo(url);
  if(videoType == "youtube") {
    var iframeArt = createIframe(url).outerHTML; 
    artfctCntInnerDiv.appendChild(createArtfct('box-vid', art, iframeArt));
  }
  else {
    var videoArt = createVideoSrc(getPublishedArtUrl(url)).outerHTML;
    artfctCntInnerDiv.appendChild(createArtfct('box-vid', art, videoArt));
  }
};

var renderImgArt = function(artfctCntInnerDiv, artfct, url, imgWidth, imgHeight) {
  var imgArt = createImgElement(getPublishedArtUrl(url), imgWidth, imgHeight);
  artfctCntInnerDiv.appendChild(createArtfct('box-img', artfct, imgArt.outerHTML));
};

var createInteractiveJS = function(artfctCntInnerDiv, realization){
  var func = String(realization.creator + "()" + "." + realization.api);
  var tdiv = document.createElement("div");
  tdiv.id = "showjs";
  artfctCntInnerDiv.appendChild(tdiv);
  eval(func)(tdiv);
};

var insertJs = function(jsList, boxInnerDiv) {
  jsList.forEach(function(js) {
    var url = getPublishedArtUrl(js);
    loadScript(boxInnerDiv, url);
  });
};

var insertCss = function(cssList, boxInnerDiv) {
  cssList.forEach(function(css) {
    var url = getPublishedArtUrl(css);
    loadCss(boxInnerDiv, url);
  });         
};

var renderInteractiveJs = function(boxInnerDiv, realization) {
  Promise.all([
    insertCss(realization.url["css"], boxInnerDiv),
    insertJs(realization.url["js"], boxInnerDiv)
  ]).then(function() {
    createInteractiveJS(boxInnerDiv, realization);
  }).catch(function(Error) {
    console.log(Error);
  });
};

var createBoxLayout = function(cls) {
  var box = createHtmlElementWithClass('div', cls);
  var boxHead = createHtmlElementWithClass('h3', 'box-head');
  var boxInnerDiv = createHtmlElementWithClass('div', 'box-inner');
  box.appendChild(boxHead);
  box.appendChild(boxInnerDiv);
  return box;
};

var createArtfct = function(cls, artfct, artfctCnt) { 
  var box = createBoxLayout(cls);
  box.getElementsByClassName('box-head')[0].id = getShortTitle(artfct);
  box.getElementsByClassName('box-head')[0].innerHTML = getTitle(artfct);
  box.getElementsByClassName('box-inner')[0].innerHTML = artfctCnt;
  return box;
};

var displayArtfcts = function(el) {
  var artfctCntDiv = createHtmlElementWithClass('div', 'artfct-cnt');
  var artfctCntHeadDiv = createHtmlElementWithClass('div', 'artfct-cnt-head');
  artfctCntHeadDiv.innerHTML = getTitle(el);
  var artfctCntInnerDiv = createHtmlElementWithClass('div', 'artfct-cnt-inner');
  artfctCntDiv.appendChild(artfctCntHeadDiv);
  artfctCntDiv.appendChild(artfctCntInnerDiv);

  var artfcts = filterArtfcts(el);
  artfcts.forEach(function(artfct) {
    if(isTextArtefact(artfct)) {
      let artfctCnt = getInnerHtml(getArtBody(artfct));
      artfctCntInnerDiv.appendChild(createArtfct('box-txt', artfct, artfctCnt));   
    }
    if(isImgArtefact(artfct)) {
      let artfctCnt = getArtBody(artfct);
      let img = artfctCnt.getElementsByTagName('img')[0];
      let url = img.getAttribute('src');
      let imgWidth = img.getAttribute('width');
      let imgHeight = img.getAttribute('height');
      renderImgArt(artfctCntInnerDiv, artfct, url, imgWidth, imgHeight);
    }
    if(isVideoArtefact(artfct)){
      let artfctCnt = getArtBody(artfct);
      var video = artfctCnt.getElementsByTagName('video')[0];
      var url = video.getAttribute('src');
      renderVideoArt(artfct, url, artfctCntInnerDiv);
    }
    if(isReqArtefact(artfct)){
      var realizationArt = realizationCatalog[getShortTitle(artfct)];
      if(realizationArt === undefined){
        var artfctCnt = getInnerHtml(getDescription(artfct));
        artfctCntInnerDiv.appendChild(createArtfct('box-unrealized', artfct, artfctCnt));
      }
      if(realizationArt !== undefined){
        let realizationType = realizationArt.resource_type;
        if(realizationType.toLowerCase() === 'image'){
          let url = realizationArt.url;
          let imgWidth = realizationArt.width;
          let imgHeight = realizationArt.height;
          renderImgArt(artfctCntInnerDiv, artfct, url, imgWidth, imgHeight);
        }
        if(realizationType.toLowerCase() === 'video'){
          let url = realizationArt.url;
          renderVideoArt(artfct, url, artfctCntInnerDiv);
        }
        if(realizationType.toLowerCase() === 'html'){
          let url = ARTEFACTS_URL + realizationArt.url;
          artfctCntInnerDiv.appendChild(createArtfct('box-int', artfct, createIframe(url).outerHTML));
        }
        if(realizationType.toLowerCase() === 'interactivejs'){
          let box = createBoxLayout('box-int');
          box.id = getShortTitle(artfct);
          box.getElementsByClassName('box-head')[0].innerHTML = getTitle(artfct);
          artfctCntInnerDiv.appendChild(box);
          let boxInnerDiv = box.getElementsByClassName('box-inner')[0];
          renderInteractiveJs(boxInnerDiv, realizationArt);
        }
      }
    }
  });
  return artfctCntDiv;
};

var onLoadHighlightNavbarEl = function() {
  var artfctsUl = getArtfctsNavbarUl(); 
  var artfctLi = getObjByClassName(artfctsUl, 'artfcts-navbar-li');
  var artfctLiHref = artfctLi.getElementsByTagName('a')[0]; 
  artfctLiHref.classList.add('active-artfct');
};

var onclickHighlightNavbarEl = function(clicked_el) {
  var artfctsUl = getArtfctsNavbarUl();
  var activeEl = artfctsUl.getElementsByClassName('active-artfct')[0];
  activeEl.classList.remove('active-artfct');
  clicked_el.classList.add('active-artfct');
};   

var createArtfctsUl =  function(artfcts) {
  var artfctsUl = createHtmlElementWithClass('ul','artfcts-navbar-ul');
  artfctsUl.classList.add('nav');
  artfctsUl.classList.add('navbar-nav');
  artfcts.forEach(function(artfct) {
    var artfctLi = createHtmlElementWithClass('li','artfcts-navbar-li');      
    var artfctLiHref = createAnchorElement(getShortTitle(artfct)); 
    artfctLi.appendChild(artfctLiHref);
    artfctLiHref.addEventListener('click', function(event){
      onclickHighlightNavbarEl(this);
    });
    artfctsUl.appendChild(artfctLi);
  });
  return artfctsUl;
};

var createArtfctsNavbar = function(exp_el) {
  var artfctsNavbarDiv = createHtmlElementWithClass('div', 'artfcts-navbar');
  var navbar = createHtmlElementWithClass('nav', 'navbar');
  navbar.classList.add('navbar-default');    
  var container = createHtmlElementWithClass('div', 'container-fluid');	
  container.appendChild(createArtfctsUl(filterArtfcts(exp_el)));
  navbar.appendChild(container);
  artfctsNavbarDiv.appendChild(navbar);
  return artfctsNavbarDiv;
};

var buildCnt = function(exp_el) {
  var cntDiv = getContentDiv();
  cntDiv.appendChild(createArtfctsNavbar(exp_el));
  cntDiv.appendChild(displayArtfcts(exp_el));
  cntDiv.appendChild(createPrevEl());
  cntDiv.appendChild(createNextEl());
};

var artfctsRenderer = function(exp_el) {  
  scrollPageToTop();  
  styleActiveTocEl(exp_el);
  clearCurrentCnt();
  buildCnt(exp_el);
  onLoadHighlightNavbarEl();
};

var getArtfctsNavBarDiv = function() {
  return getObjByClassName(getContentDiv(), 'artfcts-navbar');
};

var getArtfctsNavBar = function() {
  return getObjByClassName(getArtfctsNavBarDiv(), 'navbar');
};

var getArtfctsNavbarContainer = function() {
  return getObjByClassName(getArtfctsNavBar(), 'container-fluid');
}; 

var getArtfctsNavbarUl = function() {
  return getObjByClassName(getArtfctsNavbarContainer(), 'artfcts-navbar-ul');
}; 

var getArtfctsCntDiv = function() {
  return getObjByClassName(getContentDiv(), 'artfcts-cnt');
};
