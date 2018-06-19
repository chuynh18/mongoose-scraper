"use strict";

// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");

// Initialize Express
const app = express();
let PORT = process.env.PORT || 8080; // so that I can deploy to Heroku or test locally on port 8080

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Set up Express.js to use express-handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
const routes = require("./routes");
app.use(routes);

// Tell express to LISTEN UP
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});