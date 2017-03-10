	
$(function(){
	//固定数据
//	var dataJson = [
//  {
//      "D5": "4217",
//      "E5": "2114",
//      "A8": "4690",
//      "B8": "1560",
//      "C8": "8200",
//      "D8": "1250.5",
//      "E8": "840",
//      "F8": "316.5",
//      "G8": "8330",
//      "H8": "607.5",
//      "A10": "1070",
//      "B10": "1090",
//      "C10": "643",
//      "D10": "1600",
//      "E10": "1600",
//      "F10": "465",
//      "G10": "2",
//      "H10": "42CrMo",
//      "B12": "300",
//      "C12": "90",
//      "D12": "289",
//      "E12": "729.5",
//      "F12": "1747.5",
//      "H5": "40000",
//      "A12": "75"
//  }
//]
	//var dataJson = $.getJSON("http://music.xn--4kqz9du10b.xn--fiqs8s/show/data.json");
	
	var middleData  = ["G12","H12","A14","B14","C14","D14","E14","F14","G14","H14","D15","D16","D17","D18","D19"]
	var needData = ["D15","D16","D17","D18","D19"]
	var excelData = ["B3","E3","G3","A5","B5","C5","D5","E5","D15","D16","D17","D18","D19"]
	//如果2个固定参数都选好了 匹配对应的data数据
	function getData(a,b){
		var data = "";
		$.each(dataJson, function(i,ele) {
			if(ele.D5 == a && ele.E5 == b)
				data = ele;
				return false;
		});
		return data;
	}
	
	function compare(a,b){
		return parseInt(a)>parseInt(b);
	}
	
		function initUI() {
		$(".form").form({
			on: 'blur',
			fields: {
				empty: {
					identifier: 'bijiao',
					rules: [{
							type: 'empty',
							prompt: '比较值不能为空'
						},
						{
							type: 'number',
							prompt: '比较值必须为数字'
						}
					]
				},
				dropdown: {
					identifier: 'beibijiao',
					rules: [{
						type: 'empty',
						prompt: '被比较值不能为空'
					}]
				},
			}
		});
		addTag();
		$('.ui.dropdown').dropdown({
			allowAdditions: true,
			maxSelections: 1,
		});
	}

	function addTag() {
		var arrayD5 = [];
		var arrayE5 = [];
		var menuD5 = $("input[name='D5']").parent().find(".menu");
		var menuE5 = $("input[name='E5']").parent().find(".menu");
		$.each(dataJson, function(i, ele) {
			arrayD5.push(ele["D5"]);
			arrayE5.push(ele["E5"]);
		});
		$.each(arrayD5, function(i, ele) {
			menuD5.html("");
			menuD5.append('<div class="item" data-value="' + ele + '">' + ele + '</div>')
		});
		$.each(arrayE5, function(i, ele) {
			menuE5.html("");
			menuE5.append('<div class="item" data-value="' + ele + '">' + ele + '</div>')
		});		
	}
	
		
	function setData(data){
		for(var prop in data){ 
			//console.log(prop+" : "+data[prop]);
			$("input[name = "+prop +"]").val(data[prop])	
            window[prop] = prop == "H10" ? parseFloat(data[prop]): data[prop];
		}
	}
	
	function calculation(){
		window['A5'] = $("input[name='A5']").val();
		window['B5'] = $("input[name='B5']").val();
		window['C5'] = $("input[name='C5']").val();
		window['D5'] = $("input[name='D5']").val();
		window['E5'] = $("input[name='E5']").val();
		//计算前检查各种值
		if(C5||A5||B5||D5||E5){	
			//console.log("计算数据填写完整"+C5+":"+A5+":"+B5+":"+D5+":"+E5);
		}else{
			alert("计算数据没有填写完整");
			//console.log("计算数据没有填写完整"+C5+":"+A5+":"+B5+":"+D5+":"+E5);
			return
		}
		window['G12'] =(A8*9.8*B8+C8*9.8*D8+E8*9.8*F8-G8*9.8*H8-A10*9.8*B10)/C10
		window['H12'] =A8*9.8+C8*9.8+E8*9.8+G8*9.8+A10*9.8-G12
		//window['A14'] =(Math.PI/4)*((D5/1000)^2-(E5/1000)^2)*C5 
		//这个公式很奇怪
		window['A14'] =(Math.PI/4)*((D5/1000)*(D5/1000)-(E5/1000)*(E5/1000))*C5
		
		window['B14'] =9550*B5/A5
		window['C14'] =A8*9.8*E12/1000+C8*9.8*(E12/1000-(B8/1000-D8/1000))
		window['D14'] =A8*9.8*F12/1000+C8*9.8*(F12/1000-(B8/1000-D8/1000))-G12*(F12/1000-(B8/1000-C10/1000))+E8*9.8*(F12/1000-(B8/1000-F8/1000))-H12*(F12/1000-B8/1000)
		window['E14'] =C14>D14?C14:D14
		window['F14'] =A8*9.8*(B8/1000-C10/1000)+C8*9.8*(D8/1000-C10/1000)
		window['G14'] =A8*9.8*B8/1000+C8*9.8*D8/1000-G12*C10/1000+E8*9.8*F8/1000
		window['H14'] =H12<G12?F14:G14
		window['D15'] =1000000*Math.pow((D10*1000)/(Math.abs(G12)),3.33)/60/A5
		window['D16'] =1000000*Math.pow((E10*1000)/(Math.abs(H12)),3.33)/60/A5
		window['D17'] =1000000*Math.pow((F10*G10*1000)/(Math.abs(A14)*0.57),3)/60/A5
		window['D18'] =32*Math.sqrt(Math.pow(E14,2)+Math.pow((B14/2),2))/(Math.PI*Math.pow((D12/1000),3)*(1-Math.pow(C12/D12,4)))/1000000
		window['D19'] =32*Math.sqrt(Math.pow(H14,2)+Math.pow((B14/2),2))/(Math.PI*Math.pow((B12/1000),3)*(1-Math.pow(C12/B12,4)))/1000000		
		//显示中间数据
		$.each(middleData, function(i,ele) {
			$("input[name = "+ele +"]").val(window[ele].toFixed(2));
		});
		//比较需要数据是否合格
		$.each(needData,function(i,ele){
			//前三个
			if(i<=2){
				if(window[ele] > H5 ){
					//合格
					$("input[name='"+ele+"_result']").val("合格").addClass("ui basic button green").removeClass("red");
				}else{
					//不合格
					$("input[name='"+ele+"_result']").val("不合格").addClass("ui basic button red").removeClass("green");
				}				
			}else{
				if(window[ele] < A12 ){
					//合格
					$("input[name='"+ele+"_result']").val("合格").addClass("ui basic button green").removeClass("red");
				}else{
					//不合格
					$("input[name='"+ele+"_result']").val("不合格").addClass("ui basic button red").removeClass("green");
				}
			}
		})
		window['data'] = []
		$.each(excelData, function(i,ele) {
			var elementInput = $("input[name='"+ele+"']")
			var labelHtml =	elementInput.parent().parent().find("label").html()
			if(i<=8){
				//展示填入数据			
				window['data'].push({"name":labelHtml,"val":elementInput.val() })
			}else{
				//展示最终结果
				window['data'].push({"name":labelHtml,"val":elementInput.val(),"result":$("input[name='"+ele+"_result']").val() })
			}			
		});
		//console.dir(data);
	}


	//生成excel
	function createExcel (){
			var str = "";
			var nameStr = '';
			var valStr = "";
			var nameStr1 = '';
			var valStr1 = "";
			var resultStr = '';
			var aLink = $("#aLink")
			$.each(data,function(i,ele){
				if(!ele.result){
					nameStr += ele.name + ",";
					valStr += ele.val +",";
				}else{
					nameStr1 += ele.name + ",";
					valStr1 += ele.val +",";
					resultStr =  ele.result + ","; 					
				}				
			})
			str = nameStr+"\n"+valStr+"\n"+"\n"+"\n"+nameStr1+"\n"+valStr1+"\n"+resultStr
	        //var uri = 'data:application/vnd.ms-excel;base64,', 
	        var uri = ' data:text/csv;charset=utf-8;base64,',
	        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
	        window.location.href = uri + base64(str);
//	        aLink.attr("href","data:text/csv;charset=utf-8,\ufeff"+str);  
//	        aLink.click();  
	}
	
	function init (){
		if (!window.dataJson) { 
	　　　	alert("没有获得基础数据!请检查网络");
			return
　　		}
		initUI();
	}
	init();
	
	//事件监听
	$("#submit1").on("click",function(e){
		//console.log(getData(4217,2114));
		setData(getData(4217,2114));
		calculation();
		//console.log((4217/1000)^2);
		//console.log((4.217*4.217-2.114*2.114 )*11015)
		//console.log(Math.PI/4*146654.73439499995)
		return false;
	})
	$("#submit2").on("click",function(e){
		//console.log(getData(4217,2114));
		setData(getData(4217,2114));
		calculation();
		//console.log((4217/1000)^2);
		//console.log((4.217*4.217-2.114*2.114 )*11015)
		//console.log(Math.PI/4*146654.73439499995)
		createExcel();
		return false;
	})
	
})
