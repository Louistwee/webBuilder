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
            var $html = Site.$('<html><head></head><body></body></html>');
            var $body = $html.find('body');
            $html.find('head').appendChild('<title>'+jsonObject.title+'</title>')
            for(let elementDefinition of jsonObject.content){
                $body.append(Site.ui.loadElement(elementDefinition));
            }
            return $html.outerHTML();
        };
    },
    requires:'ui',
};


