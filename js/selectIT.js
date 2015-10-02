/**
 * SelectIT.js jQuery plugin
 * https://github.com/cojok/selectIT.js
 *
 * Copyright 2015 Flavius Cojocariu <cojokka@gmail.com>
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

'use strict';

(function($){
 /**
  * [selectIT[plugin class]
  * @param {[[stirng]]} element [['.selector'] The select(s) tag selector]
  */
 var selectIT = function(element)
 {
     
     var elem = $(element);
     var _$this = this;


     /**
      * [Constructor method[Description]] 
      *  initialize SelectIT method and create the custom select option dropdown
      */
     _$this.constructor = function(){
         createSelectIT();
     };

     /**
      * [createSelectIT[Description]]
      * stores all the methods that help for initialzing the plugin
      */
     var createSelectIT = function(){
         getTemplate();
         addEvt();
     };
     
     /**
      * [getTemplate[Description]]
      * This method helps in creating the html template for the custom select option dropdown
      */
     var getTemplate = function(){
         elem.hide();
         var placeholder = '';
         if(typeof elem.data('placeholder') !== 'undefined' && elem.data('placeholder') !== '') {
             placeholder = elem.data('placeholder');
//         } else if(elem.find('option').val() == ''){
//             placeholder = elem.find('option').text();
         }else{
             placeholder = 'Select';
         }
         var container = '<div class="SelectIT-container"/>',
             selectedOption = '<div class="SelectIT-selected"><span class="placeholder">'+ placeholder +'</span></div>',
             arrows = '<div class="SelectIT-arrows"><span class="arrow"/></div>',
             optionList = $('<ul/>',{
                 'class':'SelectIT-options'
             });        
         
         elem.wrap(container)
             .after(selectedOption)
             .next('div.SelectIT-selected').append(arrows)
             .after(optionList);
         
         $.each(elem.find('option'),function(i,v){
             $('<li/>',{
                 'class': 'option'+i,
                 'data-val'  : $(this).val(),
                 'text' : $(this).text()
             }).appendTo(optionList);
         });

     };
     
     
     var addEvt = function(){
        
         var options = elem.closest('.SelectIT-container').find('ul > li'),
            container = elem.closest('.SelectIT-container'),
            list = elem.closest('.SelectIT-container').find('ul');
         
         options.click(function(){
             var _$this = $(this),
                 val = _$this.text();
             
             elem.closest('.SelectIT-container').find('ul > li').removeClass('selected');
             elem.find('option').removeAttr('selected');
             
             _$this.addClass('selected');
             elem.closest('.SelectIT-container').find('.SelectIT-selected > span.placeholder').text(val);
             elem.find('option').eq(_$this.index()).attr('selected','selected').closest('select').trigger('change');
             
             
         });
         
//          elem.change(function(){
//                 console.log('this is onchange evt');
//          });
//            
         
         container.click(function(e){
             e.stopPropagation();
             _$this = $(this);
             $('.SelectIT-container').not(_$this).removeClass('with-dropdown').find('ul').removeClass('active');
             _$this.find('ul').toggleClass('active');
             
             if(_$this.hasClass('with-dropdown')){
                 _$this.removeClass('with-dropdown');
             }else {
                 _$this.addClass('with-dropdown');
             }
             
         });
         
         $(document).on('click',function(){
             var container = elem.closest('.SelectIT-container');
             container.find('ul').fadeOut();
         });
         
     };
     
 };

 $.fn.selectIT = function(){
     
     return this.each(function()
     {
         var element = $(this);

         // Return early if this element already has a plugin instance
         if (element.data('selectIT')) return;

         // pass options to plugin constructor
         var select = new selectIT(element);

         select.constructor();
         // Store plugin object in this element's data
         element.attr('data-selectIT', 'selectIT');
     });
 };
})(jQuery);