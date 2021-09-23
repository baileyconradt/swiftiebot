const { auth, postReplyWithMedia, postReply } = require('./config.js');

const client = auth();

const fs = require('fs');

client.stream('statuses/filter', { track: '@swiftie_bot' }, function (stream) {
  console.log("Searching for tweets...");

  var Sentiment = require('sentiment');
  var sentiment = new Sentiment();
  //var result = sentiment.analyze('Cats are stupid.');
  //console.dir(result.score);    // Score: -2, Comparative: -0.666

  // when a tweet is found
  stream.on('data', function (tweet) {
    console.log("Found one!");
    console.log("Reading tweet...", tweet.text);

    console.log("Replying with Taylor pic!");

    const dir = './happyPics';
    let happyLength = 0;

    fs.readdir(dir, (err, files) => {
      happyLength = files.length;
    });

    const dir2 = './sadPics';
    let sadLength = 0;

    fs.readdir(dir2, (err, files) => {
      sadLength = files.length;
    });

    var happyPicArray = [
      'happyTaylor.jpeg',
      'heartTaylor.jpeg',
      'heart2Taylor.jpeg',
      'heart3Taylor.jpeg',
      'heart4Taylor.jpeg',
      'heart5Taylor.jpeg',
      'heart6Taylor.jpeg',
      'heart7Taylor.jpeg',
      'heart8Taylor.jpeg',
      'loveTaylor.jpeg',
    ];

    var picArray = [
      'annoyedTaylor.jpeg',
      'confusedTaylor.jpeg',
      'drunkTaylor.jpeg',
      'thinkingTaylor.jpeg'
    ];

    var randomNumber;
    // = Math.floor(Math.random() * picArray.length);
    var picPath;
    // = picArray[randomNumber];

    var result = sentiment.analyze(tweet.text);

    //code to return positive images for positive text
    //if(happyTerms.some(term => tweet.text.includes(term))){
    if(result.score > 0){
      var randomNumber2 = Math.floor(Math.random() * happyLength);
      console.log('Taylor likes this one! <3');
      picPath = './happyPics/' + happyPicArray[randomNumber2];
    }
    else{
      console.log('Taylor does not like this one! >:(');
      randomNumber = Math.floor(Math.random() * sadLength);
      picPath = './sadPics/' + picArray[randomNumber];
    }

    //code to return album-specific images



    postReplyWithMedia(client, picPath, tweet);

    stream.on('error', function (error) {
      console.log(error);
    });
  });
});