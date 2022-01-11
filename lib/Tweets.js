
class Tweets {
  constructor(client) {
    this.client = client;
  }
  getTweets(ids) {
    return this.client.get('/tweets', { ids });
  }
  getTweet(id) {
    return this.client.get(`/tweets/${id}`);
  }
}

module.exports = Tweets;