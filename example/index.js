const Twitter = require('..');

var twitter = new Twitter({
  consumer_key   : 'Iy6TIRxgqaGYW6QA0qNU2w',
  consumer_secret: 'BlNfIqyxTyfSRpUomnCQ87JbpfAPDxDyL0Qcq3yBE'
});

twitter.token(function(err, token){
  twitter.invalidate(token.access_token, function(err, token){
    console.log(token)
  });
});



// twitter.timeline('twitterapi', function(err, tweets){
//   console.log(tweets);
// });