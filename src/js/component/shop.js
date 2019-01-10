define(["jquery", "template", "cookie"], () => {
		class Shop{
			constructor() {
				
			}
			init(data){
				this.data = data;
				this.data.num = 1;
				this.testck();
			}
			testck(){
				if($.cookie("shop")){
					var arr = JSON.parse($.cookie("shop"));
				}else{
					var arr = [];
				}
				for(var i=0; i<arr.length; i++){
					if(arr[i].id === this.data.id){
						arr[i].num++;
						break;
					}
				}
				if(i === arr.length){
					//如果i和lenght相等的话,说明没有遇到break
					arr.push(this.data);
				}
				$.cookie("shop", JSON.stringify(arr),{path: "/"});
				if(confirm("添加购物车成功,去购物车结算")){
					window.location.href = "http://localhost:1809/html/shopcart.html";
				}
				/* var timer = setTimeout(function(){
				},4000);
				clearTimeout(timer); */
				console.log($.cookie("shop"));
			}
		}
		return new Shop();
});