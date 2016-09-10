//javaScript Document

$(function(){
			
			(function(){//城市切换
				var aA = $('#header .city a');
				aA.each(function(index){
					//console.log(this);
					$(this).click(function(){
						aA.attr('class','');
						$(this).attr('class','active');
					});
				});
			})();
			(function(){//搜索切换
				var aLi = $('#menu li');
				var oText = $('#search').find('.form .text');
				var arrText=[
				'例如：荷塘鱼坊烤鱼 或 樱花日本料理',
				'例如：昌平区育新站龙旗广场2号楼609室',
				'例如：万达影院双人情侣卷',
				'例如：东莞出事了，大老虎是谁？',
				'例如：北京初春降雪,天气变幻莫测'
				];
				var iNow = 0;
				oText.val(arrText[iNow]);

				aLi.each(function( index ){
					$(this).click(function(){
						//console.log(index);
						aLi.attr('class','gradient');
						$(this).attr('class','active');

						iNow = index;
						oText.val(arrText[iNow]);
					});
				});

				oText.focus(function(){
					//console.log(arrText[iNow]);
					if($(this).val()==arrText[iNow]){
						$(this).val('');
					}
				});

				oText.blur(function(){
					if($(this).val()==''){
						oText.val(arrText[iNow]);
					}
				});
			})();

			(function(){//文字滚动
				var oDiv = $('.update');
				var oUl = $('.update ul');
				var iH = 0;
				//console.log(iH);
				var arrData = [
					{'name':'萱萱','time':'4分钟前','title':'写了一篇新文章：那些灿烂华美的瞬间','url':'#'},
					{'name':'怅怅','time':'5分钟前','title':'写了一篇新文章：广东三天抓获涉黄疑犯','url':'#'},
					{'name':'洋洋','time':'6分钟前','title':'写了一篇新文章：台办回应王郁琦','url':'#'},
					{'name':'萱萱','time':'7分钟前','title':'写了一篇新文章：那些灿烂华美的瞬间','url':'#'},
					{'name':'怅怅','time':'8分钟前','title':'写了一篇新文章：广东三天抓获涉黄疑犯','url':'#'},
					{'name':'洋洋','time':'9分钟前','title':'写了一篇新文章：台办回应王郁琦','url':'#'}
				];
				var str = '';
				var oBtnUp = $('#updateUpBtn');
				var oBtnDown = $('#updateDownBtn');
				var iNow = 0;
				var timer = null;
				for(i=0;i<arrData.length;i++){
				str+='<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong><span>'+arrData[i].time+'</span>'+arrData[i].title+'</a></li>';
				}
				//console.log(str);
				oUl.html(str);
				iH = oUl.find('li').height();

				oBtnUp.click(function(){
					doMove(-1);
				});

				oBtnDown.click(function(){
					doMove(1);
				});

				oDiv.hover(function(){
					clearInterval(timer);
				},function(){
					autoPlay();
				});

				function autoPlay(){
					timer = setInterval(function(){
						doMove(-1);
					},2500);
				}
				autoPlay();

				function doMove(num){
					iNow+=num;
					if(Math.abs(iNow)>arrData.length-1){
						iNow = 0;
					}
					if(iNow>0){
						iNow = -(arrData.length-1);
					}
					oUl.stop().animate({'top':iH*iNow},1000);
				}

			})();

			(function(){//options 选项卡切换

				fnTab($('.tabNav1'),$('.tabCon1'));
				fnTab($('.tabNav2'),$('.tabCon2'));
				fnTab($('.tabNav3'),$('.tabCon3'));
				fnTab($('.tabNav4'),$('.tabCon4'));

				function fnTab(oNav,aCon){
					var aElem = oNav.children();
					aCon.hide().eq(0).show();

					aElem.each(function(index){
						$(this).click(function(){
							aElem.removeClass('active').addClass('gradient');
							$(this).removeClass('gradient').addClass('active');
							aElem.find('a').attr('class','triangle_down_gray');
							$(this).find('a').attr('class','triangle_down_red');
							aCon.hide().eq(index).show();
						});
					});
				}
			})();

			(function(){//自动播放的焦点图
				var oDiv = $('#fade');
				var aUlLi = oDiv.find('ul li');
				var aOlLi = oDiv.find('ol li');
				var oP = oDiv.find('p');
				var arr = ['爸爸去哪了~','人像摄影中的光影感','娇柔妩媚，美艳大方'];
				var iNow = 0;
				var timer = null;

				fnFade();
				autoPlay();

				aOlLi.click(function(){
					iNow = $(this).index();
					fnFade();
				});

				oDiv.hover(function(){
					clearInterval(timer);
				},function(){
					autoPlay();
				});

				function  autoPlay(){
					timer = setInterval(function(){
						iNow++;
						iNow%=arr.length;
						fnFade();
					},2000);
				}

				function fnFade(){
					aUlLi.each(function(i){
						if(i!=iNow){
							aUlLi.eq(i).fadeOut().css('zIndex',1);
							aOlLi.eq(i).removeClass('active');
						}else{
							aUlLi.eq(i).fadeIn().css('zIndex',2);
							aOlLi.eq(i).addClass('active');
						}
					});
					oP.text(arr[iNow]);
				}
			})();

			(function(){//日历弹出层说明
				var aSpan = $('.calender h3 span');
				var aImg = $('.img');
				var oPrompt = $('.tody_info');
				var oImg = oPrompt.find('img');
				var oStrong = oPrompt.find('strong');
				var oP = oPrompt.find('p');

				aImg.hover(function(/*鼠标移入事件*/){
					var iTop = $(this).parent().position().top-30;
					var iLeft = $(this).parent().position().left+40;
					var iIndex = $(this).attr('iDate');
					//console.log($(this).parent().index()%aSpan.size());
					//console.log(iLeft);
					oPrompt.show().css({'left':iLeft,'top':iTop});
					oP.text($(this).attr('info'));
					oImg.attr('src',$(this).attr('src'));
					oStrong.text(iIndex);
				},function(/*鼠标移出事件*/){
					oPrompt.hide();
				});



			})();

			(function(){//BBS模块鼠标移入高亮显示
				var aLi = $('.bbs ol li');
				aLi.hover(function(){
					aLi.removeClass('active');
					$(this).addClass('active');
				},function(){/*不需要移出动作 ，感觉使用一个mouseover完成更好点*/});
			})();

			(function(){//HOT区鼠标移入遮罩

				var arr = [
				'',
				'用户名：1<br/>人气：124',
				'用户名：性感宝贝<br/>区域：朝阳区CBD<br/>人气：124987',
				'用户名：4<br/>人气：124',
				'用户名：5<br/>人气：124',
				'用户名：6<br/>人气：124',
				'用户名：7<br/>人气：124',
				'用户名：8<br/>人气：124',
				'用户名：9<br/>人气：124',
				'用户名：10<br/>人气：124',
				'用户名：11<br/>人气：124'
				];

				$('.hot_area li').mouseover(function(){

					if($(this).index()==0){
						return;
					}
					$('.hot_area li p').remove();
					//console.log($(this).width()-12);
					var sWidth = $(this).width()-12+'px';
					var sHeight = $(this).height()-12+'px';
					$(this).append('<p style="width:'+sWidth+';height:'+sHeight+'">'+arr[$(this).index()]+'</p>');
				});
			})();
			
		});