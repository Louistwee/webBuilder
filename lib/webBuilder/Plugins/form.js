var form = {
    init:function(Site,callback){
        var $ = Site.$;
        Site.ui.addElement('button',{
            load:function(elementDefinition){
                if(elementDefinition.reset)return $('<input type="reset" class="button">').attr('value',elementDefinition.label);
                if(elementDefinition.submit)return $('<input type="submit" class="button">').attr('value',elementDefinition.label);
                return $('<button class="button"></button>').text(elementDefinition.label);
            },
            css:{
                '.button':{
                    cursor:'@buttonCursor',
                    border:'0.2em solid #d3d3d3',
                    margin:'0px',
                    fontSize:'@textSize',
                    padding:'0.5em 1em',
                    background:'transparent',
                },
                 '.button:hover':{
                    borderColor:'#add8e6',
                },
            },
            theme:{
                buttonCursor:'pointer',
            },
            def:{
                reset:false,
                submit:false,
                label:'',
            },
        });
        Site.ui.addElement('form',{
            load:function(elementDefinition){
                var $form = $('<form></form>');
                $form.attr({
                    action:elementDefinition.action,
                    method:elementDefinition.method,
                })
                for(let element of elementDefinition.content){
                    $form.append(Site.ui.loadElement(element));
                }
                return $form;
            },
            def:{
                action:'#',
                method:'get',
                content:[],
            }
        });
        Site.ui.addElement('fieldset',{
            load:function(elementDefinition){
                var $field = $('<fieldset></fieldset>');
                $field.append($('<legend></legend>').text(elementDefinition.label));
                for(let element of elementDefinition.content){
                    $field.append(Site.ui.loadElement(element));
                }
                return $field;
            },
            css:{
                '@small fieldset':{
                    borderWidth:'0.2em 0px',
                    
                },
                'fieldset':{
                    border:'0.2em solid #d3d3d3',
                    margin:'2em auto',
                    padding:'1em 0px',
                    maxWidth:'@pageWidth',
                },
                'fieldset > legend':{
                    border:'0.2em solid #d3d3d3',
                    borderBottomWidth:'0px',
                    margin:'0px 0px 2.25em 0px',
                    padding:'0.5em 1em'
                },
                'fieldset:hover':{
                    borderColor:'#add8e6'
                },
                'fieldset:hover > legend':{
                    borderColor:'#add8e6'
                },
                'fieldset:disabled, fieldset.error':{
                    borderColor:'#ff5656'
                },
                'fieldset:disabled > legend , fieldset.error > legend':{
                    borderColor:'#ff5656'
                }
            },
        });
        Site.ui.addElement('rating',{
            load:function(elementDefinition){
                var $rating = $('<div class="rating"></div>');
                var $label = $('<span class="label"></span>').text(elementDefinition.label);
                var verryRandom = elementDefinition.name ? elementDefinition.name : Number(new Date())+Math.random();
                for (let i = 0; i < elementDefinition.rating; i++) {
                    $rating.append($('<label></label>').attr({
                        'for':verryRandom + i,
                    })).append($('<input>').attr({
                        name:verryRandom,
                        type:'radio',
                        value:i+1,
                        checked:(i+1 === elementDefinition.value),
                        id:verryRandom + i,
                    }));
                }
                return $('<div class="form-element"></div>').append($label).append($rating);
            },
            css:{
                '.rating':{
                    display:'inline-block',
                },
                '.rating label':{
                    width:'24px',
                    height:'24px',
                    display:'inline-block',
                },
                'body .rating label':function(theme){
                    return {
                        backgroundImage:Site.icons.getCssIcon('star',theme.ratingColor),
                    };
                },
                '.rating:not(:hover) input:checked ~ label, .rating label:hover ~ label':function(theme){
                    return {
                        backgroundImage:Site.icons.getCssIcon('star-outline',theme.ratingColor),
                    };
                },
                '.rating input':{
                    position:'fixed',
                    top:'-10000px',
                    left:'-10000px'
                },
                '.label':{
                    display:'block',
                }
            },
            theme:{
                ratingColor:'#FFFF00',
            },
            def:{
                label:'',
                rating:5,
                value:5,
                name:false,
            },
        });
        Site.ui.addElement('buttonGroup',{
            load:function(elementDefinition){
                var $group = $('<div class="button-group"></div>');
                for(let element of elementDefinition.content){
                    $group.append(Site.ui.loadElement(element));
                }
                return $group;
            },
            css:{
                '.button-group > .button:not(:first-child)':{
                    borderLeftWidth:'0px',
                },
                '.button-group:hover > .button':{
                    borderColor:'#add8e6',
                }
            },
            def:{
                content:[]
            }
        });
        Site.ui.addElement('hr',{
            load:function(elementDefinition){
                return $('<hr class="hr"></hr>');
            },
            css:{
                'hr':{
                    border:'0em solid #d3d3d3',
                    borderTopWidth:'0.2em',
                    margin:'1em auto',
                    maxWidth:'@pageWidth',
                },
            },
        });
        callback();
  },
  requires:'ui'
};
module.exports = form;
