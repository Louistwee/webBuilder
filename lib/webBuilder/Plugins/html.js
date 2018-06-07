var html = {
  init:function(Site){
    Site.ui.addElement('html',{
      parse:function(elementDefinition){
        return elementDefinition.html;
      }
    });
  },
  requires:['ui'],
};
module.exports = html;