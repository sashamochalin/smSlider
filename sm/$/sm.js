$(document).ready(function(){
    var $smSlider = $('#sm_slider');
    $smSlider.smSlider({
        duration: 500,
        easing : 'easeInOutSine',
        animationStart : function(toIndex){
            var $backShadow = $('.backShadow');
            $backShadow.fadeOut(this.duration/4);
        },
        animationComplete : function(toIndex){
            var $backShadow = $('.backShadow');
            $backShadow.eq(toIndex).fadeIn(this.duration/2);
        }
    });
    var $logo = $('#logo');
    var $backToTop = $('#back_to_top');
    var scrollTop = $(window).scrollTop();
    var $navItem = $('.nav-item');
    var $optionsWrap = $('.options_wrap');
    var $anchor = $('.anchor');
    var $htmlBody = $('html, body');
    var $demoInner = $('#demo_inner');
    var $demoHeight = $demoInner.outerHeight();
    var params = {
        duration  : 400,
        compSize  : 65,
        classNav  : 'current',
        classLink : 'active'
    }
    var toTop = function() {
        $htmlBody.animate({ scrollTop: 0 }, params.duration);
        document.location.hash = '';
    }
    $logo.click(function(){
        toTop()
    });
    $backToTop.click(function(){
        toTop()
    });
    $anchor.click(function(){
        var $thisWrap   = $(this).parent();
        var thatHash    = $(this).data('hash');
        var thisWrapTop = $thisWrap.offset().top - params.compSize;
        if (!($thisWrap.hasClass('current'))) {
            $optionsWrap.removeClass('current');
            $thisWrap.addClass('current');
            $htmlBody.animate({ scrollTop: thisWrapTop }, {
                duration : params.duration,
                complete : function() {
                    document.location.hash = thatHash;
                }
            });
            
            return false;
        } else {
            return false;            
        }
    });
    if(document.location.hash) {
        $(document.location.hash).addClass('current');
        var thisWrapTop = $(document.location.hash).offset().top - params.compSize;
        $htmlBody.animate({ scrollTop: thisWrapTop }, 10);
    };
    var switchMenu = function(nameData) {
        var $navItem = $('.nav-item');
            $navItem.removeClass('active');
            $('[data-item='+nameData+']').addClass('active');
    };
    var dataPos = function (dataPos){
        var dataP = $('[data-name='+dataPos+']').position();
        var dataNamepos = dataP.top-params.compSize;
        return dataNamepos;
    };
    $navItem.click(function(){
        if(!($(this).hasClass('active'))) {
            var posName  = $(this).data('item').toString();
            $htmlBody.animate({ scrollTop: dataPos(posName) }, params.duration);
            document.location.hash = '';
        }
        return false;
    });
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        if(scrollTop <= 0) {
            $demoInner.removeAttr('style');
        } 
        else if (scrollTop < $demoHeight) {
            $demoInner.css({
                'transform' : 'translateY('-(scrollTop*2)+'px)',
                '-ms-transform': 'translateY('+(scrollTop/2)+'px)', /* IE 9 */
                '-webkit-transform': 'translateY('+(scrollTop/2)+'px)', /* Safari and Chrome */
                '-o-transform': 'translateY('+(scrollTop/2)+'px)', /* Opera */
                '-moz-transform': 'translateY('+(scrollTop/2)+'px)' /* Firefox */
            });
        }
        if (scrollTop < dataPos('this')) {
            $navItem.removeClass('active');
        }
        else if (scrollTop < dataPos('examples') && scrollTop >= dataPos('this')) {
            switchMenu('this');
        }
        else if(scrollTop < dataPos('setup') && scrollTop >= dataPos('examples')) {
            switchMenu('examples');
        }
        else if(scrollTop < dataPos('api') && scrollTop >= dataPos('setup')) {
            switchMenu('setup');
        }
        else if(scrollTop >= dataPos('api')) {
            switchMenu('api');
        }
    });
});