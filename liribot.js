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
var content = process.argv[3];

var space = "\n\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
var header = chalkTitle("\n================= LIRI found this ... ==================");

// --------------------------------------------------------------------------------- Initial Questions of actions
var questions = [{
    type: 'list',
    name: 'programs',
    message: 'Hello, Welcome to LIRI Bot. What would you like to search?',
    choices: ['Spotify', 'Movie', 'Concerts', 'Suprise me!']
},
{
    type: 'input',
    name: 'movieChoice',
    message: 'What\'s the name of the movie you would like?',
    validate: function (input) {
        // Declare function as asynchronous, and save the done callback
        var done = this.async();
        // Do async stuff
        setTimeout(function () {
            if (input === '') {
                // Pass the return value in the done callback
                console.log('Oops. Looks like you need to provide a search term. Please try again.');
                return;
            }
            // Pass the return value in the done callback
            done(null, true);
        }, 600);
    },
    when: (answers) => {
        return answers.programs == 'Movie';
    }
},
{
    type: 'input',
    name: 'songChoice',
    message: 'What\'s the name of the song you would like?',
    validate: function (input) {
        // Declare function as asynchronous, and save the done callback
        var done = this.async();
        // Do async stuff
        setTimeout(function () {
            if (input === '') {
                // Pass the return value in the done callback
                console.log('Oops. Looks like you need to provide a search term. Please try again.');
                return;
            }
            // Pass the return value in the done callback
            done(null, true);
        }, 600);
    },
    when: (answers) => {
        return answers.programs == 'Spotify';
    }
},
{
    type: 'input',
    name: 'artistChoice',
    message: 'What\'s the name of the artist you would like?',
    validate: function (input) {
        // Declare function as asynchronous, and save the done callback
        var done = this.async();
        // Do async stuff
        setTimeout(function () {
            if (input === '') {
                // Pass the return value in the done callback
                console.log('Oops. Looks like you need to provide a search term. Please try again.');
                return;
            }
            // Pass the return value in the done callback
            done(null, true);
        }, 600);
    },
    when: (answers) => {
        return answers.programs == 'Concerts';
    }
}
];

inquirer
    .prompt(questions)
    .then((answer) => {
        // Depending on which program the user chose to run it will do the function for that program
        switch (answer.programs) {
            case 'Spotify':
                getSpotifyInfo(answer.songChoice);
                break;
            case 'Movie':
                getMovieInfo(answer.movieChoice);
                break;
            case 'Concert':
                getConcertInfo(answer.artistChoice);
                break;
            case 'Suprise me!':
                suprise();
                break;
            default:
                console.log('Sorry. Looks like LIRI cannot do that function');
        }
    });
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