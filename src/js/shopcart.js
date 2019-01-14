require(["../js/requirejs.config"], () => {
	//引入需要的模块
	require(["jquery", "item", "url", "header", "footer","cookie"], () => {
		$(function(){
			class Goshop{
				constructor() {
					this.str = "";
					this.arr = [];
					this.nli = $(".goods_list");
					this.arr1 = [];
					this.adprc = $(".addprice");
					this.dele = $(".delete_btn");
					this.flag = false;
					this.init().testck();
					this.del();
				}
				init(){
					if($.cookie("user")){
						$(".login_status").addClass("undis");
					}else{
						$(".login_status").removeClass("undis");
					}
					return this;
				}
				testck(){
					var _this = this;
					let nulist = $(".shop_list");
					if($.cookie("shop")){
						this.arr = JSON.parse($.cookie("shop"));
						$.each(this.arr, (index, item) => {
							_this.str += `<div class="goods_item">
								<div class="item_message clear_fix">
									<a href="javascript:void(0);" class="check_status"></a>
									<div class="img_wrap f_left">
										<a href="http://localhost:1809/html/details.html">
											<img src="${item.img}" >
										</a>
									</div>
									<div class="p_info f_left">
										<div class="p_detail f_left">
											<h2 class="no_wrap"><a href="http://localhost:1809/html/details.html">${item.title}</a></h2>
											<p>2-4人食</p>
											<p class="new_price"><small>单价：￥ </small>${item.price}</p>
											<h3>填写生日祝福语</h3>
											<div class="birthday_card">
												<span class="card_text no_wrap">
													<select>
														<option value ="生日快乐">生日快乐</option>
														<option value ="Happy Birthday">Happy Birthday</option>
														<option value ="不需要">不需要</option>
														<option value ="自定义">自定义</option>
													</select>
												</span>
											</div>
										</div>
										<div class="p_edit f_right">
											<p class="p_price sml_price">小计：￥<span></span></p>
											<div class="input_wrap">
												<a href="javascript:void(0);" class="down num_edit_btn"></a>
												<input type="text" class="item_num" value="${item.num}"/>
												<a href="javascript:void(0);" class="up num_edit_btn"></a>
											</div>
										</div>
									</div>
								</div>
							</div>`;
						});
						this.nli.html(_this.str);
						_this.spnum = $(".item_num");//商品数量
						_this.spnum1 = $(".total_count b");
						_this.sml = $(".sml_price span");
						var downa = $(".down"),
							upa = $(".up"),
							checka = $(".item_message .check_status"),
							addcheck = $("#add_check"),
							addcount = $(".order_btn");
							$(addcount).click(function (){
								if($.cookie("user")){
									location.href = "http://localhost:1809/html/pay.html"
								}else{
									alert("请先登录账号！");
									location.href = "http://localhost:1809/html/login.html"
								}
							});
						_this.spnum.each(function(index, item) {
							$(item).on("blur", function (){
								_this.modify(index);
							});
						});
						downa.each(function (index, down){
							$(down).on("click", function (){
								_this.reduce(index);
							});
						});
						upa.each(function (index, up){
							$(up).on("click", function (){
								_this.pluss(index);
							});
						});
						checka.each(function (index, chek){
							$(chek).on("click", function (){
								_this.select(index,chek);
							});
						});
						addcheck.on("click", function (){
							addcheck.toggleClass("active");
							if(addcheck.hasClass("active")){
								checka.addClass("active");
								_this.flag = false;
							}else{
								checka.removeClass("active");
								_this.flag = true;
								this.arr1 = [];
							}
							_this.addchekd();
						});
					}else{
						nulist.removeClass("undis").addClass("dis");
					}
					_this.select();
					_this.count();
				}
				//输入框
				modify(key){
					this.arr[key].num = this.spnum.eq(key).val();
				}
				//减少
				reduce(key){
					this.arr[key].num--;
					location.reload();
					$.cookie("shop",JSON.stringify(this.arr),{path: "/"});
					this.spnum.eq(key).val(this.arr[key].num);
					//console.log($.cookie("shop"));
					if(this.arr[key].num < 1){
						alert("最小数量只能为1");
						this.arr[key].num = 1;
						$.cookie("shop",JSON.stringify(this.arr),{path: "/"});
					}
					this.count();
					this.addcount();
					this.addchekd();
				}
				//增加
				pluss(key){
					this.arr[key].num++;
					location.reload();
					$.cookie("shop",JSON.stringify(this.arr),{path: "/"});
					this.spnum.eq(key).val(this.arr[key].num);
					this.count();
					this.addcount();
					this.addchekd();
					//console.log($.cookie("shop"));
				}
				//单选
				select(key,ck){
					$(ck).toggleClass("active");
					if($(ck).hasClass("active")){
						this.arr1.push(key);
						this.addcount();
					}else{
						$.each(this.arr1, (index, item) => {
							if(key === item){
								this.arr1.splice(index,1);
							}
						});
					}
					this.addcount(this.arr1);
				}
				//计算
				count(){
					$.each(this.arr, (index, item) => {
						var small = item.price * item.num;
						this.sml.eq(index).text(small);
					});
				}
				//总计
				addcount(abc){
					var sum = 0;
					$.each(abc, (index, item) => {
						sum += parseInt(this.sml.eq(item).text());
					});
					this.adprc.text(sum);
				}
				//全选
				addchekd(){
					$.each(this.arr, (index, item) =>{
						this.arr1.push(index);
					});
					if(this.flag){
						this.arr1 = [];
					}else{
						var set = [...new Set(this.arr1)];
					}
					this.addcount(set);
				}
				//删除全部
				del(){
					this.dele.click(function (){
						if(confirm("你确定要删除所有商品并返回购物列表吗？")){
							$.cookie("shop", $.cookie("shop"), {path: "/",expires: -1});
							location.href = "http://localhost:1809/html/list.html";
						}
					});
				}
			}
			return new Goshop();
		})
	});
});