define(["jquery"], () => {
	class Footer{
		constructor() {
			this.init();
		}
		init(){
			//导入尾部footer
			new Promise((resolve, reject) => {
				$("footer").load("/html/component/footer.html", () => {
					resolve();
				})
			}).then(() => {
				this.nav();
			});
		}
		nav(){
			$("#footerServiceBtn").on("click", function(){
				alert($(this).html());
			})
		}
	}
	return new Footer();
});