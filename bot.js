const { auth, postReplyWithMedia, postReply } = require('./config.js');

const client = auth();

client.stream('statuses/filter', { track: '@swiftie_bot' }, function (stream) {
  console.log("Searching for tweets...");

  // when a tweet is found
  stream.on('data', function (tweet) {
    console.log("Found one!");
    console.log("Reading tweet...", tweet.text);

    console.log("Replying with Taylor pic!");

    var picArray = [
      'annoyedTaylor.jpeg',
      'confusedTaylor.jpeg',
      'drunkTaylor.jpeg',
      'happyTaylor.jpeg',
      'heartTaylor.jpeg',
      'loveTaylor.jpeg',
      'thinkingTaylor.jpeg'
  ];
  var randomNumber = Math.floor(Math.random()*picArray.length);

  var picPath = picArray[randomNumber];

    postReplyWithMedia(client, "./sample-media/" + picPath, tweet);

    stream.on('error', function (error) {
    console.log(error);
  });
});
});