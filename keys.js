//get your API creds by following these steps:
//Step One: https://apps.twitter.com/app/new
//Step Two: use http:// for your urls
//Step Three: then go to Keys and Access Tokens to get your credentials for below
//Step Four: then you have to click the button below on that page to create an access token
exports.omdb = {
    key: process.env.OMDB_KEY,
};

exports.spotify = {
    id: process.env.SPOTIFY_CLIENT_ID,
    secret: process.env.SPOTIFY_CLIENT_SECERET
};

exports.bandsInTown = {
    id: process.env.BANDSINTOWN_ID,
};
