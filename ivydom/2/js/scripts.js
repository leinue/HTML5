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
		var lineQuote1 = $('#line-quote1');

		var fixQuotePosition = function() {
			mainQuoteAll.css({
				left: ((docWidth - mainQuoteAllWidth) / 2),
				top: ((docHeight - mainQuoteAllHeight) / 2),
				display: 'block'
			});
		}

		var upMainQuote = function() {
			mainQuote.css({
				transform: 'matrix(1, 0, 0, 1, 0, -0.6451)',
				transition: 'all 1s ease 0s',
				opacity: '1'
			});
		}

		var downMainQuote = function() {
			mainQuote.css({
				transform: 'matrix(1, 0, 0, 1, 0, 105.6451)',
				transition: 'all 0.6s ease 0s',
				opacity: '1'
			});
		}

		fixQuotePosition(); //使quote居中
		upMainQuote();//拉起mainquote

		setTimeout(downMainQuote,3000);

		lineQuote1.css({
			'transform-origin': 'right 50% 0px',
			'transform': 'matrix(0.997949, 0, 0, 1, 0, 0)',
			'transition': 'all 1s ease 0s',
		});

	}();

});
