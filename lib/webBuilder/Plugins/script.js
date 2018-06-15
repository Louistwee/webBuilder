module.exports = {
    init:function(Site,callback){
        Site.script = {
            renderScript: function(){
                var script = '';
                for(var i in this.scripts){
                    if(!this.scripts[i].disabled)script += "(\n" + this.scripts[i].script + "\n)(window.Site);";
                }
                return script;
            },
            addScript: function(name,fn){
                this.scripts[name] = {script:fn.toString(),disabled:false,name:name};
                return this.scripts[name];
            },
            scripts:{}
        };
        Site.script.addScript('script',function(){
            window.Site = {
                
            };
        })
        callback();
    },
}

