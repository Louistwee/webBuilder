var EE = require('events').EventEmitter;
var JSDOM = require("jsdom").JSDOM;
var jquery = require('jquery');

function ui(Site){
  this.elements = {};
  this.Site = Site;
  return;
}
ui.prototype = new EE();
ui.prototype.addElement = function(name,definition){
  this.elements[name] = definition;
};
ui.prototype.parseElement = function(elementDefinition){
  return this.elements[elementDefinition.type].parse(elementDefinition);
};
ui.prototype.loadElement = function(elementDefinition){
  return this.elements[elementDefinition.type].load(elementDefinition);
};

var uiObject = {
  init:function(Site,callback){
    Site.ui = new ui(Site);
    Site.ui.DOM = new JSDOM("", {});
    Site.ui.$ = jquery(Site.ui.DOM.window);
    Site.$ = Site.ui.$;
    Site.ui.$.fn.outerHTML = function(s) {
        return s
            ? this.before(s).remove()
            : Site.ui.$("<p>").append(this.eq(0).clone()).html();
    };
    callback();
  }
};
module.exports = uiObject;
