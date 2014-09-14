/*!
 * smSlider 0.1
 * http://sashamochalin.github.io/smSlider/
 *
 * Copyright © 2013 Sasha Mochalin
 */
(function( $ ){
  $.fn.smSlider = function(options) {
  var defaults = {
        namespace         : 'sm',
        start             : 0,
        transition        : 'animate',
        activeClass       : 'active',
        autoArr           : true,
        innerBlock        : this.namespace+'_slider-inner',
        prev              : this.namespace+'_prev',
        next              : this.namespace+'_next',
        children          : this.namespace+'_slide',
        pagination        : true,
        typeCtrl          : 'dots',
        subMenu           : false,
        subMenuClass      : this.namespace+'_submenu-item',
        autoPlay          : false,
        delay             : 5000,
        hoverPause        : true,
        easing            : 'swing',
        duration          : 600,
        flexible          : false,
        animationStart    : function(){},
        animationComplete : function(){}        
  };
  var options = $.extend(defaults, options);
  return this.each(function() {
    var clickable = true;
    var slideMove = function (toIndex, direction){
        if(clickable) {
            clickable = false;
            var moveNext = smSlideWidth;
            var movePrev = -1*moveNext;
            if(direction == 'next') {
                currPos = movePrev;
                nextPos = moveNext; 
            } else {
                currPos = moveNext;
                nextPos = movePrev;
            }

            if(options.transition != 'fader') {
                $smSliderInner.children('.'+options.children+'.'+options.activeClass).stop().animate({
                    'left' : currPos
                }, {
                    duration : options.duration,
                    easing   : options.easing,
                    complete : function(){
                        $(this).removeClass(options.activeClass);
                        if (options.animationComplete) {
                            options.animationComplete(toIndex)
                        }
                    }
                });
                $smSlide.eq(toIndex).css('left', nextPos).addClass(options.activeClass).stop().animate({
                    'left' : 0
                }, {
                    duration: options.duration,
                    easing: options.easing,
                    complete : function(){
                        clickable = true;
                    }
                }); 
            } else {
                $smSliderInner.children('.'+options.children+'.'+options.activeClass).stop().fadeOut({
                    duration : options.duration,
                    easing   : options.easing,
                    complete : function(){
                        $(this).removeClass(options.activeClass);
                        if (options.animationComplete) {
                            options.animationComplete(toIndex)
                        }
                    }
                });
                $smSlide.eq(toIndex).stop().fadeIn({
                    duration : options.duration,
                    easing   : options.easing,
                    complete : function(){
                        clickable = true;             
                    }
                }).addClass(options.activeClass);
            } 
            if(options.animationStart) {
                options.animationStart(toIndex)
            }
            if(options.pagination) {
                $smNavItem.removeClass(options.activeClass);
                $smNavItem.eq(toIndex).addClass(options.activeClass);
            }
            if(options.subMenu) {
                $subMenu.removeClass(options.activeClass);
                $subMenu.eq(toIndex).addClass(options.activeClass);
            }
        } else {
            return false;
        }
    };
    var $smSlider      = $(this);
    var smSlideWidth   = $smSlider.width();
    var smSlideHeight  = $smSlider.height();
    if(options.flexible) {
        $(window).resize(function(){
            smSlideWidth = $smSlider.width();       
        });
    };
    var $smSliderInner = $smSlider.children('ul').addClass(options.innerBlock);
        $smSliderInner.css({'height'   :smSlideHeight,
                            'overflow' : 'hidden',
                            'position' : 'relative',
                            'width'    : '100%'
                          });
    var $smSlide       = $smSliderInner.children('li').addClass(options.children);
    var smSlideSizer   = $smSlide.length;
    if (options.start > smSlideSizer - 1) {
        var cIndex = smSlideSizer - 1;
    } else {
        var cIndex = options.start;
    }
        $smSlide.appendTo($smSliderInner);
        $smSlide.eq(cIndex).addClass(options.activeClass);
    if(smSlideSizer > 1) {
        var $elemCtrl = $('<i/>');
        if(options.autoArr) {
            var $smPrev = $elemCtrl.clone().addClass(options.prev);
            var $smNext = $elemCtrl.clone().addClass(options.next);
            $smPrev.appendTo($smSlider);
            $smNext.appendTo($smSlider);           
        } else {
            var $smPrev = $('.'+options.prev);
            var $smNext = $('.'+options.next);
        }
        if(options.pagination) {
            var $smNav = $('<ul/>').addClass(options.namespace+'_nav');
            var $smNavItem = $('<li/>');
            $smNav.appendTo($smSlider);
            if(options.typeCtrl != 'numeric'){
                for (i=smSlideSizer; i > 0; i--) {
                    $smNavItem.clone().data({
                            'index' : i-1
                            }).addClass(options.namespace+'_nav-item')
                             .html($elemCtrl.clone())
                             .prependTo($smNav);
                }
            } else {
                for (i=smSlideSizer; i > 0; i--) {
                    $smNavItem.clone().data({
                            'index' : i-1
                            }).addClass(options.namespace+'_nav-item')
                              .text(i)
                              .prependTo($smNav);
                }
            }
            var $smNavItem = $smSlider.find('.'+options.namespace + '_nav-item');
            $smNavItem.eq(cIndex).addClass(options.activeClass);
        }
    if(options.subMenu) {
        var $subMenu = $('.' + options.subMenuClass);
            $subMenu.eq(cIndex).addClass(options.activeClass);
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
    $smPrev.on('click', function(){
        if (clickable) {
            cIndex--
            if(cIndex < 0) {
                cIndex = smSlideSizer - 1;
            }
            slideMove(cIndex, 'prev');
        }
    });
    $smNext.on('click', function(){
        if (clickable) {
            cIndex++
            if (cIndex >= smSlideSizer) {
                cIndex = 0;            
            }
            slideMove(cIndex, 'next');
        }
    });
    if (options.pagination) {
        $smNavItem.on('click', function(){
            if(clickable) {
                navIndex = $(this).data('index');
                console.log(navIndex);
                if(navIndex > cIndex) {
                    direction = 'next'
                } else {
                    direction = 'prev'
                }
                if($(this).data('index') != cIndex) {
                    cIndex = navIndex;
                    slideMove(cIndex, direction);                
                }
            }
        })
    };
    if (options.subMenu) {
        $subMenu.on('click', function(){
            if(clickable) {
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
            }
        })
    };
    };
  });
 };
})( jQuery );