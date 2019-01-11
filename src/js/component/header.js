define(["jquery","cookie"], () => {
	
	class Header{
		constructor() {
			this.init();
			this.arr = [];
			this.str = "";
		}
		init(){
			//导入头部header
			new Promise((resolve, reject) => {
				$("header").load("/html/component/header.html", () => {
					resolve();
				})
			}).then(() => {
				this.nav().log().testck();
				$(document).scroll(function() {
					if($(document).scrollTop() >= 155) {
						$(".fix_header").css({"top":0});
					}else{
						$(".fix_header").css({"top":-65});
					}
				})
			});
		}
		nav(){
			/* $(".global_nav").on("click", "li", function(){
				//e.preventDefault();
				//$(".global_nav li a").addClass("active");
				//$(this).addClass("active").siblings().removeClass("active");
				//let aUrl = $(this).children().attr("href");
				//console.log(aUrl);
			}) */
			if(location.href === "http://localhost:1809/html/list.html"){
				$(".global_nav li").eq(1).addClass("active").siblings().removeClass("active");
				$(".acd").addClass("active").siblings().removeClass("active");
			}
			return this;
		}
		log(){
			var wx_btn = $("#yhm_cookie").children("a");
			if($.cookie("user")){
				$("#yhm_cookie").children("span").html(`欢迎您，<a href="" class="user_btn"></a><a href="" class="logout_btn">退出</a>`);
				$(`<a href="http://localhost:1809/html/shopcart.html" class="order_link_btn">我的订单</a>`).insertBefore(wx_btn);
				var name = JSON.parse($.cookie("user")).name;
				$(".user_btn").html(name);
			}
			$(".logout_btn").on("click", function(e){
				e.preventDefault();
				if(confirm("你确定要退出登录吗？")){
				    $.cookie("user", $.cookie("user"), {path: "/",expires: -1});
					location.href = "http://localhost:1809";
				}
			});
			return this;
		}
		testck(){
			var _this = this;
			_this.tcart = $(".global_top_cart");
			_this.tcart_p = $(".no_content");
			_this.tcart_num = $(".global_cart_num ");
			_this.cnum = 0;
			if($.cookie("shop")){
				this.arr = JSON.parse($.cookie("shop"));
				$.each(this.arr, (index, item) => {
					_this.str += `
					<ul class="goods_list">
						<li class="goods_item clear_fix">
							<div class="img_wrap f_left"><a href="http://localhost:1809/html/details.html"><img src="${item.img}" ></a></div>
							<div class="goods_detail">
								<h2 class="no_wrap">${item.title}</h2>
								<p>2-4人食</p>
								<p class="new_price">￥<strong>${item.price}</strong><span>X${item.num}</span></p>
							</div>
						</li>
					</ul> `;
				});
				_this.tcart.prepend(_this.str);
				_this.tcart_p.addClass("undis");
				_this.tcart_num.removeClass("undis").addClass("dis");
				for(let i=0; i<this.arr.length; i++){
					_this.cnum = _this.cnum + this.arr[i].num;
				}
				_this.tcart_num.text(_this.cnum);
				
			}else{
				_this.tcart_p.addClass("dis");
				_this.tcart_num.removeClass("dis").addClass("undis");
			}
		}
		/* sech(){
			$(".search_btn").on("submit", function(e){
			    e.preventDefault();
			    //把form表单里面有name属性的表单元素值序列化
			    var str = $(".search_btn").serialize();
			    $.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&"+str, function(res){
			        var data = res.s;
			        $("seca").empty().show();
			        data.forEach((item, i) => {
			            $("<li>").html(item).appendTo($("seca"));
			        })
			    })
			    $("seca").on("click", "li", function(){
			        $("input[type=text]").val($(this).text());
			        $("ul").hide();
			    })
			})
		} */
	}
	return new Header();
});