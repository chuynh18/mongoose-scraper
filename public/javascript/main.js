"use strict";

// this is JavaScript for the front-end

// makes it so clicking "scrape" does HTTP GET on the appropriate route
const scrape = function() {
    window.location.href = `/scrape/${document.getElementById("scrapeSection").value}`;
}

// makes it so the dropdown menu autoselects the section that's currently being scraped
const path = window.location.pathname;
// because "/scrape/" is 8 characters long.  this would only be the active route
// if you're scraping the NYT home page, and since the 0 index of the dropdown is
// for scraping the home page, we don't need to take any action on the dropdown
if (path.length > 8) {
    const currentLocation = path.slice(8);
    const selector = document.getElementById("scrapeSection");

loop:
    for (let i = 1; i < selector.length; i++) {
        console.log(i);
        if (currentLocation === selector.children[i].value) {
            selector.selectedIndex = i;
            break loop;
        }
    }
}