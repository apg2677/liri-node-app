var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

function MovieInfo(res) {
    
        var title = res.data.Title;
        var year = res.data.Year;
        var ratingIMDB = res.data.imdbRating;
        var ratingRT = res.data.tomatoRating;
        var lang = res.data.Language;
        var plot = res.data.Plot;
        var actors = res.data.Actors;
        console.log("Title: " + title);
        console.log("Year: " + year);
        console.log("IMDB Rating: " + JSON.stringify(ratingIMDB));
        console.log("Rotten Tomatoes: " + ratingRT);
        console.log("Language: " + lang);
        console.log("Plot: " + plot);
        console.log("Actors: " + JSON.stringify(actors));
        fs.appendFileSync("log.txt", "Title: " + title + "\n");
        fs.appendFileSync("log.txt", "Year: " + year + "\n");
        fs.appendFileSync("log.txt", "IMDB: " + ratingIMDB + "\n");
        fs.appendFileSync("log.txt", "Rotten Tomatoes: " +ratingRT + "\n");
        fs.appendFileSync("log.txt", "Language: " + lang + "\n");
        fs.appendFileSync("log.txt", "Plot: " + plot + "\n");
        fs.appendFileSync("log.txt", "Actors: " + JSON.stringify(actors, null, 4));
    
}

function SongInfo() {
    var song = encodeURI(process.argv[3]);
    spotify.search({ type: 'track', query: song }).then(function (res) {
        var artist = res.tracks.items[0].artists[0].name;
        var album = JSON.stringify(res.tracks.items[0].album.name);
        var prevLink = res.tracks.items[0].preview_url;
        console.log("Song: " + decodeURI(song));
        console.log("Artist: " + artist);
        console.log("Album: " + album);
        console.log("Preview Link: " + prevLink);
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
module.exports = {
    ConcertInfo: ConcertInfo,
    SongInfo: SongInfo,
    MovieInfo: MovieInfo

}


