// 引入模板
var myTpl=require("../module/my.string");
// 引入swiper的第三方的animate插件
var mod = require("../lib/swiper.animate1.0.2.min");

SPA.defineView('my', {
  html: myTpl,
  plugins:["delegated"],
	styles:{
		background:"transparent!important"
	},
  bindEvents:{
    show:function(){
       
    }
  },
  bindActions:{
        "tap.close":function(){
        	this.hide();
        }
	}

})
