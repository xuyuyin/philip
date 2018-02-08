import '../css/index.less';
const fullpage = require('fullpage.js');
var UA = navigator.userAgent;
var isIos = !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1;
var dpr = isIos ? Math.min(window.devicePixelRatio, 3) : 1;
var IsIPhoneX = isIos && (screen.height == 812 && screen.width == 375);
(function(window, document, $) {
	$(document).ready(function() {
		var loader = new resLoader({
			resources : [
				'images/circle1.png',
				'images/circle2.png',
				'images/circle3.png',
				'images/jdtxt.png',
				'images/logo.png',
				'images/p1_bg.png',
				'images/p1_bg2.png',
				'images/p2_bg_1.jpg',
				'images/p2_bg_3.jpg',
				'images/p1_title.png',
				'images/p1_txt.png',
				'images/shuatou.png',
				'images/tmtxt.png',
				'images/xijun1.png',
				'images/xijun2.png',
				'images/xijun3.png',
				'images/yashua.png',
				'images/loading.jpg',
				'images/p2t1.png',
				'images/p2t2.png',
				'images/p2t3.png',
				'images/p2t4.png',
				'images/p2title.png',
				'images/logo.png'
			],
			onStart : function(total){
				$(".sec1").css('display', 'none');
				$(".sec2").css('display', 'none');
				$(".dot").css('display', 'none');
			},
			onProgress : function(current, total){
				if (current == 1) {
					$(".loadingBg").css('display', 'block');
					$(".loading").css('display', 'block');
				}
				$(".loading span").text(parseInt(current / total * 100)  + "%");
			},
			onComplete : function(total){
				$('body').css("background", "#ae2742;");
				$(".loadingBg").css('display', 'none');
				$(".loading").css('display', 'none');
				$("#fullpage").css('display', 'block');
				$(".sec1").css('display', 'block');
				$(".sec2").css('display', 'block');
				$(".dot").css('display', 'block');
				let animated = false;
				$('#fullpage').fullpage({
					anchors: ['sec1', 'sec2'],
					verticalCentered: true,
					
					afterLoad: function (anchorlink, index) {
						var height1 = $('.sec1').height() / dpr;
						var width1 = $('.sec1').width() / dpr;
						var xishu = height1 / width1;
						// console.log(xishu);
						// console.log(height1);
						if ((width1 < 410 && height1 < 600)||(width1 > 410 && height1 <= 650)) {
							$(".qianya").css('background-size', '30rem 53.36rem, 30rem 10rem');
							$(".qianya").css('background-position', 'center -5.6rem, center bottom');
							$('.xijun2').css('top', '23.04rem');
							$('.xijun3').css('top', '35.52rem');
							$('.xijun1').css('top', '-1.68rem');
							$('.m3').css('top', '25.64rem');
							$('.circle1').css('top', '19.88rem');
							$('.circle2').css('top', '28.64rem');
							$('.circle3').css('top', '26.48rem');
							$('.solve').css('bottom', '2.12rem');
							$('.solve').css('background-size', '70%');
							$('.solve').css('background-position', 'center bottom');
							$('.arrow').css('bottom', '0.2rem');
							$('.arrow').css('background-size', '70%');
						} else if (IsIPhoneX && height1 < 640) {
							$('.flexBox').css({
								'height': '80%'
								// 'height': '45.36rem',
								// 'position': 'absolute',
								// 'left': '0',
								// 'top': '50%',
								// 'margin-top': '-30.68rem'
							});
							// $('.solve').css('bottom', '11.12rem');
							// $('.arrow').css('bottom', '7.2rem');
							// $('.close').css('bottom', '9.72rem');
						}
						switch (index) {
							case 1:
								if (!animated) {
									setTimeout(() => {
										$('.title').addClass('animated zoomIn').removeClass('hide');
									}, 100);
									setTimeout(() => {
										$('.txt').addClass('animated zoomIn').removeClass('hide');
									}, 850);
									setTimeout(() => {
										$('.m3').addClass('animated zoomIn').removeClass('hide');
									}, 1050);
									setTimeout(() => {
										$('.circle1').addClass('animated zoomIn').removeClass('hide');
									}, 1200);
									setTimeout(() => {
										$('.circle2').addClass('animated zoomIn').removeClass('hide');
									}, 1300);
									setTimeout(() => {
										$('.circle3').addClass('animated zoomIn').removeClass('hide');
									}, 1400);
									setTimeout(() => {
										$('.xijun1').addClass('animated fadeIn').removeClass('hide');
									}, 1600);
									setTimeout(() => {
										$('.xijun2').addClass('animated slideInLeft').removeClass('hide');
									}, 1700);
									setTimeout(() => {
										$(".xijun3").css('display', 'block');	
										$('.xijun3').addClass('animated slideInRight').removeClass('hide');
									}, 1800);
									setTimeout(() => {
										$('.solve').addClass('animated bounceIn').removeClass('hide');
									}, 2500);
									setTimeout(() => {
										$('.yashua').addClass('animated fadeIn').removeClass('hide');
									}, 3000);
									setTimeout(() => {
										$('.arrow').addClass('arrowMove').removeClass('hide');
										$('.solve').addClass('arrowMove').removeClass('bounceIn');
										$('.title').addClass('shake').removeClass('animated zoomIn');
										$('.xijun3').addClass('xijunMove').removeClass('slideInRight');
										animated = true;
									}, 3500);
								}
								break;
							case 2:
								$(".dot").addClass("animated pulse infinite");
								philips.analytics.trackConversion ({
									name:"interaction",
									description:"other_engagement"
							    });
								break;
							default:
								break;
						}
					},
					onLeave: function (index, nextIndex, direction) {
						switch (index) {
							case 1:
								break;
							case 2:
								$(".dot").removeClass("animated pulse infinite");							
								break;
							default:
								break;
						}
					}
				})
			}
		});
		let metaPhi = document.querySelector('meta[name="PHILIPS.METRICS.PAGENAME"]');
		if (params.type == 'tm') {
			$('.tmtxt').removeClass('hide');
			metaPhi.content = 'droi_diamondclean_smart:hx9924:54:mobile';
		} else {
			$('.jdtxt').removeClass('hide');
			metaPhi.content = 'droi_diamondclean_smart:hx9903:42:mobile';
		}
		loader.start();

		$('.dot').on('tap', function(){
			$('.shuatou').removeClass('hide');
			$.fn.fullpage.setKeyboardScrolling(false);
			$.fn.fullpage.setAllowScrolling(false);
			philips.analytics.trackConversion ({
               	name:"interaction",
               	description:"view_toothbrushes"
		    });
				
		})

		$('.p2t3').on('tap', function(){
			$('.shuatou').removeClass('hide');
			$.fn.fullpage.setKeyboardScrolling(false);
			$.fn.fullpage.setAllowScrolling(false);
			philips.analytics.trackConversion ({
			   	name:"interaction",
			   	description:"view_toothbrushes"
		    });
		})

		$('.close').on('tap', function () {
			$('.shuatou').addClass('hide');
			$.fn.fullpage.setKeyboardScrolling(true);
			$.fn.fullpage.setAllowScrolling(true);
		})

		$(".tmtxt").on('tap', function(){
			philips.analytics.trackConversion ({
                name:"buy_at_others",
                shopname:"Tmall",                   
          		products:"diamondclean_smart;hx9924:54" 
			})
			t.push("XXYH");
			window.location.href = "http://h5.m.taobao.com/awp/core/detail.htm?id=561710128904";
		})

		$('.jdtxt').on('tap', function(){
			philips.analytics.trackConversion ({
                name:"buy_at_others",
                shopname:"JD",                   
          		products:"diamondclean_smart;hx9903:42" 
			})
			window.location.href = "https://sale.jd.com/m/act/lwFuYgTpqBP.html";
			t.push("XXYH");
		})

		$('.solve').on('tap', function(){
			$.fn.fullpage.moveTo("sec2");
		})
		$('.arrow').on('tap', function(){
			$.fn.fullpage.moveTo("sec2");
		})

		if (mobileUtil.isWeixin) {
			$('.tmtxt').on('tap', function(){
				window.location.href = './o.html'
			})
		}
		
	});
})(window, document, $);