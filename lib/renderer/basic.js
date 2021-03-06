var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , request = require('request').defaults({ jar: true });

var BasicRenderer = function() {};
util.inherits(BasicRenderer, EventEmitter);

BasicRenderer.prototype.render = function(url, actions, cookiejar) {
  var renderer = this;
  var conf = {url: url};
  if (cookiejar) {
    conf.jar = cookiejar;
  }
  request(conf, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      renderer.emit('renderer.urlRendered', url, body);
    } else if (error) {
      this.emit('error', error);
    } else if (response.statusCode != 200) {
      renderer.emit ('renderer.status', response.statusMessage);
    }
  });
}

module.exports = BasicRenderer;
