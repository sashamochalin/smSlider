$(document).ready(function(){
    var $smSlider = $('#sm_slider');
    $smSlider.smSlider({
        autoPlay : true,
        duration: 500,
        easing : 'easeInOutSine',
        animationStart : function(toIndex){
        if($.support.boxModel) {
            var $backShadow = $('.backShadow');
                $backShadow.fadeOut(this.duration/4);
        }
        },
        animationComplete : function(toIndex){
        if($.support.boxModel) {
            var $backShadow = $('.backShadow');
            $backShadow.eq(toIndex).fadeIn(this.duration/2);
        }
        }
    });
    var $logo = $('#logo'),
        $backToTop   = $('#back_to_top'),
        scrollTop    = $(window).scrollTop(),
        $navItem     = $('.nav-item'),
        $optionsWrap = $('.options_wrap'),
        $anchor      = $('.anchor'),
        $htmlBody    = $('html, body'),
        $demoInner   = $('#demo_inner'),
        $demoHeight  = $demoInner.outerHeight(),
        $gotoUp      = $('.gotoup');
        //listCurr   = false;
    var params = {
        duration  : 800,
        compSize  : 65,
        easing    : 'swing',
        classNav  : 'current',
        classLink : 'active'
    }
    var removeHash = function() { 
            window.history.pushState("", document.title, window.location.pathname);
        }
    var toTop = function() {
        $htmlBody.animate({ scrollTop: 0 }, {
                duration : params.duration,
                easing   : params.easing,
                complete : removeHash
            });
        $navItem.removeClass(params.classLink);
        $optionsWrap.removeClass(params.classNav);
    }
    $gotoUp.click(function(){
        toTop();
    });
    $anchor.click(function(){
        var $thisWrap   = $(this).parent();
        var thatHash    = $(this).data('hash');
        var thisWrapTop = $thisWrap.offset().top - params.compSize;
        if (!($thisWrap.hasClass(params.classNav))) {
            $optionsWrap.removeClass(params.classNav);
            $thisWrap.addClass(params.classNav);
            $htmlBody.animate({ scrollTop: thisWrapTop }, {
                duration : params.duration,
                easing   : params.easing,
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
        $(document.location.hash).addClass(params.classNav);
        var thisWrapTop = $(document.location.hash).offset().top - params.compSize;
        $htmlBody.animate({ scrollTop: thisWrapTop }, 10);
    };
    var switchMenu = function(nameData) {
        var $navItem = $('.nav-item');
            $navItem.removeClass(params.classLink);
            $('[data-item='+nameData+']').addClass(params.classLink);
    };
    var dataPos = function (dataPos){
        var dataP = $('[data-name='+dataPos+']').position();
        var dataNamepos = dataP.top-params.compSize;
        return dataNamepos;
    };
    $navItem.click(function(){
        if(!($(this).hasClass(params.classLink))) {
            var posName  = $(this).data('item').toString();
            $htmlBody.animate({ scrollTop: dataPos(posName) }, {
                duration : params.duration,
                easing   : params.easing,
                complete : removeHash
        });
        };
        $optionsWrap.removeClass(params.classNav);
        return false;
    });
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        if(scrollTop <= 0) {
            $demoInner.removeAttr('style');
        }
        if (scrollTop < dataPos('this')) {
            $navItem.removeClass(params.classLink);
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