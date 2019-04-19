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
        search.MovieInfo();
        break;


}
// function MovieInfo() {
//     axios.get(requestUrl).then(function (res) {
//         var title = res.data.Title;
//         var year = res.data.Year;
//         var ratingIMDB = res.data.imdbRating;
//         var ratingRT = res.data.tomatoRating;
//         var lang = res.data.Language;
//         var plot = res.data.Plot;
//         var actors = res.data.Actors;
//         console.log("Title: " + title);
//         console.log("Year: " + year);
//         console.log("IMDB Rating: " + JSON.stringify(ratingIMDB));
//         console.log("Rotten Tomatoes: " + ratingRT);
//         console.log("Language: " + lang);
//         console.log("Plot: " + plot);
//         console.log("Actors: " + JSON.stringify(actors));
//     });
// }

// function SongInfo() {
//     var song = encodeURI(process.argv[3]);
//     spotify.search({ type: 'track', query: song }).then(function (res) {
//         console.log(JSON.stringify(res, null, 4));
//         var artist = res.tracks.items[0].artists[0].name;
//         var album = JSON.stringify(res.tracks.items[0].album.name);
//         var prevLink = res.tracks.items[0].preview_url;
//         console.log("Song: " + decodeURI(song));
//         console.log("Artist: " + artist);
//         console.log("Album: " + album);
//         console.log("Preview Link: " + prevLink);
//     });
// }

// function ConcertInfo(res, i) {
//     var venName = res.data[i].venue.name;
//     var city = res.data[i].venue.city;
//     var state = res.data[i].venue.region;
//     var date = res.data[i].datetime;
//     console.log("Venue: " + venName);
//     console.log("Location: " + city + ", " + state);
//     console.log("Date: " + date);
// }

