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
PIXI.utils.skipHello(); 

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
	header-1-toggle
*/
$(".as-header-1-menu-toggle-btn").on("click", function () {
	$(this).toggleClass("active"); 

	$(".as-header-1-menu").toggleClass("show"); 
});


/* 
	windows-load-function
*/

window.addEventListener('load', function(){


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



/* 
	after-preloader-start
*/
function afterPreloader() {


	/* 
		only-LTR-direction
	*/
	if (getComputedStyle(document.body).direction !== "rtl") {


		/* 
			menu-1-split
		*/
		if ($(".menu_1_split").length) {
			var menu_1_split = $(".menu_1_split a");
			gsap.registerPlugin(SplitText);

			menu_1_split.each(function (index, el) {
				el.split = new SplitText(el, {
					type: "words,chars",
				});

				$(el).on("mouseenter", function () {
					el.split.chars.forEach((char, i) => {
						let yValue = i % 2 === 0 ? -180 : 180;

						gsap.fromTo(
							char,
							{ rotateY: yValue, },
							{
								rotateY: 0,
								opacity: 1,
								duration: .6,
								ease: "case1",
							}
						);
					});
				});
			});
		}


		/* 
			button-animation
		*/
		if ($(".wa_btn_split_1").length) {
			var wa_btn_split_1 = $(".wa_btn_split_1");
			gsap.registerPlugin(SplitText);

			wa_btn_split_1.each(function (index, el) {
				el.split = new SplitText(el, {
					type: "words,chars",
				});

				$(el).on("mouseenter", function () {
					el.split.chars.forEach((char, i) => {
						let yValue = i % 2 === 0 ? -30 : 30;

						gsap.fromTo(
							char,
							{ y: yValue, },
							{
								y: 0,
								opacity: 1,
								duration: 0.4,
								ease: "power2.out",
								delay: i * 0.05
							}
						);
					});
				});
			});
		}

		/* 
			wa-split-right
		*/	
		if ($(".wa_split_up").length) {
			var wa_split_up = $(".wa_split_up");
			if (wa_split_up.length == 0) return;

			gsap.registerPlugin(SplitText);

			wa_split_up.each(function (index, el) {
				el.split = new SplitText(el, {
					type: "lines,words,chars",
					linesClass: "split-line",
				});

				gsap.set(el, { perspective: 400 });

				let delayValue = $(el).attr("data-split-delay") || "0s";
				delayValue = parseFloat(delayValue) || 0; 

				if ($(el).hasClass("wa_split_up")) {
					gsap.set(el.split.chars, {
						y: 50,
						opacity: 0,
					});
				}

				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 86%",
						toggleActions: 'play none none reverse',
					},
					y: 0,
					opacity: 1,
					duration: 0.3,
					ease: "ease1",
					stagger: 0.15,
					delay: delayValue, 
				});
			});
		}

		document.querySelectorAll(".wa_title_spilt_1").forEach((atEl) => {
			const atSplit = new SplitText(atEl, {
				type: "words,chars",
				wordsClass: "word",
				charsClass: "char"
			});

			let atDuration = parseFloat(atEl.getAttribute("data-speed")) || 1;
			let atDelay = parseFloat(atEl.getAttribute("data-delay")) || 0;

			if (window.innerWidth <= 768) {
				atDuration = atDuration * 0.3; 
			}

			gsap.set(atSplit.words, {
				willChange: "transform",
				perspective: 1000,
				transformStyle: "preserve-3d"
			});

			gsap.set(atSplit.chars, {
				willChange: "transform",
				opacity: 0,
				rotateX: -80,
				transformOrigin: "center center -10px"
			});

			gsap.set(atEl, {
				perspective: 1000,
				transformStyle: "preserve-3d"
			});

			gsap.to(atSplit.chars, {
				scrollTrigger: {
					trigger: atEl,
					start: "top 80%",
				},
				opacity: 1,
				rotateX: 0,
				duration: atDuration,
				delay: atDelay,
				ease: "power3.out",
				stagger: {
					each: 0.05,
					from: "center",
					grid: "auto",
				},
			});
		});

		

		document.querySelectorAll(".wa_title_split_2").forEach((twbEl) => {
			twbEl.style.display = "block";

			const twbSplit = new SplitText(twbEl, {
				type: "words"
			});
			const twbWords = twbSplit.words;

			const twbY = parseFloat(twbEl.getAttribute("data-y")) || 20;
			const twbRotation = parseFloat(twbEl.getAttribute("data-rotation")) || 0;
			const twbBlur = parseFloat(twbEl.getAttribute("data-blur")) || 5;
			const twbDuration = parseFloat(twbEl.getAttribute("data-duration")) || 0.75;
			const twbStagger = parseFloat(twbEl.getAttribute("data-stagger")) || 0.02;
			const twbOpacity = twbBlur > 0 ? 0 : 1;

			if (twbBlur > 0) {
				twbWords.forEach((twbWord) => {
					twbWord.style.opacity = 1;
				});
			}

			let atDelay = parseFloat(twbEl.getAttribute("data-delay")) || 0;

			gsap.from(twbWords, {
				y: twbY,
				rotation: twbRotation,
				filter: `blur(${twbBlur}px)`,
				opacity: twbOpacity,
				duration: twbDuration,
				delay: atDelay,
				stagger: twbStagger,
				ease: "power3.out",
				scrollTrigger: {
					trigger: twbEl,
					start: "top 100%",
					once: true,
				}
			});
		});


		/* 
			data-wa-split-1
		*/
		if($('[data-wa-split-1]').length) {
			var dataWaSplit1 = $('[data-wa-split-1]');
			if(dataWaSplit1.length == 0) return; gsap.registerPlugin(SplitText); dataWaSplit1.each(function(index, el) {
				el.split = new SplitText(el, { 
				type: "lines,words",
				linesClass: "split-line"
				});
			});
		}


	}	


	/* 
		hero-2-slider-function
	*/
	if ($('.as_h2_slider_active').length) {
		var as_h2_slider_active = new Swiper(".as_h2_slider_active", {
			loop: true,
			speed: 1000,

			effect: "fade",
			fadeEffect: {
				crossFade: true
			},


			// autoplay: {
			//     delay: 5000,
			// },

			// navigation: {
			// 	nextEl: ".pg_h2_next",
			// 	prevEl: ".pg_h2_prev",
			// },

			// pagination: {
			// 	el: ".pg_h2_pagination",
			// 	clickable: true,
			// },

		});

	}

	if (document.querySelector(".as_h2_slider_active-")) {
		const WA_DISP_IMG = "assets/img/hero/3d-grey.webp";
		const waTextures = {
			waDisp: PIXI.Texture.from(WA_DISP_IMG)
		};

		initGlassyEffect();

		function waRunGlassyEffectOnSlide(swiper) {
			document.querySelectorAll(".wa-pixi-wrap").forEach(el => el.remove());
			document.querySelectorAll(".as-hero-2-slider-item-img img").forEach(img => { img.style.opacity = "1"; });

			const activeSlide = swiper.slides[swiper.activeIndex];
			if (!activeSlide) return;

			const imgEl = activeSlide.querySelector(".as-hero-2-slider-item-img img");
			const imgWrap = activeSlide.querySelector(".as-hero-2-slider-item-img");
			if (!imgEl || !imgWrap) return;

			const computedPos = window.getComputedStyle(imgWrap).position;
			if (computedPos === "static") imgWrap.style.position = "relative";

			const oldWrap = imgWrap.querySelector(".wa-pixi-wrap");
			if (oldWrap) oldWrap.remove();

			const wrap = document.createElement("div");
			wrap.className = "wa-pixi-wrap";
			wrap.style.position = "absolute";
			wrap.style.inset = "0";
			wrap.style.zIndex = "1";
			wrap.style.pointerEvents = "none"; 

			const rect = imgWrap.getBoundingClientRect();
			const w = Math.max(1, Math.round(rect.width));
			const h = Math.max(1, Math.round(rect.height));

			imgEl.style.opacity = "0";
			imgWrap.appendChild(wrap);

			const app = new PIXI.Application({
				width: w,
				height: h,
				transparent: true,
				autoDensity: true,
				resolution: window.devicePixelRatio,
			});
			app.view.style.pointerEvents = "none";
			wrap.appendChild(app.view);

			const imgURL = imgEl.getAttribute("src");
			const heroTexture = PIXI.Texture.from(imgURL);

			if (heroTexture.baseTexture.valid) {
				renderSlide(app, heroTexture, waTextures.waDisp, w, h, wrap, imgEl);
			} else {
				heroTexture.baseTexture.once('loaded', () => {
					renderSlide(app, heroTexture, waTextures.waDisp, w, h, wrap, imgEl);
				});
			}
		}

		function renderSlide(app, heroTexture, dispTexture, w, h, wrap, imgEl) {
			const stageContainer = new PIXI.Container();
			app.stage.addChild(stageContainer);

			const hero = new PIXI.Sprite(heroTexture);
			stageContainer.addChild(hero);

			const texRatio = hero.texture.width / hero.texture.height;
			const contRatio = w / h;

			if (contRatio > texRatio) {
				hero.width = w;
				hero.height = w / texRatio;
			} else {
				hero.height = h;
				hero.width = h * texRatio;
			}

			hero.x = (w - hero.width) / 2;
			hero.y = (h - hero.height) / 2;

			const dispSprite = new PIXI.Sprite(dispTexture);
			dispSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
			const dispFilter = new PIXI.filters.DisplacementFilter(dispSprite);
			dispSprite.scale.set(2);
			app.stage.addChild(dispSprite);
			stageContainer.filters = [dispFilter];

			gsap.fromTo(
				dispFilter.scale,
				{ x: -400, y: -400 },
				{ x: 0, y: 0, duration: 2, ease: "expo.out" }
			);

			app.ticker.add(() => {
				dispSprite.x += 1;
				dispSprite.y += 1;
			});

			wrap._waDestroy = () => {
				try { app.destroy(true, { children: true, texture: false, baseTexture: false }); } catch(e){}
				if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
				imgEl.style.opacity = "1";
			};
		}

		function initGlassyEffect() {
			const swiperInstance =
				(typeof pg_h2_slider_active !== "undefined" && pg_h2_slider_active) ||
				document.querySelector(".as_h2_slider_active").swiper;

			if (swiperInstance) {
				requestAnimationFrame(() => waRunGlassyEffectOnSlide(swiperInstance));

				swiperInstance.on("slideChangeTransitionStart", () => {
					waRunGlassyEffectOnSlide(swiperInstance);
				});

				window.addEventListener("resize", () => {
					waRunGlassyEffectOnSlide(swiperInstance);
				});

				swiperInstance.on("destroy", () => {
					document.querySelectorAll(".wa-pixi-wrap").forEach(w => {
						if (w._waDestroy) w._waDestroy();
						else w.remove();
					});
				});
			}
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
	if (window.matchMedia("(min-width: 1200px)").matches) { 


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
						{ x: -220, y: -220 },
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

/* 
	hero-1-cursor-effect
*/
if($("#wa_cursor_noise").length) {
const waCanvas = document.getElementById("wa_cursor_noise");
const waCtx = waCanvas.getContext("2d");

let waParticles = [];
const waNoiseColor = "rgba(0,0,0,0.5)"; 
const waRadius = 250; 
const waDotSize = 2;  

function waResizeCanvas() {
  waCanvas.width = window.innerWidth;
  waCanvas.height = window.innerHeight;
}
waResizeCanvas();
window.addEventListener("resize", waResizeCanvas);

class waParticle {
  constructor(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * waRadius;

    this.x = x + Math.cos(angle) * dist;
    this.y = y + Math.sin(angle) * dist;

    this.size = waDotSize;
    this.alpha = 1;
    this.life = 0;
    this.maxLife = 60;

    this.vx = Math.cos(angle) * 1; 
    this.vy = Math.sin(angle) * 1;
  }

  update() {
    this.life++;
    this.x += this.vx; 
    this.y += this.vy;
    this.alpha -= 0.02; 
    if (this.alpha < 0) this.alpha = 0;
  }

  draw() {
    waCtx.fillStyle = waNoiseColor;
    waCtx.globalAlpha = this.alpha;
    waCtx.fillRect(this.x, this.y, this.size, this.size);
    waCtx.globalAlpha = 1;
  }
}

window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 60; i++) { 
    waParticles.push(new waParticle(e.clientX, e.clientY));
  }
});

function waAnimate() {
  waCtx.clearRect(0, 0, waCanvas.width, waCanvas.height);
  waParticles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life > p.maxLife) {
      waParticles.splice(i, 1);
    }
  });
  requestAnimationFrame(waAnimate);
}
waAnimate();
}

/* 
	magnetic-button-animation
*/
if ($(".wa_magnetic_btn_1").length) {
    var waMagnets = document.querySelectorAll('.wa_magnetic_btn_1');
    var waStrength = 10;

    waMagnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', moveMagnet);
        magnet.addEventListener('mouseout', function(event) {
            gsap.to(event.currentTarget, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1,0.3)"
            });
        });
    });

    function moveMagnet(event) {
        var magnetButton = event.currentTarget;
        var bounding = magnetButton.getBoundingClientRect();

        gsap.to(magnetButton, {
            x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * waStrength,
            y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * waStrength,
            duration: 1,
            ease: "elastic.out(1,0.3)"
        });
    }
}

/* 
	tilt-1
*/
$('.wa_tilt').each(function () {
	const $section = $(this);
	const $target = $section.find('.wa_tilt_elm');

	$section.on('mousemove', function (e) {
		const offset = $section.offset();
		const width = $section.outerWidth();
		const height = $section.outerHeight();

		const x = e.pageX - offset.left;
		const y = e.pageY - offset.top;

		const rotateY = ((x / width) - 0.5) * 11;
		const rotateX = ((y / height) - 0.5) * -11;

		$target.css({
			'transform': `perspective(1000px) rotateY(${rotateY}deg)`
		});
	});

	$section.on('mouseleave', function () {
		$target.css({
			'transform': 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
		});
	});
});


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
				scrub: true,    
				markers: false,  
			},
		}
	);
});

// wa-parallax-img
gsap.utils.toArray(".wa_parallax_img").forEach(element => {
	gsap.fromTo(
		element,
		{ objectPosition: "50% 0%" }, 
		{ 
			objectPosition: "50% 100%", 
			ease: "none",
			scrollTrigger: {
				trigger: element,
				scrub: true,    
				markers: false,     
			},
		}
	);
});

/* 
	hover-elm-moving
*/
if ($(".wa_magnetic_1_trigger").length) {
    var waMagnets2v2 = document.querySelectorAll('.wa_magnetic_1_trigger');
    var waStrength2v2 = 30;

    waMagnets2v2.forEach((magnet) => {
        magnet.addEventListener('mousemove', moveMagnet2);
        magnet.addEventListener('mouseout', function(event) {
            const innerElements = event.currentTarget.querySelectorAll('.wa_magnetic_1_elm');
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
        const innerElements = magnetButton.querySelectorAll('.wa_magnetic_1_elm');

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
	button-2-animation
*/
if (document.querySelectorAll(".as-pr-btn-2").length) {
    document.querySelectorAll(".as-pr-btn-2").forEach(btn => {
        const icon = btn.querySelector(".icon");
        const text = btn.querySelector(".text");

        function hoverEnter() {
            gsap.timeline()
                .to(icon, { left: "-20%", duration: 0.2, ease: "power4.in" })
                .to(icon, { left: "calc(100% - 44px)", rotation: -45, duration: 0.2, ease: "power4.in" });
            gsap.to(text, { x: -35, duration: 0.2, ease: "power4.in" });
        }

        function hoverLeave() {
            gsap.timeline()
                .to(icon, { left: "calc(120% - 44px)", duration: 0.2, ease: "power4.out" })
                .to(icon, { left: "3%", rotation: 0, duration: 0.2, ease: "power4.out" });
            gsap.to(text, { x: 0, duration: 0.2, ease: "power4.out" });
        }

        btn.addEventListener("mouseenter", hoverEnter);
        btn.addEventListener("mouseleave", hoverLeave);
    });
}


/* 
	team-1-animation
*/

if($(".as-team-1-wrap").length) {
	const teamWrap = document.querySelector(".as-team-1-wrap");
  	const members = document.querySelectorAll(".as-team-1-member");

	if (teamWrap) {
		const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
			members.forEach(member => member.classList.add("is_active"));
			} else {
			members.forEach(member => member.classList.remove("is_active"));
			}
		});
		}, { threshold: 0.1 });

		observer.observe(teamWrap);
	}
}

if (window.matchMedia("(min-width: 1600px)").matches) {
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
	partner-1-animation
*/
if (window.matchMedia("(min-width: 1200px)").matches) {

	
	var partner1ani = gsap.timeline({
		scrollTrigger: {
			trigger: ".partner1_trigger",
			start: "top 90%",
			end: "top -10%",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	partner1ani.from(".as-partner-1-cloud .cloud-1", {
		x: 150,
	});
	partner1ani.from(".as-partner-1-cloud .cloud-2", {
		x: -150,
	},"<");	
	partner1ani.from(".as-partner-1-cloud .rocket", {
		y: 300,
		x: 100,
		rotation: -30,
	},"<10%");
	
	
	
}



/* 
	process-1-animation
*/
if (window.matchMedia("(min-width: 992px)").matches) {


	gsap.to(".p1_pin_elm", {
		scrollTrigger: {
			trigger: ".p1_pin_elm_trigger",
			start: "top 0%", 
			end: "900px",
			pin: ".p1_pin_elm", 
			pinSpacing: false,
			markers: false
		}
	});
	

	var p1ani = gsap.timeline({
		scrollTrigger: {
			trigger: ".p1_pin_elm_trigger",
			start: "top 0%",
			end: "900px",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	p1ani.to(".p1_ani_elm:nth-of-type(2)", {
		x: -505,
	});
	
	p1ani.to(".p1_ani_elm:nth-of-type(3)", {
		x: -505,
	},"<");
		
	p1ani.to(".p1_ani_elm:nth-of-type(3)", {
		x: -1010,
	});
	
	
}

/* 
	cta-1-animation
*/
if (window.matchMedia("(min-width: 992px)").matches) {

	

	var cta1ani = gsap.timeline({
		scrollTrigger: {
			trigger: ".cta1_trigger",
			start: "top 50%",
			end: "top top",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	cta1ani.from(".as-cta-1-hand-1", {
		x: 150,
		y: 150,
	});
	
	cta1ani.from(".as-cta-1-hand-2", {
		x: -150,
		y: -150,
	},"<");
	
	
	cta1ani.from(".as-cta-1-img-1", {
		x: 250,
		rotation: 30,
		opacity: 0,
	},"<10%");
	
	cta1ani.from(".as-cta-1-img-2", {
		x: -250,
		y: 150,
		rotation: -30,
		opacity: 0,
	},"<10%");
	
	cta1ani.from(".as-cta-1-content .title-1", {
		x: 100,
		y: -50,
		opacity: 0,
	},"<10%");
	
	cta1ani.from(".as-cta-1-content .title-2", {
		x: 250,
		y: -150,
		opacity: 0,
	},"<10%");
	
	cta1ani.from(".as-cta-1-content .btn-wrap", {
		x: 250,
		y: -150,
		opacity: 0,
	},"<10%");
	
	
}



/* 
	portfolio-1-pin
*/
if (window.matchMedia("(min-width: 992px)").matches) {


	gsap.to(".portfolio1_pin_elm", {
		scrollTrigger: {
			trigger: ".portfolio1_pin_elm_trigger",
			start: "top 10%", 
			end: "bottom 85%",
			pin: ".portfolio1_pin_elm", 
			pinSpacing: false,
			markers: false
		}
	});
	

	var portfolio1title = gsap.timeline({
		scrollTrigger: {
			trigger: ".portfolio1_pin_elm_trigger",
			start: "top 10%",
			end: "bottom bottom",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	portfolio1title.to(".as-portfolio-1-sec-title .big-title", {
		scale: .5,
	});
	

	
	
}


/* 
	testimonial-2-animation
*/
if (window.matchMedia("(min-width: 992px)").matches) {


	var portfolio1title = gsap.timeline({
		scrollTrigger: {
			trigger: ".as_t1_item",
			start: "top 90%",
			end: "bottom top",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	portfolio1title.to(".as_t1_item", {
		yPercent: -30,
	});
	

	
	
}


/* 
	firefly-animation
*/
const paths = document.querySelectorAll('.as-blog-1-left-svg path');

	paths.forEach((path) => {
		function animatePath() {
				gsap.to(path, {
				opacity: Math.random() > 0.5 ? 1 : 0,
				duration: Math.random() * 0.2 + 0.2, 
				delay: Math.random() * 0.1, 
				onComplete: animatePath, 
				ease: "power1.inOut"
			});
	}
  	animatePath(); 
});


/* 
	portfolio-2-bg-color
*/


gsap.to(".as-portfolio-2-bg-color .circle", {
	scrollTrigger: {
	  trigger: ".as-portfolio-2-bg-color",
	  start: "bottom-=300 bottom",  
	  end: "bottom bottom",         
	  scrub: true,
	  markers: false,
	},
	width: "300vh",
	height: "300vh",
	ease: "none"
  });


/* 
	portfolio-2-animation
*/
if (window.matchMedia("(min-width: 992px)").matches) {


	gsap.to(".as-portfolio-2-pin", {
		scrollTrigger: {
			trigger: ".as-portfolio-2-height",
			start: "top 10%", 
			end: "bottom 85%",
			pin: ".as-portfolio-2-pin", 
			pinSpacing: false,
			markers: false
		}
	});


	var portfolio2ani23 = gsap.timeline({
		scrollTrigger: {
			trigger: ".as-portfolio-2-sec-title",
			start: "bottom-=300 bottom",  
			end: "bottom bottom",      
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});

	portfolio2ani23.from(".as-portfolio-2-main-wrap", {
		scale: .25,
		yPercent: -55,
		x: 40,
	});
	

	var portfolio2ani = gsap.timeline({
		scrollTrigger: {
			trigger: ".as-portfolio-2-height",
			start: "top 10%",
			end: "bottom bottom",
			toggleActions: "play none none reverse",
			scrub: true,
			markers: false,
		},
	});


	
	portfolio2ani.to(".as-portfolio-2-item:nth-of-type(1) .as-portfolio-2-item-content", {
		opacity: 0,
		duration: .5,
	});
	portfolio2ani.to(".as-portfolio-2-item:nth-of-type(1)", {
		height: 0,
	});	
	portfolio2ani.to(".as-portfolio-2-sm-item-scroll", {
		y: -488,
	},"<");
	portfolio2ani.to(".as-portfolio-2-item:nth-of-type(2) .as-portfolio-2-item-content", {
		opacity: 0,
		duration: .5,
	});
	portfolio2ani.to(".as-portfolio-2-item:nth-of-type(2)", {
		height: 0,
	});
	portfolio2ani.to(".as-portfolio-2-sm-item-scroll", {
		y: -976,
	},"<");
	// portfolio2ani.to(".as-portfolio-2-item:nth-of-type(3) .as-portfolio-2-item-content", {
	// 	opacity: 0,
	// 	duration: .5,
	// });
	// portfolio2ani.to(".as-portfolio-2-item:nth-of-type(3)", {
	// 	height: 0,
	// });

	
	var portfolio2ani2 = gsap.timeline({
		scrollTrigger: {
			trigger: ".as-portfolio-2-height",
			start: "top 40%",
			end: "bottom bottom",
			toggleActions: "play none none reverse",
			markers: false,
		},
	});

	portfolio2ani2.from(".as-portfolio-2-sm-item", {
		opacity: 0,
		duration: .7,
	});
	
	// var portfolio2ani3 = gsap.timeline({
	// 	scrollTrigger: {
	// 		trigger: ".as-portfolio-2-height",
	// 		start: "top 10%",
	// 		end: "bottom bottom",
	// 		toggleActions: "play none none reverse",
	// 		scrub: true,
	// 		markers: true,
	// 	},
	// });

	// portfolio2ani3.to(".as-portfolio-2-sm-item-scroll", {
	// 	y: -976,
	// });
	
}


// services-2-img
if (window.matchMedia("(min-width: 1200px)").matches) { 
if ($(".as-services-2-item").length) {
	const featureItems = document.querySelectorAll(".as-services-2-item");
  
	featureItems.forEach((featureItem) => {
	  const flair = featureItem.querySelector(".cursor-follow");
  
	  // Initial state
	  gsap.set(flair, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });
  
	  // Prepare smooth cursor motion
	  const xTo = gsap.quickTo(flair, "x", { duration: 0.2, ease: "power1.out", });
	  const yTo = gsap.quickTo(flair, "y", { duration: 0.2, ease: "power1.out", });
  
	  featureItem.addEventListener("mouseenter", () => {
		gsap.to(flair, { scale: 1, opacity: 1, duration: 0.2, ease: "power1.out", });
	  });
  
	  featureItem.addEventListener("mousemove", (e) => {
		const rect = featureItem.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		xTo(x);
		yTo(y);
	  });
  
	  featureItem.addEventListener("mouseleave", () => {
		gsap.to(flair, { scale: 0, opacity: 0, duration: 0.2, ease: "power1.out", });
	  });
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
if ($('.t1_slider_active').length) {
	var t1_slider_active = new Swiper(".t1_slider_active", {
		loop: true,
		speed: 600,
		spaceBetween: 25,
		slidesPerView: "auto",
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
	blog-2-slider-function
*/
if ($('.b2_slider_active').length) {
	var b2_slider_active = new Swiper(".b2_slider_active", {
		loop: true,
		speed: 600,
		spaceBetween: 32,
        slidesPerView: "auto",
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

/* 
	marquee-down-top 
*/
if ($(".wa_marquee_down_top").length) {
  document.querySelectorAll(".wa_marquee_down_top").forEach((waMarqueeTop) => {
    const waMarqueeClone = waMarqueeTop.cloneNode(true);
    waMarqueeTop.parentNode.appendChild(waMarqueeClone);

    const waMarqueeTotalHeight = waMarqueeTop.offsetHeight;

    gsap.to([waMarqueeTop, waMarqueeClone], {
      y: `-${waMarqueeTotalHeight}px`,
      ease: "none",
      duration: 30,
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize((waY) => parseFloat(waY) % waMarqueeTotalHeight),
      },
    });
  });
}




/* 
	faqs-active-class
*/
$(document).on('click', '.wa_accordion_item', function(){
	$(this).addClass('active').siblings().removeClass('active')
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