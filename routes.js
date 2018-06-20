"use strict";

// this is JavaScript for the back-end

const express = require("express");
const router = express.Router();
const scraper = require("./scraper");

// Routes go here
router.get("/", (req, res) => {
    res.render("index");
});

// scrapes NYT home page
router.post("/scrape", (req, res) => {
    scraper.scrape("", function(data) {
        res.json(data);
    });
})

// scrapes sections.  Valid sections are:
// world, us, politics, nyregion, business, opinion, technology, science, health, sports, arts, books
// fashion, dining, travel, magazine, t-magazine, realestate, obituaries, learning, multimedia
router.post("/scrape/:section", (req, res) => {
    scraper.scrape(`section/${req.params.section}`, function(data) {
        res.json(data);
    });
})

module.exports = router;