'use strict';

$(document).ready(function(){

// Слайдеры 
	$('#main-slider').slick({
		autoplay: true,
		autoplaySpeed: 7000,
		prevArrow: '<button type="button" class="slick-prev"><i class="icon-left-open"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="icon-right-open"></button>',
		dots: true,
		speed: 500
	});

	$('#middle-slider').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		prevArrow: '<button type="button" class="slick-prev"><i class="icon-left-open"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="icon-right-open"></button>',
		speed: 500,
		centerPadding: '0px',
		slidesToShow: 3,
		slidesToScroll: 2
	});

	$('#news-slider').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		prevArrow: '<button type="button" class="slick-prev"><i class="icon-up-open"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="icon-down-open"></button>',
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		vertical: true
	});

// Параллакс
	parallaxScroll($('#section-4'), 100, 40);

	$(window).on('scroll', function() {
		parallaxScroll($('#section-4'), 100, 40);
	});

	function parallaxScroll(section, posX, speed) {
		var topBorder = section.offset().top,
			bottomBorder = topBorder + section.outerHeight(),
			fromTop = $(window).scrollTop();

		if(fromTop > topBorder-$(window).height() && fromTop < bottomBorder) {
			section.css('background-position', posX + '% ' + fromTop/speed + '%');
		}
	}

// Обрезание строк
	$('#main-slider .slide-desc').each(function(i) {
		var $this = $(this);

		sliceString($this, 320, false);
	});

	$('.article-describe').each(function(i) {
		var $this = $(this);

		sliceString($this, 90, false);
	});

	$('.news-block .news-item').each(function(i) {
		var $this = $(this);

		sliceString($this, 255, true);
	});

	function sliceString(element, count, light) {
		var text = element.html(),
			newText;

		if(text.length > count) {
			var lastBackspace = text.substr(0, (count -3)).lastIndexOf(' ');

			newText = text.slice(0, lastBackspace) + '...'; //Дописать проверку на точку и запятую на конце строки

			if(light) {
				var divider = newText.length - 7,
					firstPart = newText.substr(0, divider),
					lightPart = newText.substr(divider, newText.length),
					lightText = '',
					opacityArray = ['.9', '.8', '.7', '.6', '.5', '.4', '.3'];

				for(var i = 0; i < 7; i++) {
					lightText += '<span style="opacity: ' + opacityArray[i] + ';">' + lightPart.substr(i, 1) + '</span>';
				}

				newText = firstPart + lightText;
			}

			element.html(newText);
		}
	}
});