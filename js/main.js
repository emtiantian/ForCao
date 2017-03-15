	
$(function(){
	//固定数据
	var database = [
    {      
        "A8": " ",
        "B8": " ",
        "C8": " ",
        "D8": " ",
        "E8": " ",
        "F8": " ",
        "G8": " ",
        "H8": " ",
        "A10": " ",
        "B10": " ",
        "C10": " ",
        "D10": " ",
        "E10": " ",
        "F10": " ",
        "G10": " ",
        "H10": " ",
        "B12": " ",
        "C12": " ",
        "D12": " ",
        "E12": " ",
        "F12": " ",
        "H5": " ",
        "A12": " "
    }
]
	//var dataJson = $.getJSON("http://music.xn--4kqz9du10b.xn--fiqs8s/show/data.json");
	
	var middleData  = ["G12","H12","A14","B14","C14","D14","E14","F14","G14","H14","D15","D16","D17","D18","D19"]
	var needData = ["D15","D16","D17","D18","D19"]
	var excelData = ["B3","E3","G3","A5","B5","C5","D5","E5","D15","D16","D17","D18","D19"]
	//如果2个固定参数都选好了 匹配对应的data数据
	function getData(a,b){
//		if(a&&b){
//			
//		}else{
//			alert("请检查 叶轮直径或轮毂直径 是否填写");
//			return false;
//		}
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
		if(data == ""){
			data=database[0]
		}
		//console.log(data);
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
					$("input[name='"+ele+"_result']").val("合格").addClass("ui basic button green").removeClass("red").css("cssText","opacity:1 !important");
				}else{
					//不合格
					$("input[name='"+ele+"_result']").val("不合格").addClass("ui basic button red").removeClass("green").css("cssText","opacity:1 !important");
				}				
			}else{
				if(window[ele] < A12 ){
					//合格
					$("input[name='"+ele+"_result']").val("合格").addClass("ui basic button green").removeClass("red").css("cssText","opacity:1 !important");
				}else{
					//不合格
					$("input[name='"+ele+"_result']").val("不合格").addClass("ui basic button red").removeClass("green").css("cssText","opacity:1 !important");
				}
			}
		})
		window['data'] = []

		var showDataName = []
		var showDataVal = []

		var endDataName = []
		var endDataVal = []
		$.each(excelData, function(i,ele) {
			var elementInput = $("input[name='"+ele+"']")
			var labelHtml =	elementInput.parent().parent().find("label").html()
			if(i<=7){
				//展示填入数据	
				showDataName.push(labelHtml);
				showDataVal.push(elementInput.val());
				//window['data'].push({"name":labelHtml,"val":elementInput.val() })
			}else{
				//展示最终结果
				var endDataVal1 = []
				endDataVal1.push(labelHtml);
				endDataVal1.push(elementInput.val());
				endDataVal1.push($("input[name='"+ele+"_result']").val());
				endDataVal.push(endDataVal1); 
				//window['data'].push({"name":labelHtml,"val":elementInput.val(),"result":$("input[name='"+ele+"_result']").val() })
			}	
			
		});
		showDataName.push("计算日期")
		showDataVal.push(showDate());
		endDataName.push("计算项")
		endDataName.push("最后结果")
		endDataName.push("是否合格")
		window['data'].push(showDataName,showDataVal,endDataName)
		window['data'].push.apply( window['data'], endDataVal );
		//console.log(data);
	}
	function showDate(){
	   var mydate = new Date();
	   var str = "" + mydate.getFullYear() + "年";
	   str += (mydate.getMonth()+1) + "月";
	   str += mydate.getDate() + "日";
	   return str;
	  }

	//js 生成excel 
	function sheet_from_array_of_arrays(data, opts) {
		var ws = {};
		ws['!cols']= [];  
	    for(var n = 0; n != data[0].length; ++n){  
	        ws['!cols'].push({  
	         wpx: 170  
	      });  
	    }
		var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
		for(var R = 0; R != data.length; ++R) {
			for(var C = 0; C != data[R].length; ++C) {
				if(range.s.r > R) range.s.r = R;
				if(range.s.c > C) range.s.c = C;
				if(range.e.r < R) range.e.r = R;
				if(range.e.c < C) range.e.c = C;
				var cell = {v: data[R][C] };			
				if(cell.v == null) continue;
				var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
				
				if(typeof cell.v === 'number') cell.t = 'n';
				else if(typeof cell.v === 'boolean') cell.t = 'b';
				else if(cell.v instanceof Date) {
					cell.t = 'n'; cell.z = XLSX.SSF._table[14];
					cell.v = cell.v;
				}
				else cell.t = 's';
				
				ws[cell_ref] = cell;
			}
		}
		if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
		return ws;
	}
 

 
	function Workbook() {
		if(!(this instanceof Workbook)) return new Workbook();
		this.SheetNames = [];
		this.Sheets = {};
	}
 


	function s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}

	function createExcelJs (){
		/* original data */				
		//var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date(), "0.3"], ["baz", null, "qux"]]
		var ws_name = data[1][0]||"null";
		var wb = new Workbook(), ws = sheet_from_array_of_arrays(data); 
		/* add worksheet to workbook */
		wb.SheetNames.push(ws_name);
		wb.Sheets[ws_name] = ws;
		var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), ws_name+".xlsx")
		return false;
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
	$(".ui .dropdown input").on("change",function(e){
		//console.log("监听");
		setData(getData($("input[name='D5']").val(),$("input[name='E5']").val()));
		
//		if($("input[name='D5']").val()&&$("input[name='E5']").val()){
//			setData(getData($("input[name='D5']").val(),$("input[name='E5']").val()));
//		}else{
//			
//		}
	})
	$("#submit1").on("click",function(e){
		//console.log(getData(4217,2114));
		//setData(getData(4217,2114));
		setData(getData($("input[name='D5']").val(),$("input[name='E5']").val()));
		calculation();
		//console.log((4217/1000)^2);
		//console.log((4.217*4.217-2.114*2.114 )*11015)
		//console.log(Math.PI/4*146654.73439499995)
		return false;
	})
	$("#submit2").on("click",function(e){
		//console.log(getData(4217,2114));
		//setData(getData(4217,2114));
		//setData(getData($("input[name='D5']").val(),$("input[name='E5']").val()));
		calculation();
		//console.log((4217/1000)^2);
		//console.log((4.217*4.217-2.114*2.114 )*11015)
		//console.log(Math.PI/4*146654.73439499995)
		//
		//createExcel();
		createExcelJs();
		return false;
	})
	
})
