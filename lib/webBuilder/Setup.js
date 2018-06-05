var http = require('http');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var mime = require('mime-types');
var site = require('./Site.js');
var startPage = {
  title:'Welcome!',
  content:[
    {
      type:'heading',
      label:'Hello World',
    },
    {
      type:'heading',
      label:'Hey',
    },
  ],
};
function Setup(options){
  fs.writeFileSync("config.json", JSON.stringify({port:'8080',host:'127.0.0.1'}),'utf8');
  fs.writeFileSync("index.html", JSON.stringify(startPage), 'utf8');
  return new site({});
};

module.exports = Setup;
