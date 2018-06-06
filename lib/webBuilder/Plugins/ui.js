var EE = require('events').EventEmitter;

function ui(Site){
  this.elements = {};
  this.Site = Site;
  return;
}
ui.prototype = new EE();
ui.prototype.addElement = function(name,definition){
  this.elements[name] = definition;
}
ui.prototype.parseElement = function(elementDefinition){
  return this.elements[elementDefinition.type].parse(elementDefinition);
}

var uiObject = {
  init:function(Site){
    Site.ui = new ui(Site);
  },
};
module.exports = uiObject;
