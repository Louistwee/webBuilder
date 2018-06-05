var http = require('http');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var mime = require('mime-types');

var def = {
  port:'8080',
  hostName: '1270.0.0.1'
};
function Site(options){
  var self = this;
  this.options = options;
  for(let i in def){
    this[i] = def[i]
  }
  if(fs.existsSync('config.json')){
    this.configFile = fs.readFileSync('config.json', 'utf8');
    this.configObject = JSON.parse(this.configFile);
    for(let i in this.configObject){
      this[i] = this.configObject[i];
    }
  };
  for(let i in options){
    this[i] = options[i]
  };
  this.server = http.createServer(function(request,response){
    self.handleHttpRequest(request,response);
    self.emit('httpRequest',request,response);
  });
  this.server.listen(this.port,this.hostName,function(){
    self.emit('serverStarted');
  });
};

Site.prototype = new EventEmitter();
Site.prototype.handleHttpRequest = function(request,response){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}

module.exports = Site;
