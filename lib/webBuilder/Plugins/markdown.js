var mdObj = [
  [/^#{6}(.+)$/gm,function(text,$){
    return '<h6>'+text+'</h6>';
  }],
  [/^#{5}(.+)$/gm,function(text){
    return '<h5>'+text+'</h5>';
  }],
  [/^#{4}(.+)$/gm,function(text){
    return '<h4>'+text+'</h4>';
  }],
  [/^#{3}(.+)$/gm,function(text){
    return '<h3>'+text+'</h3>';
  }],
  [/^#{2}(.+)$/gm,function(text){
    return '<h2>'+text+'</h2>';
  }],
  [/^#{1}(.+)$/gm,function(text){
    return '<h1>'+text+'</h1>';
  }],
  [/\*{2}(.+)\*{2}/gm,function(text){
    return '<b>'+text+'</b>';
  }],
  [/\*{1}(.+)\*{1}/gm,function(text){
    return '<i>'+text+'</i>';
  }],
  [/\_{2}(.+)\_{2}/gm,function(text){
    return '<b>'+text+'</b>';
  }],
  [/\_{1}(.+)\_{1}/gm,function(text){
    return '<i>'+text+'</i>';
  }],
];
var markdown = {
  init:function(Site,callback){
        var $ = Site.$;
        Site.ui.addElement('markdown',{
            parse:function(elementDefinition){
                var md = $('<p></p>').text(elementDefinition.markdown).html();
                for(let repl of mdObj){
                      md = md.replace(repl[0],function(x,y){
                          return repl[1](y,$);
                      });
                }
                return md;
            },
            load:function(elementDefinition){
                return $('<div></div>').html(this.parse(elementDefinition));
            },
            createCss:function(){
              return {
                'h1':{
                  fontFamily:'arial',
                  color:'blue',
                },
              };
            }
        });
        callback();
  },
  requires:'ui',
};
module.exports = markdown;
