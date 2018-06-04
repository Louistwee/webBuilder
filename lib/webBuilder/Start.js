var http = require('http');
var EventEmitter = require('events').EventEmitter;

function Start(options){
  var self = this; 
  this.port = options.port;
  this.server = http.createServer(function(request,response){
    self.request(request,response);
  });
};

module.exports = Start
