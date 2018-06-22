"use strict";

// this is JavaScript for the back-end

const express = require("express");
const router = express.Router();
const scraper = require("./scraper");
const mongoose = require("mongoose");

// Set up and connect to MongoDB
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/scraper');

// Require all models
var db = require("./models");

// ====================================
// ========== Routes go here ==========
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
});

// scrapes sections.  Valid sections are:
// world, us, politics, nyregion, business, opinion, technology, science, health, sports, arts, books
// fashion, dining, travel, magazine, t-magazine, realestate, obituaries, learning, multimedia
router.post("/scrape/:section", (req, res) => {
    scraper.scrape(`section/${req.params.section}`, function(data) {
        res.json(data);
    });
});
// ========== END POST routes ==========

// ========== GET routes for actual consumption ==========
// scrapes NYT home page
router.get("/scrape", (req, res) => {
    scraper.scrape("", function(data) {
        res.render("scrape", {articles: data})
    });
});

router.get("/scrape/:section", (req, res) => {
    scraper.scrape(`section/${req.params.section}`, function(data) {
        res.render("scrape", {articles: data})
    });
});
// ========== END GET routes ==========

// ========== MongoDB routes go here ==========
// retrieve all saved articles
router.get("/articles", (req, res) => {
    db.Article.find({})
    .then(dbArticle => {
        res.json(dbArticle);
    })
    .catch(err => {
        res.json(err);
    }) 
});

// save an article
router.post("/articles", (req, res) => {
    console.log(req.body);
    db.Article.create(req.body)
    .then(dbArticle => {
        console.log(dbArticle);
        res.json(dbArticle);
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    })
});

// view a specific article
router.get("/article/:id", (req, res) => {
    db.Article.findOne({_id: req.params.id})
    .populate("note")
    .then(dbArticle => {
        res.json(dbArticle);
    })
    .catch(err => {
        res.json(err);
    })
});

// add/update note to a saved article
// note should have...  let's go with a "title" and a "body"
router.post("/article/:id", (req, res) => {
    db.Note.create(req.body)
    .then(dbNote => {
        db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true});
        res.json(dbNote);
    })
    // .then(dbArticle => {
    //     res.json(dbArticle);
    // })
    .catch(err => {
    res.json(err);
    })
});

// ========== END MongoDB routes ========== 

// ========== END ROUTES ==========
// ================================

module.exports = router;