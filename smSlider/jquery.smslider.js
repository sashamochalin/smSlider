(function( $ ){
  $.fn.smSlider = function(options) {
  var defaults = {
        start        : 0,
        activeClass  : 'active',
        autoArr      : true,
        innerBlock   : 'sm_slider-inner',
        prev         : 'smprev',
        next         : 'smnext',
        children     : 'sm_slide',
        pagination   : true,
        subMenu      : false,
        subMenuClass : 'sm_submenu-item',
        autoPlay     : false,
        delay        : 3000,
        hoverPause   : true,
        easing       : 'swing',
        duration     : 800,
        keyboard     : true,
        flexible     : false              
  };
  var options = $.extend(defaults, options);
  return this.each(function() {  	
    var slideMove = function (toIndex, direction){
        var moveNext = smSlideWidth;
        var movePrev = -1*moveNext;

        if (direction == 'next') {
            currPos = movePrev;
            nextPos = moveNext; 
        } else {
            currPos = moveNext;
            nextPos = movePrev;
        }

        $smSliderInner.children('.'+options.children+'.'+options.activeClass).stop().animate({
            'left' : currPos
        }, {
            duration : options.duration,
            easing : options.easing,
            complete: function(){
                $(this).removeClass(options.activeClass);
            }
        });
        $smSlide.eq(toIndex).css('left', nextPos).addClass(options.activeClass).stop().animate({
            'left' : 0
        }, {
            duration: options.duration,
            easing: options.easing
        });
        if (options.pagination) {
			$smNavItem.removeClass(options.activeClass);
			$smNavItem.eq(toIndex).addClass(options.activeClass);
		}
		if (options.subMenu) {
            $subMenu.removeClass(options.activeClass);
            $subMenu.eq(toIndex).addClass(options.activeClass);
		}
    };
    var $smSlider      = $(this);
    var smSlideWidth   = $smSlider.width();
    if(options.flexible) {
        $(window).resize(function(){
            smSlideWidth = $smSlider.width();       
        });
    };
    var $smSliderInner = $('<div/>').addClass(options.innerBlock).appendTo(this);
    var $smSlide       = $smSlider.children('.'+options.children);
    var smSlideSizer   = $smSlide.length;

    if (options.start > smSlideSizer - 1) {
        var cIndex = smSlideSizer - 1;
    } else {
        var cIndex = options.start;
    }
        $smSlide.appendTo($smSliderInner);
        $smSlide.eq(cIndex).addClass(options.activeClass);
    if (smSlideSizer > 1) {
        var $elemCtrl = $('<i/>');
        if (options.autoArr) {
            var $smPrev = $elemCtrl.clone().addClass(options.prev);
            var $smNext = $elemCtrl.clone().addClass(options.next);
            $smPrev.appendTo($smSlider);
            $smNext.appendTo($smSlider);           
        } else {
            var $smPrev = $('.'+options.prev);
            var $smNext = $('.'+options.next);
        }
        if (options.pagination) {
            var $smNav = $('<ul/>').addClass('sm_nav');
            var $smNavItem = $('<li/>');
            $smNav.appendTo($smSlider);
            for (i=0; i < smSlideSizer; i++) {
                $smNavItem.clone().data({
                        'index' : i
                        }).addClass('sm_nav-item')
                         .appendTo($smNav);
            }
            var $smNavItem = $('.sm_nav-item');
            $smNavItem.eq(cIndex).addClass(options.activeClass);
        }
    if (options.subMenu) {
		var $subMenu = $('.' + options.subMenuClass);
	       	$subMenu.eq(cIndex).addClass(options.activeClass);
	}		
    }
    if(options.autoPlay) {
        var timeOut = null;
        var autoPlay = function(){
            cIndex++;
            if (cIndex >= smSlideSizer) {
                cIndex = 0;            
            };
            slideMove(cIndex, 'next')
        };
        timeOut = setInterval(autoPlay, options.delay);
        if(options.hoverPause) {
            $(this).hover(function(){
                timeOut = clearInterval(timeOut);   
            }, function(){
                timeOut = setInterval(autoPlay, options.delay);
            })
        }
    };
    $smPrev.bind('click', function(){
        cIndex--;       
        if (cIndex < 0) {
            cIndex = smSlideSizer - 1;
        }
        slideMove(cIndex, 'prev');
    });
    $smNext.bind('click', function(){
        cIndex++;
        if (cIndex >= smSlideSizer) {
            cIndex = 0;            
        }
        slideMove(cIndex, 'next');
    });
    if (options.pagination) {
        $smNavItem.on('click', function(){
            navIndex = $(this).data('index');
            if(navIndex > cIndex) {
                direction = 'next'
            } else {
                direction = 'prev'
            }
            if($(this).data('index') != cIndex) {
                cIndex = navIndex;
                slideMove(cIndex, direction);                
            }
        })
    };
    if (options.subMenu) {
        $subMenu.bind('click', function(){
            subIndex = $(this).data('index');
            if(subIndex > cIndex) {
                direction = 'next'
            } else {
                direction = 'prev'
            }
            if( (subIndex != cIndex) && (subIndex <= (smSlideSizer-1))) {
                cIndex = subIndex;
                slideMove(cIndex, direction);                
            }
        })
    };
    if (options.keyboard) {
        $(document).keyup(function(e){
            switch (e.keyCode) {
                case 37:
                    cIndex--;       
                    if (cIndex < 0)
                        cIndex = smSlideSizer - 1;
                    slideMove(cIndex, 'prev');
                break
                case 39:
                    cIndex++;
                    if (cIndex >= smSlideSizer)
                        cIndex = 0;
                    slideMove(cIndex, 'next');
                break
                case 27:
                    if(cIndex != 0) {
                        cIndex = 0;
                        slideMove(cIndex, 'prev');                    
                    }
                break
            }
        })
    };
  });
 };
})( jQuery );