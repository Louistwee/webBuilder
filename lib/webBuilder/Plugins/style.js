module.exports = {
    init:function(Site,callback){
        var $ = Site.$;
        Site.style = {
            createStyleSheet:function(options){
                var style = '';
                for(let i in Site.ui.elements){
                    let element = Site.ui.elements[i];
                    if(element.createCss){
                        let elementStyle = element.createCss();
                        for(let selector in elementStyle){
                            style += selector + '{' + $('<p></p>').css(elementStyle[selector]).attr('style') + '}' + "\n";
                        }
                    }
                    
                }
                this.styleSheets[options.name] = style;
                return style;
            },
            styleSheets:{},
        };
        callback();
    },
    requires:'ui',
};

