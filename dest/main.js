$(document).ready(function () {
    var sizeScreenTablet = 975;
    var sizeScreenMobile = 755;
    var header = $('header');
    var btn_menu = $('.btn-nav-wrap');
    var submenu = $('.submenu');
    var submenuMobile = $('.menu-mobile');
    var topmenu = $('.topmenu');
    var navLeft = $('.nav-left .head');

    // header control
    var Header = {
        clickButtonMenu: function () {
            btn_menu.click(function (e) {
                var w = $(window).width();
                e.stopPropagation();
                $(this).children().toggleClass('open');
                $(this).toggleClass('is-active');
                if (w <= sizeScreenTablet) {
                    submenuMobile.toggleClass('is-active');
                } else {
                    submenu.toggleClass('is-active');
                    Header.changedTopMenu();
                }
            });
        },
        changedTopMenu: function () {
            $('.topmenu').toggleClass('is-submenu');
        },
        changedScroll: function () {
            if ($(window).scrollTop() > 5) {
                $('.fix-top-menu').addClass('is-scroll');
                header.addClass('is-scroll');
            } else {
                $('.fix-top-menu').removeClass('is-scroll');
                header.removeClass('is-scroll');

            }
        }
    }

    Header.clickButtonMenu();

    var Menu = {
        disableSubMenu: function () {
            btn_menu.removeClass('is-active')
            btn_menu.children().removeClass('open');
            submenu.removeClass('is-active');
            topmenu.removeClass('is-submenu');
        },
        disableMenuMobile: function () {
            submenuMobile.removeClass("is-active");
            btn_menu.removeClass('is-active')
            btn_menu.children().removeClass('open');
        },
        // menu mobile
        clickMenuMobile: function () {
            $(".menu-mobile ul li").click(function (e) {
                if ($(this).hasClass('sub')) {
                    $(this).children('ul').slideToggle(140);
                    $(this).siblings('li').find('ul').slideUp(140);
                    $(this).siblings('li').removeClass('active');
                    $(this).toggleClass('active');
                    e.stopPropagation();
                }
            });
        },
        setHeightInnerMenuMobile: function () {
            var inner = $('.menu-mobile .inner');
            var h_header = header.height();
            var h_window = $(window).height();
            inner.css({ 'height': (h_window - h_header) });
        }
    }

    Menu.clickMenuMobile();
    Menu.setHeightInnerMenuMobile();

    $('header .menumobile').click(function (e) {
        e.stopPropagation();
    });

    var App = {
        // trigger click slider
        general: function () {
            var btn = $('#tab_switch a');
            btn.click(function (e) {
                e.preventDefault();
                var id = $(this).index();
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');

                } else {
                    $(this).parent().toggleClass('changed');
                    $(this).parent().find('a').removeClass('active');
                }
                if ($('.posts-home').length) {
                    $('.posts-home .tab-content').removeClass('active');
                    $('.posts-home .tab-content-' + id).addClass('active');
                    $('.bg_white').toggleClass('active');
                }
                $(this).addClass('active');
            });

            header.click(function (e) {
                e.stopPropagation();
            });

            $('header .submenu').click(function (e) {
                e.stopPropagation();
            });

            $(".backtotop").click(function () {
                $("html, body").animate({ scrollTop: 0 }, 500);
            });


            $('body').on('click', '.thumbvideo', function (e) {
                var id = $(this).attr('data-id');
                var m_body = $('.modal-youtube .modal-body');
                m_body.html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + id + '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
            });
            $('.modal-youtube').on('hidden.bs.modal', function () {
                $('.modal-youtube .modal-body').html('');
            });


            var btn_viewmore_pd = $('.products .category .btn-main');
            btn_viewmore_pd.click(function () {
                var id = $(this).attr('data-id-cat');
                // $('.products .pd-list-category').removeClass('expand').find('.i-down').removeClass('is-show');;
                $('.products .pdlist-cat-' + id).addClass('expand');
                $('.products .pdlist-cat-' + id).find('.i-down').addClass('is-show');
                $("html, body").animate({
                    scrollTop: $('.products .pdlist-cat-' + id).offset().top - 60
                }, 400);
            })

            var btn_backtall = $('.products .pd-list-category .btn-backall');
            btn_backtall.click(function () {
                $('.products .pd-list-category').removeClass('expand').find('.i-down').removeClass('is-show');;
                $("html, body").animate({
                    scrollTop: 0
                }, 400);
            });

            navLeft.click(function () {
                if ($(window).width() <= sizeScreenMobile) {
                    $(this).parent().find('ul').slideToggle(150);
                    $(this).toggleClass('is-show');
                }
            });

            // tab phanphoi clicked
            $('#tabpp .tab').click(function () {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                if ($(this).index() === 1) {
                    $(this).closest('.boxleft').find('.country').addClass('is-show');
                    $(this).closest('.boxleft').find('.area').removeClass('is-show');
                } else {
                    $(this).closest('.boxleft').find('.country').removeClass('is-show');
                    $(this).closest('.boxleft').find('.area').addClass('is-show');
                }
            });

            // tab process facilities
            $('.tab-process .tab').click(function () {
                var id = $(this).index() + 1;
                $('.tab-process .tab').removeClass('active');
                $(this).addClass('active');
                $('.ct-process .ct').removeClass('active');
                $('.ct-process .ct' + id).addClass('active');
            });

            // tab
            $('.tabs .tab').click(function () {
                var id = $(this).index() + 1;
                $('.tabs .tab').removeClass('active');
                $(this).addClass('active');
                $('.ct_tab').removeClass('active');
                $('.ct_tab_' + id).addClass('active');
                if ($('.showmore').length) {
                    $('.showmore').toggleClass('flag');
                }
            });

            $(".list-tuyendung .list .item .i_top").click(function (e) {
                e.stopPropagation();
                $(this).parent().find('.i_content').slideToggle(200);
                $(this).parent().siblings('.item').find('.i_content').slideUp(200);
                $(this).parent().toggleClass('active');
                $(this).parent().siblings('.item').removeClass('active');
            });
        },
        disableNavLeft: function () {
            if ($(window).width() > sizeScreenMobile) {
                navLeft.parent().find('ul').slideDown(150);
                navLeft.removeClass('is-show');
            }
        },
        fixedSocial: function () {
            var social = $('.article-detail .social');
            if (social.length) {
                var h_top = $('.banner-top').height() + header.height();
                var h_bottom = $('footer');
                if ($(window).scrollTop() >= social.offset().top - 60) {
                    social.addClass('fixed');
                }
                if (social.offset().top >= h_bottom.offset().top - 150) {
                    social.removeClass('fixed');
                }
                if (social.offset().top <= h_top) {
                    social.removeClass('fixed');
                }
            }
        }
    }

    triggerClickSlider = function (slider, direction) {
        if (slider) {
            if (direction == 'next') {
                $(slider).find('.slick-next').trigger('click');
            } else {
                $(slider).find('.slick-prev').trigger('click');
            }
        }
    };
    // setHeight box relate
    setHeightBoxRelate = function () {
        if ($('.relate-info').length && $(window).width() >= 700) {
            var h_box = $('.relate-info .box').width();
            $('.relate-info .box').css({
                'height': (h_box + 10) + 'px'
            });
        }
    }
    setHeightBoxRelate();

    setHeightBoxCertificate = function () {
        if ($('.h-auto').length && $(window).width() >= 700) {
            var h_box = $('.h-auto .item').innerWidth();
            console.log(h_box);
            $('.h-auto .item').css({
                'height': (h_box + 10) + 'px'
            });
        }
    }
    setHeightBoxCertificate();

    setHeightProductBoxHome = function () {
        if ($('.product-list-home').length && $(window).width() > sizeScreenTablet) {
            var h_slider = $('.product-list-home .pdlist-slider-w').height();
            $('.product-list-home').css({
                'height': h_slider
            });
        } else {
            $('.product-list-home').css({
                'height': 'auto'
            });
        }
    };
    // slider homepage
    if ($('#slider_h').length) {
        var $sliderHome = $('#slider_h');
        $sliderHome.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            var $content = $('.slider-home .content');
            $content.children('.item').fadeOut(300).removeClass('active');
            setTimeout(function () {
                $content.find('.item' + (nextSlide + 1)).fadeIn(0).addClass('active');
            }, 600);
        });
        $sliderHome.slick({
            dots: false,
            autoplay: true,
            infinite: true,
            speed: 900,
            slidesToShow: 1,
            adaptiveHeight: true,
            useTransform: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
            // fade:true
        });
    }

    // slider product
    if ($('.product-list-home .pd-slider-for').length) {
        var $slider = $('.product-list-home .pd-slider-for');
        $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            var $content = $('.product-list-home .content');
            $content.children('.item').removeClass('active');
            setTimeout(function () {
                $content.find('.item' + (nextSlide + 1)).addClass('active');
            }, 200);
        });
        $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            speed: 600,
            fade: true,
            useTransform: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
            asNavFor: '.pd-slider-nav',
        });
        $('.product-list-home .pd-slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500,
            asNavFor: '.product-list-home .pd-slider-for',
            useTransform: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
            dots: false,
            vertical: true,
            // centerMode: true,
            focusOnSelect: true,
            nextArrow: '<div class="btn-ctr btn-next"><i class="circle"></i></div>',
            prevArrow: '<div class="btn-ctr btn-prev"><i class="circle"></i></div>'
        });
    }

    // slider reason homepage
    if ($('#box_slider_home').length) {
        var $slider = $('#box_slider_home');
        $slider.slick({
            dots: true,
            infinite: true,
            speed: 600,
            autoplay: true,
            slidesToShow: 1,
            adaptiveHeight: true,
            useTransform: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
            // fade:true,
        });
    }

    // slider product list category
    if ($('.pd-category-slider').length) {
        var $slider = $('.pd-category-slider');
        var total = $slider.find('.item').length;
        console.log(total);
        if (total > 3 || $(window).width() < sizeScreenTablet) {
            $slider.parent().removeClass('none_slider');
            $slider.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
                infinite: true,
                speed: 600,
                adaptiveHeight: true,
                centerMode: true,
                useTransform: true,
                cssEase: 'cubic-bezier(.76,.22,.36,.99)',
                responsive: [
                    {
                        breakpoint: 900,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        } else {
            $slider.parent().addClass('none_slider');
        }
    }
    // slider product list category
    if ($('.pd-category-slider2').length) {
        var $slider = $('.pd-category-slider2');
        $slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            infinite: true,
            speed: 600,
            adaptiveHeight: true,
            centerMode: true,
            useTransform: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
            nextArrow: $('.product-category .btn-next'),
            prevArrow: $('.product-category .btn-prev'),
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    // slider articles about sustainalibity
    if ($('#csr-articles-list').length) {
        var $slider = $('#csr-articles-list');
        $slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            infinite: true,
            speed: 500,
            useTransform: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
            nextArrow: $('#csr-articles-control .btn-next'),
            prevArrow: $('#csr-articles-control .btn-prev'),
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    // slider product list category
    if ($('.pd-relate-slider').length) {
        var $slider = $('.pd-relate-slider');
        $slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            infinite: true,
            speed: 600,
            adaptiveHeight: true,
            centerMode: true,
            useTransform: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
            nextArrow: $('.product-relate .btn-next'),
            prevArrow: $('.product-relate .btn-prev'),
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    if ($('.slider-gallery').length) {
        $('.slider-gallery').slick({
            dots: true,
            infinite: true,
            speed: 600,
            autoplay: true,
            slidesToShow: 1,
            useTransform: true,
            cssEase: 'cubic-bezier(.76,.22,.36,.99)',
        });
    }

    if ($('.parallax').length) {
        $('.parallax').paroller();
    }

    var SelectBox = {
        selectBoxDisableAll: function () {
            $('.selectbox ul').removeClass('is-show');
            $('.selectbox').removeClass('active');
        },
        selectBoxHeadClicked: function () {
            var head = $('.selectbox .head');
            head.click(function (e) {
                e.stopPropagation();
                $(this).parent().toggleClass('active');
                $(this).parent().find('ul').toggleClass('is-show');
                $(this).parent().siblings().removeClass('active');
                $(this).parent().siblings().find('ul').removeClass('is-show');
            });
        },
        selectBoxItemClicked: function () {
            var cat = $('.selectbox ul li');
            cat.click(function (e) {
                e.stopPropagation();
                if (!$(this).closest('.selectbox').hasClass('no-select')) {
                    var parent = $(this).closest('.selectbox');
                    var head = parent.find('.head');
                    var text = $(this).html();
                    $('span', head).html(text);
                }
                SelectBox.selectBoxDisableAll();
            });
        },
    }
    SelectBox.selectBoxItemClicked();
    SelectBox.selectBoxHeadClicked();
    App.general();
    App.disableNavLeft();
    App.fixedSocial();

    $(document).click(function () {
        Menu.disableSubMenu();
        SelectBox.selectBoxDisableAll();
    });

    $(window).scroll(function () {
        Header.changedScroll();
        App.fixedSocial();
    });

    $(window).resize(function () {
        setTimeout(function () {
            Menu.disableMenuMobile();
            Menu.disableSubMenu();
            setHeightBoxRelate();
            setHeightBoxCertificate();
            App.disableNavLeft();
            Menu.setHeightInnerMenuMobile();
        }, 100);
        setTimeout(function () {
            setHeightProductBoxHome();
        }, 200);
    });
    $(window).load(function () {
        setHeightProductBoxHome();
        objectFitImages();
        // $('.jarallax').jarallax({
        //     speed: 0.7
        // });
    });

    // $("body").easeScroll({
    //     frameRate: 120,
    //     animationTime: 800,
    //     stepSize: 120,
    // });





    //////////////////////////// UPDATE ESG 27/07/2025 ////////////////////////////
    // Timeline Tabs ESG PAGE
    function clickTabsTimelineESG() {
        const itemYears = $(".scesg__timeline-years .item"),
            ctGroup = $(".scesg__timeline-content .ctgroup");
        itemYears.on("click", function () {
            const index = $(this).index();

            // Active item
            itemYears.removeClass("active");
            $(this).addClass("active");

            // Active ctgroup tương ứng
            ctGroup.removeClass("active");
            ctGroup.eq(index).addClass("active");
        });
    }

    clickTabsTimelineESG()

    function clickTabsESGPractices() {
        const $tabs = $(".change-tab");
        const $tabWrapper = $(".scpractices__tabs");
        const $articles = $(".list-article");
        const $prev = $(".btn-prev");
        const $next = $(".btn-next");

        // Init slick for each slider
        $(".slider").each(function () {
            const $slider = $(this);
            const slideCount = $slider.find(".thumb").length; // đổi .slide thành class slide item thực tế của bạn

            $(this).slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
                infinite: true,
                speed: 700,
                adaptiveHeight: true,
                useTransform: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            centerMode: true,
                            centerPadding: '26px',
                            adaptiveHeight: false
                        }
                    }
                ]
            });

            // Ẩn control nếu số slide < slidesToShow
            if (slideCount < 4) {
                $slider.closest(".scpractices__sliders").find(".btn-control").hide();
            }
        });

        // Function update indicator
        function moveIndicator($tab) {
            if ($(window).width() > 767) {
                const left = $tab.position().left;
                const width = $tab.outerWidth();
                $tabWrapper.get(0).style.setProperty("--indicator-left", `${left}px`);
                $tabWrapper.get(0).style.setProperty("--indicator-width", `${width}px`);
            }

        }

        const $activeTab = $(".change-tab.active").length ? $(".change-tab.active") : $tabs.eq(0).addClass("active");
        moveIndicator($activeTab);
        $(window).on('resize', function () {
            moveIndicator($activeTab);
        })
        // Tab click event
        $tabs.on("click", function (e) {
            e.preventDefault();
            if ($(this).hasClass("active")) return;

            const index = $(this).index();

            $tabs.removeClass("active");
            $(this).addClass("active");
            moveIndicator($(this));

            $articles.removeClass("active").hide();
            $articles.eq(index).addClass("active").fadeIn(200);

            // Ensure current tab's slider is refreshed
            $articles.eq(index).find(".slider").slick("refresh");
            // Kiểm tra và ẩn control
            if ($articles.find(".thumb").length < 4) {
                $prev.hide();
                $next.hide();
            } else {
                $prev.show();
                $next.show();
            }
        });

        // Navigation buttons
        $prev.on("click", function () {
            $(".list-article.active .slider").slick("slickPrev");
        });

        $next.on("click", function () {
            $(".list-article.active .slider").slick("slickNext");
        });
    }
    $(window).on("load", function () {
        clickTabsESGPractices()
    });

});

