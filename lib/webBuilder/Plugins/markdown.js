var marked = require('marked');
var markdown = {
    init:function(Site,callback){
        var renderer = new marked.Renderer();
        renderer.image = function(href,title,text){
            var words = ['wide','round','inline','left','right','link'];
            classes = '';
            for(let word of words){
                if(text.indexOf('{'+word+'}') === 0){
                    text = text.replace('{'+word+'}','');
                    classes += ' ' + word;
                    if(word === 'inline'){
                        var inline = true;
                    }
                    if(word === 'right'){
                        var right = true;
                        var left = false;
                    }
                    if(word === 'left'){
                        var left = true;
                        var right = false;
                    }
                    if(word === 'link'){
                        var link = true;
                    };
                }
            }              
            return  (inline ? '' : '</p>')  //</p>
                        +(link ? '<a href="'+href+'"' : '<span ') + ' class="img '+classes+'">' //<a> or <div>
                            +'<img src="'+href+'" alt="'+text+'" '+ (title ? 'title="' + title + '"' : '') + '>' //<img>
                            +(text ? '<span class="caption">'+text+'</span>' : '') //<div></div>
                        +(link ? '</a>' : '</span>') //</a> of </div>
                    +(inline ? '' : '<p>'); //<p>
        };
        var $ = Site.$;
        Site.ui.addElement('markdown',{
            parse:function(elementDefinition){
                return marked.parse(elementDefinition.markdown,{renderer: renderer});
            },
            load:function(elementDefinition){
                var htmlMd = this.parse(elementDefinition);
                var $md = $('<div></div>').addClass('markdown').html(htmlMd);
                return $md;
            },
        });
        callback();
  },
  requires:'ui',
};
module.exports = markdown;
