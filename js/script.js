
// Varablies
const button = document.getElementById("loadCon");
const cards = document.getElementById("cards");
const summary = document.getElementById("summary");
const error = document.getElementById("errorMessage");

var xhr = new XMLHttpRequest();

button.addEventListener("click", () => {

    error.textContent = "Loading..."

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


        // Clears the cards and summary to prevent duplication
        cards.innerHTML = "";
        summary.innerHTML = "";

        // Stores the consoles array
        const consoles = dataObj.consoles;

        // Will later store the oldest and newest consoles
        let oldest = consoles[0];
        let newest = consoles[0];

        // Loops through all the consoles
        for (let i = 0; i < consoles.length; i++) {

            // Looks at the current console and checks to see if it's year is less than what is currently being stored
            if (consoles[i].year < oldest.year) {
                // If yes then the new year gets stored in the oldest
                // If no then nothing happens
                oldest = consoles[i];
            }

            // Looks at the current console and checks to see if it's year is greater than what is currently being stored
            if (consoles[i].year > newest.year) {
                // If yes then the new year gets stored in the newest
                // If no then nothing happens
                newest = consoles[i];
            }
        }

        // Display the summary
        summary.textContent = `${consoles.length} consoles | Oldest: ${oldest.name} (${oldest.year}) | Newest: ${newest.name} (${newest.year})`;

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
            p.textContent = `${console.manufacturer} - ${console.year}`;

            // Combines the img, h2, and p vars with the empty card div
            card.appendChild(img);
            card.appendChild(h2);
            card.appendChild(p);

            // Combines the card div with the empty cards div
            cards.appendChild(card);
        });

        error.textContent = "";

    }
    else {
        error.textContent = `Error loading consoles. Status code: ${xhr.status}`;
    }
}