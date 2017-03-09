$(function(){
	//折叠菜单
	$('.ui.accordion').accordion();
	//下拉菜单
	$('.ui.dropdown').dropdown();
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
	$('.ui.dropdown').dropdown({
	    allowAdditions: true,
	    maxSelections:1,
	});
})
