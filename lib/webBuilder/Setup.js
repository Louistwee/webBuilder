var http = require('http');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var mime = require('mime-types');
var site = require('./Site.js');
function Setup(options) {
  fs.writeFileSync('config.json', JSON.stringify(require('./Setup/config.js')), 'utf8');
  fs.writeFileSync('index.json', JSON.stringify(require('./Setup/startpage.js')), 'utf8');
  return new site({
  });
};
module.exports = Setup;
