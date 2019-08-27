var headerRenderer = function() {
  var createSocialHandlersUl = function() {
    var socialIcons =
        {'fa-gitlab':'http://gitlab.com/vlead-projects',
         'fa-twitter':'https://twitter.com/TheVirtualLabs',
         'fa-facebook':'https://www.facebook.com/Virtual-Labs-IIT-Delhi-301510159983871/'
        };
    var ul = createHtmlElementWithClass('ul', 'social-handlers');
    for(var socialIcon in socialIcons) {
      var li =  createHtmlElement('li');
      var aTag = createHtmlElement('a');
      aTag.setAttribute('href', socialIcons[socialIcon]);
      aTag.setAttribute('target', '_blank');
      var icon = createFontIcon(socialIcon);
      aTag.appendChild(icon);
      li.appendChild(aTag);
      ul.appendChild(li);
    }
    return ul;
  };
  
  var createExpTitle = function() {
    var expEl = getExp(document);
    var expTitle = createHtmlElementWithClass('h1', 'exp-title');
    expTitle.innerHTML = getShortTitle(expEl);
    return expTitle;
  };
  
  var createLogo = function() {
    var logo = createImgElement('images/vlabs-logo.png', 'vlabs logo');
    logo.classList.add('vlabs-logo');
    var logoLink = createHtmlElementWithClass('a', 'logo-link');
    logoLink.setAttribute('href', 'https://vlabs.ac.in');
    logoLink.setAttribute('target', '_blank');
    logoLink.appendChild(logo);
    return logoLink;
  };
  
  var createTocHamburgerMenu = function() {
    var tocMenu = createFontIcon('fa-bars');
    tocMenu.classList.add('toc-menu');
    tocMenu.addEventListener('click', function(){
      openToc();
    });
    return tocMenu;
  };
  
  var createNavbar = function() {
    var navbar = createHtmlElementWithClass('nav', 'navbar');
    var containerDiv = createHtmlElementWithClass('div', 'container-fluid');
    containerDiv.appendChild(createTocHamburgerMenu());
    containerDiv.appendChild(createLogo());
    containerDiv.appendChild(createExpTitle());
    containerDiv.appendChild(createSocialHandlersUl());
    navbar.appendChild(containerDiv);
    return navbar;
  };
  
  var buildHeader = function() {
    var headerDiv = getHeaderDiv();
    headerDiv.appendChild(createNavbar());
  };
  
  buildHeader();
};
