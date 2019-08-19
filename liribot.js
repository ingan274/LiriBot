// --------------------------------------------------------------------------------- requires and global variables
require("dotenv").config();
var fs = require('fs');
var inquirer = require('inquirer');
var keys = require("./keys.js");
var moment = require('moment');

var axios = require("axios");
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

var chalk = require("chalk");
var chalkTitle = chalk.inverse;

var space = "\n\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
var header = chalkTitle("\n================= LIRI found this ... ==================");
var line = chalk.blue("---------------------------------------------------------");

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
                console.log('Oops. Looks like you need to provide a movie title. Please try again.');
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
                console.log('Oops. Looks like you need to provide a song title. Please try again.');
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
                console.log('Oops. Looks like you need to provide a artist/band. Please try again.');
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
        // console.log(answer)
        // Depending on which program the user chose to run it will do the function for that program
        switch (answer.programs) {
            case 'Spotify':
                getSpotifyInfo(answer.songChoice);
                break;
            case 'Movie':
                getMovieInfo(answer.movieChoice);
                break;
            case 'Concerts':
                getConcertInfo(answer.artistChoice);
                break;
            case 'Suprise me!':
                suprise(suprise);
                break;
            default:
                console.log('Sorry. Looks like LIRI cannot do that function');
        }
    });

// --------------------------------------------------------------------------------- Spotify  
var getSpotifyInfo = (song) => {
    spotify.search({ type: 'track', query: song }, (error, song) => {
        if (error) {
            console.log(header)
            return console.error("Oops. Looks like that's information I can't searched. " + error);
        } else {
            var search = song.tracks.items
            var spotifyTitle = chalk.bold.yellow("\n================= Top 5 Search Results ==================");
            console.log(header + space + spotifyTitle)
            var counter = 0;
            var limit = 5;
            for (var songs of search) {
                var songName = songs.name;
                var albumName = songs.album.name;
                var artistName = songs.album.artists[0].name;
                var url = songs.album.external_urls.spotify;

                console.log(space + "Song Name: " + "'" + chalk.underline(songName) + "'" +
                    space + "Album Name: " + albumName +
                    space + "Artist Name: " + artistName +
                    space + "URL: " + url + space + line);
                if (++counter >= limit) break;
            }
        }

    })
}

// --------------------------------------------------------------------------------- Band In Town 
var getConcertInfo = (artist) => {
    if (artist === "") {
        return console.log("Looks like you need to didn't choose a Artist or Band to search. Please Try again.");
    }

    var artistSearch = artist.replace(/['"]+/g, '').split(" ").join("+");
    var myUrl = 'https://rest.bandsintown.com/artists/' + artistSearch + '/events?app_id=' + bandsInTownID;
    axios.get(myUrl)
        .then((response) => {
            concerts = response.data;
            // console.log(concerts)
            if (concerts.length == 0) {
                console.log(header)
                console.log("\n\nLooks like the Artist or Band you are looking for is not performing this year. Please try a new search." + space)
            } else {
                var counter = 0;
                var limit = 5;
                var concertTitle = chalk.bold.yellow("\n================= Next 5 Concerts Coming Up ==================");
                console.log(header + space + concertTitle)
                for (var concert of concerts) {
                    var day = "Concert Date: " + moment(concert.datetime).format('dddd, MMMM Do YYYY, h:mm:ss a');
                    var venue = `Venue Name: ${concert.venue.name}`;
                    var venueLocationCity = `Venue Location: ${concert.venue.city}`;
                    var venueLocationRegion = `${concert.venue.region}`;
                    var venueLocationCountry = `${concert.venue.country}`;
                    var lineup = `Artist: ${concert.lineup}`;

                    console.log(space + chalk.underline(lineup) + space + day + space + venue + space +
                        venueLocationCity + ", " + venueLocationRegion + " " + venueLocationCountry +
                        space + line)

                    if (++counter >= limit) break;

                }
            }
        })
        .catch((error) => {
            return console.error("Oops. Looks like that information we can't search. " + error);
        });
}

// --------------------------------------------------------------------------------- OMDB   
var getMovieInfo = (movie) => {
    var params = {
        apiKey: omdbAPIKEY,
        title: movie
    }

    OMDB.get(params, (error, movie) => {
        if (error) {
            return console.error("Oops. Looks like that information we can't search. " + error);
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
    var min = 1;
    var max = 5;
    var random = parseInt(Math.random() * (max - min) + min);

    fs.readFile('./random/random' + random + '.txt', 'utf8', (error, data) => {
        if (error) {
            return console.error("Oops. Looks like that information we can't search. " + error);
        } else {
            // console.log(data.split(',')[1])
            var fileContent = data.split(',');
            userSearch = fileContent[1];
            switch (fileContent[0]) {
                case 'Spotify':
                    getSpotifyInfo(userSearch);
                    break;
                case 'Movie':
                    getMovieInfo(userSearch);
                    break;
                case 'Concerts':
                    getConcertInfo(userSearch);
                    break;
                case 'Suprise me!':
                    suprise();
                    break;
                default:
                    console.log('Sorry. Looks like LIRI cannot do that function');
            }
        }
    });
}
