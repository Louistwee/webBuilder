var html = {
  init:function(Site,callback){
    Site.ui.addElement('html',{
      parse:function(elementDefinition){
        return elementDefinition.html;
      }
    });
    callback();
  },
  requires:'ui',
};
module.exports = html;
