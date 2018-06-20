"use strict";

// this is JavaScript for the front-end

const xhr = new XMLHttpRequest;

const scrape = function() {
    const section = document.getElementById("scrapeSection").value;
    xhr.open("POST", `/scrape/${section}`, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

xhr.onload = (response) => {
    console.log(JSON.parse(response.target.response));
}