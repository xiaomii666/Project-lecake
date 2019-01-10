define(["jquery", "template", "shop"], ($, template, shop) => {
	function Item(){
		
	}
	Item.prototype.init = function(url){
		//得到url,然后请求数据，渲染结构
		//console.log(url);
		new Promise((resolve, reject) => {
			//console.log(url)
			$("#cake_list_item").load("/html/component/item.html", () => {
				resolve();
			});
		}).then(() => {
			$.ajax({
				url : url,
				type : "get",
				success : function(res){
					if(res.res_code === 1){
						let list = res.res_body.data;
						let html = template("list-template", {list:list});
						$("#cake_list_item ul").html(html);
						$(".add_cart").each(function(index, addBtn) {
							$(addBtn).click(function(e) {
								e.preventDefault();
								shop.init(list[index]);
							});
						});
					}
				}
			});
		});
	}
	return new Item();
})