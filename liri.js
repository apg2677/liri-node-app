require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var search = require("./Search");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var keys = require("./keys");
// var cp = require("child_process");

var spotify = new Spotify(keys.spotify);
console.log(keys.spotify);

var transact = process.argv[2];


var commands = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"];
var target = encodeURI(process.argv[3]);


CheckCommand(transact, target );
// console.log(requestUrl);

function CheckCommand(t, tar) {
    // var execStr="";
    // var dataStr="";
    // var tempStr="";
    // var command="";
    // var target="";
    console.log("Check Command: ");
    switch (t) {
        case commands[0]:
            var requestUrl = "https://rest.bandsintown.com/artists/" + tar + "/events?app_id=codingbootcamp";
            axios.get(requestUrl).then(function (res) {
                for (var i in res.data) {
                    search.ConcertInfo(res, i);
                }
            });
            break;
        case commands[1]:
            
            search.SongInfo(tar);
            break;
        case commands[2]:
           // var movieStr = encodeURI(process.argv[3]);
            var requestUrl = "http://www.omdbapi.com/?t=" + tar + "&y=&plot=short&apikey=trilogy";
            axios.get(requestUrl).then(function (res) {
                search.MovieInfo(res);
            });
            break;
        case commands[3]:
        // console.log("T: " + t );
           
            fs.readFile("random.txt", function (err, data) {
                 dataStr = data.toString();
                // console.log(dataStr);
                 tempStr = dataStr.split(",");
               // console.log(tempStr);
                 command = tempStr[0];
               // console.log(command);
                 target = tempStr[1];
              //  console.log(target);
                execStr = command + " " + target;
                console.log(execStr);
                // var code = cp.execSync(execStr);
                // console.log(code.toString());
                console.log("ExecStr: " + execStr);
                // console.group("Command" + command);
                CheckCommand(command, target);
            });
            
            break;
    }
    return requestUrl;
}

