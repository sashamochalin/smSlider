# smSlider
This is simple [JQuery](http://jquery.com) slider plugin

## Installation
1. Download or clone plugin in your project:

		git clone git@github.com:sashamochalin/smSlider.git ./smslider/

2. Include scripts and styles:

		<link type="text/css"  rel="stylesheet" href="smslider/sm.slider.css" />
		<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
		<script type="text/javascript" src="smslider/jquery.sm.slider.min.js"></script>
		
3. Create html with your slides:

		<div id="sm_slider">
    		<ul>
        		<li>...</li>
        		<li>...</li>
        		<li>...</li>
    		</ul>
		</div>
		
4. Apply slider for your list:

		<script type="text/javascript">
			$(document).ready(function(){
    			$('#sm_slider').smSlider()
			})
		</script>
		
## Examples

- [Fullscreen](http://sashamochalin.github.io/smSlider/full-page.html)
- [Fader](http://sashamochalin.github.io/smSlider/fader.html)
- [Two sliders on one page](http://sashamochalin.github.io/smSlider/two-sliders.html)
		
## Options and Methods
- start `number`

		// start with element:
		$elem.smSlider({		
    		start : 0    		
		});

- transition `string`

		// animation type
		$elem.smSlider({
			// can be 'animate' or 'fader'
    		transition : 'animate'    		
		});

- activeClass `string`

		// now showing element class
		$elem.smSlider({
    		activeClass : 'active'
		});

- autoArr `boolean`


		// auto generating control buttons
		$elem.smSlider({
    		autoArr : true
		});
		
- prev `string`
		
		// class of prevent control button
		$elem.smSlider({
    		prev : 'sm_prev'
		});

- next `string`
		
		// class of next control button
		$elem.smSlider({
    		next : 'sm_next'
		});

- pagination `boolean`

		// turn on pagination buttons
		$elem.smSlider({
    		pagination : true
		});

- typeCtrl `string`

		// style of pagination buttons
		$elem.smSlider({
			// can be 'dots' or 'numeric'
    		typeCtrl : 'dots'
		});

- subMenu `boolean`

		// turn on additional controls
		$elem.smSlider({
    		subMenu : 'sm_submenu-item'
		});

- subMenuClass `string`

		// css class for additional controls
		$elem.smSlider({
    		subMenuClass : 'sm_submenu-item'
		});

- autoPlay `boolean`

		// auto change current slide
		$elem.smSlider({
    		autoPlay : true
		});

- duration `number`

		// auto change animation speed
		$elem.smSlider({
    		duration : 600
		});

- delay `number`

		// auto change timeout in milliseconds
		$elem.smSlider({
    		delay : 5000
		});

- hoverPause `boolean`

		// turn on or turn off auto animation pause on hover
		$elem.smSlider({
    		hoverPause : false
		});

- easing `string`

		// animation easing
		$elem.smSlider({
			// can be 'swing' or 'linear'
    		easing : 'swing'
		});

- flexible `boolean`

		// width in persents
		$elem.smSlider({
    		flexible : true
		});

- animationStart `function`

		// callback function, called with start animation
		$elem.smSlider({
    		animationStart : function() {
        		//do something
    		}
		});

- animationComplete `function`

		// callback function, called with complete animation
		$elem.smSlider({
    		animationComplete : function() {
        		//do something
    		}
		});

