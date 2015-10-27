$(function(){

	var docHeight = $(document).height();
	var docWidth = $(document).width();

	var mainArticle = $('.main-article');
	var mainArticleWidth = mainArticle.width();

	var footerContainer = $('.footer-container');

	footerContainer.css({
		opacity: '1',
		transition: 'all 3s ease 0s'
	});

	var inimainQuoteAll = function() {

		var mainQuoteAll = $('#main-quote-all');
		var mainQuoteAllWidth = mainQuoteAll.width();
		var mainQuoteAllHeight = mainQuoteAll.height();

		var mainQuote = $('#main-quote');
		var lineQuote = $('.line-quote');

		var fixQuotePosition = function() {
			mainQuoteAll.css({
				left: ((docWidth - mainQuoteAllWidth) / 2),
				top: ((docHeight - mainQuoteAllHeight) / 2),
				display: 'block'
			});
		}

		var shrinkLineQuote = function() {
			for (var i = 0; i < 10000; i++) {
				var count = 0.00000 + i / 10000000;
				lineQuote.css({
					'opacity': '1',
					'transform-origin': 'center 100% 0px',
					'transform': 'matrix('+count+', 0, 0, 1, 0, 0)',
					'transition': 'all 1s ease 0s',
				});
			};
		}

		var stretchLineQuote = function() {
			for (var i = 10000; i > 0; i--) {
				var count =  i / (100000 * 0.00001);
				lineQuote.css({
					'opacity': '1',
					'transform-origin': 'center 100% 0px',
					'transform': 'matrix('+count+', 0, 0, 1, 0, 0)',
					'transition': 'all 1.6s ease 0s',
				});
			};
		}

		var upMainQuote = function() {
			mainQuote.css({
				transform: 'matrix(1, 0, 0, 1, 0, -0.6451)',
				transition: 'all 1s ease 0s',
				opacity: '1'
			});
			stretchLineQuote();//伸长lineQuote
		}

		var downMainQuote = function() {
			mainQuote.css({
				transform: 'matrix(1, 0, 0, 1, 0, 105.6451)',
				transition: 'all 0.6s ease 0s',
				opacity: '0'
			});
			shrinkLineQuote();//收起lineQuote
		}

		fixQuotePosition(); //使quote居中
		upMainQuote();//拉起mainquote
		
		var startQuoteAnimation = function() {
			upMainQuote();//拉起mainquote
			setTimeout(downMainQuote,3000);
		}

		// startQuoteAnimation();
		setInterval(startQuoteAnimation,4500);

	}();

});
