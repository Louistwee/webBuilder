var html = {
  init:function(Site,callback){
    Site.ui.addElement('html',{
      parse:function(elementDefinition){
        return elementDefinition.html;
      },
      load:function(elementDefinition){
          return Site.$('<div></div>').html(elementDefinition.html);
      },
    });
    callback();
  },
  requires:'ui',
};
module.exports = html;
