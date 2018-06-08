var http = require('http');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var mime = require('mime-types');

function Site(){
  var self = this;
  if(fs.existsSync('config.json')){
    this.configFile = fs.readFileSync('config.json', 'utf8');
    this.config = JSON.parse(this.configFile);
  };
  this.server = http.createServer(function(request,response){
    self.handleHttpRequest(request,response);
    self.emit('httpRequest',request,response);
  });
  this.server.listen(this.config.port,this.config.hostName,function(error){
      if(error){
          console.log(error);
      }
        self.emit('serverStarted');
  });
  this.plugins = {};
  this.loadPlugins();
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
  for(var plugin of this.config.plugins.toString().split(',')){
    this.loadPlugin(plugin);
  }
  for(let pluginName in this.plugins){
    let plugin = this.plugins[pluginName];
    if(plugin.requires.length === 0){
        setTimeout(function(){plugin._init();},0);
    }else{
        for(let req of plugin.requires.toString().split(',')){
            let reqPlugin = this.plugins[req];
            reqPlugin._dependance += reqPlugin._dependance.length ? (',' + pluginName) : (pluginName);
        }
    }
  }
};
Site.prototype.loadPlugin = function(pluginName){
  try{
    var pl = require('./plugins/' + pluginName + '.js');
    this.plugins[pluginName] = new this.plugin(pluginName,pl,this);
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
  this._dependance = "";
  return;
};
Site.prototype.plugin.prototype._init = function(){
    var self = this;
  if(this.requires.toString().split(',').find(function(element){
    if(!element)return false;
    return !self.Site.plugins[element].loaded;
  }))return;
  this.init(this.Site,function(){
      self._callback();
  });
};
Site.prototype.plugin.prototype._callback = function(){
    console.log('Plugin loaded: ',this.name);
    this.loaded = true;
  for(let pluginName of this._dependance.toString().split(',')){
      if(pluginName)this.Site.plugins[pluginName]._init();
  }
};
Site.prototype.plugin.prototype.requires = '';

module.exports = Site;