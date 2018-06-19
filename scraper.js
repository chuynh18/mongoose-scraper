"use strict";

// dependencies
const request = require("request");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect('mongodb://localhost/scraper');

// place to store articles temporarily
let articleStorage = [];

// business logic
const scraper = {
    scrape: (target, callback) => {

        // Make sure articleStorage is empty
        articleStorage = [];

        let query = `http://www.nytimes.com/${target}`;
        console.log(query);

        request(query, function(error, response, html) {

            // Load the HTML into cheerio and save it to a variable
            let $ = cheerio.load(html);

            // adapt what we scrape based on whether we're scraping the home page or a section page
            let targetElement;
            if (!target) {
                targetElement = "h2.story-heading";
            }
            else {
                targetElement = "h2.headline";
            }

            // Select each element in the HTML body from which you want information.
            $(targetElement).each(function(i, element) {
                let link = $(element).children().attr("href");
                let title = $(element).children().text();

                // Save these results in an object that we'll push into the results array we defined earlier
                // but only push 'em if they exist!
                if (!!link && !!title) {
                    articleStorage.push({
                        title: title,
                        link: link
                    });
                }
            });
            
        callback(articleStorage);
        });
    }
}

module.exports = scraper;