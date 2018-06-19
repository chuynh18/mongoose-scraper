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
    scrape: callback => {

        // Make sure articleStorage is empty
        articleStorage = [];

        request("http://www.nytimes.com", function(error, response, html) {

            // Load the HTML into cheerio and save it to a variable
            var $ = cheerio.load(html);

            // Select each element in the HTML body from which you want information.
            $("h2.story-heading").each(function(i, element) {
                var link = $(element).children().attr("href");
                var title = $(element).children().text();

                // Save these results in an object that we'll push into the results array we defined earlier
                articleStorage.push({
                    title: title,
                    link: link
                });
            });
        callback(articleStorage);
        });
    }
}

module.exports = scraper;