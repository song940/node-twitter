const Twitter = require('..');

var twitter = new Twitter({
  consumer_key       : 'Iy6TIRxgqaGYW6QA0qNU2w',
  consumer_secret    : 'BlNfIqyxTyfSRpUomnCQ87JbpfAPDxDyL0Qcq3yBE',
  access_token_key   : '194524135-RPv0yP3MGiASsfLh7KvcA0rZ17wJLvKShcuyShbt',
  access_token_secret: 'qPo8YPGkDL6WyuBlPCuAiV5nDrHwGTijEUqJb09scyeg5'
});
// 
// twitter.search('keyword', {}, function(err, tweets){
//   
// });
// 
// twitter.post('hello twitter!', function(err, res){
//   
// });

twitter.timeline('song940', function(err, tweets){
  console.log(tweets);
});
