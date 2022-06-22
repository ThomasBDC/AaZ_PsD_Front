const userIcon = document.getElementById('user-icon');
const navbarBrand = document.querySelector('.navbar-brand');

function loadFile(folder, fileName, target) {
  var r = new XMLHttpRequest();

  let url = '/' + folder + '/' + fileName + '.html';
  r.open('GET', url, true);
  r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return;
    document.getElementById(target).innerHTML = r.responseText;
    handleLinkPwdForgotten();
  };
  r.send();
}

window.addEventListener('DOMContentLoaded', (event) => {
  let queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // loadFile(urlParams.get('rep'), urlParams.get('fich'), 'pageContent');
  // loadFile('theatres', 'alltheatres', 'pageContent');
  // loadFile('connexion', 'connexion', 'pageContent');
  homePage();
});

const connexionPage = () => {
  loadFile('connexion', 'connexion', 'pageContent');
  const headLink = document.querySelectorAll('head link');
  headLink[headLink.length - 1].href = './connexion/connexion.css';
};

const homePage = () => {
  loadFile('home', 'home', 'pageContent');
  // Create new link Element CSS + Set Attributes for Link CSS Element
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = './home/home.css';

  document.querySelector('head').appendChild(link);
};

const pwdForgottenPage = () => {
  loadFile('connexion_forget_pwd', 'connexion_forget_pwd', 'pageContent');
};

const handleLinkPwdForgotten = () => {
  pwdForgottenLink = document.getElementById('pwd_forgotten_link');
  pwdForgottenLink.addEventListener('click', pwdForgottenPage);
};

userIcon.addEventListener('click', connexionPage);
navbarBrand.addEventListener('click', homePage);
