require.config({
	baseUrl : "/",
	paths: {
		"jquery" : "/libs/jQuery/jquery-3.2.1.min",
		"cookie" : "/libs/jQuery/jquery-plugins/jquery.cookie",
		"bootstrap" : "/libs/bootstrap/js/bootstrap.min",
		"header" : "/js/component/header",
		"footer" : "/js/component/footer",
		"item" : "/js/component/item",
		"url" : "/js/component/url",
		"template" : "/libs/temp/template-web",
		"shop" : "/js/component/shop"
	},
	shim: {
		//不符合AMD的规范的模块，垫片
		"cookie" : {
			deps: ["jquery"]
		}
	}
});