require(["../js/requirejs.config"], () => {
	//引入需要的模块
	require(["jquery", "footer"], () => {
		$(function (){
			class Regs{
				constructor(){
					this.phone = /^1[34578]\d{9}$/;
					this.pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
					this.span = $(".error_message");
					this.init();
				}
				//初始化
				init(){
					$(".code_btn").on("click", function() {
						$(".code_yzm").addClass("dis").removeClass("undis");
					});
					this.subm().regular();
				}
				//提交ajax
				subm(){
					var _this = this;
					$("#register_submit").on("click", function (e){
						e.preventDefault();
						$.ajax({
							url: "http://localhost/api/v1/register.php",
							type: "post",
							data: {
								username: $("#mobile").val(),
								password: $("#password").val()
							},
							success: function (res){
								if(res.res_code === 1){
									if(confirm("注册成功，去登录")){
										window.href = "http://localhost:1809/html/logoin.html";
									}
								}else{
									$(".error_message").eq(3).html(res.res_message);
								}
							},
							dataType: "json"
						});
					});
					return this;
				}
				//正则验证
				regular(){
					var _this = this;
					$("#mobile").on("blur", function() {
						if(_this.phone.test($(this).val())){
							_this.span.eq(0).html("");
						}else if($(this).val() === ""){
							_this.span.eq(3).html("*输入不能为空");
						}else{
							_this.span.eq(0).html("*手机号格式不正确");
						}
					})
					$("#password").on("blur", function() {
						if(_this.pwd.test($(this).val())){
							_this.span.eq(1).html("");
						}else if($(this).val() === ""){
							_this.span.eq(3).html("*输入不能为空");
						}else{
							_this.span.eq(1).html("*6-20位同时包含数字和字母");
						}
					})
					$("#password2").on("blur", function() {
						if(($(this).val() != $("#password").val())){
							_this.span.eq(2).html("*两次密码不一致");
						}else if($(this).val() === ""){
							_this.span.eq(3).html("*输入不能为空");
						}else{
							_this.span.eq(2).html("");
						}
					})
					$("#code").on("blur", function() {
						$(".code_yzm").addClass("undis").removeClass("dis");
						if($(this).val() === ""){
							_this.span.eq(3).html("*输入不能为空");
						}else if($(this).val() != "ab12"){
							_this.span.eq(3).html("*手机验证码错误");
						}else{
							_this.span.eq(3).html("");
						}
					})
				}
			}
			new Regs();
		});
	});
});
