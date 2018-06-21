"use strict";

// this is JavaScript for the back-end

const express = require("express");
const router = express.Router();
const scraper = require("./scraper");

// Routes go here
router.get("/", (req, res) => {
    res.render("index");
});

// ========== POST routes I originally made while getting scraping stood up ==========
// had I used these routes, I would have done the rendering on the client side

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
// ========== END POST routes ==========

// ========== GET routes for actual consumption ==========
// scrapes NYT home page
router.get("/scrape", (req, res) => {
    scraper.scrape("", function(data) {
        res.render("scrape", {articles: data})
    });
})

router.get("/scrape/:section", (req, res) => {
    scraper.scrape(`section/${req.params.section}`, function(data) {
        res.render("scrape", {articles: data})
    });
})
// ========== END GET routes ==========

module.exports = router;