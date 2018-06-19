"use strict";

const express = require("express");
const router = express.Router();
const scraper = require("./scraper");

// Routes go here
router.get("/", (req, res) => {
    res.send("Welcome");
});

router.post("/scrape", (req, res) => {
    scraper.scrape(function(data) {
        console.log(data);
        res.json(data);
    });
})

module.exports = router;