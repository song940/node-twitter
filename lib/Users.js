
class Users {
  constructor(client) {
    this.client = client;
  }
  me() {
    return this.client.get('/users/me');
  }
  lookup(usernames, options) {
    return this.client.get('/users/by', { usernames, ...options });
  }
  getUsers() {
    return this.client.get('/users');
  }
  getUser(id) {
    return this.client.get(`/users/${id}`);
  }
  getUserByName(username) {
    return this.client.get(`/users/by/username/${username}`);
  }
}

module.exports = Users;