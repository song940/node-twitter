const HTTP = require('./http');
const Users = require('./lib/Users');
const Lists = require('./lib/Lists');
const Tweets = require('./lib/Tweets');

class Twitter extends HTTP {
  constructor({ api = 'https://api.twitter.com/2' }) {
    super();
    this.api = api;
    this.users = new Users(this);
    this.lists = new Lists(this);
    this.tweets = new Tweets(this);
  }
  token() {
    const headers = {};
    const { consumer_key, consumer_secret } = this;
    const auth = `${consumer_key}:${consumer_secret}`;
    headers['Authorization'] = 'Basic ' + Buffer.from(auth).toString('base64');
    return this.post('/oauth2/token?grant_type=client_credentials', { headers });
  }
  invalidate_token(token) {
    const headers = {};
    const { consumer_key, consumer_secret } = this;
    const auth = `${consumer_key}:${consumer_secret}`;
    headers['Authorization'] = 'Basic ' + Buffer.from(auth).toString('base64');
    return this.post(`/oauth2/invalidate_token?access_token=${token}`, { headers });
  }
}

module.exports = Twitter;