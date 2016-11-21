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
    endpoint: 'api.twitter.com',
    version: '1.1'
  };
  for(var key in options){
    defaults[ key ] = options[ key ];
  }
  this.options = defaults;
  return this;
}

Twitter.prototype.request = function(method, path, params, callback){
  // https://dev.twitter.com/oauth/application-only
  var api     = this.options.endpoint;
  var version = this.options.version;
  var options = {
    method  : method,
    hostname: api,
    path    : '/' + version + path,
    headers : {
      Accept      : '*/*',
      Connection  : 'close',
      'User-Agent': [ pkg.name, pkg.version ].join('/')
    }
  };
  if(method === 'get'){
    options.qs = params;
  }
  var req = https.request(options, function(res){
    var buffer = '';
    res
    .on('error', callback)
    .on('data', function(chunk){
      buffer += chunk;
    })
    .on('end', function(){
      callback(null, JSON.parse(buffer));
    });
  }.bind(this));
  req.end();
  return this;
};

Twitter.prototype.search = function () {
  
};

Twitter.prototype.timeline = function (params, callback){
  if(typeof params === 'string') params = { screen_name: params };
  return this.request('GET', '/statuses/user_timeline', params, callback);
};

Twitter.prototype.user = function () {
  
};

Twitter.prototype.post = function () {
  
};

module.exports = Twitter;