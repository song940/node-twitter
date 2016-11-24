const qs    = require('querystring');
const http = require('http');
const https = require('https');
const pkg   = require('./package');

/**
 * [Twitter description]
 * @param {[type]} options [description]
 */
function Twitter(options){
  if(!(this instanceof Twitter))
    return new Twitter(options);
  var defaults = {
    api: 'api.twitter.com',
  };
  for(var key in options){
    defaults[ key ] = options[ key ];
  }
  this.options = defaults;
  return this;
};

Twitter.REST = '/1.1';

Twitter.prototype.request = function(method, path, query, header, callback){
  method = method.toUpperCase();
  header = header || {};
  query  = query  || {};
  // https://dev.twitter.com/oauth/application-only
  var options = {
    method  : method,
    hostname: this.options.api,
    // hostname: 'localhost',
    // port: 8080,
    path    : path,
    headers : {
      Connection    : 'close',
      'User-Agent'  : [ pkg.name, pkg.version ].join('/'),
    }
  };
  
  if(this.options.bearer){
    var bearer = new Buffer(this.options.bearer).toString('base64');
    options.headers[ 'Authorization' ] = 'Bearer ' + bearer;
  }

  for(var k in header) 
    options.headers[ k ] = header[k];
  var body = '';
  if(method === 'GET'){
    options.path += '?' + qs.stringify(query);
  }
  if(method === 'POST'){
    options.headers['Content-Type'] = 
    options.headers['Content-Type'] || 'application/x-www-form-urlencoded';
    var type = (options.headers['Content-Type']).split(/;\s*/)[0];
    switch(type){
      case 'application/json':
        body = JSON.stringify(query); 
        break;
      case 'application/x-www-form-urlencoded': 
        body = qs.stringify(query); 
        break;
    }
  }
  console.log(options);
  var req = https.request(options, function(res){
    var buffer = '';
    res
    .on('error', callback)
    .on('data', function(chunk){
      buffer += chunk;
    })
    .on('end', function(){
      console.log(buffer, body);
      callback(null, JSON.parse(buffer));
    });
  }.bind(this));
  req.end(body);
  return this;
};

/**
 * [get description]
 * @param  {[type]}   path     [description]
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Twitter.prototype.get = function(path, params, callback){
  this.token(function(err, token){
    this.options.bearer = token.access_token;
    return this.request('GET', path, params, {}, callback);
  }.bind(this));
};

Twitter.prototype.token = function(callback){
  if(this.options.bearer)
    return callback(null, { access_token: this.options.bearer });
  return this.request('POST', '/oauth2/token', {
    grant_type: 'client_credentials'
  }, {
    Authorization: 'Basic ' + new Buffer([ 
      this.options.consumer_key, 
      this.options.consumer_secret 
    ].join(':')).toString('base64')
  }, callback);
};


Twitter.prototype.invalidate = function(token, callback){
  return this.request('POST', '/oauth2/invalidate_token', {
    access_token: token
  }, {
    Authorization: 'Basic ' + new Buffer([ 
      this.options.consumer_key, 
      this.options.consumer_secret 
    ].join(':')).toString('base64')
  }, callback);
};



Twitter.prototype.timeline = function (params, callback){
  if(typeof params === 'string') params = { screen_name: params };
  return this.get('/1.1/statuses/user_timeline', params, callback);
};

Twitter.prototype.user = function () {
  
};

Twitter.prototype.post = function () {
  
};

module.exports = Twitter;