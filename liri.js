require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var liriReturn = process.argv[2];
var movieName = process.argv[3];
var artist = process.argv[3];

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
        "concert-this 'any band name' " +
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
function movieThis() {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);
  axios.get(queryUrl).then(function(response) {
    console.log("Title: " + response.data.Title + "\n");
    console.log("Release Year: " + response.data.Year + "\n");
    console.log("IMDB Rating: " + response.data.imdbRating + "\n");
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n");
    console.log("Country Produced: " + response.data.Country + "\n");
    console.log("Movie Language: " + response.data.Language + "\n");
    console.log("Movie Plot: " + response.data.Plot + "\n");
    console.log("Movie Actors: " + response.data.Actors + "\n");
  });
}
//Bands In Town Function
function concertThis() {
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
  console.log(queryUrl);
  axios.get(queryUrl).then(function(response) {
    console.log("Artist or Band you choose is: " + artist);
    console.log("Venue is located in: " + response.data[0].venue.name);
    console.log("Venue is located in: " + response.data[0].venue.city);
    console.log("Date/Time is: " + response.data[i].datetime);
  });
}
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
  });
}
