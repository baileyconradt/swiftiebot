const { auth, postReplyWithMedia, postReply } = require('./config.js');

const client = auth();

const fs = require('fs');


//TODO: 
//code to return album-specific images

//code to return random quote messages based on sentiment

//random lyrics every 22 min

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