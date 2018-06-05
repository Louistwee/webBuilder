var http = require('http');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var mime = require('mime-types');

var def = {
  port:'8080',
  hostName: '127.0.0.1'
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
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(this.loadPage(JSON.parse(fs.readFileSync('index.html', 'utf8'))));
}
Site.prototype.loadPage = function(jsonObject){
  var html = '<head><title>'+jsonObject.title+'</title></head><body>';
  for(let element of jsonObject.content){
    if(element.type === 'heading'){
      html += '<h1>' + element.label + '</h1>';
    }
  }
  return html;
};

module.exports = Site;
