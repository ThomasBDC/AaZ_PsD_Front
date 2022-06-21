function loadFile(folder, fileName, target) {
    var r = new XMLHttpRequest();

    let url = "/"+folder+"/"+fileName+".html";
    r.open("GET", url, true);
    r.onreadystatechange = function () {
      if (r.readyState != 4 || r.status != 200) return;
      document.getElementById(target).innerHTML = r.responseText;
    };
    r.send();
}

window.addEventListener("DOMContentLoaded", (event) => {
    
    let queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    loadFile(urlParams.get("rep"), urlParams.get("fich"), "pageContent");
});