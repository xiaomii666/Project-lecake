require(["../js/requirejs.config"], () => {
	//引入需要的模块
	require(["jquery", "url", "template", "header", "footer","cookie"], ($, url, template) => {
		$(function(){
			class Details{
				constructor() {
				    this.init();
				}
				init(){
					var searchArr = location.search.slice(1).split("=");
					var searchObj = {};
					searchObj[searchArr[0]] = searchArr[1];
					$.ajax({
					    url: url.baseUrlRap+"/cake-list",
					    type: "get",
					    data: searchObj,
					    dataType: "json",
					    success: function(res){
					        if (res.res_code === 1) {
					            var details = res.res_body;
					            var html = template("detail-template", details);
								console.log(html);
					            $("#details").html(html);
					        }
					    }
					});
				}
				
			}
			return new Details();
		})
	});
});