
// Varablies
const button = document.getElementById("loadCon");
var xhr = new XMLHttpRequest();

button.addEventListener("click", () => {

    xhr.open("get", "https://ozarktechwebdev.com/api/consoles.json");
    xhr.send();

    // Waiting for the responce from the server
    xhr.onreadystatechange = request;


})

function request() {

    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = xhr.responseText;
        var responseObj = JSON.parse(response);
        console.log(responseObj);
    }
}