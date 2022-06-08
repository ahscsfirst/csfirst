(function ($) {

	"use strict";

	$(function () {
		$("#tabs").tabs();
	});

	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		var box = $('.header-text').height();
		var header = $('header').height();

		if (scroll >= box - header) {
			$("header").addClass("background-header");
		} else {
			$("header").removeClass("background-header");
		}
	});


	$('.schedule-filter li').on('click', function () {
		var tsfilter = $(this).data('tsfilter');
		$('.schedule-filter li').removeClass('active');
		$(this).addClass('active');
		if (tsfilter == 'all') {
			$('.schedule-table').removeClass('filtering');
			$('.ts-item').removeClass('show');
		} else {
			$('.schedule-table').addClass('filtering');
		}
		$('.ts-item').each(function () {
			$(this).removeClass('show');
			if ($(this).data('tsmeta') == tsfilter) {
				$(this).addClass('show');
			}
		});
	});


	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();


	// Menu Dropdown Toggle
	if ($('.menu-trigger').length) {
		$(".menu-trigger").on('click', function () {
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	$(document).ready(function () {
		$(document).on("scroll", onScroll);

		//smoothscroll
		$('.scroll-to-section a[href^="#"]').on('click', function (e) {
			e.preventDefault();
			$(document).off("scroll");

			$('a').each(function () {
				$(this).removeClass('active');
			})
			$(this).addClass('active');

			var target = this.hash,
				menu = target;
			var target = $(this.hash);
			$('html, body').stop().animate({
				scrollTop: (target.offset().top) + 1
			}, 500, 'swing', function () {
				window.location.hash = target;
				$(document).on("scroll", onScroll);
			});
		});
	});

	function onScroll(event) {
		var scrollPos = $(document).scrollTop();
		$('.nav a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$('.nav ul li a').removeClass("active");
				currLink.addClass("active");
			}
			else {
				currLink.removeClass("active");
			}
		});
	}


	// Page loading animation
	$(window).on('load', function () {

		$('#js-preloader').addClass('loaded');
		whatWeDoResizing();

		/* Send email for contacts */
		document.getElementById("form-submit").addEventListener("click", ev => {
			const subject = document.getElementById("subject").value;
			const body = document.getElementById("message").value;
			window.location.href = "mailto:ahscsfirst@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
		});
	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function () {
		mobileNav();
		whatWeDoResizing();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function () {
			if (width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}

	/* Resize Images */

	function whatWeDoResizing() {
		function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
			const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
			return { width: srcWidth * ratio, height: srcHeight * ratio };
		}

		const imageThumbs = document.getElementsByClassName("image-thumb");
		for (const imgThumb of imageThumbs) {
			const img = imgThumb.children[0];
			// image is already sized appropriately in width
			const newSize = calculateAspectRatioFit(img.width, img.height, img.width, 200);
			img.style.width = Math.floor(newSize.width) + "px";
			img.style.height = Math.floor(newSize.height) + "px";
			img.style.display = "block";
			img.style.marginLeft = "auto";
			img.style.marginRight = "auto";
		}

	}

})(window.jQuery);