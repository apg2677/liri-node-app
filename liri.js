require("dotenv").config();
var axios = require("axios");
var moment = require("moment");

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
                ConcertInfo(res, i);
            }

        });
        break;
    case commands[1]:
        var song = encodeURI(process.argv[3]);
        spotify.search({ type: 'track', query: song }).then(function(res) {
            console.log(res.tracks.items[0]);
        });

}
function ConcertInfo(res, i) {
    var venName = res.data[i].venue.name;
    var city = res.data[i].venue.city;
    var state = res.data[i].venue.region;
    var date = res.data[i].datetime;
    console.log("Venue: " + venName);
    console.log("Location: " + city + ", " + state);
    console.log("Date: " + date);
}

