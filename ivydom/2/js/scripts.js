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

	var mainQuoteInterval = 0;

	var inimainQuoteAll = function() {

		var mainQuoteAll = $('#main-quote-all');
		var mainQuoteAllWidth = mainQuoteAll.width();
		var mainQuoteAllHeight = mainQuoteAll.height();

		var mainQuote = $('.main-quote');
		var lineQuote = $('.line-quote');

		var quote1 = $('quote1');
		var quote2 = $('quote2');

		var currentQuote = 'quote1';
		var nextQuote = 'quote2';

		var fixQuotePosition = function() {
			mainQuoteAll.css({
				left: ((docWidth - mainQuoteAllWidth) / 2),
				top: ((docHeight - mainQuoteAllHeight) / 2),
				display: 'block'
			});
		}

		var shrinkLineQuote = function(line) {
			for (var i = 0; i < 10000; i++) {
				var count = 0.00000 + i / 10000000;
				line.css({
					'opacity': '1',
					'transform-origin': 'center 100% 0px',
					'transform': 'matrix('+count+', 0, 0, 1, 0, 0)',
					'transition': 'all 1s ease 0s',
				});
			};
		}

		var stretchLineQuote = function(line) {
			for (var i = 10000; i > 0; i--) {
				var count =  i / (100000 * 0.00001);
				line.css({
					'opacity': '1',
					'transform-origin': 'center 100% 0px',
					'transform': 'matrix('+count+', 0, 0, 1, 0, 0)',
					'transition': 'all 1.6s ease 0s',
				});
			};
		}

		var upMainQuote = function(quote, line) {

			var quoteLogic = {

				'quote1': function() {
					quote2.hide();
					quote1.show();
					currentQuote = 'quote1';
					nextQuote = 'quote2';
				},

				'quote2': function() {
					quote1.hide();
					quote2.show();
					currentQuote = 'quote2';
					nextQuote = 'quote1';
				}

			};

			// quoteLogic[currentQuote]();

			quote.css({
				transform: 'matrix(1, 0, 0, 1, 0, -0.6451)',
				transition: 'all 1s ease 0s',
				opacity: '1'
			});
			stretchLineQuote(line);//伸长lineQuote
		}

		var downMainQuote = function(quote, line) {

			var quoteLogic = {

				'quote1': function() {
					quote1.hide();
					quote2.show();
					currentQuote = 'quote2';
					nextQuote = 'quote1';
				},

				'quote2': function() {
					quote2.hide();
					quote1.show();
					currentQuote = 'quote1';
					nextQuote = 'quote2';
				}

			};

			// quoteLogic[currentQuote]();

			quote.css({
				transform: 'matrix(1, 0, 0, 1, 0, 105.6451)',
				transition: 'all 0.6s ease 0s',
				opacity: '0'
			});
			shrinkLineQuote(line);//收起lineQuote
		}

		var toggleCurrentQuote = function(value) {
			var arr = {
				'quote1': function() {
					return 'quote2';
				},

				'quote2': function() {
					return 'quote1';
				}
			};

			return arr[value]();
		}

		fixQuotePosition(); //使quote居中
		
		var startQuoteAnimation = function() {
			upMainQuote(mainQuote, lineQuote);//拉起quote
			setTimeout(function() {
				downMainQuote(mainQuote, lineQuote);//降起quote
				// currentQuote = toggleCurrentQuote(currentQuote);
			},3000);
		}

		startQuoteAnimation();

		mainQuoteInterval = setInterval(startQuoteAnimation,4500);

	};

	inimainQuoteAll();

	$('.menu-container .menu-item').click(function() {

		var _this = $(this);
		var id = _this.attr('id');

		var mainArticle = $('.main-article');

		var articleTab = mainArticle.find('.article-tab');
		var tabActive = mainArticle.find('.active');

		var thisTab = $('#main-' + id);

		thisTab.addClass('active');//标记当前tab为活跃页
		thisTab.css({display: 'block'});//重新确认不隐藏,防止冲突

		tabActive.removeClass('active');//去掉当前活跃页活跃标记
		tabActive.css({display: 'none'});//将活跃tab置不可视

		clearInterval(mainQuoteInterval);//清除主页面的interval指针

		var idMethod = {

			'blog': function() {
				window.location.href = "http://me.ivydom.com";
			},

			'intro': function() {

			},

			'works': function() {

			},

			'team': function() {

			},

			'contact': function() {

			},

			'home': function() {
				window.location.reload();
			}

		};

		if(typeof idMethod[id] != 'undefined') {
			idMethod[id]();
		}

	});

});
