var http = require('http');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var mime = require('mime-types');

var def = {
  port:'8080',
  hostName: '127.0.0.1',
  plugins:[],
};
function Site(){
  var self = this;
  for(let i in def){
    this[i] = def[i]
  }
  if(fs.existsSync('config.json')){
    this.configFile = fs.readFileSync('config.json', 'utf8');
    this.config = JSON.parse(this.configFile);
  };
  this.server = http.createServer(function(request,response){
    self.handleHttpRequest(request,response);
    self.emit('httpRequest',request,response);
  });
  this.server.listen(this.config.port,this.config.hostName,function(){
    self.emit('serverStarted');
  });
  this.plugins = {};
  for(var plugin of this.config.plugins){
    this.loadPlugin(plugin);
  }
};

Site.prototype = new EventEmitter();
Site.prototype.handleHttpRequest = function(request,response){
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(this.loadPage(JSON.parse(fs.readFileSync('index.json', 'utf8'))));
};
Site.prototype.loadPage = function(jsonObject){
  var html = '<head><title>'+jsonObject.title+'</title></head><body>';
  for(let elementDefinition of jsonObject.content){
    html += this.ui.parseElement(elementDefinition);
  }
  return html;
};
Site.prototype.loadPlugin = function(pluginName){
  try{
    this.plugins[pluginName] = require('./plugins/' + pluginName + '.js');
    this.plugins[pluginName].init(this);
  }catch(err){
    console.log(err);
    return false;
  }
};

module.exports = Site;
