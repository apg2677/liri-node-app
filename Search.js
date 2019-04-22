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
    fs.appendFileSync("log.txt", "Movie Info:\n\n");
    fs.appendFileSync("log.txt", "Title: " + title + "\n");
    fs.appendFileSync("log.txt", "Year: " + year + "\n");
    fs.appendFileSync("log.txt", "IMDB: " + ratingIMDB + "\n");
    fs.appendFileSync("log.txt", "Rotten Tomatoes: " + ratingRT + "\n");
    fs.appendFileSync("log.txt", "Language: " + lang + "\n");
    fs.appendFileSync("log.txt", "Plot: " + plot + "\n");
    fs.appendFileSync("log.txt", "Actors: " + JSON.stringify(actors, null, 4) + "\n\n");

}

function SongInfo(t) {
    // var song = encodeURI(process.argv[3]);
    var artist;
    var album;
    var prevLink;
    spotify.search({ type: 'track', query: t }).then(function (res) {
        artist = res.tracks.items[0].artists[0].name;
        album = JSON.stringify(res.tracks.items[0].album.name);
        prevLink = res.tracks.items[0].preview_url;
        console.log("Song: " + decodeURI(t));
        console.log("Artist: " + artist);
        console.log("Album: " + album);
        console.log("Preview Link: " + prevLink);

        fs.appendFileSync("log.txt", "Song Info:\n\n")
        fs.appendFileSync("log.txt", "Song :" + decodeURI(t) + "\n");
        fs.appendFileSync("log.txt", "Artist :" + artist + "\n");
        fs.appendFileSync("log.txt", "Album: " + album + "\n");
        fs.appendFileSync("log.txt", "Preview Link :" + prevLink + "\n\n");
   
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
    fs.appendFileSync("log.txt", "Concert Info : \n\n");
    fs.appendFileSync("log.txt", "Venue : " + venName + "\n");
    fs.appendFileSync("log.txt", "City :" + city + "\n");
    fs.appendFileSync("log.txt", "State : " + state + "\n");
    fs.appendFileSync("log.txt", "date:" + date + "\n\n");

}
module.exports = {
    ConcertInfo: ConcertInfo,
    SongInfo: SongInfo,
    MovieInfo: MovieInfo

}


