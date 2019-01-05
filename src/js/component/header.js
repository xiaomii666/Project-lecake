define(["jquery"], () => {
	class Header{
		constructor() {
			this.init();
		}
		init(){
			//导入头部header
			/* $("header").load("html/component/header.html", () => {}); */
			new Promise((resolve, reject) => {
				$("header").load("html/component/header.html", () => {
					resolve();
				})
			}).then(() => {
				this.nav();
			});
		}
		nav(){
			$(".global_nav").on("click", "li", function(){
				alert($(this).html());
			})
		}
	}
	return new Header();
});