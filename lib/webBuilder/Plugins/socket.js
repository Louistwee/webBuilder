var WebSocket = require('ws');
var url = require('url');
module.exports = {
    init:function(Site,callback){
        Site.socket = new WebSocket.Server({ noServer: true });
        Site.socket.on('connection', function connection(ws) {
            console.log(ws);
        });
        Site.server.server.on('upgrade', function upgrade(request, socket, head) {
            const pathname = url.parse(request.url).pathname;

            if (pathname === '/socket') {
                Site.socket.handleUpgrade(request, socket, head, function done(ws) {
                    Site.socket.emit('connection', ws, request);
                });
            } else {
                socket.destroy();
            }
        });
        Site.script.addScript('socket',function(Site){
            Site.socket = new WebSocket(window.location.toString().replace('http','ws').replace(/([^:]*:\/\/[^\/]*\/)(.*)/m,function(x,g){return g}) + 'socket');
            console.log(Site.socket);
            var socket = Site.socket;
            socket.onload(function(){
                alert('socket ready');
            })
            socket.onerror(function(){
                alert('socket error');
            })
        });
        callback();
    },
    requires:'server',
};

