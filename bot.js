const { auth, postReplyWithMedia, postReply, postTweet } = require('./config.js');

const client = auth();

const fs = require('fs');
const csv = require("csvtojson");
const lyrics = require("./lyrics.json")
const { fileURLToPath } = require('url');


//TODO: 
//code to return album-specific images

//random lyrics every 22 min
const getRandomIndex = length => Math.floor(Math.random() * length);
var minutes = .5, interval = minutes * 60 * 1000;
let tweetLyric = "";

setInterval(function() {

  //parse lyrics json
  let randomAlbum = getRandomIndex(Object.keys(lyrics).length);
  albums = Object.keys(lyrics);
  album = albums[randomAlbum];
  //random song
  let randomSong = getRandomIndex(Object.keys(lyrics[album]).length);
  songs = Object.keys(lyrics[album]);
  song = songs[randomSong];
  //random lyric
  let randomLyric = getRandomIndex(song.length);
  songLyrics = lyrics[album][song];
  songLyric = songLyrics[randomLyric];

  tweetLyric = songLyric.lyric;

  postTweet(client, tweetLyric);

}, interval);
  


//listen for tagged tweets, respond with image of Taylor
client.stream('statuses/filter', { track: '@swiftie_bot' }, function (stream) {
  console.log("Searching for tweets...");

  var Sentiment = require('sentiment');
  var sentiment = new Sentiment();

  // when a tweet is found
  stream.on('data', function (tweet) {
    console.log("Found one!");
    console.log("Reading tweet...", tweet.text);

    console.log("Replying with Taylor pic!");

    const getRandomIndex = length => Math.floor(Math.random() * length);

    //get tweet sentiment
    var result = sentiment.analyze(tweet.text);
    //placeholder for image path
    var picPath;

    //code to return positive images for positive text
    if (result.score > 0) {
      const dir = './happyPics';
      let happyLength = 0;
      fs.readdir(dir, (err, files) => {
        happyLength = files.length;

        let index = getRandomIndex(happyLength);
        console.log('Taylor likes this one! <3');
        //console.log(files[index]);
        //console.log(dir + '/' + files[index]);
        picPath = dir + '/' + files[index]

        postReplyWithMedia(client, picPath, tweet);
      });
    }
    else {
      const dir = './sadPics';
      let sadLength = 0;
      fs.readdir(dir, (err, files) => {
        sadLength = files.length;

        let index = getRandomIndex(sadLength);
        console.log('Taylor doesn\'t like this one :(');
        //console.log(files[index]);
        //console.log(dir + '/' + files[index]);
        picPath = dir + '/' + files[index]

        postReplyWithMedia(client, picPath, tweet);
      });
    }

    stream.on('error', function (error) {
      console.log(error);
    });
  });
});