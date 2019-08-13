// requires
require("dotenv").config();
var keys = require("./keys.js");

var Concert = require("");
var concertKeys = new Concert(keys.bandsInTown);

var Spotify = require("node-spotify-api");
var spotifyKeys = new Spotify(keys.spotify);

var OMDB = require("omdb");
var omdbKeys = new Spotify(keys.omdb);

var request = require("request");

var fs = require("fs");

var chalk = require("chalk");
var chalkTitle = chalk.inverse;


var command = process.argv[2];
var content = process.argv[3];

var space = "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
var header = "================= Liri found this ...==================";

// --------------------------------------------------------------------------------- Spotify


// --------------------------------------------------------------------------------- Concerts


// --------------------------------------------------------------------------------- OMDB