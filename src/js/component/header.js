define(["jquery","cookie"], () => {
	class Header{
		constructor() {
			this.init();
		}
		init(){
			//导入头部header
			new Promise((resolve, reject) => {
				$("header").load("/html/component/header.html", () => {
					resolve();
				})
			}).then(() => {
				this.nav().log();
			});
		}
		nav(){
			/* $(".global_nav").on("click", "a", function(e){
				e.preventDefault();
				$(".global_nav li a").addClass("active");
				$(".global_nav li").addClass("active").siblings().removeClass("active");
				let aUrl = $(this).children("a").attr("href");
				console.log(aUrl);
			}) */
			return this;
		}
		log(){
			var wx_btn = $("#yhm_cookie").children("a");
			if($.cookie("user")){
				$("#yhm_cookie").children("span").html(`欢迎您，<a href="" class="user_btn"></a><a href="" class="logout_btn">退出</a>`);
				$(`<a href="" class="order_link_btn">我的订单</a>`).insertBefore(wx_btn);
				var name = JSON.parse($.cookie("user")).name;
				$(".user_btn").html(name);
			}
			$(".logout_btn").on("click", function(){
				 if(confirm("你确定要退出登录吗？")){
				    $.cookie("user", "", {expires: -1});
					window.location.href = "http://localhost:1809";
				}
			});
		}
	}
	return new Header();
});