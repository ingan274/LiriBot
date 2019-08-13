// --------------------------------------------------------------------------------- requires and global variables
require("dotenv").config();
var inquirer = require('inquirer');
var keys = require("./keys.js");
var fs = require('fs');

// var BandsInTown = require('bandsintown')(bandsInTownID);
var bandsintown = keys.bandsInTown;
var bandsInTownID = bandsintown.id;

var Spotify = require("node-spotify-api");
var spotifyKeys = keys.spotify;
var spotifyID = spotifyKeys.id;
var spotifySecret = spotifyKeys.secret;
var spotify = new Spotify({
    id: spotifyID,
    secret: spotifySecret
});

var OMDB = require("omdb-client");
var omdbKeys = keys.omdb;
var omdbAPIKEY = omdbKeys.key;

var request = require("request");

var chalk = require("chalk");
var chalkTitle = chalk.inverse;

var command = process.argv[2];
var content = process.argv.slice(3).join(" ")

var space = "\n\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
var header = chalkTitle("\n================= LIRI found this ... ==================");
// --------------------------------------------------------------------------------- Spotify  
var getSpotifyInfo = (song) => {
    spotify.search({ type: 'track', query: song }, (error, song) => {
        if (error) {
            console.log("Oops. Looks there is not information on that song. " + error);
        } else {
            var songName = song.tracks.items[0].name;
            var albumName = song.tracks.items[0].album.name;
            var artistName = song.tracks.items[0].album.artists[0].name;
            var url = song.tracks.items[0].album.external_urls.spotify;

            console.log(header + space + "Song Name: " + "'" + chalk.underline(songName) + "'" +
                space + "Album Name: " + albumName +
                space + "Artist Name: " + artistName +
                space + "URL: " + url + space);
        }
    })
}

// --------------------------------------------------------------------------------- Band In Town 
var getConcertInfo = (artist) => {

}

// --------------------------------------------------------------------------------- OMDB   
var getMovieInfo = (movie) => {
    var params = {
        apiKey: omdbAPIKEY,
        title: movie
    }

    OMDB.get(params, (error, movie) => {
        if (error) {
            return console.error("Oops. Looks there is not information on that search. " + error);
        } else if (!movie) {
            return console.log('Movie not found!');
        }

        console.log(header + space + "Movie Title: " + chalk.underline(movie.Title) +
            space + "Movie Year: " + movie.Year +
            space + "Movie Rating: " + movie.imdbRating + "/10" +
            space + "Rotten Tomatoes Rating: " + movie.Ratings[1].Value +
            space + "Movie Plot: " + movie.Plot +
            space + "Awards: " + movie.Awards + space);
        // console.log('--------------------')
        // console.log(movie)
    });
}

// --------------------------------------------------------------------------------- Suprise!   
var suprise = (search) => {

}

// --------------------------------------------------------------------------------- Initial Questions of actions
if (command === "spotify-this-song") {
    getSpotifyInfo(content);
} else if (command === "concert-this") {
    getConcertInfo(content);
} else if (command === "movie-this") {
    getMovieInfo(content);
} else if (command === "do-what-it-says") {
    suprise();
} else {
    console.log('Sorry. Looks like LIRI cannot do that function. Please check parameters');
}