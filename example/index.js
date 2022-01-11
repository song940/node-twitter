const Twitter = require('..');

const twitter = new Twitter({
  consumer_key: 'XxBBqK76VE8IzqkqqkhJqlRG9',
  consumer_secret: 'S0XKQc2gQX0KXzjVHQFZuSwa6BMd3Boiwv2xbjubC2V6uNwvII',
  // token: '194524135-erHFif1VGjwdOdzPzNKrEN3QyX98ehsCjc6L20mc',
  // token_secret: '4sA9FLSP88EL5aax1xC7VhbJc3RwWxfPZHhQ4EMEG898a'
});

(async () => {

  const me = await twitter.users.me();
  console.log(me);

})();