// requires
require("dotenv").config();
var keys = require("./keys.js");

var Concert = require("");
var concert = new Concert(keys.concert);

var Spotify = require("node-spotify-api");
var spotifyKey = new Spotify(keys.spotify);

var request = require("request");

var fs = require("fs");

var chalk = require("chalk");
var chalkTitle = chalk.black;


var command = process.argv[2];
var content = process.argv[3];

// --------------------------------------------------------------------------------- Spotify


// --------------------------------------------------------------------------------- Concerts


// --------------------------------------------------------------------------------- OMDB