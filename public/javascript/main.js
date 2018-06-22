"use strict";

// this is JavaScript for the front-end

// will use this in several functions to hit up the server
const xhr = new XMLHttpRequest;

// === makes it so clicking "scrape" does HTTP GET on the appropriate route ===
const scrape = function() {
    window.location.href = `/scrape/${document.getElementById("scrapeSection").value}`;
}

// === makes it so the dropdown menu autoselects the section that's currently being scraped ===
const path = window.location.pathname;
// because "/scrape/" is 8 characters long.  this would only be the active route
// if you're scraping the NYT home page, and since the 0 index of the dropdown is
// for scraping the home page, we don't need to take any action on the dropdown
if (path.length > 8) {
    const currentLocation = path.slice(8);
    const selector = document.getElementById("scrapeSection");

loop:
    for (let i = 1; i < selector.length; i++) {
        if (currentLocation === selector.children[i].value) {
            selector.selectedIndex = i;
            break loop;
        }
    }
}

// === function for saving an article ===
const saveArticle = function(event) {
    document.getElementById("noteSubmit").removeAttribute("disabled");
    document.getElementById("noteSubmit").setAttribute("value", "Save article");   
    document.getElementById("titleModal").textContent = `Title: ${event.target.getAttribute("title")}`;
    document.getElementById("urlModal").innerHTML = `URL: <a href=${event.target.getAttribute("link")}>${event.target.getAttribute("link")}</a>`;
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteBody").value = "";
    modal.style.display = "block";
}

const finalSaveArticle = function() {
    xhr.onload = () => {
        console.log(xhr.response);
        let response = JSON.parse(xhr.response);

        if (!!response.errmsg) {
            console.log("duplicate detected");
            document.getElementById("msgArea").textContent = response.errmsg;
            document.getElementById("noteSubmit").setAttribute("disabled", "");
            document.getElementById("noteSubmit").setAttribute("value", "Article already saved");
        }
        else if (!!response.link) {
            xhr.open("POST", `/article/${response._id}`, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(`title=${document.getElementById("noteTitle").value.trim()}&body=${document.getElementById("noteBody").value.trim()}`);
        }
        else if (!!response.body) {
            document.getElementById("msgArea").textContent = "Article has been saved.";
            document.getElementById("noteSubmit").setAttribute("disabled", "");
            document.getElementById("noteSubmit").setAttribute("value", "Article saved");
        }
    }

    xhr.open("POST", "/articles", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`title=${document.getElementById("titleModal").textContent}&link=${document.getElementById("urlModal").textContent}`);
}

// === Attach event handlers to save article buttons ===
const saveButtons = document.getElementsByClassName("saveArticle");
for (let i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener("click", saveArticle);
}

// === modal close logic ===
const modal = document.getElementById("saveArticleModal");
const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}