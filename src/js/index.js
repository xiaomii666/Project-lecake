//首页业务逻辑
require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery", "cookie", "header", "footer"], () => {
		
		
		//轮播图
		let ul = $("#banner ul"),
			aImgs = ul.children(),
			len = aImgs.length,
			liWidth = aImgs.eq(0).width(),
			index = 0,
			timer = null;
		ul.append(aImgs.eq(0).clone());
		ul.width((len+1) * liWidth);
		$("#next_btn").on("click", function(){
			if(++index >= len){
				ul.stop().animate({left: -len*liWidth},"slow", function(){
					ul.css({left: 0});
				})
				index = 0;
			}else{
				ul.stop().animate({left: -index*liWidth},"slow");
			}
		});
		$("#prev_btn").on("click", function(){
				if(--index < 0){
					ul.css({left: -len*liWidth});
					index = len-1;
				}
				ul.stop().animate({left: -index*liWidth}, "slow");
			})
		$("#banner").hover(function(){
			clearInterval(timer);
		}, (function autoPlay(){
			timer = setInterval(() => {
				$("#next_btn").trigger("click");
			},3000);
			return autoPlay;
		})());
	});
});