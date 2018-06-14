module.exports = {
    init:function(Site,callback){
        var $ = Site.$;
        Site.style = {
            createStyleSheet:function(options){
                var style = '';
                var printStyle = '';
                for(let i in Site.ui.elements){
                    let element = Site.ui.elements[i];
                    if(element.createCss){
                        let elementStyle = element.createCss(Site.theme);
                        for(let selector in elementStyle){
                            let print = selector.indexOf('@print') == 0;
                            let rendStyle = selector.replace('@print','') + '{' + $('<p></p>').css(elementStyle[selector]).attr('style') + '}' + "\n";
                            if(!print){
                                style += rendStyle;
                            }else{
                                printStyle += rendStyle;
                            }
                        }
                    }
                    
                }
                this.styleSheets[options.name] = style;
                return style;
            },
            styleSheets:{},
        };
        Site.theme = {
            title:{
                color: '#111', 
                fontFamily: "'Open Sans Condensed', sans-serif",
                fontSize: '64px',
                fontWeight: '700',
                lineHeight: '64px',
                margin: '0 auto 50px',
                padding: '20px 50px',
                textAlign: 'center',
                textTransform: 'uppercase',
                borderBottom:'5px solid #111',
            },
            heading:{
                display:'block',
            },
            text:{
                fontSize:'16px',
            },
            image:{
                style:'wide',
                inline:'round',
            },
            caption:{
                color:'gray',
                fontFamily:'Arial',
            },
        };
        callback();
    },
    requires:'ui',
};

