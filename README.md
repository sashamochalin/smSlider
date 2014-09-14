# smSlider
This is simple [JQuery](http://jquery.com) slider plugin

## Installation
* Download or clone plugin in your project:

``` bash
$ git clone git@github.com:sashamochalin/smSlider.git ./smslider/
```

* Include scripts and styles:

``` html
<link type="text/css"  rel="stylesheet" href="smslider/css/smslider.css" />
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="smslider/jquery.smslider.min.js"></script>
```		
		
* Create html with your slides:

``` html
<div id="sm_slider">
	<ul>
		<li>...</li>
		<li>...</li>
		<li>...</li>
	</ul>
</div>
```

* Apply slider for your list:

``` html
<script type="text/javascript">
	$(document).ready(function(){
    		$('#sm_slider').smSlider()
	})
</script>
```

## Examples

- [Fullscreen](http://sashamochalin.github.io/smSlider/full-page.html)
- [Fader](http://sashamochalin.github.io/smSlider/fader.html)
- [Two sliders on one page](http://sashamochalin.github.io/smSlider/two-sliders.html)
		
## Options and Methods
- namespace `string`

``` javascript
    // name of prefix:
        $elem.smSlider({		
            namespace : 'sm'   		
    });
```
- start `number`

``` javascript
    // start with element:
        $elem.smSlider({		
            start : 0    		
    });
```
- transition `string`

``` javascript
    // animation type
    $elem.smSlider({
        // can be 'animate' or 'fader'
        transition : 'animate'    		
    });
```
- activeClass `string`

``` javascript
    // now showing element class
    $elem.smSlider({
        activeClass : 'active'
    });
```
- autoArr `boolean`

``` javascript
    // auto generating control buttons
    $elem.smSlider({
        autoArr : true
    });
```
- prev `string`

``` javascript
    // class of prevent control button
    $elem.smSlider({
        prev : 'sm_prev'
    });
```
- next `string`

``` javascript   
    // class of next control button
    $elem.smSlider({
        next : 'sm_next'
    });
```
- pagination `boolean`

``` javascript
    // turn on pagination buttons
    $elem.smSlider({
        pagination : true
    });
```
- typeCtrl `string`

``` javascript
    // style of pagination buttons
    $elem.smSlider({
        // can be 'dots' or 'numeric'
        typeCtrl : 'dots'
    });
```
- subMenu `boolean`

``` javascript
    // turn on additional controls
    $elem.smSlider({
        subMenu : false
    });
```
- subMenuClass `string`

``` javascript
    // css class for additional controls
    $elem.smSlider({
        subMenuClass : 'sm_submenu-item'
    });
```
- autoPlay `boolean`

``` javascript
    // auto change current slide
    $elem.smSlider({
        autoPlay : true
    });
```
- duration `number`

``` javascript
    // auto change animation speed
    $elem.smSlider({
        duration : 600
    });
```
- delay `number`

``` javascript
    // auto change timeout in milliseconds
    $elem.smSlider({
        delay : 5000
    });
```
- hoverPause `boolean`

``` javascript
    // turn on or turn off auto animation pause on hover
    $elem.smSlider({
        hoverPause : false
    });
```
- easing `string`

``` javascript
    // animation easing
    $elem.smSlider({
        // can be 'swing' or 'linear'
        easing : 'swing'
    });
```
- flexible `boolean`

``` javascript
    // width in persents
    $elem.smSlider({
        flexible : true
    });
```
- animationStart `function`

``` javascript
    // callback function, called with start animation
    $elem.smSlider({
        animationStart : function() {
            //do something...
        }
    });
```
- animationComplete `function`

``` javascript
    // callback function, called with complete animation
    $elem.smSlider({
        animationComplete : function() {
            //do something...
        }
    });
```
