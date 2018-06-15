module.exports = {
    init:function(Site,callback){
        Site.icons = {
            list:require('@mdi/util').getMeta(true),
            getIcon:function(name){
                return this.list.find(function(icon){
                    return icon.name === name;
                })
            },
            getIconSvg:function(options){
                var icon = this.getIcon(options.name);
                return '<?xml version="1.0" encoding="UTF-8" ?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="24" height="24" viewBox="0 0 24 24" svg-author="' + icon.author + '" ><path fill="' + options.color + '" d="' + icon.path + '" /></svg>';
            },
            getCssIcon:function(name,color){
                return 'url('+this.getDataURI({name:name,color:color})+')';
            },
            getDataURI:function(options){
                return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(this.getIconSvg(options));
            }
        }
        callback();
    },
};


