require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var search = require("./Search");
var Spotify = require("node-spotify-api");

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
console.log(keys.spotify);

var transact = process.argv[2];


var commands = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"];
var artist = encodeURI(process.argv[3]);
var requestUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

switch (transact) {
    case commands[0]:
        axios.get(requestUrl).then(function (res) {
            for (var i in res.data) {
                search.ConcertInfo(res, i);
            }

        });
        break;
    case commands[1]:
        search.SongInfo();
        break;
    case commands[2]:
        var movieStr = encodeURI(process.argv[3]);
        var requestUrl = "http://www.omdbapi.com/?t=" + movieStr + "&y=&plot=short&apikey=trilogy";
        axios.get(requestUrl).then(function (res) {

            search.MovieInfo(res);
        });
        break;
    }

