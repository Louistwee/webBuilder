var http = require('http');
var fs = require('fs');
var path = require('path');
module.exports = {
    init:function(Site,callback){
        var $ = Site.$;
        Site.server = {};
        Site.server.server = http.createServer(function(request,response){
            Site.server.handleHttpRequest(request,response);
        });
//        Site.server.listen = function(){
            Site.server.server.listen(Site.config.port,Site.config.hostName,function(error){
                if(error){
                    console.log(error);
                }
            });
//        }
        callback();
        Site.server.handleHttpRequest = function(request,response){
            var e = path.extname(request.url.split('?')[0]);
            if(e == '')e = '.html';
            Site.server.httpRequestActions[e.replace('.','')](request,response);
        };
        Site.server.httpRequestActions = {
            html:function(request,response){
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(Site.server.getPage(JSON.parse(fs.readFileSync('index.json', 'utf8'))));
            },
            json:function(request,response){
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(fs.readFileSync('index.json', 'utf8'));
            },
        };
        Site.server.getPage = function(jsonObject){
            var $html = $('<html></html>').html('<head></head><body></body>');
            var $body = $html.find('body');
            $html.find('head')
                    .append('<link rel="stylesheet" type="-text/css" class="ui" href="https://semantic-ui.com/dist/semantic.min.css">')
                    .append('<title>'+jsonObject.title+'</title>')
                    .append($('<style></style>').html(Site.style.styleSheets['main'] ? Site.style.styleSheets['main'] : Site.style.renderStyle({name:'main'})))
                    .append('<script>'+Site.script.renderScript()+'</script>');
            for(let elementDefinition of jsonObject.content){
                $body.append(Site.ui.loadElement(elementDefinition));
            }
            var resultHTML = $html.outerHTML();
            //console.log(resultHTML);
            return resultHTML;
        };
    },
    requires:'ui,style,script',
};


