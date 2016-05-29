'use strict';

$(document).ready(function(){

	var app = (function() {
		var $window = $(window);

		return {
			init: function() {
				var that = this;

				// Слайдеры 
					$('#main-slider').slick({
						autoplay: true,
						autoplaySpeed: 7000,
						prevArrow: '<button type="button" class="slick-prev"><i class="icon-left-open"></i></button>',
						nextArrow: '<button type="button" class="slick-next"><i class="icon-right-open"></i></button>',
						dots: true,
						speed: 500
					});

					$('#middle-slider').slick({
						autoplay: true,
						autoplaySpeed: 5000,
						prevArrow: '<button type="button" class="slick-prev"><i class="icon-left-open"></i></button>',
						nextArrow: '<button type="button" class="slick-next"><i class="icon-right-open"></i></button>',
						speed: 500,
						centerPadding: '0px',
						slidesToShow: 3,
						slidesToScroll: 2
					});

					$('#news-slider').slick({
						autoplay: true,
						autoplaySpeed: 5000,
						prevArrow: '<button type="button" class="slick-prev"><i class="icon-up-open"></i></button>',
						nextArrow: '<button type="button" class="slick-next"><i class="icon-down-open"></i></button>',
						speed: 500,
						slidesToShow: 5,
						slidesToScroll: 1,
						vertical: true,
						responsive: [
							{
								breakpoint: 1200,
								settings: {
									slidesToShow: 4,
									autoplay: true
								}
							}
						]
					});

				// Параллакс
					that.parallaxScroll($('#section-4'), 100, 40);

				// Прокрутка окна
					$window.on('scroll', function() {
						var fromTop = $window.scrollTop();

						that.parallaxScroll($('#section-4'), 100, 40, fromTop);
					});

				// Обрезание строк
					$('#main-slider .slide-desc').each(function(i) {
						var $this = $(this);

						that.sliceString($this, 320, false);
					});

					$('.article-describe').each(function(i) {
						var $this = $(this);

						that.sliceString($this, 90, false);
					});

					$('.news-block .news-item').each(function(i) {
						var $this = $(this);

						that.sliceString($this, 255, true);
					});

				// Маска для номера телефона
					$('.phone-number').on('focus', function(){

						$(this).inputmask({
							"clearMaskOnLostFocus": true,
							"mask":"+7(999)-999-99-99",
							"clearIncomplete": true
						});
					});

				// Вид селекта
					$('select').selectify({
						duration: 300,
						autoWidth: false,
						btnText: '',
						classes: {
							btn: 'sl-button icon-arr'
						}
					});

				// Всплывающие окна
					that.popUp($('#call-me-link'), $('.call-me'));
			},

			parallaxScroll: function (section, posX, speed, fromTop) {
				var topBorder = section.offset().top,
					bottomBorder = topBorder + section.outerHeight();

				if(fromTop > topBorder-$(window).height() && fromTop < bottomBorder) {
					section.css('background-position', posX + '% ' + fromTop/speed + '%');
				}
			},

			sliceString: function (element, count, light) {
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
			},

			popUp: function (link, elem) {
				link.on('click', function(e) {
					e.preventDefault();

					elem.show();
					$('html, body').css({
						'height' : '100%',
						'overflow' : 'hidden'
					});
				});
				
				$('.pop-up-back, .close-pop-up').on('click', function(e) {
					e.preventDefault();

					$(this).closest('.pop-up').hide();
					$('html, body').css({
						'height' : '',
						'overflow' : ''
					});
				});
			}
		}
	}());
		
	app.init();

});