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
					    url: url.baseUrlRap+"/details-list",
					    type: "get",
					    data: searchObj,
					    dataType: "json",
					    success: function(res){
					        if (res.res_code === 1) {
					            var details = res.res_body.data;
					            var html = template("detail-template", details);
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