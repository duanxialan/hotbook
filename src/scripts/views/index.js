// 引入模板
var indexTpl=require("../module/index.string");
// 引入utls
var utls = require("../utls/utls");
//定义视图
SPA.defineView("index",{
	//定义HTML
	html:indexTpl,
	//引入delegated插件，用于定义tap事件
	plugins:["delegated"],
	//定义子视图
	modules:[
		{
			name:"content",  //子视图的名称，用于引用的句柄
			defaultTag:"home",
			views:["home","find","my"],   //定义视图集
			container:".m-wrapper"  // 将子视图中的内容渲染到主视图的哪个容器中
		}
	],
	//绑定视图事件
	bindEvents:{
		//视图显示出来之后执行的回调函数
		beforeShow:function(){

		},
		//视图显示出来之前执行的回调函数
		show:function(){
		
		}			
	},
	//绑定元素事件
	bindActions:{
		"switch.tabs":function(e,data){
			//当前高亮
			utls.setFoucs($(e.el));
			//是对当前这个视图的引用
			this.modules.content.launch(data.tag);
		},
		"goto.my":function(){
			SPA.open('my', {
	          	ani:{
		            name:'dialog',
		            width:280,
		            height:200
	          }
		});
	},
	/*"goto.search":function(){
        	SPA.open("find",{
        		ani:{
                name:"actionSheet",
                distance:300
        		}
        	});
        },*/
	}
})