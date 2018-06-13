var http = require('http');
var fs = require('fs');
module.exports = {
    init:function(Site,callback){
        Site.server = {};
        Site.server.server = http.createServer(function(request,response){
            Site.server.handleHttpRequest(request,response);
        });
        console.log(Site.config);
        Site.server.server.listen(Site.config.port,Site.config.hostName,function(error){
            if(error){
                console.log(error);
            }
            callback();
        });
        Site.server.handleHttpRequest = function(request,response){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(Site.server.getPage(JSON.parse(fs.readFileSync('index.json', 'utf8'))));
        };
        Site.server.getPage = function(jsonObject){
            var $html = Site.$('<html></html>');
            var html = '<head><title>'+jsonObject.title+'</title></head><body>';
            for(let elementDefinition of jsonObject.content){
              html += Site.ui.parseElement(elementDefinition);
            }
            return html;
            return $html.outerHTML();
        };
    },
    requires:'ui',
};

