var http = require('http');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var mime = require('mime-types');
var site = require('./Site.js');
var startPage = {
  title: 'Welcome!',
  content: [
    {
      type: 'markdown',
      markdown: "# Hello World\n## Test\n###### Double **test** \n Text text *text **text** text * text",
    },
  ],
};
function Setup(options) {
  fs.writeFileSync('config.json', JSON.stringify({
    port: '8080',
    host: '127.0.0.1',
    plugins: ['ui','markdown'],
  }), 'utf8');
  fs.writeFileSync('index.json', JSON.stringify(startPage), 'utf8');
  return new site({
  });
};
module.exports = Setup;
