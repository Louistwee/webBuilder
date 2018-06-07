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
Site.prototype.loadPlugins = function(){
  var self = this;
  for(var plugin of this.config.plugins){
    this.loadPlugin(plugin);
  }
  for(let pluginName in this.plugins){
    let plugin = this.plugins[pluginName];
    for(let req of plugin.requires){
      let reqPlugin = this.plugins[req];
      reqPlugin._dependance.push(pluginName);
    }
    if(plugin.requires.length === 0){
      plugin._init();
    }
  }
};
Site.prototype.loadPlugin = function(pluginName){
  try{
    var pl = require('./plugins/' + pluginName + '.js');
    this.plugins[pluginName] = new this.plugin(name,pl);
  }catch(err){
    console.log(err);
    return false;
  }
};
Site.prototype.plugin = function(name,plugin, Site){
  for(var i in plugin){
    this[i] = plugin[i];
  }
  this.name = name;
  this.Site = Site;
  return;
}
Site.prototype.plugin.prototype._init = function(){
  if(this.requires.find(function(element){
    return !this.plugins[element].loaded;
  }))return;
  this.init(this.Site,this._callback);
};
Site.prototype.plugin.prototype._callback = function(){
  for(let pluginName of this._dependance){
    this.Site.plugins[pluginName]._init();
  }
};
Site.prototype.plugin.prototype._dependance = [];
Site.prototype.plugin.prototype.requires = [];

module.exports = Site;
