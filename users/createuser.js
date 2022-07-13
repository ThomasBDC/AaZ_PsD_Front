export function init(){
    setCreateUserOn();
}

function setCreateUserOn(){
    document.getElementById("CreateUserButton").addEventListener("click", CreateUser);
}

function CreateUser(){
    let myForm = document.getElementById("createUserForm");
    let formObj = new FormData(myForm);

    const headers = new Headers();
    headers.append("Content-Type", "application/json;charset=UTF-8")
    let token = getToken();
    headers.append("Authorization", "Bearer "+token);
    
    const body = JSON.stringify({
        Surname: formObj.get('Surname'),
        Forename: formObj.get('Forename'),
        Mail: formObj.get('Mail'),
        Password: formObj.get('Password'),
        Telephone: formObj.get('Telephone'),
        DateEmbauche: formObj.get('DateEmbauche'),
        Role: {
            IdRole: +(formObj.get('Role.IdRole'))
        }
    }); 

    const init = {
        method: 'POST', 
        headers: headers,
        body: body
    };
    
    const urlRequete = "https://aazpsd.azurewebsites.net/Signup";

    fetch(urlRequete, init)
        .then(response => {
            if(response.status == 201){
                return response.json();
            }
            else{
                alert("Une erreur est survenue");
                return response;
            }
        })
        .then(element => {
            redirectToHome();
        })
        .catch(error =>{
            alert(error);
        });
}