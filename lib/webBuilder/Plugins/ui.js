var EE = require('events').EventEmitter;
var JSDOM = require("jsdom").JSDOM;
var jquery = require('jquery');

function ui(Site){
  this.elements = {};
  this.Site = Site;
  this.scripts = {};
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
    var el = this.elements[elementDefinition.type];
    return el.load(this.$.extend({},(el.def ? el.def : {}),elementDefinition));
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
    Site.ui.$.fn.textNodes = function(el) {
        return Site.$(this).find(":not(iframe)").addBack().contents().filter(function() {
            return this.nodeType == 3;
        });
    };
    /*Site.ui.$.fn.findOnlyImageInP = function(){
        var elements = [];
        Site.$(this).each(function(index,element){
            var $element = $(element);
            if($element.is('p') && $element.find('img') && $element.children().length == 1){
                elements.push($element.children()[0]);
            }
        })
        return $(elements);
    },*/
    callback();
  },
  requires:'icons',
};
module.exports = uiObject;
