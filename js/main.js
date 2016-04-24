'use strict';

$(document).ready(function(){

// Слайдер 
	var slider = (function(){

		var flag = true,
			timerDuration = 7000,
			timer = 0;

		return {
			init: function(){
				var that = this;

				// Создание точек
				that.createDots();

				// Автопереключение
				that.autoSwitch();

				// Клик по стрелкам
				$('.slider-control-button').on('click', function(e){
					e.preventDefault();

					var $this = $(this),
						slides = $this.closest('.slider').find('.slider-item'),
						activeSlide = slides.filter('.active'),
						nextSlide = activeSlide.next(),
						prevSlide = activeSlide.prev(),
						firstSlide = slides.first(),
						lastSlide = slides.last();

					that.clearTimer();

					if ($this.hasClass('btn-next')) {

						if (nextSlide.length) {
							that.moveSlide(nextSlide, 'forward');
						} else {
							that.moveSlide(firstSlide, 'forward');
						}
						
					} else {

						if (prevSlide.length) {
							that.moveSlide(prevSlide, 'backward');
						} else {
							that.moveSlide(lastSlide, 'backward');
						}

					}
				});

				// Клик по точкам
				$('.dot-link').on('click', function(e){
					e.preventDefault();

					var $this = $(this),
						dots = $this.closest('.slider-menu-controls').find('.control-link'),
						activeDot = dots.filter('.active'),
						dot = $this.closest('.control-link'),
						curDotNum = dot.index(),
						direction = (activeDot.index() < curDotNum) ? 'forward' : 'backward',
						reqSlide = $this.closest('.slider').find('.slider-item').eq(curDotNum);

					if (!dot.hasClass('active')) {
						that.clearTimer();
						that.moveSlide(reqSlide, direction);
					}
				});
			},

			moveSlide: function(slide, direction){
				var that = this,
					container = slide.closest('.slider'),
					slides = container.find('.slider-item'),
					activeSlide = slides.filter('.active'),
					slideWidth = slides.width(),
					duration = 500,
					reqCssPosition = 0,
					reqSlideStrafe = 0;

				if (flag) {
					flag = false;

					if (direction === 'forward') {
						reqCssPosition = slideWidth;
						reqSlideStrafe = -slideWidth;
					} else if (direction === 'backward') {
						reqCssPosition = -slideWidth;
						reqSlideStrafe = slideWidth;
					}

					slide.css('left', reqCssPosition).addClass('inslide');

					var moveableSlide = slides.filter('.inslide');

					activeSlide.stop(true, true).animate({left: reqSlideStrafe}, duration);
					
					moveableSlide.stop(true, true).animate({left: 0}, duration, function(){
						var $this = $(this);

						slides.css('left', '0').removeClass('active');
						
						$this.removeClass('inslide').addClass('active');
						
						that.setActiveDot(container.find('.slider-menu-controls')); // Неочевидная хрень. 
					});

					flag = true;
				}
			},

			createDots: function(){
				var that = this,
					container = $('.slider'), 
					dotMarkup = '<li class="control-link"><a href="#" class="dot-link"></a></li>';

				container.each(function(){
					var $this = $(this),
						slides = $this.find('.slider-item'),
						dotContainer = $this.find('.slider-menu-controls');

					for (var i = 0; i < slides.length; i++) {
						dotContainer.append(dotMarkup);
					}

					that.setActiveDot(dotContainer);
				});
			},

			setActiveDot: function(container){
				var slides = container.closest('.slider-list-wrap').find('.slider-item');

				container
					.find('.control-link')
					.eq(slides.filter('.active').index())
					.addClass('active')
					.siblings()
					.removeClass('active');
			},

			autoSwitch: function(){
				var that = this;

				timer = setInterval(function(){
					var slides = $('.slider-item'),
						activeSlide = slides.filter('.active'),
						nextSlide = activeSlide.next(),
						firstSlide = slides.first();

					if (nextSlide.length) {
						that.moveSlide(nextSlide, 'forward');
					} else {
						that.moveSlide(firstSlide, 'forward');
					}

				}, timerDuration);
			},

			clearTimer: function(){
				if (timer) {
					clearInterval(timer);
					this.autoSwitch();
				}
			}
		}

	}());

	slider.init();

// Высота блока новостей
	var usefulListHeight = $('#section-4 .useful-list').height();
	$('#section-4 .news-list').height(usefulListHeight - 13);

// Параллакс
	function parallaxScroll(section, posX, speed) {
		var topBorder = section.offset().top,
			bottomBorder = topBorder + section.outerHeight(),
			fromTop = $(window).scrollTop();

		if(fromTop > topBorder-$(window).height() && fromTop < bottomBorder) {
			section.css('background-position', posX + '% ' + fromTop/speed + '%');
		}
	}

	$(window).on('scroll', function() {
		parallaxScroll($('#section-3'), 100, 10);
		parallaxScroll($('#section-4'), 1, 50);
	});

// Обрезание строк
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
					colorArray = ['rgba(77,77,77,.9)', 'rgba(77,77,77,.8)', 'rgba(77,77,77,.7)', 'rgba(77,77,77,.6)', 'rgba(77,77,77,.5)', 'rgba(77,77,77,.4)', 'rgba(77,77,77,.3)'];

				for(var i = 0; i < 7; i++) {
					lightText += '<span style="color: ' + colorArray[i] + ';">' + lightPart.substr(i, 1) + '</span>';
				}

				newText = firstPart + lightText;
			}

			element.html(newText);
		}
	}

	$('.article-describe').each(function(i) {
		var $this = $(this);

		sliceString($this, 90, false);
	});

	
});