require(["../js/requirejs.config"], () => {
	//引入需要的模块
	require(["jquery", "footer" ], () => {
		$(function (){
			console.log(6);
			$("#account_btn").on("click", function (){
				$("#tab_account").removeClass("undis").addClass("dis");
				$("#tab_mobile").addClass("undis");
				$("#account_btn").addClass("active");
				$("#mobile_btn").removeClass("active");
			})
			$("#mobile_btn").on("click", function (){
				$("#tab_mobile").removeClass("undis").addClass("dis");
				$("#tab_account").addClass("undis");
				$("#mobile_btn").addClass("active");
				$("#account_btn").removeClass("active");
			})
		});
	});
});