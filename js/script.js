
// Varablies
const button = document.getElementById("loadCon");
const cards = document.getElementById("cards");

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
        var dataObj = JSON.parse(response);
        console.log(dataObj);


        // Clears the cards to prevent duplication
        cards.innerHTML = "";

        // Loop through each console
        dataObj.consoles.forEach((console) => {

            // Creates an empty div tag
            const card = document.createElement("div");

            // Creates an empty img tag
            const img = document.createElement("img");
            // Fills the img's src with the console imgage var
            img.src = console.image;
            // Fills the img's alt text with the console name var
            img.alt = console.name;

            // Creates an empty h2 tag
            const h2 = document.createElement("h2");
            // Fills the h2's text with the console name var
            h2.textContent = console.name;

            // Creates an empty p tag
            const p = document.createElement("p");
            // Fills the p's text with the console manufacturer and year vars
            p.textContent = console.manufacturer + " - " + console.year;

            // Combines the img, h2, and p vars with the empty card div
            card.appendChild(img);
            card.appendChild(h2);
            card.appendChild(p);

            // Combines the card div with the empty cards div
            cards.appendChild(card);
        });
    }
}