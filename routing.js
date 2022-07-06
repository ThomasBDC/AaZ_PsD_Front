const pageLoadEventName = "PageLoadEvent";
const userIcon = document.getElementById('user-icon');
const buttonConnection = document.getElementById('Button-connection');
const navbarBrand = document.querySelector('.navbar-brand');
const loadingModal = new bootstrap.Modal('#LoadingModal', {
  keyboard:false,
  backdrop: 'static'
})

window.addEventListener('DOMContentLoaded', (event) => {
  //loadingModal.show();
  let queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  //Si j'ai des paramètres je récupère mon fichier
  loadFile(urlParams.get('rep'), urlParams.get('fich'));

  window.addEventListener(pageLoadEventName, (e) => {
    const pageName = e.detail.folder+'_'+e.detail.fileName;
    switch (pageName){
        case "home_home":
          homePage();
          break;
        case "connexion_connexion":
          onlyUserNotConnected();
          connexionPage();
          break;
        case "connexion_forget_pwd_connexion_forget_pwd":
          onlyUserNotConnected();
          pwdForgottenPage();
          break;
        default:
          alert("Pas de script implémenté pour cette page");
          break;
    }
    let lienConnexion = document.querySelectorAll(".lienConnexion");
    let lienConnected = document.querySelectorAll(".lienConnected");

    if(isAuthenticated()){
      lienConnexion.forEach(element => {
        element.style.display = 'none';
      });
    }
    else{
      lienConnected.forEach(element => {
        element.style.display = 'none';
      });
    }
    
  });
  // setTimeout(() => {
  //   loadingModal.hide();
  // }, "500")
});

const connexionPage = () => {
  addCssToFile('connexion', 'connexion');
};

const homePage = () => {
  addCssToFile('home', 'home');
};

const pwdForgottenPage = () => {
  addCssToFile('connexion_forget_pwd', 'connexion_forget_pwd');
};

//Pour ajouter du CSS à la page
function addCssToFile(folder, fileName){
  // Create new link Element CSS + Set Attributes for Link CSS Element
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = './'+folder+'/'+fileName+'.css';

  document.querySelector('head').appendChild(link);

}

//Pour charger un fichier HTML
function loadFile(folder, fileName, target = "pageContent") {

  if(folder == null || folder == undefined){
    folder = "home";
  }
  if(fileName == null || fileName == undefined){
    fileName = "home";
  }

  var r = new XMLHttpRequest();
  let url = '/' + folder + '/' + fileName + '.html';
  r.open('GET', url, true);
  r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return;
    //J'ai chargé mon HTMl
    document.getElementById(target).innerHTML = r.responseText;
    //Mon HTML est visible sur la page
    const pageLoad = new CustomEvent(pageLoadEventName, {
      detail: {
        folder: folder,
        fileName: fileName
      }
    });
    window.dispatchEvent(pageLoad);
  };
  r.send();
}

//Si user pas connecté, on ne fait rien
//Si user connecté, on redirige vers la page d'accueil
function onlyUserNotConnected(){
  if(isAuthenticated()){
    redirectToHome()
  }
  else{
    //on ne fait rien
  }
}

//Si user connecté, on ne fait rien
//Si user non connecté, on redirige vers la page de connexion
function onlyUserConnected(){
  if(!isAuthenticated()){
    window.location.replace("/index.html?rep=connexion&fich=connexion");
  }
  else{
    //on ne fait rien
  }
}

function redirectToHome(){
  window.location.replace("/index.html?rep=home&fich=home");
}