var marked = require('marked');
var markdown = {
    init:function(Site,callback){
        var renderer = new marked.Renderer();
        renderer.image = function(href,title,text){
            var words = ['wide','round','inline'];
            classes = '';
            for(let word of words){
                if(text.indexOf('{'+word+'}') === 0){
                    text = text.replace('{'+word+'}','');
                    classes += ' ' + word;
                    if(word === 'inline'){
                        var inline = true;
                    }
                }
            }
            return (inline ? '' : '</p>')+'<a href="'+href+'"><img src="'+href+'" alt="'+text+'" title="'+(title ? title : text)+'" class="'+classes+'"></a><br><div class="caption">'+text+'</div>'+(inline ? '' : '<p>');
        };
        console.log(renderer);
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
            createCss:function(theme){
                return {
                    '.markdown h2, .markdown h3, .markdown h4, .markdown h5, .markdown h6':theme.heading,
                    '.markdown > *':$.extend({
                        textAlign:'left'
                    },{
                        maxWidth:'50rem',
                        margin:'auto',
                    }),
                    '.markdown > h1':$.extend({
                        maxWidth:'60rem',
                    },theme.title),
                    '.markdown img.round':{
                        width:'200px',
                        height:'200px',
                        borderRadius:'50%',
                    },
                    '.markdown img.wide':{
                        maxWidth:'unset',
                        margin:'0',
                    },
                    '.markdown img':{
                        width:'100%',
                        maxWidth:'50rem',
                        marginTop:'3em',
                        marginBottom:'3em',
                    },
                    '.markdown div.caption':$.extend({
                        position:'relative',
                        top:'-3em',
                        display:'inline-block',
                    },theme.caption),
                    '.markdown':{
                        width:'100%',
                        padding:0,
                        margin:0,
                        textAlign:'center',
                    },
                };
            },
        });
        callback();
  },
  requires:'ui',
};
module.exports = markdown;
