// --------------------------------------------------------------------------------- requires and global variables
require("dotenv").config();
var fs = require('fs');
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

var command = process.argv[2];
var content = process.argv.slice(3).join(" ");

var space = "\n\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
var header = chalkTitle("\n================= LIRI found this ... ==================");
var line = chalk.blue("---------------------------------------------------------");
// --------------------------------------------------------------------------------- Spotify  
var getSpotifyInfo = (song) => {
    spotify.search({ type: 'track', query: song }, (error, song) => {
        if (error) {
            return console.error("Oops. Looks like that information we can't search. " + error);
        } else {
            var search = song.tracks.items
            console.log(header)
            for (var songs of search) {
                var songName = songs.name;
                var albumName = songs.album.name;
                var artistName = songs.album.artists[0].name;
                var url = songs.album.external_urls.spotify;

                console.log(space + "Song Name: " + "'" + chalk.underline(songName) + "'" +
                    space + "Album Name: " + albumName +
                    space + "Artist Name: " + artistName +
                    space + "URL: " + url + space + line);

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
            console.log(header)
            // console.log(concerts)
            if (concerts.length == 0) {
                console.log("\n\nLooks like the Artist or Band you are looking for is not performing this year. Please try a new search." + space)
            } else {
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

    if (movie === "") {
        return console.log("Looks like you need to didn't choose a Movie Title to search. Please Try again.");
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
    console.log('Sorry. Looks like LIRI cannot do that function. Please use the following commands: spotify-this-song, concert-this, movie-this, or do-what-it-says');
};