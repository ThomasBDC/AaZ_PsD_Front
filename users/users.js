export function init(){
    let myHeaders = new Headers();
    let token = getToken();
    myHeaders.append("Authorization", "Bearer "+token);
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch("https://aazpsd.azurewebsites.net/api/Users", requestOptions)
      .then(response => response.json())
      .then(result => {
        let tableBody = '';
        result.forEach(utilisateur => {
            tableBody += `
                <tr>
                    <td>${utilisateur.surname}</td>
                    <td>${utilisateur.forename}</td>
                    <td>${utilisateur.mail}</td>
                    <td>${utilisateur.telephone}</td>
                    <td>${utilisateur.dateEmbauche}</td>
                    <td>${utilisateur.role.name}</td>
                </tr>
            `;
        });
        document.getElementById("userTableBody").innerHTML =tableBody;
        setSearchOn();
        hideLoader();

      })
      .catch(error => console.log('error', error));
}

function setSearchOn(){
  document.getElementById("btn-search-user").addEventListener("click", Search);
}

function Search(){
  showLoader();
  let search = document.getElementById("rechercheUser").value;
  let myHeaders = new Headers();
    let token = getToken();
    myHeaders.append("Authorization", "Bearer "+token);
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch("https://aazpsd.azurewebsites.net/api/Users/Search?searchLabel="+search, requestOptions)
    .then(response => response.json())
    .then(result => {
      let tableBody = '';
      result.forEach(utilisateur => {
          tableBody += `
              <tr>
                  <td>${utilisateur.surname}</td>
                  <td>${utilisateur.forename}</td>
                  <td>${utilisateur.mail}</td>
                  <td>${utilisateur.telephone}</td>
                  <td>${utilisateur.dateEmbauche}</td>
                  <td>${utilisateur.role.name}</td>
              </tr>
          `;
      });
      if(tableBody == ''){
        document.getElementById("userTableBody").innerHTML = `
          <tr>
            <td class="text-center text-danger" colspan="6">Aucun résultat</td>
          </tr>`;
      }
      else{
        document.getElementById("userTableBody").innerHTML = tableBody;
      }
      hideLoader();
    })
    .catch(error => {
      console.log('error', error)
      hideLoader();
    });
}