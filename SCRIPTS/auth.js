function connectuser(){
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
                alert("Connexion impossible");
                return response;
            }
        })
        .then(reponse => {
            console.log("Token JWT :"+reponse);
        })
        .catch(error =>{
            alert(error);
        });
}