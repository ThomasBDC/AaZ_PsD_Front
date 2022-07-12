function connectuser(){
    showLoader();
    //récupérer mon formulaire
    var myForm = document.getElementById("loginForm");
    let formObj = new FormData(myForm);

    const headers = new Headers();
        headers.append("Content-Type", "application/json;charset=UTF-8")
    
    const body = JSON.stringify({
        Username: formObj.get('username'),
        Password: formObj.get('password')
    }); 

    const init = {
        method: 'POST', 
        headers: headers,
        body: body
    };

    const urlRequete = 'https://aazpsd.azurewebsites.net/Login'
    
    fetch(urlRequete, init)
        .then(response => {
            if(response.status == 200){
                return response.text();
            }
            else{
                hideLoader();
                alert("Connexion impossible");
                return response;
            }
        })
        .then(reponse => {
            saveToken(reponse);
            redirectToHome()
        })
        .catch(error =>{
            alert(error);
        });
}

function saveToken(token){
    localStorage.setItem('token', token);
}

function getToken(){
    return localStorage.getItem('token');
}

function isAuthenticated(){
    let token = getToken();

    let tokenDecode = parseJwt(token);
    if(tokenDecode == undefined){
        localStorage.setItem('token', '');
        return false;
    }
    if (tokenDecode.exp < new Date()/1000) {
        localStorage.setItem('token', '');
        return false;
    }
    else{
        return true;
    }
}

function parseJwt(token) {
    if(token != ''){
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
    else{
        return undefined;
    }
};

function Disconnect(){
    //Ici on pourrait demander à l'api de faire une déconnexion
    //Pour rendre le token invalide
    localStorage.setItem('token', '');
    redirectToHome();
}