require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var liriReturn = process.argv[2];
var movieName = process.argv[2];

switch (liriReturn) {
  case "spotify-this-song":
    spotifyThisSong();
    break;

  case "movie-this":
    movieThis();
    break;

  case "concert-this":
    concertThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;

  default:
    console.log(
      "\n" +
        "Type any command after 'node liri.js': " +
        "\n" +
        "spotify-this-song 'any song title' " +
        "\n" +
        "movie-this 'any movie title' " +
        "\n" +
        "do-what-it-says " +
        "\n" +
        "use quotes for multiword titles."
    );
}
function spotifyThisSong(trackName) {
  var trackName = process.argv[3];
  if (!trackName) {
    trackName = "The Sign";
  }
  songRequest = trackName;
  spotify.search(
    {
      type: "track",
      query: songRequest
    },
    function(err, data) {
      if (!err) {
        var trackInfo = data.tracks.items;
        for (var i = 0; i < 5; i++) {
          if (trackInfo[i] != undefined) {
            var spotifyResults =
              "Artist: " +
              trackInfo[i].artists[0].name +
              "\n" +
              "Song: " +
              trackInfo[i].name +
              "\n" +
              "Preview URL: " +
              trackInfo[i].preview_url +
              "\n" +
              "Album: " +
              trackInfo[i].album.name +
              "\n";

            console.log(spotifyResults);
            console.log(" ");
          }
        }
      } else {
        console.log("error: " + err);
        return;
      }
    }
  );
}
function movieThis(movieName) {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);
  axios.get(queryUrl).then(function(response) {
    console.log("Release Year: " + response.data.Year);
  });
}
