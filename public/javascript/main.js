"use strict";

// this is JavaScript for the front-end

// will use this in several functions to hit up the server
const xhr = new XMLHttpRequest;
let lastClickedButton;

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

// === function for populating and opening save article modal ===
const saveArticle = function(event) {
    lastClickedButton = event.target;
    document.getElementById("noteSubmit").removeAttribute("disabled");
    document.getElementById("noteSubmit").setAttribute("value", "Save article");   
    document.getElementById("titleModal").textContent = `Title: ${lastClickedButton.getAttribute("title")}`;
    document.getElementById("urlModal").innerHTML = `URL: <a href=${lastClickedButton.getAttribute("link")}>${lastClickedButton.getAttribute("link")}</a>`;
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteBody").value = "";
    document.getElementById("msgArea").textContent = "";
    modal.style.display = "block";
}

// === function for saving article to MongoDB and also adding notes ===
const finalSaveArticle = function() {
    xhr.onload = () => {
        let response = JSON.parse(xhr.response);
        console.log(response);

        if (!!response.errmsg) {
            document.getElementById("msgArea").textContent = response.errmsg;
            document.getElementById("noteSubmit").setAttribute("disabled", "");
            document.getElementById("noteSubmit").setAttribute("value", "Article already saved");
            lastClickedButton.setAttribute("disabled", "");
            lastClickedButton.textContent = "Article saved";
        }
        else if (!!response.link && !response.note) {
            xhr.open("POST", `/article/${response._id}`, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(`title=${document.getElementById("noteTitle").value.trim()}&body=${document.getElementById("noteBody").value.trim()}`);
        }
        else if (!!response.note) {
            document.getElementById("msgArea").textContent = "Article has been saved.";
            document.getElementById("noteSubmit").setAttribute("disabled", "");
            document.getElementById("noteSubmit").setAttribute("value", "Article saved");
            lastClickedButton.setAttribute("disabled", "");
            lastClickedButton.textContent = "Article saved";
        }
    }

    xhr.open("POST", "/articles", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`title=${lastClickedButton.getAttribute("title")}&link=${lastClickedButton.getAttribute("link")}`);
}

// function for viewing saved articles' notes
var viewNotes = function(event) {
    xhr.onload = () => {
        let response = JSON.parse(xhr.response);
        console.log(response);
        if (!!response.link) {
            document.getElementById("notesArticleTitle").textContent = `Title: ${response.title}`;
            document.getElementById("notesArticleUrl").innerHTML = `URL: <a href=${response.link}>${response.link}</a>`;
            if (!!response.note.body) {
                document.getElementById("notesTitle").value = response.note.title;
                document.getElementById("notesBody").value = response.note.body;
                document.getElementById("notesSubmit").setAttribute("noteID", response._id);
            }
            modal2.style.display = "block";
        }
        
    }

    xhr.open("GET", `/article/${event.target.id}`, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

var saveNotes = function() {
    xhr.open("POST", `/article/${document.getElementById("notesSubmit").getAttribute("noteid")}`, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`title=${document.getElementById("notesTitle").value.trim()}&body=${document.getElementById("notesBody").value.trim()}`);
}

// === Attach event handlers to save article buttons ===
const saveButtons = document.getElementsByClassName("saveArticle");
for (let i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener("click", saveArticle);
}

// === Attach event handlers to notes buttons ===
const noteButtons = document.getElementsByClassName("addModifyNotes");
for (let i = 0; i < noteButtons.length; i++) {
    noteButtons[i].addEventListener("click", viewNotes);
}

// === modal close logic ===
const modal = document.getElementById("saveArticleModal");
const modal2 = document.getElementById("notesModal");
const span = document.getElementsByClassName("close")[0];
const span2 = document.getElementsByClassName("close")[1];

span.onclick = function() {
    modal.style.display = "none";
}

span2.onclick = function() {
    modal2.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}