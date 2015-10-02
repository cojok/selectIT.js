# selectIT.js
custom select option dropdown 

V0.1 - beta is here

This is only the beta version of the plugin. Hope you enjoy it!

This plugin is here to help customizing the select option dropdown. The only thing you need to do is to customize the standard css/less in order to have your own nice styled dropdown. 

This was tested in the lates versions of FireFox, Chrome and Safari. I have also tested it in IE(10&9) and it worked good. In IE8 I didn't tried it, but if you need IE8 support then this is not for you.

Please check my todo list file to see what is comming up.


How to use the selectIT.js plugin:

```HTML
<select name="selectIT" id="SelectIT" placeholder="SelectIT">
        <option value="Jan">January</option>
        <option value="Feb">February</option>
        <option value="Mar">March</option>
        <option value="Apr">April</option>
        <option value="May">May</option>
    </select>
```

```javascript
$(function () {
    $('.selectIT').selectIT();
  });
```


