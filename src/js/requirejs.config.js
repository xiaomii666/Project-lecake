require.config({
	baseUrl : "/",
	paths: {
		"jquery" : "/libs/jQuery/jquery-3.2.1.min",
		"cookie" : "/libs/jQuery/jquery-plugins/jquery.cookie",
		"bootstrap" : "/libs/bootstrap/js/bootstrap.min",
		"header" : "/js/component/header",
		"footer" : "/js/component/footer"
	},
	shim: {
		"cookie" : {
			deps: ["jquery"]
		}
	}
});