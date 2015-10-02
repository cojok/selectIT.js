# selectIT.js
custom select option dropdown 

V0.1 - beta is here

This is only the beta version of the plugin. Hope you enjoy it!

This plugin is here to help customizing the select option dropdown. The only thing you need to do is to customize the standard css/less in order to have your own nice styled dropdown. 

This was tested in the lates versions of FireFox, Chrome and Safari. I have also tested it in IE(10&9) and it worked good. In IE8 I didn't tried it, but if you need IE8 support then this is not for you.

Please check my todo list file to see what is comming up.

Features:
  1. Long text is truncated;
  2. On hover long text is visible in a nice way;
  3. Easy to customize;
  4. LESS version;
  5. jQuery dependent

How to use the selectIT.js plugin:

1. In the HTML select tag you need to have:
    * name(a msut for using it in a ajax call);
    * class,id or nothing for identifying the element for the plugin
    * placeholder for having the placeholder text for the list
    * options must have values in order to trigger the change event on the select
	* options with property disabled are acting the same in the SelectIT.js plugin
    * TBA

	```HTML
	<select name="selectIT" class="selectIT" placeholder="SelectIT">
			<option value="Jan">January</option>
			<option value="Feb">February</option>
			<option value="Mar">March</option>
			<option value="Apr">April</option>
			<option value="May">May</option>
		</select>
	```

2. JS calling for the plugin:

	```javascript
	$(function () {
		$('.selectIT').selectIT();
	  });
	```

3. SelectIT.js validation needs to be made on the select tag as a normal validation for non custom select tag. This is posible because the SelectIT.js plugin is changing also the select tag value according to the plugin selected element.


