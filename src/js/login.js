require(["../js/requirejs.config"], () => {
	//引入需要的模块
	require(["jquery", "footer", "cookie" ], () => {
		$(function (){
			class Login{
				constructor(){
					this.phone = /^1[34578]\d{9}$/;
					this.span = $(".error_message");
					this.init();
				}
				//初始化
				init(){
					$(".tab_btn").on("click", function() {
						$(this).addClass("active").siblings().removeClass("active");
						$(".tab").eq($(this).index()).addClass("dis").removeClass("undis").siblings().removeClass("dis").addClass("undis");
					});
					this.subm().test();
				}
				subm(){
					$(".submit_btn").on("click", function(e) {
						e.preventDefault();
						$.ajax({
							url : "http://localhost/api/v1/login.php",
							type : "post",
							data : {
								username: $(".username").val(),
								password: $(".password").val()
							},
							success: function (res){
								if(res.res_code === 1){
									$.cookie("user",JSON.stringify({
									        id:res.res_body.id,
									        name:res.res_body.username
									    }),{expires:1,path: "/"});
									if(confirm("登录成功 现在去首页")){
										window.location.href = "http://localhost:1809";
									}
								}else{
									$(".error_message").eq(1).html(res.res_message); 
								}
							},
							dataType: "json"
						})
					})
					return this;
				}
				test(){
					var _this = this;
					$(".username").on("blur", function() {
						if(_this.phone.test($(this).val())){
							_this.span.eq(1).html("");
						}else if($(this).val() === ""){
							_this.span.eq(1).html("*用户名和密码不能为空"); 
						}else{
							_this.span.eq(1).html("*用户名格式不正确");
						}
					})
				}
			}
				new Login();
		});
	});
});