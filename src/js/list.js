require(["../js/requirejs.config"], () => {
	//引入需要的模块
	require(["jquery", "item", "url", "cookie","shop", "header","footer"], ($, item, url) => {
		$(function(){
			item.init(url.baseUrlRap + "/cake-list");
		})
	});
});