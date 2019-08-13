// requires
require("dotenv").config();
var keys = require("./keys.js");

var bandsintown = require('bandsintown')(concertID);
var concertKeys = new Concert(keys.bandsInTown);
var concertID = concertKeys.id;

var Spotify = require("node-spotify-api");
var spotifyKeys = new Spotify(keys.spotify);
var spotifyID = spotifyKeys.id;
var spotifySecret = spotifyKeys.secret;

var OMDB = require("omdb");
var omdbKeys = new OMDB(keys.omdb);
var omdbAPIKEY = omdbKeys.id;

var request = require("request");

var fs = require("fs");

var chalk = require("chalk");
var chalkTitle = chalk.inverse;


var command = process.argv[2];
var content = process.argv[3];

var space = "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
var header = "================= Liri found this ...==================";

// --------------------------------------------------------------------------------- Spotify  

// --------------------------------------------------------------------------------- Band In Town 

// --------------------------------------------------------------------------------- OMDB   