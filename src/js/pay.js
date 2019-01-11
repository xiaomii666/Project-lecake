require(["../js/requirejs.config"], () => {
	//引入需要的模块
	require(["jquery","cookie","header","footer"], () => {
		$(function(){
			if(!$.cookie("user")){
				location.href="http://localhost:1809/html/login.html";
			}
			$(".main_pay_btn").click(function (){
				$("body").append("<div>页面跳转中...</div>");
			});
		})
	});
});