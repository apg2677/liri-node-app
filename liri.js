require("dotenv").config();
var axios = require("axios");

var Spotify = require("node-spotify-api");

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
var transact = process.argv[2];


var commands = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"];
var artist = encodeURI(process.argv[3]);
var requestUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

switch (transact) {
    case commands[0]:
        axios.get(requestUrl).then(function (res) {
            console.log(res.data);
        });
        break;
}
