module.exports = {
    init:function(Site,callback){
        var $ = Site.$;
        Site.style = {
            renderStyle:function(options){
                var style = '';
                var printStyle = '';
                var smallStyle = '';
                var theme = this.renderTheme({});
                var elements = $.extend({},{default:{css:this.defaultStyle}},Site.ui.elements);
                for(let i in elements){
                    let element = elements[i];
                    if(element.css){
                        let elementStyle = element.css;
                        for(let selector in elementStyle){
                            let print = (selector.indexOf('@print') > -1);
                            let small = (selector.indexOf('@small') > -1);
                            let selectedStyle = elementStyle[selector];
                            try{
                                selectedStyle = selectedStyle(theme);
                            }catch(err){
                               err = false; 
                            }
                            
                            for(let i in selectedStyle){
                                selectedStyle[i] = selectedStyle[i].toString().replace(/\@([a-zA-Z]+)/m,function(match,group){
                                    return theme[group];
                                });
                            }
                            let rendStyle = selector.replace('@print','').replace('@small','') + '{' + $('<p></p>').css(selectedStyle).attr('style') + '}' + "\n";
                            if(print){
                                printStyle += rendStyle;
                            }else if(small){
                                smallStyle += rendStyle;
                            }else{
                                style += rendStyle;
                            };
                        }
                    }
                }
                this.styleSheets[options.name ? options.name : 'def'] = style = style + "\n @media print {\n" + printStyle + "}\n @media screen and (max-width: "+theme.pageWidth+") {\n" + smallStyle + "\n}";
                return style;
            },
            styleSheets:{},
            defaultStyle:{
                'body, html':{
                    margin:0,
                    padding:0,
                    fontFamily:'@mainFont',
                },
                'h1, h2, h3, h4, h5, h6':{
                    fontFamily:'@headingFont',
                    textTransform:'@headingTextCap',
                    color:'@headingColor',
                    maxWidth:'@pageWidth',
                    margin:'auto',
                },
                
                h6:{
                    fontSize:'@small',
                },
                h5:{
                    fontSize:'@small',
                },
                h4:{
                    fontSize:'@medium',
                },
                h3:{
                    fontSize:'@medium',
                },
                h2:{
                    fontSize:'@large',
                },
                h1:{
                    fontSize:'@huge',
                },
                'h1, h2, h3':{
                    borderBottom:'@headingUnderLine',
                },
                p:{
                    color:'@textColor',
                    fontFamily:'@textFont',
                    maxWidth:'@pageWidth',
                    margin:'auto',
                },
                
                '.img':{
                    display:'block',
                    margin:'@imageMargin 0px',
                    textAlign:'center',
                },
                '.img:not(.inline) img':{
                    width:'100%',
                    maxWidth:'@pageWidth',
                },
                '.inline.img':{
                    display:'inline-block',
                },
                '.img .caption':{
                    color:'@captionColor',
                    fontFamily:'@mainFont',
                    textAlign:'center',
                    width:'100%',
                    display:'block',
                },
                '.img.link .caption':{
                    textDecoration:'underline @captionColor'
                },
                '.img.round img':{
                    width:'@imageRoundSize',
                    height:'@imageRoundSize',
                    borderRadius:'50%',
                },
                '.img.wide img':{
                    width:'100%',
                    maxWidth:'unset',
                },
                '.img.inline.round':{
                    width:'200px',
                },
                '.img.inline.wide':{
                    maxWidth:'@pageWidth',
                },
            },
            defaultTheme:{
                /*page*/
                pageWidth:'800px',
                /*color*/
                primaryColor:'#222222',
                secundaryColor:'#222222',
                /*font*/
                mainFont:'arial',
                secundaryFont:'@mainFont',
                /*text*/
                textColor:'@black',
                textFont:'@mainFont',
                textSize:'16px',
                /*heading*/
                headingColor:'@textColor',
                headingTextCap:'capitalize',
                headingUnderLine:'1px solid @headingColor',
                headingFont:'@secundaryFont',
                /*image*/
                imageDefault:'wide',
                imageDefaultInline:'round',
                imageRoundSize:'200px',
                imageMargin:'50px',
                /*caption*/
                captionColor:'gray',
            },
            renderTheme:function(theme1){
                var theme = $.extend({},this.defaultTheme);
                let el = Site.ui.elements;
                for(let i in el){
                    if(el[i].theme)$.extend(theme,el[i].theme);
                }
                $.extend(theme,theme1);
                var themeNotReady = true;
                while(themeNotReady){
                    themeNotReady = false;
                    for(var settingName in theme){
                        theme[settingName] = theme[settingName].replace(/\@([a-zA-Z]+)/m,function(match,group){
                            themeNotReady = true;
                            return theme[group];
                        })
                    }
                }
                return theme;
            },
        };
        callback();
    },
    requires:'ui',
};

