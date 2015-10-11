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
  * @param {[[stirng]]} element [['selector'] The select(s) tag selector]
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
         
		 /*checking and creating the placeholder value for the dropdown. 
		 * If the select does not have the data-placeholder attribute, it gets a predefined string
		 *
		 */
		 var placeholder = '';
         if(typeof elem.data('placeholder') !== 'undefined' && elem.data('placeholder') !== '') {
             placeholder = elem.data('placeholder');
         }else{
             placeholder = 'Select';
         }
		 
		 /* creating the template elements
		  * container => the wrapper for the select and the new dorpdown
		  * selectedOption => the selectIT.js dropdown placeholder wrapper
		  * optionList => the selectIT.js dropdown options, copied from the old select
		 */
         var container = $('<div/>',{
			 'class' : 'SelectIT-container'
		 	 }),
			 
			 selectedOption = $('<div/>',{
				'class' : 'SelectIT-selected',
				 'html' : $('<span/>',{
					 'class' : 'placeholder',
					 'text'  : placeholder
				 })
			 }),
			 arrows = $('<div/>',{
				 'class' : 'SelectIT-arrows',
				 'html'  : $('<span/>',{
					 'class' : 'arrow'
				 })
			 }),
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
                 'html' : '<span>'+$(this).text()+'</span>',
				 'data-disabled': ((typeof $(this).prop('disabled') !== 'undefined' || $(this).prop('disabled') !== '') ? $(this).prop('disabled'):'false')
             }).appendTo(optionList);
			 
         });
		 
		 
		 
		 if(elem.data('deselect') === 'deselect' && typeof elem.data('deselect') != 'undefined'){
			 $('<span/>',{
				 'class' : 'deselect'
			 }).appendTo(selectedOption);
		 }
     };
	 
	 /**
      * [addEvt[Description]]
      * This method helps in creating the events needed for the selctIT.js dropdown
      */
     var addEvt = function(){
        
         var listOptions = elem.closest('.SelectIT-container').find('ul > li:not(.disabled)'),
            container = elem.closest('.SelectIT-container'),
            list = elem.closest('.SelectIT-container').find('ul'),
			deselectIcon = elem.closest('.SelectIT-container').find('.SelectIT-selected > span.deselect'),
			placeholderTxt = elem.closest('.SelectIT-container').find('.SelectIT-selected > span.placeholder').text();
		 
		 
		 // checking for disabled options
		 $.each(listOptions,function(i,v){
			 if($(this).data('disabled')){
				 $(this).addClass('disabled');	
			 }
		 });
		 
		 // eliminate disabled options from the the list selector, no click event on them
		 listOptions = listOptions.not('.disabled');
		 
		 //click event on the optios
         listOptions.click(function(){
             var _$this = $(this),
                 val = _$this.text();
             
             elem.closest('.SelectIT-container').find('ul > li').removeClass('selected');
             elem.find('option').removeAttr('selected');
             
             _$this.addClass('selected');
             elem.closest('.SelectIT-container').find('.SelectIT-selected > span.placeholder').text(val);
             elem.find('option').eq(_$this.index()).attr('selected','selected').closest('select').trigger('change');
			 deselectIcon.show();
             
         });
         
          elem.change(function(e){
			  console.log('this is onchange evt for element '+ $(this).attr('name') + ' and has value: ' + $(this).val());
                 return function(){
					 console.log('this is onchange evt for element '+ $(this).attr('name') + ' and has value: ' + $(this).val());
				 }
          });
		 
		 var hoverInterval = "";
		 
		 listOptions.hover(function(){

			 var moveLeft = $(this).find('span').width() + $(this).find('span').position().left ,
				 selector = $(this).children('span');

			 if(!(moveLeft > $(this).width())){
				 moveLeft = 0;

			 }
			 
			 hoverInterval = setInterval(function(){
				 selector.animate({
					 marginLeft:'-'+(moveLeft)/2
				 },{
					duration:3500,
					complete:function(){
					 $(this).css({
						 marginLeft : moveLeft*.8
					 });

				 }});
			 },100);

			 
		 },function(){
			 var selector = $(this).find('span');
			 clearInterval(hoverInterval);
			 selector.stop(true,true).removeAttr('style');
		 });
            
         //click event on the container
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
		 
		 //click event for deselect icon
		 deselectIcon.click(function(e){
			 e.stopPropagation();
			 var _$this = $(this);
			 
			 elem.find('option').removeAttr('selected');
			 _$this.closest('.SelectIT-selected').find('span.placeholder').text(placeholderTxt);
			 _$this.removeAttr('style');
		 });
         
		 //click event on the document in order to hide the container
         $(document).on('click',function(){
             var container = elem.closest('.SelectIT-container');
             container.find('ul').removeClass('active').closest('.SelectIT-container').removeClass('with-dropdown');
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