const { auth, postReplyWithMedia, postReply } = require('./config.js');

const client = auth();

client.stream('statuses/filter', { track: '@swiftie_bot' }, function (stream) {
  console.log("Searching for tweets...");

  // when a tweet is found
  stream.on('data', function (tweet) {
    console.log("Found one!");
    console.log("Reading tweet...", tweet.text);

    console.log("Replying with Taylor pic!");

    var happyTerms = [
      'love',
      'like',
      'excited',
      'cool',
      'awesome',
      'escstatic',
      'glad',
      'happy',
      'sweet',
      'wholesome',
      'fantastic',
      'amazing',
      'incredible',
      'queen'
    ]

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
      'happyTaylor.jpeg',
      'heartTaylor.jpeg',
      'loveTaylor.jpeg',
      'thinkingTaylor.jpeg'
    ];

    var randomNumber = Math.floor(Math.random() * picArray.length);
    var picPath = picArray[randomNumber];

    //code to return positive images for positive text
    if(happyTerms.some(term => tweet.text.includes(term))){
      var randomNumber2 = Math.floor(Math.random() * happyPicArray.length);

      picPath = happyPicArray[randomNumber2];
    }

    postReplyWithMedia(client, "./sample-media/" + picPath, tweet);

    stream.on('error', function (error) {
      console.log(error);
    });
  });
});