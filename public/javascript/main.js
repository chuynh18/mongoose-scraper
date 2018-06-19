"use strict";

const xhr = new XMLHttpRequest;

const scrape = function(section) {
    xhr.open("POST", `/scrape/${section}`, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}