/*
	Template Name: SaasRiver - SaaS & StartUp HTML Template
	Author: https://themexriver.com/
	Version: 1.0
*/


(function ($) {
"use strict";


/* 
	lenis-smooth-scroll-activation
*/
const lenis = new Lenis({
	duration: 1,
	easing: (t) => 1 - Math.pow(1 - t, 4),
	direction: 'vertical', 
	smooth: true, 
	smoothTouch: false, 
});
function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
$('a[href^="#"]').on('click', function (e) {
	e.preventDefault(); 

	const target = $(this.getAttribute('href')); 

	if (target.length) {
		lenis.scrollTo(target[0], {
			duration: 1.2, 
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
		});
	}
});
gsap.config({
	nullTargetWarn: false,
});

if($(".sr-home-2").length) {
    gsap.registerPlugin(MotionPathPlugin);
}

/* 
	sticky-header-function
*/

function waStickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $('.wa_sticky_header');
    var headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass('wa_sticky');
      } else {
        $header.removeClass('wa_sticky');
        $header.removeClass('wa_sticky_show');
      }

      if ($header.hasClass('wa_sticky')) {
        if (windowTop < lastScrollTop) {
          $header.addClass('wa_sticky_show');
        } else {
          $header.removeClass('wa_sticky_show');
        }
      }

      lastScrollTop = windowTop;
    });
}

waStickyHeader();

/* 
	offcanvas-function
*/

$('.offcanvas_toggle').on('click', function() {
    $('.wa-overly, .offcanvas_box_active').addClass('active');
});

$('.wa-overly, .offcanvas_box_close').on('click', function() {
    $('.offcanvas_box_active').removeClass('active');
    $('.wa-overly').removeClass('active');
});

$(document).on('keydown', function(event) {
    if (event.key === 'Escape') {
        $('.offcanvas_box_active').removeClass('active');
        $('.wa-overly').removeClass('active');
    }
});

$('.offcanvas_box_active a').on('click', function() {
    $('.offcanvas_box_active').removeClass('active'); 
    $('.wa-overly').removeClass('active'); 
});


/* 
	mobile-dropdown-function
*/

jQuery(".mobile-main-navigation li.dropdown").append('<span class="dropdown-btn"><i class="fa-solid fa-angle-right"></i></span>'),
	jQuery(".mobile-main-navigation li .dropdown-btn").on("click", function () {
		jQuery(this).hasClass("active")
		? (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"), jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle())
		: (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"),
			jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle(),
			jQuery(this).toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").slideToggle());
});


/* 
	search-popup-function
*/

$('.search_btn_toggle').on('click', function() {
    $('.wa-overly, .search_box_active').addClass('active');
});

$('.wa-overly, .search_box_close').on('click', function() {
    $('.search_box_active').removeClass('active');
    $('.wa-overly').removeClass('active');
});

$(document).on('keydown', function(event) {
    if (event.key === 'Escape') {
        $('.search_box_active').removeClass('active');
        $('.wa-overly').removeClass('active');
    }
});

/* 
	windows-load-function
*/

document.addEventListener("DOMContentLoaded", function () {
	window.addEventListener('load', function(){

        let preloader = document.querySelector(".nm-preloader");
		if (preloader) {
			preloader.classList.add("preloaded");
			setTimeout(function () {
				  preloader.remove();
			}, 1000 ) ;

		}


		if (document.querySelectorAll(".pg-preloader").length) {
			const loader = document.querySelector(".pg-preloader");
			
            setTimeout(() => {
                loader.classList.add("loaded");
                afterPreloader();
            });
            setTimeout(function () {
                loader.remove();
            }, 1500);

		} else {
			afterPreloader();
		}

		afterPageLoad();

	})
});



/* 
	after-preloader-start
*/
function afterPreloader() {


	/* 
		only-LTR-direction
	*/
	if (getComputedStyle(document.body).direction !== "rtl") {


		/* 
			header-1-menu-link
		*/
		if ($(".header_1_menu_link").length) {
			var header_1_menu_link = $(".header_1_menu_link .dropdown-menu a");
			gsap.registerPlugin(SplitText);

			header_1_menu_link.each(function (index, el) {
				el.split = new SplitText(el, {
					type: "words",
				});

				$(el).on("mouseenter", function () {
					gsap.fromTo(
						el.split.words,
						{ x: -5, opacity: 0, filter: "blur(1px)" },
						{ x: 0, opacity: 1, filter: "blur(0px)", duration: .8, stagger: -0.2, ease: "ease1", }
					);
				});
			});
		}

	}	


    



/* 
	after-preloader-end
*/
}


/* 
	after-page-load-start
*/
function afterPageLoad() {

	/* 
		hero-1-img-animation
	*/
	if ($("#wa_liquid_img").length) {

		const waWrapper = document.getElementById("wa_liquid_img");
		const waImg = waWrapper.querySelector("img");
		const waImageURL = waImg.getAttribute("src");
		waImg.remove();

		const { width: waWidth, height: waHeight } = waWrapper.getBoundingClientRect();

		const waApp = new PIXI.Application({
			width: waWidth,
			height: waHeight,
			transparent: true,
			autoDensity: true,
			resolution: window.devicePixelRatio,
		});
		waApp.view.style.pointerEvents = "none";

		waWrapper.appendChild(waApp.view);

		const waDisplacementURL = "assets/img/hero/h1-bg-noise-1.gif";

		waApp.loader
			.add("waHero", waImageURL)
			.add("waDisplacement", waDisplacementURL)
			.load((waLoader, waResources) => {
				const waContainer = new PIXI.Container();
				waApp.stage.addChild(waContainer);

				const waHero = new PIXI.Sprite(waResources.waHero.texture);
				waContainer.addChild(waHero);

				const waTextureRatio = waHero.texture.width / waHero.texture.height;
				const waContainerRatio = waWidth / waHeight;

				if (waContainerRatio > waTextureRatio) {
					waHero.width = waWidth;
					waHero.height = waWidth / waTextureRatio;
				} else {
					waHero.height = waHeight;
					waHero.width = waHeight * waTextureRatio;
				}

				waHero.x = (waWidth - waHero.width) / 2;
				waHero.y = (waHeight - waHero.height) / 2;

				const waDispSprite = new PIXI.Sprite(waResources.waDisplacement.texture);
				waDispSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
				const waDispFilter = new PIXI.filters.DisplacementFilter(waDispSprite);
				waDispSprite.scale.set(2);
				waApp.stage.addChild(waDispSprite);
				waContainer.filters = [waDispFilter];

				function waPlayDistortionIn() {
					gsap.fromTo(waDispFilter.scale,
						{ x: -500, y: -500 },
						{ x: 0, y: 0, duration: 2,  ease: "ease1", }
					);
				}
				waPlayDistortionIn();

				waApp.ticker.add(() => {
					waDispSprite.x += 1;
					waDispSprite.y += 1;
				});
			});
	}

	/* 
		add-active-class
	*/
	const waAddClass = gsap.utils.toArray('.wa_add_class');
	waAddClass.forEach(waAddClassItem => {
		gsap.to(waAddClassItem, {
			scrollTrigger: {
				trigger: waAddClassItem,
				start: "top 90%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				toggleClass: "active",
				once: true,
				markers: false,
			}
		});
	});

	/* 
		wow-activation
	*/
	if($('.wow').length){
		var wow = new WOW({
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       50,
			mobile:       true,
			live:         true
		});
		wow.init();
	};

/* 
	after-page-load-start
*/
}



// wa-bg-parallax
gsap.utils.toArray(".wa_parallax_bg").forEach(element => {
	gsap.fromTo(
		element,
		{ backgroundPosition: "50% 0%" }, 
		{ 
			backgroundPosition: "50% 100%", 
			ease: "none",
			scrollTrigger: {
				trigger: element,
				scrub: 2,    
				markers: false,  
			},
		}
	);
});


/* 
    pr-button-1-split
*/
if ($(".btn_split_1").length) {
    var splitButton1 = $(".btn_split_1");
    gsap.registerPlugin(SplitText);

    splitButton1.each(function (index, el) {
        el.split = new SplitText(el, {
            type: "words",
        });

        $(el).on("mouseenter", function () {
            gsap.fromTo(
                el.split.words,
                { x: -30, opacity: 1, filter: "blur(5px)" },
                { x: 0, opacity: 1, filter: "blur(0px)", duration: .5, stagger: -0.1, ease: "ease1", }
            );
        });
    });
}

if ($(".wa_btn").length) {
    var waMagnets2v2 = document.querySelectorAll('.wa_btn');
    var waStrength2v2 = 70;

    waMagnets2v2.forEach((magnet) => {
        magnet.addEventListener('mousemove', moveMagnet2);
        magnet.addEventListener('mouseout', function(event) {
            const innerElements = event.currentTarget.querySelectorAll('.wa_btn_elm');
            innerElements.forEach((elm) => {
                gsap.to(elm, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "ease1"
                });
            });
        });
    });

    function moveMagnet2(event) {
        var magnetButton = event.currentTarget;
        var bounding = magnetButton.getBoundingClientRect();
        const innerElements = magnetButton.querySelectorAll('.wa_btn_elm');

        const xMove = (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * waStrength2v2;
        const yMove = (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * waStrength2v2;

        innerElements.forEach((elm) => {
            gsap.to(elm, {
                x: xMove,
                y: yMove,
                duration: 1,
                ease: "ease1"
            });
        });
    }
}

/* 
    hover-1-split
*/
if ($(".hover_1_split").length) {
    var hover_1_split = $(".hover_1_split a");
    gsap.registerPlugin(SplitText);

    hover_1_split.each(function (index, el) {
        el.split = new SplitText(el, {
            type: "words",
        });

        $(el).on("mouseenter", function () {
            gsap.fromTo(
                el.split.words,
                { x: 0, opacity: 1, filter: "blur(0px)" },
                { 
                    x: 5, 
                    opacity: 1, 
                    filter: "blur(.5px)", 
                    duration: 0.5, 
                    stagger: -0.1, 
                    ease: "ease1" 
                }
            );
        });


        $(el).on("mouseleave", function () {
            gsap.to(el.split.words, { 
                x: 0, 
                opacity: 1, 
                filter: "blur(0px)", 
                    duration: 0.5, 
                    stagger: 0.1, 
                    ease: "ease1" 
            });
        });
    });
}


/* 
	header-1-toggle
*/
    $(".as-header-1-menu-toggle-btn").on("click", function () {
        $(this).toggleClass("active"); 

        $(".as-header-1-menu").toggleClass("show"); 
    });














/* 
	team-1-animation
*/
if (window.matchMedia("(min-width: 992px)").matches) {
	var team1ani = gsap.timeline({
		scrollTrigger: {
			trigger: ".t1_ani_trigger",
			start: "top 10%",
			end: "top -70%",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	team1ani.from(".as-team-1-member-ani:nth-of-type(1)", {
		x: 1187,
		y: -828,
		scale: 0.7,
	});
	team1ani.from(".as-team-1-member-ani:nth-of-type(2)", {
		x: 830,
		y: -828,
		scale: 0.7,
	},"<50%");
	team1ani.from(".as-team-1-member-ani:nth-of-type(3)", {
		x: 460,
		y: -828,
		scale: 0.7,
	},"<50%");
	team1ani.from(".as-team-1-member-ani:nth-of-type(4)", {
		x: 100,
		y: -828,
		scale: 0.7,
	},"<50%");
	
}



/* 
    faqs-1-sticky
*/
if ($(".sr-faqs-1-content-pin").length) { 
	if (window.matchMedia("(min-width: 992px)").matches) { 

		gsap.to(".sr-faqs-1-content-pin", {
			scrollTrigger: {
				trigger: ".sr-faqs-1-wrap",
				start: "top 20%", 
				end: () => {
					const rightHeight = document.querySelector(".sr-faqs-1-accordion").offsetHeight;
					const leftHeight = document.querySelector(".sr-faqs-1-content").offsetHeight;
					return "+=" + (rightHeight - leftHeight);  
				},
				pin: ".sr-faqs-1-content-pin", 
				pinSpacing: false,
				markers: false
			}
		});
	}
}




/* 
	price-4-hover-active
*/
$(".sr-price-4-card").on("mouseover", function(){
	var current_class = document.getElementsByClassName("sr-price-4-card active");
	current_class[0].className = current_class[0].className.replace(" active", "");
	this.className += " active";
});

/* 
	faqs-4-hover-active
*/

$(".sr-faqs-4-item-single").on("click", function () {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
    } else {
        $(".sr-faqs-4-item-single").removeClass("active");
        $(this).addClass("active");
    }
});

/* 
	testimonial-1-slider-function
*/
if ($('.sr_t1_slider_active').length) {
	var sr_t1_slider_active = new Swiper(".sr_t1_slider_active", {
		loop: true,
		speed: 600,
		spaceBetween: 24,

        pagination: {
			el: ".sr_t1_pagination",
			clickable: true,
		},

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },


        },

	});




}


/* 
	services-4-slider-function
*/
if ($('.s4_slider_active').length) {
	var t2_slider_active = new Swiper(".s4_slider_active", {
		loop: true,
		speed: 600,
		spaceBetween: 0,
        slidesPerView: "auto",
        direction: "vertical",

        allowTouchMove: false, 

		navigation: {
			nextEl: ".sr_s4_next",
			prevEl: ".sr_s4_prev",
		},

	});




}



	
/* 
    marquee-right
*/

$('.wa_marquee_right').marquee({
	speed: 50,
	gap: 0,
	delayBeforeStart: 0,
	startVisible:true,
	direction: 'right',
	duplicated: true,
	pauseOnHover: true,
})

/* 
    marquee-left
*/

$('.wa_marquee_left').marquee({
	speed: 50,
	gap: 0,
	delayBeforeStart: 0,
	startVisible:true,
	direction: 'left',
	duplicated: true,
	pauseOnHover: true,
})

/* 
    marquee-left-nopause
*/
$('.wa_marquee_left_nopause').marquee({
	speed: 20,
	gap: 0,
	delayBeforeStart: 0,
	startVisible:true,
	direction: 'left',
	duplicated: true,
	pauseOnHover: false,
})


/* 
    marquee-right-nopause
*/
$('.wa_marquee_right_nopause').marquee({
	speed: 20,
	gap: 0,
	delayBeforeStart: 0,
	startVisible:true,
	direction: 'right',
	duplicated: true,
	pauseOnHover: false,
})



// placeholder-typing
document.querySelectorAll(".wa_placeholder").forEach(waPlaceholderInput => {
	const waPlaceholderText = waPlaceholderInput.placeholder; 
	const waStartDelay = waPlaceholderInput.dataset.startDelay ? parseInt(waPlaceholderInput.dataset.startDelay) : 0; 
	let waPlaceholderIndex = 0;
	waPlaceholderInput.placeholder = "";

	const waPlaceholderObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				waPlaceholderType();
				waPlaceholderObserver.unobserve(waPlaceholderInput);
			}
		});
	}, { threshold: 0.5 });

	setTimeout(() => {
		waPlaceholderObserver.observe(waPlaceholderInput);
	}, waStartDelay);

	function waPlaceholderType() {
		if (waPlaceholderIndex < waPlaceholderText.length) {
			waPlaceholderInput.placeholder += waPlaceholderText.charAt(waPlaceholderIndex);
			waPlaceholderIndex++;
			setTimeout(waPlaceholderType, 70); 
		}
	}
});

/* 
	bootstrap-tooltip-activation
*/
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

/* 
	back-to-top-button-function
*/
if ($('.wa_backToTop').length) {
    var scrollTopbtn = document.querySelector('.wa_backToTop');
    var offset = 500; 
    var duration = 1000; 

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > offset) {
            $(scrollTopbtn).addClass('active');
        } else {
            $(scrollTopbtn).removeClass('active');
        }
    });

    $(scrollTopbtn).on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, duration, 'swing');
    });
}

/* 
	popup-video-activation
*/
if($('.popup_video').length) {
	$('.popup_video').magnificPopup({
		type: 'iframe'
	});
}

/* 
	popup-image-activation
*/
if($('.popup_img').length) {
	$('.popup_img').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
		},
	});
}


/* 
	nice-selector-activation
*/
if($('.nice-select').length) {
	$('.nice-select select').niceSelect();
}


/* 
	background-image-function
*/
$("[data-background]").each(function(){
	$(this).css("background-image","url("+$(this).attr("data-background") + ") ")
})

/* 
	counter-activation
*/


if($(".counter").length) {
    $('.counter').counterUp({
        delay: 10,
        time: 5000
    });

    let elements = document.querySelectorAll(".wa-counter");

    elements.forEach(element => {
        let innerWidth = element.clientWidth;
        element.style.width = innerWidth + "px";
    });
}

/*
    odomater-activation
*/

$('.odometer').appear(function () {
    var $this = $(this); 
    var countNumber = $this.attr("data-count");
    $this.html(countNumber);
});


/* 
	current-year-function
*/
if ($('.copyright-year').length) {
    const currentYear = new Date().getFullYear();
    $('.copyright-year').text(currentYear);
}


})(jQuery);