require(["../js/requirejs.config"], () => {
	//引入需要的模块
	require(["jquery", "footer"], () => {
		$(function (){
			class Regs{
				constructor(){
					this.phone = /^1[34578]\d{9}$/;
					this.pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
					this.init();
				}
				//初始化
				init(){
					this.regular().subm();
				}
				//正则验证
				regular(){
					/* //var _this = this;
					$("#mobile").on("blur", () => {
						if(_this.phone.test($(this).val())){
							
						}else{
							
						}
					}) */
					return this;
				}
				//提交ajax
				subm(){
					$("#register_submit").on("click", function (e){
						e.preventDefault();
						console.log(2);
						$.ajax({
							url: "http://localhost/api/v1/register.php",
							type: "post",
							data: {
								username: $("#mobile").val(),
								password: $("#password").val()
							},
							success: function (res){
								console.log(res);
								/* if(res.res_code === 1){
									alert("注册成功，马上去登录");
									location.href = "http://localhost:1809/html/logoin.html";
								} */
							},
							dataType: "json"
						});
					});
				}
			}
			new Regs();
		});
	});
});
