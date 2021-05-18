(function ($) {
    "use strict";
// Parallax Activation
    if ($.fn.stellar) {
        $(window).stellar({
            responsive: true,
            positionProperty: 'position',
            horizontalScrolling: false
        });
    }

    /*-------------------------------
       Portfolio Isotope
       ---------------------------------*/
    $('.portfolio-menu li').on('click', function(e) {
        $(".portfolio-menu li").removeClass("active");
        $(this).addClass("active");
        var selector = $(this).attr('data-filter');
        $(".grid").isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false,
            }
        });
        return false;
    });
    /*-------------------------------
    Masonary Portfolio
    ---------------------------------*/
    $('.grid').isotope({
        itemSelector: '.grid-item',
        resizesContainer: false,
    });

    //    Slider Area
    var testimonial = $(".testimonial-wrap");
    testimonial.owlCarousel({
        dots: true,
        loop: true,
        nav: true,
        navText: ["<span class='ti-angle-left'></span>", "<span class='ti-angle-right'></span>"],
        autoplay: true,
        items: 1,
    });

    // Scroll Up
    $.scrollUp({
        scrollText: "<span class='ti-angle-double-up'></span>",
        scrollDistance: 300,

    });
    // CounterUp
    $('.counter').counterUp({
        delay: 50,
        time: 3000
    });

    $('[data-toggle="tooltip"]').tooltip();

    //    Brands
   $(".brand-wrap").owlCarousel({
        dots: false,
        loop: true,
       margin: 20,
        nav: false,
        autoplay: true,
        items: 5,
       responsiveClass:true,
       responsive:{
           0:{
               items:2,
               nav:false
           },
           600:{
               items:3,
               nav:true
           },
           1000:{
               items:5,
           }
       }
    });

    /* ======= Fixed page nav when scrolled ======= */
    $(window).on('scroll resize load', function() {

        $('.main-menu-wrap .navbar').removeClass('fixed');

        var scrollTop = $(this).scrollTop();
        var topDistance = $('.main-menu-wrap .navbar').offset().top;

        if ( (topDistance) > scrollTop ) {
            $('.main-menu-wrap .navbar').removeClass('fixed');
        }
        else {
            $('.main-menu-wrap .navbar').addClass('fixed');
        }
    });
    /*=========== SMOOTH SCROLLING ===========*/
    $('li.smooth-menu a').bind("click", function (event) {
        var $anchor = $(this);
        var headerH = '70';
        $('html,body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
        }, 1200, 'easeInOutExpo');
        event.preventDefault();
    });

    /*=========== SMOOTH SCROLLING ===========*/
    $('li.card-menu a').bind("click", function (event) {
        var $anchor = $(this);
        var headerH = '0';
        $('html,body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
        }, 1200, 'easeInOutExpo');
        event.preventDefault();
    });
    var slider_resume = $('.resume-slider');
    slider_resume.owlCarousel({
        dots: false,
        loop: true,
        nav: true,
        navText: ["<span class='ti-angle-left'></span>", "<span class='ti-angle-right'></span>"],
        items: 1,
        autoplay: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
    });
    slider_resume.on("translate.owl.carousel", function(e) {
        $(".single-slide .banner-title").removeClass("animated fadeInUp").css("opacity", "0");
        $(".single-slide span").removeClass("animated fadeInDown").css("opacity", "0");
    });

    slider_resume.on("translated.owl.carousel", function(e) {
        $(".single-slide .banner-title").addClass("animated fadeInUp").css("opacity", "1");
        $(".single-slide span").addClass("animated fadeInDown").css("opacity", "1");
    });

    // Hero area typing effect
    if($(".typed p span").length){
        $(".typed p span").typed({
            strings: ["John Doe.", "developer.","designer.","traveler."],
            typeSpeed: 50,
            loop: true,
        });
    }
    /*
     Toggle Sidebar Nav
    */
    $('body').delegate('.toggle-sidebar', 'click', function () {
        $('.sidebar-nav').toggleClass('collapsed');

        if (localStorage.getItem("asideMode") === 'collapsed') {
            localStorage.setItem("asideMode", 'expanded')
        } else {
            localStorage.setItem("asideMode", 'collapsed')
        }
        return false;
    });

    var p;
    $('body').delegate('.hide-sidebar-nav', 'click', function () {
        if (p) {
            p.prependTo(".wrapper");
            p = null;
        } else {
            p = $(".sidebar-nav").detach();
        }
    });

    $.fn.setAsideMode = function () {
        if (localStorage.getItem("asideMode") === null) {

        }
        else if (localStorage.getItem("asideMode") === 'collapsed') {
            $('.sidebar-nav').addClass('collapsed');
        }
        else {
            $('.sidebar-nav').removeClass('collapsed');
        }
    }
    if ($(window).width() > 992) {
        $.fn.setAsideMode();
    }
    // Vedio Player
    $(".player").YTPlayer({
        videoURL: "https://www.youtube.com/watch?v=c_PZTAW5piQ",
        containment: '.video-section',
        mute: true,
        loop: true,
        startAt: 0,
        showControls: false
    });
    //WOW Js
    new WOW().init();
    jQuery(window).on('load',function(e) {
        //Preloader
        $('#resume-preloader-container').fadeOut('slow');

    });
})(jQuery);
