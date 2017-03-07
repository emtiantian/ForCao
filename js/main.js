	
$(function(){
	var dataJson = {"basic50":"50","basic20":"20"}
	function compare(a,b){
		console.log(a);
		console.log(b);
		return parseInt(a)>parseInt(b);
	}
	//事件监听
	$('.formOne').on("submit",function(e){
		var a = $(this).find("[name='beibijiao']").val();
		var b = $(this).find("[name='bijiao']").val();		
		if(compare(dataJson[a],b)){
			$(this).find("[name='result']").val("是").addClass("ui basic button green").removeClass("red");			
		}else{
			$(this).find("[name='result']").val("否").addClass("ui basic button red").removeClass("green");
		}
		//阻止提交
		return false;		
	})
	$(".formTwo").on("submit",function(e){
		var a = $(this).find("[name='beibijiao']").val();
		var b = $(this).find("[name='bijiao']").val();		
		if(compare(a,b)){
			$(this).find("[name='result']").val("是").addClass("ui basic button green").removeClass("red");			
		}else{
			$(this).find("[name='result']").val("否").addClass("ui basic button red").removeClass("green");
		}
		//阻止提交
		return false;		
	})
})
